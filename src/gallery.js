import "./styles/main.css";
import { portfolio } from "./data/portfolio.js";

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const isFilled = (value) =>
  value !== undefined &&
  value !== null &&
  String(value).trim() !== "" &&
  !/\[[A-Z0-9 _-]+\]/i.test(String(value));

const assetUrl = (path) => {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const withBase = path.startsWith("/")
    ? `${import.meta.env.BASE_URL}${path.slice(1)}`
    : path;
  return withBase
    .split("/")
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join("/");
};

const imageMarkup = (item) =>
  isFilled(item.image)
    ? `<img class="gallery-image${item.orientation === "rotate-90" ? " gallery-image-rotated" : ""}" src="${escapeHtml(assetUrl(item.image))}" alt="${escapeHtml(item.alt || item.title || "Gallery work")}" width="${item.width || 1200}" height="${item.height || 900}" decoding="async" loading="lazy" />`
    : `<div class="image-fallback gallery-image" role="img" aria-label="Add a local work image in src/data/portfolio.js"><span>DRAWING / IMAGE</span><small>ADD YOUR WORK</small></div>`;

const work = (portfolio.gallery || []).filter(
  (item) => isFilled(item.title) || isFilled(item.description) || isFilled(item.image),
);
const name = isFilled(portfolio.name) ? portfolio.name : "Portfolio";
const resume = isFilled(portfolio.resume)
  ? `<a class="button button-dark" href="${escapeHtml(assetUrl(portfolio.resume))}" download>Résumé <span aria-hidden="true">↗</span></a>`
  : "";

const cards = work
  .map(
    (item, index) => `
      <article class="gallery-card" style="--gallery-index:${index % 5}">
        <div class="gallery-media${item.orientation === "rotate-90" ? " gallery-media-rotated" : ""}">
          ${
            isFilled(item.link)
              ? `<a class="gallery-linked-media" href="${escapeHtml(assetUrl(item.link))}" target="_blank" rel="noreferrer" aria-label="Open documentation for ${escapeHtml(item.title || "this work")}">${imageMarkup(item)}<span class="gallery-open" aria-hidden="true">↗</span></a>`
              : imageMarkup(item)
          }
        </div>
        <div class="gallery-caption">
          <div>
            ${isFilled(item.category) ? `<span class="mono-label">${escapeHtml(item.category)}</span>` : ""}
            <h2>${escapeHtml(item.title || "Untitled work")}</h2>
          </div>
          ${isFilled(item.date) ? `<span class="gallery-date">${escapeHtml(item.date)}</span>` : ""}
        </div>
        ${isFilled(item.description) ? `<p>${escapeHtml(item.description)}</p>` : ""}
      </article>
    `,
  )
  .join("");

document.querySelector("#gallery-app").innerHTML = `
  <header class="site-header">
    <a class="wordmark" href="./index.html#top" aria-label="${escapeHtml(name)} — home">${escapeHtml(name)}</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="gallery-nav" aria-label="Open navigation"><span></span><span></span></button>
    <nav id="gallery-nav" class="nav-links" aria-label="Main navigation">
      <a href="./index.html#about">About</a>
      <a href="./index.html#focus">Focus</a>
      <a href="./index.html#projects">Projects</a>
      <a href="./index.html#skills">Skills</a>
      <a href="./index.html#education">Education</a>
      <a href="./gallery.html" aria-current="page">Gallery</a>
      <a href="./index.html#contact">Contact</a>
      ${resume}
    </nav>
  </header>
  <main id="main" class="gallery-page">
    <section class="gallery-intro section-wrap">
      <p class="eyebrow"><span class="marker"></span> VISUAL INDEX / CIVIL ENGINEERING</p>
      <div class="gallery-intro-grid">
        <h1>My work<br /><em>gallery.</em></h1>
        <div class="gallery-intro-note">
          <span class="mono-label">STUDIES · DRAWINGS · WORK IN PROGRESS</span>
          <p>A growing collection of engineering work, academic studies, drawings, and field documentation.</p>
        </div>
      </div>
      <div class="gallery-index-line"><span>SELECTED WORK</span><span>${String(work.length).padStart(2, "0")} ITEMS</span></div>
    </section>
    <section class="gallery-content section-wrap" aria-label="Work gallery">
      ${
        work.length
          ? `<div class="gallery-grid">${cards}</div>`
          : `<div class="gallery-empty"><div class="gallery-empty-drawing" aria-hidden="true"><span class="gallery-empty-frame"></span><span class="gallery-empty-cross">＋</span><span class="gallery-empty-caption">FIG. 00 / A PLACE FOR YOUR WORK</span></div><div class="gallery-empty-copy"><span class="mono-label">THE FIRST STUDY IS YOURS TO ADD</span><h2>A space for the work<br /><em>as it takes shape.</em></h2><p>Add a real drawing, project image, model, or field photograph to the <code>gallery</code> list in <code>src/data/portfolio.js</code>. Place the image in <code>public/assets/images/</code>.</p><a class="text-link" href="./index.html#projects">View project studies <span aria-hidden="true">↗</span></a></div></div>`
      }
    </section>
  </main>
  <footer class="site-footer section-wrap"><a class="wordmark" href="./index.html#top">${escapeHtml(name)}</a><a href="./index.html">PORTFOLIO / HOME</a><span>© <span id="gallery-year"></span></span></footer>
`;

document.title = `My Work Gallery — ${name}`;
document.querySelector("#gallery-year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#gallery-nav");
const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("nav-open");
};
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("nav-open", !isOpen);
});
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

document.addEventListener("error", (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = "true";
  const fallback = document.createElement("div");
  fallback.className = "image-fallback gallery-image";
  fallback.setAttribute("role", "img");
  fallback.setAttribute("aria-label", image.alt ? `${image.alt} image unavailable` : "Gallery image unavailable");
  const label = document.createElement("span");
  label.textContent = "IMAGE UNAVAILABLE";
  const note = document.createElement("small");
  note.textContent = "CHECK THE ASSET PATH";
  fallback.append(label, note);
  image.replaceWith(fallback);
}, true);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion && "IntersectionObserver" in window) {
  const cardsToReveal = [...document.querySelectorAll(".gallery-card")];
  if (cardsToReveal.length) {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    cardsToReveal.forEach((card) => observer.observe(card));
  }
}
