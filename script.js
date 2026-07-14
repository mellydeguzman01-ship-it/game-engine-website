const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector("[data-nav-panel]");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const carousel = document.querySelector("[data-carousel]");
const slides = Array.from(document.querySelectorAll("[data-slide]"));
const dots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const logoCarousels = Array.from(document.querySelectorAll("[data-logo-carousel]"));
const expertiseCards = Array.from(document.querySelectorAll(".expertise-card"));
const newsTabs = Array.from(document.querySelectorAll("[data-news-filter]"));
const newsCards = Array.from(document.querySelectorAll("[data-news-category]"));
const newsEmpty = document.querySelector("[data-news-empty]");
const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const contactSection = document.getElementById("contact");
const authOpenButton = document.querySelector("[data-auth-open]");
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
const backToTopButton = document.querySelector("[data-back-to-top]");
const chatWidget = document.querySelector("[data-chat-widget]");
const chatToggle = document.querySelector("[data-chat-toggle]");
const chatWindow = document.querySelector("[data-chat-window]");
const chatMinimize = document.querySelector("[data-chat-minimize]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
const chatMessages = document.querySelector("[data-chat-messages]");
const chatStatus = document.querySelector("[data-chat-status]");
const telegramChatEndpoint = chatWidget?.dataset.telegramEndpoint?.trim() || "";
const scrollSectionIds = ["home", "games", "company", "news", "contact"];
const sections = scrollSectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

let activeSlide = 0;
let autoplayTimer;
let activeHeroDrag;
let logoCarouselFrame;
let logoMarquees = [];
let activeLogoDrag;
let revealObserver;
let revealFrame;
let chatHistory = [];
let chatPollTimer;
let chatSessionId;
let chatLastReplyId = "";
let demoAccounts = {};
let demoSessionKey = "";
let pendingGameCard;
let authToastTimer;
const autoplayDelay = 5000;
const demoAccountsStorageKey = "game-engine-demo-accounts-v1";
const demoSessionStorageKey = "game-engine-demo-session-v1";
const initialDemoBalance = 1000000;
const chatHistoryStorageKey = "game-engine-chat-history";
const chatSessionStorageKey = "game-engine-chat-session";
const chatWelcomeMessage = "Hi, welcome to Game Engine. Send us a message and our partnership team will reply here once live chat is connected.";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const { carousel, didMove, link, marquee } = activeLogoDrag;

  if (didMove) {
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

  if (!didMove && link?.href) {
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
  scheduleRevealCheck();

  if (logoCarousels.length) {
    buildLogoMarquees();
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

  newsCards.forEach((card) => {
    const cardCategories = (card.dataset.newsCategory || "").split(/\s+/);
    const isVisible = filter === "all" || cardCategories.includes(filter);

    card.hidden = !isVisible;
    card.classList.toggle("is-filtered-out", !isVisible);

    if (isVisible) {
      visibleCount += 1;
      revealItem(card);
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

function handleContactSubmit(event) {
  event.preventDefault();

  if (!contactForm) {
    return;
  }

  contactForm.classList.add("was-validated");

  if (!contactForm.checkValidity()) {
    setContactStatus("error", "Please complete all required fields before submitting.");
    contactForm.reportValidity();
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
  contactForm.classList.remove("was-validated");
}

function updateBackToTopButton() {
  if (!backToTopButton) {
    return;
  }

  backToTopButton.hidden = window.scrollY <= 32;
}

function updateFloatingChatButton() {
  if (!chatWidget || !contactSection) {
    return;
  }

  const rect = contactSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const headerOffset = header?.offsetHeight ?? 0;
  const isContactVisible = rect.top <= viewportHeight * 0.72 && rect.bottom >= headerOffset + 110;

  chatWidget.classList.toggle("is-contact-visible", isContactVisible);
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

  if (authOpenButton) {
    authOpenButton.hidden = Boolean(account);
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
  return card?.querySelector("h3")?.textContent?.trim() || card?.textContent?.trim() || "Game Engine Demo";
}

function openGameOverlay(card) {
  const account = getCurrentAccount();

  if (!account) {
    pendingGameCard = card;
    openAuthModal({ message: "Create or continue with a demo username before launching a game." });
    return;
  }

  const rawUrl = card?.dataset.gameUrl;

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

function renderChatMessage(message) {
  if (!chatMessages) {
    return;
  }

  const bubble = document.createElement("p");
  bubble.className = `chat-message ${message.role === "user" ? "is-user" : "is-agent"}`;
  bubble.textContent = message.text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendChatMessage(role, text, shouldSave = true, id = createChatId()) {
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
    createdAt: new Date().toISOString(),
  };

  chatHistory.push(message);
  renderChatMessage(message);

  if (shouldSave) {
    saveChatHistory();
  }
}

function renderChatHistory() {
  if (!chatMessages) {
    return;
  }

  chatMessages.innerHTML = "";
  chatHistory.forEach(renderChatMessage);
}

function setChatStatus(message) {
  if (!chatStatus) {
    return;
  }

  chatStatus.textContent = message;
}

function setChatOpen(isOpen) {
  if (!chatWindow || !chatToggle) {
    return;
  }

  chatWindow.hidden = !isOpen;
  chatToggle.setAttribute("aria-expanded", String(isOpen));
  chatToggle.setAttribute("aria-label", isOpen ? "Close chat inquiry" : "Open chat inquiry");

  if (isOpen) {
    window.setTimeout(() => chatInput?.focus(), 80);
    startChatPolling();
  }
}

async function syncChatReplies() {
  if (!telegramChatEndpoint || !chatSessionId) {
    return;
  }

  const replyUrl = new URL(telegramChatEndpoint, window.location.href);
  replyUrl.searchParams.set("sessionId", chatSessionId);

  if (chatLastReplyId) {
    replyUrl.searchParams.set("after", chatLastReplyId);
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

  replies.forEach((reply) => {
    const replyId = String(reply.id || createChatId());
    const replyText = reply.text || reply.message || "";

    appendChatMessage("agent", replyText, true, replyId);
    chatLastReplyId = replyId;
  });
}

function startChatPolling() {
  if (!telegramChatEndpoint || chatPollTimer) {
    return;
  }

  syncChatReplies().catch(() => {});
  chatPollTimer = window.setInterval(() => {
    syncChatReplies().catch(() => {});
  }, 7000);
}

async function handleChatSubmit(event) {
  event.preventDefault();

  if (!chatInput) {
    return;
  }

  const message = chatInput.value.trim();

  if (!message) {
    return;
  }

  appendChatMessage("user", message);
  chatInput.value = "";

  if (!telegramChatEndpoint) {
    setChatStatus("Telegram chat inquiry is ready for UI testing, but the secure Telegram endpoint is not connected yet.");
    return;
  }

  setChatStatus("");

  try {
    const response = await fetch(telegramChatEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: chatSessionId,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error("Telegram endpoint returned an error.");
    }

    setChatStatus("");
    await syncChatReplies();
  } catch (error) {
    setChatStatus("We could not reach Telegram right now. Please try again in a moment.");
  }
}

function setupContactForm() {
  if (!contactForm) {
    return;
  }

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

  chatToggle.addEventListener("click", () => {
    setChatOpen(chatWindow.hidden);
  });

  if (chatMinimize) {
    chatMinimize.addEventListener("click", () => setChatOpen(false));
  }

  if (chatForm) {
    chatForm.addEventListener("submit", handleChatSubmit);
  }
}

function setupDemoAuth() {
  demoAccounts = loadDemoAccounts();
  demoSessionKey = safeStorageGet(demoSessionStorageKey) || "";

  if (demoSessionKey && !demoAccounts[demoSessionKey]) {
    clearDemoSession();
  }

  renderAuthState();

  if (authOpenButton) {
    authOpenButton.addEventListener("click", () => {
      closeMobileNav();
      openAuthModal();
    });
  }

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

function setupGameLauncher() {
  gameCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const carousel = card.closest("[data-logo-carousel]");

      if (carousel?.dataset.suppressClick === "true") {
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
