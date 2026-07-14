const articles = {
  "banana-craze-update": {
    category: "Announcements",
    title: "NEW VERSION OF BANANA CRAZE!",
    date: "July 2026",
    dateTime: "2026-07",
    background: "assets/news/banana-craze-update-hero.png",
    containMedia: true,
    bannerImages: [
      {
        src: "assets/news/banana-craze-update-hero.png",
        alt: "Banana Craze new hero design",
      },
    ],
    paragraphs: [
      "We are pleased to announce the new and improved Banana Craze. This update introduces fresh bonus mechanics, enhanced visuals, and a more rewarding gameplay experience. Set in a Mayan Jungle Treasure adventure, the new Banana Craze retains the classic money-match gameplay while adding bonus features that create more ways to win. Improved animations, richer effects, and a deeper jungle-themed atmosphere bring the adventure to life.",
    ],
    featuresTitle: "New Features Overview",
    featureCards: [
      {
        title: "Scatter Symbol",
        image: {
          src: "assets/news/scatter-symbol.png",
          alt: "Banana Craze Scatter symbol",
        },
        description: "Collect 3 Scatter Symbols in one scratch to trigger the Bonus Game with 10 Free Spins.",
      },
      {
        title: "Gold Banana",
        image: {
          src: "assets/news/gold-banana.png",
          alt: "Banana Craze Gold Banana symbol",
        },
        description: "Fills the Craze Level Bar. More bananas during Bonus Game increase multipliers.",
      },
      {
        title: "Ruby & Emerald Gems",
        images: [
          {
            src: "assets/news/ruby-gem.png",
            alt: "Ruby gem symbol",
          },
          {
            src: "assets/news/emerald-gem.png",
            alt: "Emerald gem symbol",
          },
        ],
        description: [
          "Ruby: Adds its prize to the current win.",
          "Emerald: Increases the Global Multiplier for the rest of the Bonus Game.",
        ],
      },
    ],
  },
  "lucky-color-combo-release": {
    category: "Game Release",
    title: "NEW GAME RELEASE: LUCKY COLOR COMBO",
    date: "July 2026",
    dateTime: "2026-07",
    background: "assets/news/lucky-color-combo-overview.png",
    containMedia: true,
    bannerImages: [
      {
        src: "assets/news/lucky-color-combo-overview.png",
        alt: "Lucky Color Combo release artwork",
      },
    ],
    paragraphs: [
      "LUCKY COLOR COMBO is a carnival-themed instant-win color matching game. Players reveal colors and build multipliers through successful matches. Each matching combination raises the multiplier for bigger rewards. Rainbow Dice symbols act as Wilds, substituting for any color to complete winning combinations. Collecting Rainbow Dice also unlocks bonus rewards: Multiplier Wheel spins and a chance to instantly win 10,000x your bet.",
    ],
    featuresTitle: "New Features Overview",
    featureCards: [
      {
        title: "Multiplier Wheel",
        image: {
          src: "assets/news/wheel-multiplier.png",
          alt: "Lucky Color Combo Multiplier Wheel",
        },
        description: "Collect 3 consecutive Rainbow Dice to unlock the Multiplier Wheel and boost multipliers.",
      },
      {
        title: "Rainbow Dice",
        image: {
          src: "assets/news/rainbow-dice-symbol.png",
          alt: "Lucky Color Combo Rainbow Dice symbol",
        },
        description: "Wild symbol that matches any dice to complete combinations.",
      },
      {
        title: "Max Win",
        image: {
          src: "assets/news/max-win.jpg",
          alt: "Lucky Color Combo 10000x Max Win",
        },
        description: "Land 5 consecutive Rainbow Dice to unlock 10,000× Max Win.",
      },
    ],
  },
  "bingoplus-casinoplus-partnership": {
    category: "Partners",
    title: "OFFICIAL PARTNERSHIP WITH BINGOPLUS AND CASINOPLUS",
    date: "July 2026",
    dateTime: "2026-07",
    background: "assets/news/partnership-casinoplus.png",
    containMedia: true,
    bannerImages: [
      {
        src: "assets/news/partnership-bingoplus.png",
        alt: "BingoPlus and Game Engine partnership announcement",
      },
      {
        src: "assets/news/partnership-casinoplus.png",
        alt: "CasinoPlus and Game Engine partnership announcement",
      },
    ],
    paragraphs: [
      "Game Engine is pleased to announce its official partnership with BingoPlus and CasinoPlus. This collaboration strengthens our commitment to high-quality gaming content, innovative entertainment, and engaging player experiences. Through this partnership, Game Engine's portfolio will be available on BingoPlus and CasinoPlus. Players gain access to diverse titles, rewarding gameplay, and enhanced features across both platforms. This marks a major milestone in expanding our market presence and bringing premium gaming to a wider audience. We look forward to continued growth with BingoPlus and CasinoPlus.",
    ],
    links: [
      {
        label: "BingoPlus Platform Link",
        href: "https://bingoplus.com/",
      },
      {
        label: "CasinoPlus Platform Link",
        href: "https://www.casinoplus.com.ph/",
      },
    ],
  },
};

const params = new URLSearchParams(window.location.search);
const articleId = params.get("article") || "banana-craze-update";
const article = articles[articleId];

const detail = document.querySelector("[data-news-detail]");
const missing = document.querySelector("[data-news-missing]");
const media = document.querySelector("[data-news-media]");
const category = document.querySelector("[data-news-category]");
const date = document.querySelector("[data-news-date]");
const title = document.querySelector("[data-news-title]");
const copy = document.querySelector("[data-news-copy]");
const featuresSection = document.querySelector("[data-news-features-section]");
const featuresTitle = document.querySelector("[data-news-features-title]");
const features = document.querySelector("[data-news-features]");
const linksSection = document.querySelector("[data-news-links-section]");
const links = document.querySelector("[data-news-links]");

function appendImage(parent, image, index) {
  const img = document.createElement("img");

  img.src = image.src;
  img.alt = image.alt;
  img.decoding = "async";
  img.loading = index === 0 ? "eager" : "lazy";

  if (index === 0) {
    img.fetchPriority = "high";
  }

  parent.append(img);
}

function renderMedia() {
  media.classList.toggle("news-detail-media-grid", article.bannerImages.length > 1);
  media.classList.toggle("news-detail-media-contain", Boolean(article.containMedia));

  article.bannerImages.forEach((image, index) => appendImage(media, image, index));
}

function renderParagraphs() {
  article.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");

    p.textContent = paragraph;
    copy.append(p);
  });
}

function appendDescription(parent, description) {
  const details = Array.isArray(description) ? description : [description];

  details.forEach((detailText) => {
    const p = document.createElement("p");

    p.textContent = detailText;
    parent.append(p);
  });
}

function renderFeatures() {
  if (!article.featureCards?.length) {
    return;
  }

  featuresTitle.textContent = article.featuresTitle || "Update Details";

  article.featureCards.forEach((feature, featureIndex) => {
    const card = document.createElement("article");
    const mediaWrap = document.createElement("div");
    const body = document.createElement("div");
    const heading = document.createElement("h3");
    const imageList = feature.images || [feature.image];

    card.className = "news-feature-card";
    mediaWrap.className = "news-feature-card-media";

    if (imageList.length > 1) {
      mediaWrap.classList.add("news-feature-card-media-group");
    }

    imageList.filter(Boolean).forEach((image, imageIndex) => {
      appendImage(mediaWrap, image, featureIndex + imageIndex);
    });

    body.className = "news-feature-card-body";
    heading.textContent = feature.title;
    body.append(heading);
    appendDescription(body, feature.description);
    card.append(mediaWrap, body);
    features.append(card);
  });

  featuresSection.hidden = false;
}

function renderLinks() {
  if (!article.links?.length) {
    return;
  }

  article.links.forEach((linkItem) => {
    const link = document.createElement("a");

    link.href = linkItem.href;
    link.textContent = linkItem.label;
    link.target = "_blank";
    link.rel = "noreferrer";
    links.append(link);
  });

  linksSection.hidden = false;
}

if (!article) {
  missing.hidden = false;
} else {
  document.title = `${article.title} | Game Engine`;
  document.body.style.setProperty("--game-detail-background", `url("${article.background}")`);

  category.textContent = article.category;
  date.textContent = article.date;
  date.dateTime = article.dateTime;
  title.textContent = article.title;

  renderMedia();
  renderParagraphs();
  renderFeatures();
  renderLinks();

  detail.hidden = false;
}
