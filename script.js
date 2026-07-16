function ensureGlobalChatWidget() {
  if (document.querySelector("[data-chat-widget]")) {
    return;
  }

  let floatingActions = document.querySelector(".floating-actions");

  if (!floatingActions) {
    floatingActions = document.createElement("div");
    floatingActions.className = "floating-actions";
    document.body.appendChild(floatingActions);
  }

  floatingActions.insertAdjacentHTML("afterbegin", `
    <div class="chat-widget" data-chat-widget data-telegram-api-base="" data-telegram-endpoint="/api/telegram/messages" data-telegram-events-endpoint="/api/telegram/events">
      <div class="chat-window" data-chat-window hidden>
        <div class="chat-header">
          <div>
            <p class="eyebrow">Chat Inquiry</p>
            <strong>Partnership Support</strong>
          </div>
          <button class="chat-icon-button" type="button" data-chat-minimize aria-label="Minimize chat">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14"></path>
            </svg>
          </button>
        </div>
        <div class="chat-messages" data-chat-messages></div>
        <form class="chat-form" data-chat-form>
          <textarea name="message" data-chat-input rows="2" placeholder="Type your message" required></textarea>
          <button type="submit" data-chat-submit aria-label="Send message">
            <span class="chat-submit-icon" aria-hidden="true"></span>
            <span class="chat-submit-spinner" aria-hidden="true"></span>
          </button>
        </form>
        <p class="chat-status" data-chat-status aria-live="polite"></p>
      </div>
      <button class="floating-action chat-toggle" type="button" data-chat-toggle aria-label="Open chat inquiry" aria-expanded="false">
        <span class="chat-toggle-icon" aria-hidden="true"></span>
      </button>
    </div>
  `);
}

ensureGlobalChatWidget();

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector("[data-nav-panel]");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const carousel = document.querySelector("[data-carousel]");
const slides = Array.from(document.querySelectorAll("[data-slide]"));
const dots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const featuredShowcase = document.querySelector("[data-featured-showcase]");
const featuredCover = document.querySelector("[data-featured-cover]");
const featuredCoverArt = document.querySelector("[data-featured-cover-art]");
const featuredCoverLink = document.querySelector("[data-featured-cover-link]");
const featuredTitle = document.querySelector("[data-featured-title]");
const featuredDescription = document.querySelector("[data-featured-description]");
const featuredBadges = document.querySelector("[data-featured-badges]");
const featuredLaunch = document.querySelector("[data-featured-launch]");
const featuredGameButtons = Array.from(document.querySelectorAll("[data-featured-game]"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const logoCarousels = Array.from(document.querySelectorAll("[data-logo-carousel]"));
const expertiseCards = Array.from(document.querySelectorAll(".expertise-card"));
const newsTabs = Array.from(document.querySelectorAll("[data-news-filter]"));
const newsCards = Array.from(document.querySelectorAll("[data-news-category]"));
const newsEmpty = document.querySelector("[data-news-empty]");
const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const contactSection = document.getElementById("contact");
const authActions = document.querySelector("[data-auth-actions]");
const authOpenButtons = Array.from(document.querySelectorAll("[data-auth-open]"));
const accountNav = document.querySelector("[data-account-nav]");
const accountTrigger = document.querySelector("[data-account-trigger]");
const accountDropdown = document.querySelector("[data-account-dropdown]");
const accountUsername = document.querySelector("[data-account-username]");
const headerBalance = document.querySelector("[data-header-balance]");
const menuBalance = document.querySelector("[data-menu-balance]");
const authModal = document.querySelector("[data-auth-modal]");
const authFormView = document.querySelector("[data-auth-form-view]");
const authAccountView = document.querySelector("[data-auth-account-view]");
const authForm = document.querySelector("[data-auth-form]");
const authUsernameInput = document.querySelector("[data-auth-username-input]");
const authStatus = document.querySelector("[data-auth-status]");
const authToast = document.querySelector("[data-auth-toast]");
const authSummaryUsername = document.querySelector("[data-auth-summary-username]");
const authSummaryBalance = document.querySelector("[data-auth-summary-balance]");
const authCloseButtons = Array.from(document.querySelectorAll("[data-auth-close]"));
const authSignOutButton = document.querySelector("[data-auth-sign-out]");
const accountActionButtons = Array.from(document.querySelectorAll("[data-account-action]"));
const gameCards = Array.from(document.querySelectorAll(".game-card"));
const gameOverlay = document.querySelector("[data-game-overlay]");
const gameFrame = document.querySelector("[data-game-frame]");
const gameCloseButton = document.querySelector("[data-game-close]");
const gameOverlayTitle = document.querySelector("[data-game-overlay-title]");
const gameOverlayBalance = document.querySelector("[data-game-overlay-balance]");
const gamesLibrary = document.querySelector("[data-games-library]");
const gamesSearch = document.querySelector("[data-games-search]");
const gamesFilterButtons = Array.from(document.querySelectorAll("[data-games-filter]"));
const libraryGameCards = Array.from(document.querySelectorAll("[data-library-game-card]"));
const gamesGrid = document.querySelector("[data-games-grid]");
const gamesEmpty = document.querySelector("[data-games-empty]");
const gamesFeaturedImage = document.querySelector("[data-games-featured-image]");
const gamesFeaturedCategory = document.querySelector("[data-games-featured-category]");
const gamesFeaturedTitle = document.querySelector("[data-games-featured-title]");
const gamesFeaturedDescription = document.querySelector("[data-games-featured-description]");
const gamesFeaturedFeatures = document.querySelector("[data-games-featured-features]");
const gamesFeaturedDemo = document.querySelector("[data-games-featured-demo]");
const backToTopButton = document.querySelector("[data-back-to-top]");
const chatWidget = document.querySelector("[data-chat-widget]");
const chatToggle = document.querySelector("[data-chat-toggle]");
const chatToggleIcon = chatToggle?.querySelector(".chat-toggle-icon");
const chatWindow = document.querySelector("[data-chat-window]");
const chatMinimize = document.querySelector("[data-chat-minimize]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
const chatMessages = document.querySelector("[data-chat-messages]");
const chatStatus = document.querySelector("[data-chat-status]");
const chatCounter = document.querySelector("[data-chat-counter]");
const chatSubmitButton = document.querySelector("[data-chat-submit]");
const telegramApiBase = String(
  window.GAME_ENGINE_TELEGRAM_API_BASE_URL ||
  chatWidget?.dataset.telegramApiBase ||
  "",
).replace(/\/+$/, "");
const telegramChatEndpoint = resolveTelegramEndpoint(chatWidget?.dataset.telegramEndpoint?.trim() || "/api/telegram/messages");
const telegramEventsEndpoint = resolveTelegramEndpoint(chatWidget?.dataset.telegramEventsEndpoint?.trim() || "/api/telegram/events");
const scrollSectionIds = ["home", "games", "company", "news", "contact"];
const sections = scrollSectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

let activeSlide = 0;
let autoplayTimer;
let activeHeroDrag;
let logoCarouselFrame;
let logoMarquees = [];
let logoCarouselViewportWidth = window.innerWidth;
let activeLogoDrag;
let revealObserver;
let revealFrame;
const newsFilterTimers = new WeakMap();
let chatHistory = [];
let chatPollTimer;
let chatSessionId;
let chatEvents;
let chatStatusTimer;
let chatLastReplyCursor = 0;
let isChatSubmitting = false;
let chatDragState;
let chatDragSuppressClick = false;
let chatScrollResetFrame;
let chatWidgetVideo;
let chatWidgetVideoFrame;
let chatWidgetVideoMode = "idle";
let chatWidgetPointerActive = false;
let chatWidgetFocusActive = false;
let chatWidgetClickBoostTimer;
let demoAccounts = {};
let demoSessionKey = "";
let pendingGameCard;
let authToastTimer;
let selectedLibraryGameCard;
const autoplayDelay = 5000;
const demoAccountsStorageKey = "game-engine-demo-accounts-v1";
const demoSessionStorageKey = "game-engine-demo-session-v1";
const newReleaseGameTitles = ["Lucky Color Combo", "Banana Craze", "Deep Sea Mystery"];
const newReleaseGameTitleSet = new Set(newReleaseGameTitles.map((title) => title.toLowerCase()));
const allGamesCategoryOrder = ["innovation", "classic", "live"];
const initialDemoBalance = 1000000;
const chatHistoryStorageKey = "game-engine-chat-history";
const chatSessionStorageKey = "game-engine-chat-session";
const chatPositionStorageKey = "game-engine-chat-position";
const chatMaxMessageLength = 3000;
const chatSendTimeoutMs = 1700;
const chatSendSuccessMessage = "Message sent successfully. Our team will reply here soon.";
const chatSendTimeoutMessage = "Sending is taking longer than expected. Please try again.";
const chatWidgetVideoSrc = "assets/icons/chat-inquiry-character.webm";
const chatWidgetVideoSegments = {
  idle: { start: 1, end: 2 },
  hover: { start: 3, end: 5 },
};
const contactRequiredFields = {
  name: "Name is required.",
  email: "Email is required.",
  phone: "Phone Number is required.",
  company: "Company is required.",
  message: "Your Message is required.",
};
const chatWelcomeMessage = "Hi, welcome to Game Engine. Send us a message and our partnership team will reply here once live chat is connected.";

const featuredGames = {
  "lucky-color-combo": {
    title: "Lucky Color Combo",
    image: "assets/game-logos/innovation/lucky-color-combo.png",
    background: "assets/game-backgrounds/innovation/lucky-color-combo-bg.png",
    description: "Step into a vibrant carnival of colors, match winning combinations, collect Rainbow Dice, and spin the Multiplier Wheel for instant rewards.",
    badges: ["Rainbow Dice", "Multiplier Wheel", "Instant Play"],
    detailUrl: "game-detail.html?game=lucky-color-combo",
  },
  "banana-craze": {
    title: "Banana Craze",
    image: "assets/game-logos/innovation/banana-craze.png",
    background: "assets/game-backgrounds/innovation/banana-craze-bg.png",
    description: "Enter a mysterious Mayan jungle, reveal hidden values, trigger free spins, and chase massive rewards through energetic instant-win play.",
    badges: ["Bonus Round", "Free Spins", "10000X Max"],
    detailUrl: "game-detail.html?game=banana-craze",
  },
  "fortune-ocean": {
    title: "Deep Sea Mystery",
    image: "assets/game-logos/innovation/deep-sea-mystery.png",
    background: "assets/game-backgrounds/innovation/fortune-ocean-bg.png",
    description: "Dive into an underwater treasure hunt with number matching, pearl collection, super bonus moments, and progressive jackpot opportunities.",
    badges: ["Pearl Bonus", "Jackpot Hunt", "Ocean Rewards"],
    detailUrl: "game-detail.html?game=fortune-ocean",
  },
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function resolveTelegramEndpoint(endpoint) {
  const value = String(endpoint || "").trim();

  if (!telegramApiBase || /^https?:\/\//i.test(value)) {
    return value;
  }

  return `${telegramApiBase}${value.startsWith("/") ? value : `/${value}`}`;
}

function setHeaderState() {
  if (!header) {
    return;
  }

  const isScrolled = window.scrollY > 18;
  header.classList.toggle("is-scrolled", isScrolled);
}

function closeMobileNav() {
  if (!navToggle || !navPanel || !header) {
    return;
  }

  navToggle.setAttribute("aria-expanded", "false");
  navPanel.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}

function toggleMobileNav() {
  if (!navToggle || !navPanel || !header) {
    return;
  }

  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navPanel.classList.toggle("is-open", !isOpen);
  header.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
}

function scrollToSection(section) {
  const headerOffset = header?.offsetHeight ?? 0;
  const targetTop = section.getBoundingClientRect().top + window.scrollY - headerOffset - 16;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

function handleNavLinkClick(event) {
  closeMobileNav();

  const href = event.currentTarget.getAttribute("href");

  if (!href?.startsWith("#") || href === "#") {
    return;
  }

  const section = document.querySelector(href);

  if (!section) {
    return;
  }

  event.preventDefault();
  history.pushState(null, "", href);
  scrollToSection(section);
  setActiveNav();
  scheduleRevealCheck();
  window.setTimeout(scheduleRevealCheck, 260);
}

function setActiveSlide(index) {
  if (!slides.length) {
    return;
  }

  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", String(isActive));
  });
}

function nextSlide() {
  setActiveSlide(activeSlide + 1);
}

function prevSlide() {
  setActiveSlide(activeSlide - 1);
}

function startAutoplay() {
  if (prefersReducedMotion || slides.length < 2) {
    return;
  }

  window.clearInterval(autoplayTimer);
  autoplayTimer = window.setInterval(nextSlide, autoplayDelay);
}

function restartAutoplay() {
  window.clearInterval(autoplayTimer);
  startAutoplay();
}

function setFeaturedGame(slug) {
  const game = featuredGames[slug] || featuredGames["lucky-color-combo"];

  if (!featuredShowcase || !game) {
    return;
  }

  featuredShowcase.classList.add("is-changing");
  featuredShowcase.style.setProperty("--featured-cover-bg", `url("${game.background}")`);

  if (featuredCover) {
    featuredCover.src = game.image;
    featuredCover.alt = game.title;
  }

  if (featuredCoverArt) {
    featuredCoverArt.src = game.background;
    featuredCoverArt.alt = "";
  }

  if (featuredCoverLink) {
    featuredCoverLink.href = game.detailUrl;
    featuredCoverLink.setAttribute("aria-label", `View ${game.title} details`);
  }

  if (featuredTitle) {
    featuredTitle.textContent = game.title;
  }

  if (featuredDescription) {
    featuredDescription.textContent = game.description;
  }

  if (featuredBadges) {
    const badgeItems = game.badges.map((badge) => {
      const item = document.createElement("span");
      item.textContent = badge;
      return item;
    });

    featuredBadges.replaceChildren(...badgeItems);
  }

  if (featuredLaunch) {
    featuredLaunch.href = game.detailUrl;
    featuredLaunch.setAttribute("aria-label", `Open ${game.title} game details`);
  }

  featuredGameButtons.forEach((button) => {
    const isActive = button.dataset.featuredGame === slug;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  window.setTimeout(() => {
    featuredShowcase.classList.remove("is-changing");
  }, prefersReducedMotion ? 0 : 180);
}

function setupFeaturedShowcase() {
  if (!featuredShowcase || !featuredGameButtons.length) {
    return;
  }

  featuredGameButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setFeaturedGame(button.dataset.featuredGame);
    });
  });

  setFeaturedGame("lucky-color-combo");
}

function updateGameCardHoverBounds(imageFrame) {
  const image = imageFrame.querySelector("img");

  if (!image || !image.naturalWidth || !image.naturalHeight) {
    return;
  }

  const frameWidth = imageFrame.clientWidth;
  const frameHeight = imageFrame.clientHeight;

  if (!frameWidth || !frameHeight) {
    return;
  }

  const frameRatio = frameWidth / frameHeight;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  let insetX = 0;
  let insetY = 0;

  if (imageRatio > frameRatio) {
    const renderedHeight = frameWidth / imageRatio;
    insetY = Math.max(0, (frameHeight - renderedHeight) / 2);
  } else if (imageRatio < frameRatio) {
    const renderedWidth = frameHeight * imageRatio;
    insetX = Math.max(0, (frameWidth - renderedWidth) / 2);
  }

  imageFrame.style.setProperty("--game-hover-inset-x", `${Math.round(insetX)}px`);
  imageFrame.style.setProperty("--game-hover-inset-y", `${Math.round(insetY)}px`);
}

function setupGameCardHoverBounds(imageFrame) {
  const image = imageFrame.querySelector("img");

  if (!image) {
    return;
  }

  const syncBounds = () => {
    window.requestAnimationFrame(() => updateGameCardHoverBounds(imageFrame));
  };

  if (image.complete) {
    syncBounds();
  } else {
    image.addEventListener("load", syncBounds, { once: true });
  }

  window.addEventListener("resize", syncBounds, { passive: true });
}

function setupGameCardHoverCtas() {
  gameCards.forEach((card) => {
    let imageFrame = card.querySelector(".game-card-image-frame");

    if (!imageFrame) {
      const image = card.querySelector("img");

      if (!image) {
        return;
      }

      imageFrame = document.createElement("span");
      imageFrame.className = "game-card-image-frame";
      image.parentNode.insertBefore(imageFrame, image);
      imageFrame.appendChild(image);
    }

    setupGameCardHoverBounds(imageFrame);

    if (imageFrame.querySelector(".game-card-hover-cta")) {
      return;
    }

    const cta = document.createElement("span");
    const inner = document.createElement("span");
    const copy = document.createElement("span");
    const firstLine = document.createElement("span");
    const secondLine = document.createElement("strong");
    const arrow = document.createElement("span");

    cta.className = "game-card-hover-cta";
    inner.className = "game-card-hover-inner";
    copy.className = "game-card-hover-copy";
    arrow.className = "game-card-hover-arrow";
    cta.setAttribute("aria-hidden", "true");
    firstLine.textContent = "CLICK TO SEE";
    secondLine.textContent = "more game details";
    copy.append(firstLine, secondLine);
    inner.append(copy, arrow);
    cta.appendChild(inner);
    imageFrame.appendChild(cta);
  });
}

function isOutsideInnovationThumbnail(card, event) {
  if (!card.closest(".game-logo-carousel-innovation")) {
    return false;
  }

  const imageFrame = card.querySelector(".game-card-image-frame");

  return Boolean(imageFrame && !imageFrame.contains(event.target));
}

function setActiveNav() {
  if (!header || !sections.length) {
    return;
  }

  const currentScroll = window.scrollY + header.offsetHeight + 90;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= currentScroll) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
}

function setParallax() {
  if (prefersReducedMotion || !carousel) {
    return;
  }

  const offset = Math.min(window.scrollY * 0.08, 44);
  carousel.style.setProperty("--parallax-y", `${offset}px`);
}

function handleCarouselPointerDown(event) {
  if ((event.pointerType === "mouse" && event.button !== 0) || event.target.closest("a, button")) {
    return;
  }

  activeHeroDrag = {
    pointerId: event.pointerId,
    startX: event.clientX,
  };

  carousel.setPointerCapture(event.pointerId);
}

function handleCarouselPointerMove(event) {
  if (!activeHeroDrag || activeHeroDrag.pointerId !== event.pointerId) {
    return;
  }

  const delta = event.clientX - activeHeroDrag.startX;

  if (activeHeroDrag.hasSwiped || Math.abs(delta) < 48) {
    return;
  }

  activeHeroDrag.hasSwiped = true;

  if (delta > 0) {
    prevSlide();
  } else {
    nextSlide();
  }

  restartAutoplay();
}

function endCarouselDrag(event) {
  if (!activeHeroDrag || activeHeroDrag.pointerId !== event.pointerId) {
    return;
  }

  if (carousel.hasPointerCapture(event.pointerId)) {
    carousel.releasePointerCapture(event.pointerId);
  }

  activeHeroDrag = undefined;
}

function getLogoArchAmplitude() {
  if (window.innerWidth <= 720) {
    return 42;
  }

  if (window.innerWidth <= 1100) {
    return 58;
  }

  return 78;
}

function wrapLogoOffset(offset, width) {
  if (!width) {
    return 0;
  }

  return ((offset % width) + width) % width;
}

function getLogoMarquee(carousel) {
  return logoMarquees.find((marquee) => marquee.carousel === carousel);
}

function layoutLogoCarousel(carousel) {
  const carouselRect = carousel.getBoundingClientRect();
  const carouselCenter = carouselRect.left + carouselRect.width / 2;
  const items = Array.from(carousel.querySelectorAll(".game-logo-item"));
  const amplitude = getLogoArchAmplitude();

  items.forEach((item) => {
    const itemRect = item.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2;
    const distance = (itemCenter - carouselCenter) / (carouselRect.width * 0.48);
    const normalizedDistance = Math.max(-1, Math.min(1, distance));
    const focus = 1 - Math.min(Math.abs(normalizedDistance), 1);
    const archY = normalizedDistance ** 2 * amplitude;

    item.style.setProperty("--arch-y", `${archY}px`);
    item.style.setProperty("--logo-scale", `${1 + focus * 0.1}`);
  });
}

function renderLogoMarquee(marquee) {
  marquee.carousel.style.setProperty("--carousel-x", marquee.offset.toFixed(3));
  layoutLogoCarousel(marquee.carousel);
}

function renderLogoMarquees() {
  logoMarquees.forEach(renderLogoMarquee);
}

function handleLogoPointerDown(event) {
  if (
    (event.pointerType === "mouse" && event.button !== 0) ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const carousel = event.currentTarget;
  const marquee = getLogoMarquee(carousel);

  if (!marquee) {
    return;
  }

  event.preventDefault();

  activeLogoDrag = {
    carousel,
    didMove: false,
    link: event.target.closest(".game-logo-item"),
    marquee,
    pointerId: event.pointerId,
    startOffset: marquee.offset,
    startX: event.clientX,
    startY: event.clientY,
  };

  marquee.isDragging = true;
  marquee.isPaused = true;
  carousel.classList.add("is-dragging");
  carousel.setPointerCapture(event.pointerId);
}

function handleLogoPointerMove(event) {
  if (!activeLogoDrag || activeLogoDrag.pointerId !== event.pointerId) {
    return;
  }

  const deltaX = event.clientX - activeLogoDrag.startX;
  const deltaY = event.clientY - activeLogoDrag.startY;
  const movement = Math.hypot(deltaX, deltaY);

  if (movement > 8) {
    activeLogoDrag.shouldSuppressClick = true;
  }

  if (!activeLogoDrag.didMove && Math.abs(deltaY) > Math.abs(deltaX)) {
    return;
  }

  if (Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
    activeLogoDrag.didMove = true;
    event.preventDefault();
  }

  if (!activeLogoDrag.didMove) {
    return;
  }

  activeLogoDrag.marquee.offset = wrapLogoOffset(
    activeLogoDrag.startOffset - deltaX,
    activeLogoDrag.marquee.setWidth,
  );
  renderLogoMarquee(activeLogoDrag.marquee);
}

function endLogoDrag(event) {
  if (!activeLogoDrag || activeLogoDrag.pointerId !== event.pointerId) {
    return;
  }

  const { carousel, didMove, link, marquee, shouldSuppressClick } = activeLogoDrag;

  if (carousel.hasPointerCapture?.(event.pointerId)) {
    carousel.releasePointerCapture(event.pointerId);
  }

  if (didMove || shouldSuppressClick) {
    const draggedCarousel = carousel;

    draggedCarousel.dataset.suppressClick = "true";
    window.setTimeout(() => {
      delete draggedCarousel.dataset.suppressClick;
    }, 160);
  }

  marquee.isDragging = false;
  marquee.isPaused = marquee.isHovering;
  carousel.classList.remove("is-dragging");
  activeLogoDrag = undefined;

  if (!didMove && !shouldSuppressClick && link?.href) {
    carousel.dataset.suppressClick = "true";
    window.setTimeout(() => {
      delete carousel.dataset.suppressClick;
    }, 160);
    activateGameCard(link);
  }
}

function handleLogoClick(event) {
  const carousel = event.currentTarget;
  const link = event.target.closest(".game-logo-item");

  if (!link || !carousel.contains(link)) {
    return;
  }

  if (carousel.dataset.suppressClick === "true") {
    event.preventDefault();
    delete carousel.dataset.suppressClick;
    return;
  }

  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  activateGameCard(link);
}

function handleLogoKeydown(event) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
    return;
  }

  const direction = event.key === "ArrowLeft" ? -1 : 1;
  const marquee = getLogoMarquee(event.currentTarget);

  if (!marquee) {
    return;
  }

  marquee.offset = wrapLogoOffset(
    marquee.offset + direction * event.currentTarget.clientWidth * 0.42,
    marquee.setWidth,
  );
  renderLogoMarquee(marquee);
}

function handleLogoMouseEnter(event) {
  const marquee = getLogoMarquee(event.currentTarget);

  if (!marquee) {
    return;
  }

  marquee.isHovering = true;
  marquee.isPaused = true;
}

function handleLogoMouseLeave(event) {
  const marquee = getLogoMarquee(event.currentTarget);

  if (!marquee) {
    return;
  }

  marquee.isHovering = false;
  marquee.isPaused = marquee.isDragging;
}

function buildLogoMarquees() {
  logoMarquees = logoCarousels.map((carousel) => {
    const existingMarquee = getLogoMarquee(carousel);
    const track = carousel.querySelector(".game-logo-track");

    if (!track) {
      return undefined;
    }

    track.querySelectorAll("[data-logo-clone='true']").forEach((clone) => clone.remove());

    const originals = Array.from(track.querySelectorAll(".game-logo-item"));

    if (!originals.length) {
      return undefined;
    }

    const previousRatio = existingMarquee?.setWidth
      ? existingMarquee.offset / existingMarquee.setWidth
      : 0;

    for (let cloneSet = 0; cloneSet < 2; cloneSet += 1) {
      originals.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.dataset.logoClone = "true";
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }

    let firstClone = track.querySelector("[data-logo-clone='true']");
    let setWidth = firstClone
      ? firstClone.offsetLeft - originals[0].offsetLeft
      : track.scrollWidth;

    while (track.scrollWidth < carousel.clientWidth + setWidth * 2) {
      originals.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.dataset.logoClone = "true";
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });

      firstClone = track.querySelector("[data-logo-clone='true']");
      setWidth = firstClone
        ? firstClone.offsetLeft - originals[0].offsetLeft
        : track.scrollWidth;
    }

    return {
      carousel,
      isDragging: false,
      isHovering: false,
      isPaused: false,
      offset: wrapLogoOffset(previousRatio * setWidth, setWidth),
      setWidth,
      track,
    };
  }).filter(Boolean);

  renderLogoMarquees();
}

function startLogoCarousels() {
  if (logoCarouselFrame) {
    window.cancelAnimationFrame(logoCarouselFrame);
    logoCarouselFrame = undefined;
  }

  renderLogoMarquees();
}

function setupLogoCarousels() {
  logoCarousels.forEach((carousel) => {
    carousel.addEventListener("pointerdown", handleLogoPointerDown);
    carousel.addEventListener("pointermove", handleLogoPointerMove);
    carousel.addEventListener("pointerup", endLogoDrag);
    carousel.addEventListener("pointercancel", endLogoDrag);
    carousel.addEventListener("mouseenter", handleLogoMouseEnter);
    carousel.addEventListener("mouseleave", handleLogoMouseLeave);
    carousel.addEventListener("keydown", handleLogoKeydown);
    carousel.addEventListener("click", handleLogoClick);
  });

  buildLogoMarquees();
  startLogoCarousels();
}

function handleResize() {
  setActiveNav();
  updateFloatingChatButton();
  reclampChatWidgetPosition();
  scheduleRevealCheck();

  if (logoCarousels.length) {
    const nextWidth = window.innerWidth;

    if (Math.abs(nextWidth - logoCarouselViewportWidth) > 16) {
      logoCarouselViewportWidth = nextWidth;
      buildLogoMarquees();
    } else {
      renderLogoMarquees();
    }
  }
}

function revealItem(item) {
  item.classList.add("is-visible");

  if (revealObserver) {
    revealObserver.unobserve(item);
  }
}

function isRevealItemInRange(item) {
  const rect = item.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const revealOffset = Math.min(96, viewportHeight * 0.14);

  return rect.top <= viewportHeight - revealOffset && rect.bottom >= revealOffset * -1;
}

function revealVisibleItems() {
  revealItems.forEach((item) => {
    if (!item.classList.contains("is-visible") && isRevealItemInRange(item)) {
      revealItem(item);
    }
  });
}

function scheduleRevealCheck() {
  if (revealFrame) {
    return;
  }

  revealFrame = window.requestAnimationFrame(() => {
    revealFrame = undefined;
    revealVisibleItems();
  });
}

function setNewsFilter(filter) {
  if (!newsCards.length) {
    return;
  }

  let visibleCount = 0;
  const transitionDelay = prefersReducedMotion ? 0 : 220;

  newsCards.forEach((card) => {
    const cardCategories = (card.dataset.newsCategory || "").split(/\s+/);
    const isVisible = filter === "all" || cardCategories.includes(filter);
    const existingTimer = newsFilterTimers.get(card);

    if (existingTimer) {
      window.clearTimeout(existingTimer);
      newsFilterTimers.delete(card);
    }

    if (isVisible) {
      const shouldAnimateIn = card.hidden || card.classList.contains("is-filtered-out");

      visibleCount += 1;
      card.hidden = false;

      if (shouldAnimateIn) {
        card.classList.add("is-filtered-out");
      }

      window.requestAnimationFrame(() => {
        card.classList.remove("is-filtered-out");
      });
      revealItem(card);
    } else {
      card.classList.add("is-filtered-out");

      const timer = window.setTimeout(() => {
        card.hidden = true;
        newsFilterTimers.delete(card);
      }, transitionDelay);

      newsFilterTimers.set(card, timer);
    }
  });

  if (newsEmpty) {
    newsEmpty.hidden = visibleCount > 0;

    if (visibleCount === 0) {
      revealItem(newsEmpty);
    }
  }

  scheduleRevealCheck();
}

function setupNewsFilters() {
  if (!newsTabs.length) {
    return;
  }

  newsTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.newsFilter || "all";

      newsTabs.forEach((item) => {
        const isActive = item === tab;

        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      setNewsFilter(filter);
    });
  });
}

function setContactStatus(type, message) {
  if (!contactStatus) {
    return;
  }

  contactStatus.textContent = message;
  contactStatus.classList.toggle("is-success", type === "success");
  contactStatus.classList.toggle("is-error", type === "error");
}

function getContactSubmitButton() {
  return contactForm?.querySelector('button[type="submit"]');
}

function getContactControl(fieldName) {
  const namedControl = contactForm?.elements?.namedItem(fieldName);

  if (namedControl && typeof namedControl.setCustomValidity === "function") {
    return namedControl;
  }

  return contactForm?.querySelector(`[name="${fieldName}"]`) || null;
}

function getContactRequiredControls() {
  if (!contactForm) {
    return [];
  }

  return Object.keys(contactRequiredFields)
    .map((fieldName) => getContactControl(fieldName))
    .filter(Boolean);
}

function isContactEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isContactPhoneValid(value) {
  return String(value || "").replace(/\D/g, "").length >= 7;
}

function getContactFieldError(control) {
  const value = String(control.value || "").trim();

  if (!value) {
    return contactRequiredFields[control.name] || "";
  }

  if (control.name === "email" && !isContactEmailValid(value)) {
    return "Please enter a valid email address.";
  }

  if (control.name === "phone" && !isContactPhoneValid(value)) {
    return "Please enter a valid phone number.";
  }

  return "";
}

function ensureContactErrorElement(control) {
  const field = control.closest("label");

  if (!field) {
    return undefined;
  }

  const errorId = `contact-${control.name}-error`;
  let errorElement = field.querySelector(`[data-contact-error="${control.name}"]`);

  if (!errorElement) {
    errorElement = document.createElement("p");
    errorElement.className = "contact-validation-error";
    errorElement.dataset.contactError = control.name;
    errorElement.id = errorId;
    errorElement.setAttribute("aria-live", "polite");
    errorElement.hidden = true;
    control.insertAdjacentElement("afterend", errorElement);
  }

  const describedBy = control.getAttribute("aria-describedby") || "";
  const describedByItems = describedBy.split(/\s+/).filter(Boolean);

  if (!describedByItems.includes(errorId)) {
    describedByItems.push(errorId);
    control.setAttribute("aria-describedby", describedByItems.join(" "));
  }

  return errorElement;
}

function validateContactField(control, options = {}) {
  const { showError = false } = options;
  const errorElement = ensureContactErrorElement(control);
  const errorMessage = getContactFieldError(control);
  const shouldShowError =
    Boolean(errorMessage) &&
    (showError || control.dataset.contactTouched === "true" || contactForm?.classList.contains("was-validated"));

  control.setCustomValidity(errorMessage);
  control.setAttribute("aria-invalid", shouldShowError ? "true" : "false");

  if (errorElement) {
    errorElement.textContent = shouldShowError ? errorMessage : "";
    errorElement.hidden = !shouldShowError;
  }

  return !errorMessage;
}

function validateContactForm(options = {}) {
  return getContactRequiredControls()
    .map((control) => validateContactField(control, options))
    .every(Boolean);
}

function updateContactSubmitState(options = {}) {
  const submitButton = getContactSubmitButton();
  const isValid = validateContactForm(options);

  if (submitButton) {
    submitButton.disabled = !isValid;
    submitButton.setAttribute("aria-disabled", String(!isValid));
  }

  return isValid;
}

function resetContactValidation() {
  if (!contactForm) {
    return;
  }

  contactForm.classList.remove("was-validated");

  getContactRequiredControls().forEach((control) => {
    delete control.dataset.contactTouched;
    control.setCustomValidity("");
    control.setAttribute("aria-invalid", "false");

    const errorElement = ensureContactErrorElement(control);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.hidden = true;
    }
  });

  updateContactSubmitState();
}

function handleContactSubmit(event) {
  event.preventDefault();

  if (!contactForm) {
    return;
  }

  contactForm.classList.add("was-validated");

  if (!updateContactSubmitState({ showError: true })) {
    setContactStatus("error", "Please complete all required fields before submitting.");
    const firstInvalidField = getContactRequiredControls().find((control) => getContactFieldError(control));

    firstInvalidField?.focus();
    return;
  }

  const formData = new FormData(contactForm);
  const fields = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    company: String(formData.get("company") || "").trim(),
    website: String(formData.get("website") || "").trim(),
    message: String(formData.get("message") || "").trim(),
  };
  const subject = `Game Engine Partnership Inquiry${fields.company ? ` - ${fields.company}` : ""}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Company: ${fields.company}`,
    `Company Website: ${fields.website || "Not provided"}`,
    "",
    "Message:",
    fields.message,
  ].join("\n");

  window.location.href = `mailto:brand@lottoplay.ph?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setContactStatus("success", "Your inquiry is ready to send to brand@lottoplay.ph in your email app.");
  contactForm.reset();
  resetContactValidation();
}

function updateBackToTopButton() {
  if (!backToTopButton) {
    return;
  }

  backToTopButton.hidden = window.scrollY <= 32;
}

function updateFloatingChatButton() {
  if (!chatWidget) {
    return;
  }

  chatWidget.classList.add("is-contact-visible");
}

function createChatId() {
  return `ge-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    // Storage can be unavailable in strict privacy modes; chat still works in memory.
  }
}

function safeStorageRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    // Demo auth falls back to the current in-memory state if storage is unavailable.
  }
}

function safeSessionStorageGet(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeSessionStorageSet(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch (error) {
    // Dragged chat position resets gracefully if session storage is unavailable.
  }
}

function safeSessionStorageRemove(key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    // Dragged chat position resets gracefully if session storage is unavailable.
  }
}

function normalizeUsername(username) {
  return String(username || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 24);
}

function getAccountKey(username) {
  return normalizeUsername(username).toLowerCase();
}

function loadDemoAccounts() {
  const storedAccounts = safeStorageGet(demoAccountsStorageKey);

  if (!storedAccounts) {
    return {};
  }

  try {
    const parsedAccounts = JSON.parse(storedAccounts);

    return parsedAccounts && typeof parsedAccounts === "object" ? parsedAccounts : {};
  } catch (error) {
    return {};
  }
}

function saveDemoAccounts() {
  safeStorageSet(demoAccountsStorageKey, JSON.stringify(demoAccounts));
}

function formatDemoBalance(balance) {
  return new Intl.NumberFormat("en-PH", {
    currency: "PHP",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(Number(balance) || 0);
}

function getCurrentAccount() {
  if (!demoSessionKey || !demoAccounts[demoSessionKey]) {
    return undefined;
  }

  return demoAccounts[demoSessionKey];
}

function persistDemoSession(accountKey) {
  demoSessionKey = accountKey;
  safeStorageSet(demoSessionStorageKey, accountKey);
}

function clearDemoSession() {
  demoSessionKey = "";
  safeStorageRemove(demoSessionStorageKey);
}

function updateAccountSummaries(account) {
  const formattedBalance = formatDemoBalance(account?.balance ?? 0);

  if (accountUsername) {
    accountUsername.textContent = account?.username || "Player";
  }

  if (headerBalance) {
    headerBalance.textContent = formattedBalance;
  }

  if (menuBalance) {
    menuBalance.textContent = formattedBalance;
  }

  if (authSummaryUsername) {
    authSummaryUsername.textContent = account?.username || "Player";
  }

  if (authSummaryBalance) {
    authSummaryBalance.textContent = formattedBalance;
  }

  if (gameOverlayBalance) {
    gameOverlayBalance.textContent = `Demo Balance: ${formattedBalance}`;
  }
}

function renderAuthState() {
  const account = getCurrentAccount();

  if (authActions) {
    authActions.hidden = Boolean(account);
  }

  if (accountNav) {
    accountNav.hidden = !account;
  }

  updateAccountSummaries(account);
}

function closeAccountDropdown() {
  if (!accountDropdown || !accountTrigger) {
    return;
  }

  accountDropdown.hidden = true;
  accountTrigger.setAttribute("aria-expanded", "false");
}

function toggleAccountDropdown() {
  if (!accountDropdown || !accountTrigger) {
    return;
  }

  const isOpen = accountDropdown.hidden;

  accountDropdown.hidden = !isOpen;
  accountTrigger.setAttribute("aria-expanded", String(isOpen));
}

function showAuthToast(message) {
  if (!authToast) {
    return;
  }

  window.clearTimeout(authToastTimer);
  authToast.textContent = message;
  authToast.hidden = false;
  authToastTimer = window.setTimeout(() => {
    authToast.hidden = true;
  }, 3600);
}

function openAuthModal({ mode = "sign-in", message = "" } = {}) {
  if (!authModal) {
    return;
  }

  const isAccountMode = mode === "account";

  authModal.hidden = false;
  document.body.classList.add("auth-modal-open");

  if (authFormView) {
    authFormView.hidden = isAccountMode;
  }

  if (authAccountView) {
    authAccountView.hidden = !isAccountMode;
  }

  if (authStatus) {
    authStatus.textContent = message;
  }

  updateAccountSummaries(getCurrentAccount());

  if (!isAccountMode) {
    window.setTimeout(() => authUsernameInput?.focus(), 80);
  }
}

function closeAuthModal() {
  if (!authModal) {
    return;
  }

  authModal.hidden = true;
  document.body.classList.remove("auth-modal-open");

  if (authStatus) {
    authStatus.textContent = "";
  }
}

function signInDemoAccount(username) {
  const displayUsername = normalizeUsername(username);
  const accountKey = getAccountKey(displayUsername);

  if (!displayUsername || !accountKey) {
    return undefined;
  }

  if (!demoAccounts[accountKey]) {
    demoAccounts[accountKey] = {
      balance: initialDemoBalance,
      createdAt: new Date().toISOString(),
      username: displayUsername,
    };
  } else {
    demoAccounts[accountKey].username = demoAccounts[accountKey].username || displayUsername;
    demoAccounts[accountKey].balance = Number(demoAccounts[accountKey].balance ?? initialDemoBalance);
  }

  demoAccounts[accountKey].updatedAt = new Date().toISOString();
  saveDemoAccounts();
  persistDemoSession(accountKey);
  renderAuthState();

  return demoAccounts[accountKey];
}

function applyDemoBalanceDelta(delta) {
  const account = getCurrentAccount();
  const amount = Number(delta);

  if (!account || !Number.isFinite(amount)) {
    return undefined;
  }

  account.balance = Math.max(0, Number(account.balance || 0) + amount);
  account.updatedAt = new Date().toISOString();
  saveDemoAccounts();
  updateAccountSummaries(account);

  return account.balance;
}

function setDemoBalance(balance) {
  const account = getCurrentAccount();
  const amount = Number(balance);

  if (!account || !Number.isFinite(amount)) {
    return undefined;
  }

  account.balance = Math.max(0, amount);
  account.updatedAt = new Date().toISOString();
  saveDemoAccounts();
  updateAccountSummaries(account);

  return account.balance;
}

function getLobbyReturnUrl() {
  const returnUrl = new URL(window.location.href);
  returnUrl.hash = "games";
  return returnUrl.toString();
}

function buildGameLaunchUrl(rawUrl) {
  const launchUrl = new URL(rawUrl, window.location.href);
  const returnUrl = getLobbyReturnUrl();

  ["returnUrl", "exitUrl", "lobbyUrl"].forEach((param) => {
    if (!launchUrl.searchParams.has(param)) {
      launchUrl.searchParams.set(param, returnUrl);
    }
  });

  return launchUrl.toString();
}

function getGameTitle(card) {
  return card?.dataset.gameTitle || card?.querySelector("h3")?.textContent?.trim() || card?.textContent?.trim() || "Game Engine Demo";
}

function openGameOverlay(card) {
  const account = getCurrentAccount();

  if (!account) {
    pendingGameCard = card;
    openAuthModal({ message: "Create or continue with a demo username before launching a game." });
    return;
  }

  const rawUrl = card?.dataset.gameDemoUrl || card?.dataset.gameUrl;

  if (!rawUrl || !gameOverlay || !gameFrame) {
    return;
  }

  if (gameOverlayTitle) {
    gameOverlayTitle.textContent = getGameTitle(card);
  }

  updateAccountSummaries(account);
  gameFrame.src = buildGameLaunchUrl(rawUrl);
  gameOverlay.hidden = false;
  document.body.classList.add("game-overlay-open");
  gameCloseButton?.focus();
}

function closeGameOverlay() {
  if (!gameOverlay || !gameFrame) {
    return;
  }

  gameFrame.src = "about:blank";
  gameOverlay.hidden = true;
  document.body.classList.remove("game-overlay-open");
}

function activateGameCard(card) {
  if (card?.href) {
    window.location.href = card.href;
  }
}

function handleGameMessage(event) {
  if (!gameOverlay || gameOverlay.hidden) {
    return;
  }

  let payload = event.data;

  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch (error) {
      payload = { type: payload };
    }
  }

  if (!payload || typeof payload !== "object") {
    return;
  }

  const eventName = String(payload.type || payload.event || payload.action || payload.name || "").toLowerCase();

  if (
    payload.exit === true ||
    payload.close === true ||
    eventName === "exit" ||
    eventName === "close" ||
    eventName === "game_exit" ||
    eventName === "game:exit" ||
    eventName.includes("lobby")
  ) {
    closeGameOverlay();
    return;
  }

  const delta = payload.balanceDelta ?? payload.demoBalanceDelta ?? payload.result?.balanceDelta;
  const nextBalance = payload.balance ?? payload.demoBalance ?? payload.result?.balance;

  if (delta !== undefined) {
    applyDemoBalanceDelta(delta);
  } else if (nextBalance !== undefined) {
    setDemoBalance(nextBalance);
  }
}

function getChatSessionId() {
  const existingSessionId = safeStorageGet(chatSessionStorageKey);

  if (existingSessionId) {
    return existingSessionId;
  }

  const nextSessionId = createChatId();
  safeStorageSet(chatSessionStorageKey, nextSessionId);
  return nextSessionId;
}

function loadChatHistory() {
  const storedHistory = safeStorageGet(chatHistoryStorageKey);

  if (!storedHistory) {
    return [];
  }

  try {
    const parsedHistory = JSON.parse(storedHistory);

    return Array.isArray(parsedHistory) ? parsedHistory : [];
  } catch (error) {
    return [];
  }
}

function saveChatHistory() {
  safeStorageSet(chatHistoryStorageKey, JSON.stringify(chatHistory.slice(-40)));
}

function getChatAvatarSrc(role) {
  return role === "user"
    ? "assets/icons/chat-user-avatar.png"
    : "assets/icons/chat-support-avatar.png";
}

function renderChatMessage(message) {
  if (!chatMessages) {
    return;
  }

  const isUser = message.role === "user";
  const row = document.createElement("div");
  const avatar = document.createElement("img");
  const bubble = document.createElement("p");
  const messageText = document.createElement("span");

  row.className = `chat-message-row ${isUser ? "is-user" : "is-agent"}`;
  avatar.className = "chat-avatar";
  avatar.src = getChatAvatarSrc(message.role);
  avatar.alt = isUser ? "You" : "Game Engine support";
  avatar.loading = "lazy";
  bubble.className = `chat-message ${isUser ? "is-user" : "is-agent"}`;
  messageText.className = "chat-message-text";
  messageText.textContent = message.text;
  bubble.appendChild(messageText);

  if (isUser) {
    const status = document.createElement("span");
    const isSeen = message.status === "seen";

    status.className = `chat-message-status ${isSeen ? "is-seen" : "is-delivered"}`;
    status.setAttribute("aria-label", isSeen ? "Seen" : "Delivered");
    status.textContent = isSeen ? "✓✓" : "✓";
    bubble.appendChild(status);
  }

  row.append(avatar, bubble);
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendChatMessage(role, text, shouldSave = true, id = createChatId(), status = "") {
  const trimmedText = String(text || "").trim();

  if (!trimmedText) {
    return;
  }

  if (chatHistory.some((message) => message.id === id)) {
    return;
  }

  const message = {
    id,
    role,
    text: trimmedText,
    status: role === "user" ? status || "delivered" : "",
    createdAt: new Date().toISOString(),
  };

  chatHistory.push(message);
  renderChatMessage(message);

  if (shouldSave) {
    saveChatHistory();
  }
}

function markUserMessagesSeen() {
  let didUpdate = false;

  chatHistory.forEach((message) => {
    if (message.role === "user" && message.status !== "seen") {
      message.status = "seen";
      didUpdate = true;
    }
  });

  if (didUpdate) {
    saveChatHistory();
    renderChatHistory();
  }
}

function renderChatHistory() {
  if (!chatMessages) {
    return;
  }

  chatMessages.innerHTML = "";
  chatHistory.forEach(renderChatMessage);
}

function setChatStatus(message, type = "") {
  if (!chatStatus) {
    return;
  }

  window.clearTimeout(chatStatusTimer);
  chatStatus.textContent = message;
  chatStatus.classList.toggle("is-success", type === "success");
  chatStatus.classList.toggle("is-error", type === "error");

  if (message && type === "success") {
    chatStatusTimer = window.setTimeout(() => {
      setChatStatus("");
    }, 3600);
  }
}

function updateChatCounter() {
  const length = chatInput?.value.length || 0;
  const isOverLimit = length > chatMaxMessageLength;

  if (chatCounter) {
    chatCounter.textContent = `${length.toLocaleString()} / ${chatMaxMessageLength.toLocaleString()} characters`;
    chatCounter.classList.toggle("is-over-limit", isOverLimit);
  }

  if (chatSubmitButton && !isChatSubmitting) {
    chatSubmitButton.disabled = isOverLimit;
  }
}

function setChatSending(isSending) {
  isChatSubmitting = isSending;
  chatForm?.classList.toggle("is-sending", isSending);
  chatForm?.setAttribute("aria-busy", String(isSending));

  if (chatInput) {
    chatInput.disabled = isSending;
  }

  if (chatSubmitButton) {
    chatSubmitButton.disabled = isSending || ((chatInput?.value.length || 0) > chatMaxMessageLength);
    chatSubmitButton.setAttribute("aria-label", isSending ? "Sending message" : "Send message");
  }
}

function handleIncomingChatMessage(message) {
  const replyId = String(message.id || createChatId());
  const replyText = message.text || message.message || "";

  if (!replyText.trim()) {
    return;
  }

  if ((message.role || "agent") !== "user") {
    markUserMessagesSeen();
  }

  appendChatMessage(message.role || "agent", replyText, true, replyId);

  const cursor = Number(message.cursor ?? message.sequence ?? 0);
  if (Number.isFinite(cursor) && cursor > chatLastReplyCursor) {
    chatLastReplyCursor = cursor;
  }
}

function getClampedChatPosition(left, top) {
  if (!chatWidget) {
    return { left, top };
  }

  const rect = chatWidget.getBoundingClientRect();
  const margin = 12;
  const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);

  return {
    left: Math.min(Math.max(margin, left), maxLeft),
    top: Math.min(Math.max(margin, top), maxTop),
  };
}

function applyChatWidgetPosition(position, shouldSave = false) {
  if (!chatWidget || !position) {
    return;
  }

  const nextPosition = getClampedChatPosition(Number(position.left) || 0, Number(position.top) || 0);
  chatWidget.classList.add("is-drag-positioned");
  chatWidget.style.left = `${nextPosition.left}px`;
  chatWidget.style.top = `${nextPosition.top}px`;
  chatWidget.style.right = "auto";
  chatWidget.style.bottom = "auto";

  if (shouldSave) {
    safeSessionStorageSet(chatPositionStorageKey, JSON.stringify(nextPosition));
  }
}

function restoreChatWidgetPosition() {
  const storedPosition = safeSessionStorageGet(chatPositionStorageKey);

  if (!storedPosition) {
    return;
  }

  try {
    const parsedPosition = JSON.parse(storedPosition);

    if (Number.isFinite(parsedPosition?.left) && Number.isFinite(parsedPosition?.top)) {
      applyChatWidgetPosition(parsedPosition);
    }
  } catch (error) {
    // Invalid session data should never block the chat from opening.
  }
}

function reclampChatWidgetPosition() {
  if (!chatWidget?.classList.contains("is-drag-positioned")) {
    return;
  }

  const rect = chatWidget.getBoundingClientRect();
  applyChatWidgetPosition({ left: rect.left, top: rect.top }, true);
}

function resetChatWidgetPositionToDefault() {
  if (!chatWidget) {
    return;
  }

  chatWidget.classList.remove("is-drag-positioned", "is-dragging", "drag-left", "drag-right");
  chatWidget.style.left = "";
  chatWidget.style.top = "";
  chatWidget.style.right = "";
  chatWidget.style.bottom = "";
  safeSessionStorageRemove(chatPositionStorageKey);
}

function scheduleChatScrollReset() {
  if (!chatWidget?.classList.contains("is-drag-positioned") || chatDragState || chatScrollResetFrame) {
    return;
  }

  chatScrollResetFrame = window.requestAnimationFrame(() => {
    chatScrollResetFrame = undefined;
    resetChatWidgetPositionToDefault();
  });
}

function playChatClickAnimation() {
  if (!chatWidget) {
    return;
  }

  chatWidget.classList.remove("is-chat-clicking");
  void chatWidget.offsetWidth;
  chatWidget.classList.add("is-chat-clicking");

  window.setTimeout(() => {
    chatWidget?.classList.remove("is-chat-clicking");
  }, 520);
}

function getChatWidgetVideoSegment(mode = chatWidgetVideoMode) {
  return chatWidgetVideoSegments[mode] || chatWidgetVideoSegments.idle;
}

function keepChatWidgetVideoInSegment() {
  if (!chatWidgetVideo) {
    return;
  }

  const segment = getChatWidgetVideoSegment();

  if (chatWidgetVideo.readyState >= 1) {
    const currentTime = chatWidgetVideo.currentTime;

    if (currentTime >= segment.end - 0.035 || currentTime < segment.start - 0.08) {
      chatWidgetVideo.currentTime = segment.start;
    }
  }

  if (chatWidgetVideo.paused) {
    chatWidgetVideo.play().catch(() => {});
  }
}

function syncChatWidgetVideoSegment() {
  chatWidgetVideoFrame = undefined;

  if (!chatWidgetVideo) {
    return;
  }

  keepChatWidgetVideoInSegment();

  chatWidgetVideoFrame = window.requestAnimationFrame(syncChatWidgetVideoSegment);
}

function handleChatWidgetVideoProgress() {
  keepChatWidgetVideoInSegment();
}

function playChatWidgetVideoSegment(mode, shouldRestart = false) {
  const nextMode = mode === "hover" ? "hover" : "idle";
  const isSameMode = chatWidgetVideoMode === nextMode;

  chatWidgetVideoMode = nextMode;
  chatWidget?.classList.toggle("is-chat-video-hover", chatWidgetVideoMode === "hover");

  if (!chatWidgetVideo) {
    return;
  }

  const segment = getChatWidgetVideoSegment();

  if (chatWidgetVideo.readyState >= 1) {
    const currentTime = chatWidgetVideo.currentTime;

    if ((shouldRestart && !isSameMode) || currentTime < segment.start || currentTime >= segment.end) {
      chatWidgetVideo.currentTime = segment.start;
    }
  }

  chatWidgetVideo.play().catch(() => {});

  if (!chatWidgetVideoFrame) {
    chatWidgetVideoFrame = window.requestAnimationFrame(syncChatWidgetVideoSegment);
  }
}

function updateChatWidgetVisualMode() {
  playChatWidgetVideoSegment(
    chatWidgetPointerActive || chatWidgetFocusActive || chatWidgetClickBoostTimer ? "hover" : "idle",
  );
}

function stopChatWidgetClickBoost() {
  if (!chatWidgetClickBoostTimer) {
    return;
  }

  window.clearTimeout(chatWidgetClickBoostTimer);
  chatWidgetClickBoostTimer = undefined;
}

function boostChatWidgetActiveAnimation(duration = 1600) {
  stopChatWidgetClickBoost();
  chatWidgetClickBoostTimer = window.setTimeout(() => {
    chatWidgetClickBoostTimer = undefined;
    updateChatWidgetVisualMode();
  }, duration);
  updateChatWidgetVisualMode();
}

function setChatWidgetPointerActive(isActive) {
  if (chatWidgetPointerActive === isActive) {
    return;
  }

  chatWidgetPointerActive = isActive;

  if (!isActive) {
    stopChatWidgetClickBoost();
  }

  updateChatWidgetVisualMode();
}

function syncChatWidgetPointerPosition(event) {
  if (!chatToggle) {
    return;
  }

  const rect = chatToggle.getBoundingClientRect();
  const isInside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  setChatWidgetPointerActive(isInside);
}

function preloadChatWidgetVideo() {
  if (document.querySelector(`link[rel="preload"][href="${chatWidgetVideoSrc}"]`)) {
    return;
  }

  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "video";
  preloadLink.type = "video/webm";
  preloadLink.href = chatWidgetVideoSrc;
  document.head.appendChild(preloadLink);
}

function setupChatWidgetVideo() {
  if (!chatToggleIcon) {
    return;
  }

  preloadChatWidgetVideo();

  let video = chatToggleIcon.querySelector("video.chat-widget-video");

  if (!video) {
    video = document.createElement("video");
    video.className = "chat-widget-video";
    video.src = chatWidgetVideoSrc;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = "auto";
    video.controls = false;
    video.setAttribute("aria-hidden", "true");
    video.setAttribute("disablepictureinpicture", "");
    video.setAttribute("disableremoteplayback", "");
    chatToggleIcon.replaceChildren(video);
  }

  chatWidgetVideo = video;

  if (chatWidgetVideo.dataset.segmentLoopBound !== "true") {
    chatWidgetVideo.addEventListener("timeupdate", handleChatWidgetVideoProgress);
    chatWidgetVideo.addEventListener("ended", handleChatWidgetVideoProgress);
    chatWidgetVideo.dataset.segmentLoopBound = "true";
  }

  const startVideoLoop = () => playChatWidgetVideoSegment(chatWidgetVideoMode, true);

  if (chatWidgetVideo.readyState >= 1) {
    startVideoLoop();
  } else {
    chatWidgetVideo.addEventListener("loadedmetadata", startVideoLoop, { once: true });
    chatWidgetVideo.load();
  }

  chatToggle?.addEventListener("pointerenter", () => {
    setChatWidgetPointerActive(true);
  });
  chatToggle?.addEventListener("pointerleave", () => {
    setChatWidgetPointerActive(false);
  });
  chatToggle?.addEventListener("focus", () => {
    if (chatToggle.matches(":focus-visible")) {
      chatWidgetFocusActive = true;
      updateChatWidgetVisualMode();
    }
  });
  chatToggle?.addEventListener("blur", () => {
    chatWidgetFocusActive = false;
    updateChatWidgetVisualMode();
  });
  document.addEventListener("pointermove", syncChatWidgetPointerPosition, { passive: true });
}

function handleChatDragStart(event) {
  if (!chatWidget || !chatToggle || (event.button !== undefined && event.button !== 0)) {
    return;
  }

  const rect = chatWidget.getBoundingClientRect();
  chatDragState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    left: rect.left,
    top: rect.top,
    hasMoved: false,
  };

  chatToggle.setPointerCapture?.(event.pointerId);
}

function handleChatDragMove(event) {
  if (!chatDragState || chatDragState.pointerId !== event.pointerId) {
    return;
  }

  const deltaX = event.clientX - chatDragState.startX;
  const deltaY = event.clientY - chatDragState.startY;

  if (!chatDragState.hasMoved && Math.hypot(deltaX, deltaY) < 6) {
    return;
  }

  event.preventDefault();
  chatDragState.hasMoved = true;
  chatWidget?.classList.add("is-dragging");
  chatWidget?.classList.toggle("drag-left", deltaX < 0);
  chatWidget?.classList.toggle("drag-right", deltaX >= 0);
  applyChatWidgetPosition({
    left: chatDragState.left + deltaX,
    top: chatDragState.top + deltaY,
  });
}

function handleChatDragEnd(event) {
  if (!chatDragState || chatDragState.pointerId !== event.pointerId) {
    return;
  }

  chatToggle?.releasePointerCapture?.(event.pointerId);
  chatWidget?.classList.remove("is-dragging", "drag-left", "drag-right");

  if (chatDragState.hasMoved && chatWidget) {
    const rect = chatWidget.getBoundingClientRect();
    applyChatWidgetPosition({ left: rect.left, top: rect.top }, true);
    chatDragSuppressClick = true;
    window.setTimeout(() => {
      chatDragSuppressClick = false;
    }, 80);
  }

  chatDragState = undefined;
}

function setChatOpen(isOpen) {
  if (!chatWindow || !chatToggle) {
    return;
  }

  chatWindow.hidden = !isOpen;
  chatToggle.setAttribute("aria-expanded", String(isOpen));
  chatToggle.setAttribute("aria-label", isOpen ? "Close chat inquiry" : "Open chat inquiry");
  chatWidget?.classList.toggle("is-chat-open", isOpen);

  if (isOpen) {
    window.setTimeout(reclampChatWidgetPosition, 0);
    window.setTimeout(() => chatInput?.focus(), 80);
    startChatEvents();
    startChatPolling();
  }
}

async function syncChatReplies() {
  if (!telegramChatEndpoint || !chatSessionId) {
    return;
  }

  const replyUrl = new URL(telegramChatEndpoint, window.location.href);
  replyUrl.searchParams.set("sessionId", chatSessionId);

  if (chatLastReplyCursor) {
    replyUrl.searchParams.set("after", String(chatLastReplyCursor));
  }

  const response = await fetch(replyUrl.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return;
  }

  const data = await response.json();
  const replies = Array.isArray(data.messages) ? data.messages : [];

  replies.forEach(handleIncomingChatMessage);

  const cursor = Number(data.cursor ?? 0);
  if (Number.isFinite(cursor) && cursor > chatLastReplyCursor) {
    chatLastReplyCursor = cursor;
  }
}

function startChatEvents() {
  if (!telegramEventsEndpoint || !chatSessionId || chatEvents || !("EventSource" in window)) {
    return;
  }

  const eventsUrl = new URL(telegramEventsEndpoint, window.location.href);
  eventsUrl.searchParams.set("sessionId", chatSessionId);

  chatEvents = new EventSource(eventsUrl.toString());

  chatEvents.addEventListener("message", (event) => {
    try {
      handleIncomingChatMessage(JSON.parse(event.data));
    } catch (error) {
      // Ignore malformed server-sent events and keep the chat connected.
    }
  });

  chatEvents.addEventListener("error", () => {
    chatEvents?.close();
    chatEvents = undefined;
  });
}

function startChatPolling() {
  if (!telegramChatEndpoint || chatPollTimer) {
    return;
  }

  syncChatReplies().catch(() => {});
  chatPollTimer = window.setInterval(() => {
    syncChatReplies().catch(() => {});
  }, 3000);
}

async function sendChatMessage(message) {
  if (!telegramChatEndpoint) {
    throw new Error("Chat service is not available right now. Please try again later.");
  }

  const controller = "AbortController" in window ? new AbortController() : undefined;
  let timeoutId;

  const timeout = new Promise((resolve) => {
    timeoutId = window.setTimeout(() => {
      resolve({ didTimeout: true });
    }, chatSendTimeoutMs);
  });

  const request = fetch(telegramChatEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal: controller?.signal,
    body: JSON.stringify({
      sessionId: chatSessionId,
      message,
    }),
  }).then(async (response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Telegram could not confirm delivery.");
    }

    return data;
  });

  try {
    const result = await Promise.race([
      request.then(
        (data) => ({ data }),
        (error) => ({ error }),
      ),
      timeout,
    ]);

    if (result.didTimeout) {
      controller?.abort();
      throw new Error(chatSendTimeoutMessage);
    }

    if (result.error) {
      throw result.error;
    }

    return result.data;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function handleChatSubmit(event) {
  event.preventDefault();

  if (!chatInput || isChatSubmitting) {
    return;
  }

  const message = chatInput.value.trim();

  if (!message) {
    setChatStatus("Please enter a message before sending.", "error");
    return;
  }

  if (message.length > chatMaxMessageLength) {
    updateChatCounter();
    setChatStatus(`Please keep your message within ${chatMaxMessageLength.toLocaleString()} characters.`, "error");
    return;
  }

  setChatStatus("");
  setChatSending(true);

  try {
    const data = await sendChatMessage(message);
    chatSessionId = data.sessionId || chatSessionId;
    safeStorageSet(chatSessionStorageKey, chatSessionId);
    appendChatMessage("user", message, true, data.visitorMessageId || createChatId());
    chatInput.value = "";
    updateChatCounter();
    setChatStatus(chatSendSuccessMessage, "success");
    syncChatReplies().catch(() => {});
  } catch (error) {
    setChatStatus(error.message || "We could not deliver your message to Telegram. Please try again.", "error");
  } finally {
    setChatSending(false);
    window.setTimeout(() => chatInput?.focus(), 40);
  }
}

function setupContactForm() {
  if (!contactForm) {
    return;
  }

  getContactRequiredControls().forEach((control) => {
    ensureContactErrorElement(control);

    control.addEventListener("input", () => {
      if (String(control.value || "").trim() || control.dataset.contactTouched === "true") {
        control.dataset.contactTouched = "true";
      }

      validateContactField(control);
      updateContactSubmitState();
    });

    control.addEventListener("blur", () => {
      control.dataset.contactTouched = "true";
      validateContactField(control, { showError: true });
      updateContactSubmitState();
    });
  });

  updateContactSubmitState();
  getContactSubmitButton()?.addEventListener("click", handleContactSubmit);
  contactForm.addEventListener("submit", handleContactSubmit);
}

function setupFloatingActions() {
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

}

function setupChatWidget() {
  if (window.TelegramChatWidgetExternal) {
    return;
  }

  if (!chatWidget || !chatToggle || !chatWindow || !chatMessages) {
    return;
  }

  if (chatWidget.dataset.initialized === "true") {
    return;
  }

  chatWidget.dataset.initialized = "true";
  chatForm?.setAttribute("novalidate", "");
  setupChatWidgetVideo();
  restoreChatWidgetPosition();

  chatSessionId = getChatSessionId();
  chatHistory = loadChatHistory();

  if (!chatHistory.length) {
    appendChatMessage("agent", chatWelcomeMessage);
  } else {
    if (chatHistory[0]?.role === "agent" && chatHistory[0].text?.startsWith("Hi, welcome to Game Engine.")) {
      chatHistory[0].text = chatWelcomeMessage;
      saveChatHistory();
    }

    renderChatHistory();
  }

  chatToggle.addEventListener("pointerdown", handleChatDragStart);
  chatToggle.addEventListener("pointermove", handleChatDragMove);
  chatToggle.addEventListener("pointerup", handleChatDragEnd);
  chatToggle.addEventListener("pointercancel", handleChatDragEnd);

  chatToggle.addEventListener("click", (event) => {
    if (chatDragSuppressClick) {
      event.preventDefault();
      chatDragSuppressClick = false;
      return;
    }

    const shouldOpen = chatWindow.hidden;

    boostChatWidgetActiveAnimation();
    playChatClickAnimation();

    if (shouldOpen && !prefersReducedMotion) {
      window.setTimeout(() => setChatOpen(true), 140);
    } else {
      setChatOpen(shouldOpen);
    }
  });

  if (chatMinimize) {
    chatMinimize.addEventListener("click", () => setChatOpen(false));
  }

  if (chatForm) {
    chatForm.addEventListener("submit", handleChatSubmit);
  }

  if (chatInput) {
    chatInput.addEventListener("input", updateChatCounter);
    updateChatCounter();
  }

  window.addEventListener("scroll", scheduleChatScrollReset, { passive: true });
}

function setupDemoAuth() {
  demoAccounts = loadDemoAccounts();
  demoSessionKey = safeStorageGet(demoSessionStorageKey) || "";

  if (demoSessionKey && !demoAccounts[demoSessionKey]) {
    clearDemoSession();
  }

  renderAuthState();

  authOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeMobileNav();
      openAuthModal({
        mode: button.dataset.authMode || "sign-in",
      });
    });
  });

  if (accountTrigger) {
    accountTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleAccountDropdown();
    });
  }

  accountActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.accountAction;

      closeAccountDropdown();

      if (action === "my-account" || action === "demo-balance") {
        openAuthModal({ mode: "account" });
      }
    });
  });

  if (authSignOutButton) {
    authSignOutButton.addEventListener("click", () => {
      closeAccountDropdown();
      closeAuthModal();
      clearDemoSession();
      renderAuthState();
      showAuthToast("Signed out of your demo account.");
    });
  }

  authCloseButtons.forEach((button) => {
    button.addEventListener("click", closeAuthModal);
  });

  if (authForm) {
    authForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = normalizeUsername(authUsernameInput?.value);

      if (!username) {
        if (authStatus) {
          authStatus.textContent = "Please enter a username to continue.";
        }

        authUsernameInput?.focus();
        return;
      }

      const account = signInDemoAccount(username);

      if (!account) {
        if (authStatus) {
          authStatus.textContent = "Please enter a valid username.";
        }

        return;
      }

      if (authUsernameInput) {
        authUsernameInput.value = "";
      }

      closeAuthModal();
      showAuthToast(`Welcome, ${account.username}! Demo Balance: ${formatDemoBalance(account.balance)}`);

      if (pendingGameCard) {
        const cardToLaunch = pendingGameCard;
        pendingGameCard = undefined;
        window.setTimeout(() => openGameOverlay(cardToLaunch), 180);
      }
    });
  }

  document.addEventListener("click", (event) => {
    if (!accountNav?.contains(event.target)) {
      closeAccountDropdown();
    }
  });
}

function getActiveGamesFilter() {
  return gamesFilterButtons.find((button) => button.classList.contains("is-active"))?.dataset.gamesFilter || "all";
}

function getLibraryGameTitle(card) {
  return String(card?.dataset.gameTitle || getGameTitle(card)).trim();
}

function getNewReleaseGameIndex(card) {
  const title = getLibraryGameTitle(card).toLowerCase();
  return newReleaseGameTitles.findIndex((newReleaseTitle) => newReleaseTitle.toLowerCase() === title);
}

function getLibraryGameFilterGroups(card) {
  return String(card?.dataset.gameFilterGroups || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function getAllGamesSortRank(card) {
  const newReleaseIndex = getNewReleaseGameIndex(card);

  if (newReleaseIndex >= 0) {
    return newReleaseIndex;
  }

  const groups = getLibraryGameFilterGroups(card);
  const categoryIndex = allGamesCategoryOrder.findIndex((category) => groups.includes(category));

  return newReleaseGameTitles.length + (categoryIndex >= 0 ? categoryIndex : allGamesCategoryOrder.length);
}

function getLibraryCardFeatures(card) {
  return String(card?.dataset.gameFeatures || "")
    .split("|")
    .map((feature) => feature.trim())
    .filter(Boolean);
}

function setLibraryFeaturedGame(card) {
  if (!card || card.hidden) {
    return;
  }

  selectedLibraryGameCard = card;

  libraryGameCards.forEach((item) => {
    const isSelected = item === card;
    item.classList.toggle("is-selected", isSelected);
    item.setAttribute("aria-current", isSelected ? "true" : "false");
  });

  if (gamesFeaturedImage) {
    gamesFeaturedImage.src = card.dataset.gameImage || card.querySelector("img")?.src || "";
    gamesFeaturedImage.alt = `${card.dataset.gameTitle || getGameTitle(card)} logo`;
  }

  if (gamesFeaturedCategory) {
    gamesFeaturedCategory.textContent = card.dataset.gameCategory || "Game";
  }

  if (gamesFeaturedTitle) {
    gamesFeaturedTitle.textContent = card.dataset.gameTitle || getGameTitle(card);
  }

  if (gamesFeaturedDescription) {
    gamesFeaturedDescription.textContent = card.dataset.gameDescription || "";
  }

  if (gamesFeaturedFeatures) {
    const features = getLibraryCardFeatures(card).map((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      return item;
    });

    gamesFeaturedFeatures.replaceChildren(...features);
  }

  if (gamesFeaturedDemo) {
    gamesFeaturedDemo.href = card.href;
    gamesFeaturedDemo.setAttribute("aria-label", `Launch ${getLibraryGameTitle(card)} details`);
  }
}

function cardMatchesGamesFilter(card, filter, query) {
  const groups = getLibraryGameFilterGroups(card);
  const title = getLibraryGameTitle(card).toLowerCase();
  const matchesFilter =
    filter === "all" ||
    (filter === "new" ? newReleaseGameTitleSet.has(title) : groups.includes(filter));
  const searchableText = [
    card.dataset.gameTitle,
    card.dataset.gameCategory,
    card.dataset.gameDescription,
    card.dataset.gameFeatures,
  ].join(" ").toLowerCase();

  return matchesFilter && (!query || searchableText.includes(query));
}

function getOrderedLibraryCards(visibleCards, filter) {
  const visibleSet = new Set(visibleCards);
  const sortedVisibleCards = [...visibleCards];

  if (filter === "all") {
    sortedVisibleCards.sort((cardA, cardB) => {
      const rankDifference = getAllGamesSortRank(cardA) - getAllGamesSortRank(cardB);

      if (rankDifference !== 0) {
        return rankDifference;
      }

      return libraryGameCards.indexOf(cardA) - libraryGameCards.indexOf(cardB);
    });
  } else if (filter === "new") {
    sortedVisibleCards.sort((cardA, cardB) => getNewReleaseGameIndex(cardA) - getNewReleaseGameIndex(cardB));
  } else {
    sortedVisibleCards.sort((cardA, cardB) => libraryGameCards.indexOf(cardA) - libraryGameCards.indexOf(cardB));
  }

  return [
    ...sortedVisibleCards,
    ...libraryGameCards.filter((card) => !visibleSet.has(card)),
  ];
}

function renderGamesCatalogOrder(visibleCards, filter) {
  if (!gamesGrid) {
    return;
  }

  const fragment = document.createDocumentFragment();
  getOrderedLibraryCards(visibleCards, filter).forEach((card) => {
    fragment.appendChild(card);
  });
  gamesGrid.appendChild(fragment);
}

function animateGamesCatalogFilter(visibleCards) {
  if (!gamesGrid) {
    return;
  }

  libraryGameCards.forEach((card) => {
    card.classList.remove("is-filter-visible");
    card.style.removeProperty("--games-card-delay");
  });

  gamesGrid.classList.add("is-filtering");

  window.requestAnimationFrame(() => {
    gamesGrid.classList.remove("is-filtering");
    visibleCards.forEach((card, index) => {
      card.style.setProperty("--games-card-delay", `${Math.min(index, 12) * 18}ms`);
      card.classList.add("is-filter-visible");
    });
  });
}

function updateGamesCatalog(shouldAnimate = false) {
  if (!gamesLibrary) {
    return;
  }

  const filter = getActiveGamesFilter();
  const query = String(gamesSearch?.value || "").trim().toLowerCase();
  const visibleCards = [];

  libraryGameCards.forEach((card) => {
    const isVisible = cardMatchesGamesFilter(card, filter, query);
    card.hidden = !isVisible;
    card.setAttribute("aria-hidden", String(!isVisible));

    if (isVisible) {
      visibleCards.push(card);
    }
  });

  renderGamesCatalogOrder(visibleCards, filter);

  if (gamesEmpty) {
    gamesEmpty.hidden = visibleCards.length > 0;
  }

  if (!visibleCards.includes(selectedLibraryGameCard)) {
    setLibraryFeaturedGame(visibleCards[0]);
  }

  if (shouldAnimate) {
    animateGamesCatalogFilter(visibleCards);
  }
}

function setupGamesLibrary() {
  if (!gamesLibrary || !libraryGameCards.length) {
    return;
  }

  gamesFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      gamesFilterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      updateGamesCatalog(true);
    });
  });

  gamesSearch?.addEventListener("input", () => updateGamesCatalog(true));

  libraryGameCards.forEach((card) => {
    card.addEventListener("pointerenter", () => setLibraryFeaturedGame(card));
    card.addEventListener("focus", () => setLibraryFeaturedGame(card));
    card.addEventListener("click", () => setLibraryFeaturedGame(card));
  });

  setLibraryFeaturedGame(
    libraryGameCards.find((card) => card.classList.contains("is-selected")) ||
    libraryGameCards[0],
  );
  updateGamesCatalog();
}

function setupGameLauncher() {
  gameCards.forEach((card) => {
    card.addEventListener("auxclick", (event) => {
      if (isOutsideInnovationThumbnail(card, event)) {
        event.preventDefault();
      }
    });

    card.addEventListener("click", (event) => {
      const carousel = card.closest("[data-logo-carousel]");

      if (carousel?.dataset.suppressClick === "true") {
        event.preventDefault();
        delete carousel.dataset.suppressClick;
        return;
      }

      if (isOutsideInnovationThumbnail(card, event)) {
        event.preventDefault();
        return;
      }

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      activateGameCard(card);
    });
  });

  if (gameCloseButton) {
    gameCloseButton.addEventListener("click", closeGameOverlay);
  }

  window.addEventListener("message", handleGameMessage);
}

if (navToggle) {
  navToggle.addEventListener("click", toggleMobileNav);
}

navLinks.forEach((link) => {
  link.addEventListener("click", handleNavLinkClick);
});

if (prevButton) {
  prevButton.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    setActiveSlide(index);
    restartAutoplay();
  });
});

if (carousel) {
  carousel.addEventListener("pointerdown", handleCarouselPointerDown);
  carousel.addEventListener("pointermove", handleCarouselPointerMove);
  carousel.addEventListener("pointerup", endCarouselDrag);
  carousel.addEventListener("pointercancel", endCarouselDrag);
  carousel.addEventListener("mouseenter", () => window.clearInterval(autoplayTimer));
  carousel.addEventListener("mouseleave", startAutoplay);
}

window.addEventListener("scroll", () => {
  setHeaderState();
  setActiveNav();
  setParallax();
  scheduleRevealCheck();
  updateBackToTopButton();
  updateFloatingChatButton();
}, { passive: true });

window.addEventListener("resize", handleResize);
if (logoCarousels.length) {
  window.addEventListener("load", buildLogoMarquees);
}
window.addEventListener("pageshow", () => {
  setActiveNav();
  scheduleRevealCheck();
  updateBackToTopButton();
  updateFloatingChatButton();
});

if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealItem(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach(revealItem);
}

setupFeaturedShowcase();
setupNewsFilters();
window.addEventListener("load", scheduleRevealCheck);
window.addEventListener("hashchange", scheduleRevealCheck);
scheduleRevealCheck();

expertiseCards.forEach((card) => {
  card.addEventListener("click", () => {
    const isOpen = card.classList.toggle("is-open");

    card.setAttribute("aria-expanded", String(isOpen));

    expertiseCards.forEach((otherCard) => {
      if (otherCard === card) {
        return;
      }

      otherCard.classList.remove("is-open");
      otherCard.setAttribute("aria-expanded", "false");
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileNav();
    closeAccountDropdown();
    closeAuthModal();
    closeGameOverlay();
    setChatOpen(false);
  }
});

setupDemoAuth();
setupGameCardHoverCtas();
setupGamesLibrary();
setupGameLauncher();
setupContactForm();
setupFloatingActions();
setupChatWidget();
setHeaderState();
setActiveNav();
updateBackToTopButton();
updateFloatingChatButton();
if (logoCarousels.length) {
  setupLogoCarousels();
}
startAutoplay();

window.GameEngineDemoAccount = {
  getCurrentAccount,
  updateBalance: applyDemoBalanceDelta,
  setBalance: setDemoBalance,
};
