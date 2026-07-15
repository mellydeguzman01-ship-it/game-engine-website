const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const rootDir = __dirname;
const sessionIdPattern = /^[a-zA-Z0-9_-]{8,80}$/;
const maxMessageLength = 3000;
const sessions = new Map();
const clientsBySession = new Map();
const sessionsByTelegramMessage = new Map();
let messageSequence = 0;
let telegramUpdateOffset = 0;
let telegramPollInFlight = false;

loadEnvFile(path.join(rootDir, ".env"));
loadEnvFile(path.join(rootDir, ".env.local"));

const port = Number(process.env.PORT || 3000);
const botToken = process.env.TELEGRAM_BOT_TOKEN || "";
const telegramChatId = String(process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_GROUP_ID || "");
const telegramApi = botToken ? `https://api.telegram.org/bot${botToken}` : "";

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".mp4", "video/mp4"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 16_384) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Request body must be valid JSON."));
      }
    });

    request.on("error", reject);
  });
}

function createSessionId() {
  return `ge-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeSessionId(value) {
  const sessionId = String(value || "").trim();

  if (!sessionIdPattern.test(sessionId)) {
    return createSessionId();
  }

  return sessionId;
}

function getSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      createdAt: new Date().toISOString(),
      messages: [],
      sessionId,
      updatedAt: new Date().toISOString(),
    });
  }

  return sessions.get(sessionId);
}

function addSessionMessage(sessionId, message) {
  const session = getSession(sessionId);
  const nextMessage = {
    cursor: ++messageSequence,
    id: message.id || `srv-${messageSequence}`,
    role: message.role || "agent",
    text: String(message.text || "").trim(),
    timestamp: new Date().toISOString(),
  };

  if (!nextMessage.text) {
    return undefined;
  }

  session.messages.push(nextMessage);
  session.messages = session.messages.slice(-100);
  session.updatedAt = nextMessage.timestamp;
  pushEventToSession(sessionId, nextMessage);

  return nextMessage;
}

function pushEventToSession(sessionId, message) {
  const clients = clientsBySession.get(sessionId);

  if (!clients) {
    return;
  }

  const payload = `event: message\ndata: ${JSON.stringify(message)}\n\n`;

  clients.forEach((client) => {
    client.write(payload);
  });
}

async function telegramRequest(method, body) {
  if (!telegramApi || !telegramChatId) {
    throw new Error("Telegram Bot Token or Chat ID is not configured on the server.");
  }

  const response = await fetch(`${telegramApi}/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.ok) {
    throw new Error(data.description || "Telegram API rejected the request.");
  }

  return data.result;
}

async function forwardVisitorMessage(sessionId, text) {
  const sentMessage = await telegramRequest("sendMessage", {
    chat_id: telegramChatId,
    disable_web_page_preview: true,
    text: [
      "New Game Engine website chat message",
      `Session: ${sessionId}`,
      "",
      text,
      "",
      "Reply directly to this Telegram message to answer this visitor.",
      `Alternative: /reply ${sessionId} your message`,
    ].join("\n"),
  });

  if (sentMessage?.message_id) {
    sessionsByTelegramMessage.set(Number(sentMessage.message_id), sessionId);
  }

  return sentMessage;
}

function parseSessionFromText(text) {
  const match = String(text || "").match(/Session:\s*([a-zA-Z0-9_-]{8,80})/);
  return match ? match[1] : "";
}

function parseReplyCommand(text) {
  const match = String(text || "").match(/^\/reply\s+([a-zA-Z0-9_-]{8,80})\s+([\s\S]+)/i);

  if (!match) {
    return undefined;
  }

  return {
    sessionId: match[1],
    text: match[2].trim(),
  };
}

function getSessionForTelegramReply(message) {
  const replyToMessage = message.reply_to_message;
  const replyToMessageId = Number(replyToMessage?.message_id || 0);

  if (replyToMessageId && sessionsByTelegramMessage.has(replyToMessageId)) {
    return sessionsByTelegramMessage.get(replyToMessageId);
  }

  return parseSessionFromText(replyToMessage?.text || replyToMessage?.caption || "");
}

function handleTelegramMessage(message) {
  if (!message || String(message.chat?.id || "") !== telegramChatId) {
    return;
  }

  const text = String(message.text || message.caption || "").trim();
  const commandReply = parseReplyCommand(text);
  const sessionId = commandReply?.sessionId || getSessionForTelegramReply(message);
  const replyText = commandReply?.text || text;

  if (!sessionId || !replyText) {
    return;
  }

  sessionsByTelegramMessage.set(Number(message.message_id), sessionId);
  addSessionMessage(sessionId, {
    id: `tg-${message.message_id}`,
    role: "agent",
    text: replyText,
  });
}

async function pollTelegramOnce() {
  if (!telegramApi || !telegramChatId || telegramPollInFlight) {
    return;
  }

  telegramPollInFlight = true;

  try {
    const result = await telegramRequest("getUpdates", {
      allowed_updates: ["message"],
      offset: telegramUpdateOffset || undefined,
      timeout: 20,
    });

    result.forEach((update) => {
      telegramUpdateOffset = Number(update.update_id) + 1;
      handleTelegramMessage(update.message);
    });
  } catch (error) {
    console.warn("Telegram polling error:", error.message);
  } finally {
    telegramPollInFlight = false;
  }
}

async function primeTelegramOffset() {
  if (!telegramApi || !telegramChatId) {
    return;
  }

  try {
    const result = await telegramRequest("getUpdates", {
      allowed_updates: ["message"],
      limit: 100,
      timeout: 0,
    });

    if (result.length) {
      telegramUpdateOffset = Number(result[result.length - 1].update_id) + 1;
    }
  } catch (error) {
    console.warn("Telegram startup check failed:", error.message);
  }
}

async function handlePostMessage(request, response) {
  try {
    const body = await readJsonBody(request);
    const sessionId = normalizeSessionId(body.sessionId);
    const text = String(body.message || body.text || "").trim();

    if (!text) {
      sendJson(response, 400, { ok: false, message: "Message is required." });
      return;
    }

    if (text.length > maxMessageLength) {
      sendJson(response, 400, { ok: false, message: `Please keep your message within ${maxMessageLength.toLocaleString()} characters.` });
      return;
    }

    const sentMessage = await forwardVisitorMessage(sessionId, text);

    sendJson(response, 200, {
      ok: true,
      delivered: true,
      sessionId,
      telegramMessageId: sentMessage?.message_id || null,
      visitorMessageId: `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    });
  } catch (error) {
    sendJson(response, 502, {
      ok: false,
      message: error.message || "Unable to deliver message to Telegram.",
    });
  }
}

function handleGetMessages(url, response) {
  const sessionId = normalizeSessionId(url.searchParams.get("sessionId"));
  const after = Number(url.searchParams.get("after") || 0);
  const session = getSession(sessionId);
  const messages = session.messages.filter((message) => message.cursor > after);
  const cursor = session.messages.at(-1)?.cursor || after || 0;

  sendJson(response, 200, {
    ok: true,
    cursor,
    messages,
    sessionId,
  });
}

function handleEvents(url, request, response) {
  const sessionId = normalizeSessionId(url.searchParams.get("sessionId"));

  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream; charset=utf-8",
    "X-Accel-Buffering": "no",
  });
  response.write(`event: ready\ndata: ${JSON.stringify({ ok: true, sessionId })}\n\n`);

  if (!clientsBySession.has(sessionId)) {
    clientsBySession.set(sessionId, new Set());
  }

  const clients = clientsBySession.get(sessionId);
  clients.add(response);

  const keepAlive = setInterval(() => {
    response.write(": keep-alive\n\n");
  }, 25_000);

  request.on("close", () => {
    clearInterval(keepAlive);
    clients.delete(response);

    if (!clients.size) {
      clientsBySession.delete(sessionId);
    }
  });
}

function handleApi(request, response, url) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Origin": "*",
    });
    response.end();
    return true;
  }

  response.setHeader("Access-Control-Allow-Origin", "*");

  if (url.pathname === "/api/telegram/messages" && request.method === "POST") {
    handlePostMessage(request, response);
    return true;
  }

  if (url.pathname === "/api/telegram/messages" && request.method === "GET") {
    handleGetMessages(url, response);
    return true;
  }

  if (url.pathname === "/api/telegram/events" && request.method === "GET") {
    handleEvents(url, request, response);
    return true;
  }

  if (url.pathname === "/api/telegram/health" && request.method === "GET") {
    sendJson(response, 200, {
      ok: true,
      telegramConfigured: Boolean(telegramApi && telegramChatId),
    });
    return true;
  }

  return false;
}

function isBlockedStaticPath(filePath) {
  const relativePath = path.relative(rootDir, filePath);

  return (
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath) ||
    relativePath.startsWith(".git") ||
    relativePath.startsWith("node_modules") ||
    relativePath.startsWith("telegram-chat-widget") ||
    relativePath === ".env" ||
    relativePath === ".env.local" ||
    relativePath === "server.js" ||
    relativePath === "package.json" ||
    relativePath.endsWith(".log") ||
    relativePath.endsWith(".pid")
  );
}

function serveStatic(request, response, url) {
  const requestPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(rootDir, requestPath));

  if (isBlockedStaticPath(filePath)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const contentType = mimeTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream";

    response.writeHead(200, {
      "Cache-Control": contentType.startsWith("text/html") ? "no-store" : "public, max-age=3600",
      "Content-Type": contentType,
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (url.pathname.startsWith("/api/") && handleApi(request, response, url)) {
    return;
  }

  serveStatic(request, response, url);
});

server.listen(port, async () => {
  console.log(`Game Engine website running on http://localhost:${port}`);

  if (!telegramApi || !telegramChatId) {
    console.warn("Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to enable Telegram delivery.");
    return;
  }

  await primeTelegramOffset();
  setInterval(() => {
    pollTelegramOnce().catch((error) => {
      console.warn("Telegram polling loop error:", error.message);
    });
  }, 1000);
});
