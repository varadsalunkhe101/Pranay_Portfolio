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
  !/^\[YOUR_.*\]$/.test(String(value));

const hasItems = (value) => Array.isArray(value) && value.length > 0;

const localAssetUrl = (path) => {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;

  const withBase = path.startsWith("/")
    ? `${import.meta.env.BASE_URL}${path.slice(1)}`
    : path;

  // Encode local filenames (including spaces) without encoding directory separators.
  return withBase
    .split("/")
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join("/");
};

const imageMarkup = (
  path,
  alt = "Portfolio image",
  className = "",
  width,
  height,
) => {
  if (isFilled(path)) {
    return `
      <img
        class="${className}"
        src="${escapeHtml(localAssetUrl(path))}"
        alt="${escapeHtml(alt)}"
        ${Number.isFinite(width) ? `width="${width}"` : ""}
        ${Number.isFinite(height) ? `height="${height}"` : ""}
        decoding="async"
        ${className === "portrait-image" ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}
      />
    `;
  }

  return `
    <div
      class="image-fallback ${className}"
      role="img"
      aria-label="Image placeholder. Add an image path in src/data/portfolio.js."
    >
      <span>IMAGE / DRAWING</span>
      <small>ADD YOUR IMAGE</small>
    </div>
  `;
};

const makeResumeLink = (resumePath) => {
  if (!isFilled(resumePath)) return "";

  return `
    <a class="button button-dark" href="${escapeHtml(localAssetUrl(resumePath))}" download="Pranay_Bhalchandra_Ugale_Resume.pdf">
      Download resume <span aria-hidden="true">↗</span>
    </a>
  `;
};

const educationOrbitMarkup = (entries) => {
  const nodes = entries
    .map((entry, index) => {
      const angle = (index / entries.length) * Math.PI * 2 - Math.PI / 2;
      const x = (100 + Math.cos(angle) * 77).toFixed(2);
      const y = (100 + Math.sin(angle) * 77).toFixed(2);
      const number = String(index + 1).padStart(2, "0");
      return `<circle class="education-orbit-node" cx="${x}" cy="${y}" r="3.2"><title>Education ${number}</title></circle>`;
    })
    .join("");

  return `
    <div class="education-orbit" aria-hidden="true">
      <svg viewBox="0 0 200 200" focusable="false">
        <circle class="education-orbit-track" cx="100" cy="100" r="77" />
        <circle class="education-orbit-flow" cx="100" cy="100" r="77" />
        ${nodes}
      </svg>
      <div class="education-orbit-center">
        <span class="mono-label">EDUCATION / PATHWAY</span>
        <strong>Learning<br /><em>in progress.</em></strong>
        <small>${String(entries.length).padStart(2, "0")} STAGES</small>
      </div>
    </div>
  `;
};
const projectOrbitMarkup = (projects) => {
  const nodes = projects
    .map((project, index) => {
      const angle = (index / projects.length) * Math.PI * 2 - Math.PI / 2;
      const x = (100 + Math.cos(angle) * 77).toFixed(2);
      const y = (100 + Math.sin(angle) * 77).toFixed(2);
      const number = escapeHtml(
        project.number || String(index + 1).padStart(2, "0"),
      );
      return `<circle class="education-orbit-node" cx="${x}" cy="${y}" r="3.2"><title>Study ${number}</title></circle>`;
    })
    .join("");

  return `
    <div class="education-orbit project-orbit" aria-hidden="true">
      <svg viewBox="0 0 200 200" focusable="false">
        <circle class="education-orbit-track" cx="100" cy="100" r="77" />
        <circle class="education-orbit-flow" cx="100" cy="100" r="77" />
        ${nodes}
      </svg>
      <div class="education-orbit-center">
        <span class="mono-label">ACADEMIC / STUDIES</span>
        <strong>Project<br /><em>work.</em></strong>
        <small>${String(projects.length).padStart(2, "0")} STUDIES</small>
      </div>
    </div>
  `;
};
export function renderPortfolio(portfolio) {
  const name = isFilled(portfolio.name) ? portfolio.name : "[YOUR_FULL_NAME]";

  const projects = (portfolio.projects || []).filter(
    (project) => isFilled(project.title) || isFilled(project.description),
  );
  const focusAreas = (portfolio.interests || []).filter(isFilled);
  const candidateExperience = Number.isInteger(
    portfolio.featuredExperienceIndex,
  )
    ? portfolio.fieldwork?.[portfolio.featuredExperienceIndex]
    : null;
  const featuredExperience =
    candidateExperience &&
    (isFilled(candidateExperience.title) ||
      isFilled(candidateExperience.description))
      ? candidateExperience
      : null;

  const socialLinks = [
    isFilled(portfolio.linkedin)
      ? `<a href="${escapeHtml(portfolio.linkedin)}" target="_blank" rel="noreferrer">LinkedIn ↗</a>`
      : "",
    isFilled(portfolio.github)
      ? `<a href="${escapeHtml(portfolio.github)}" target="_blank" rel="noreferrer">GitHub ↗</a>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const resumeLink = makeResumeLink(portfolio.resume);
  const hasConfiguredContactForm =
    /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+\/?$/.test(
      portfolio.contactFormEndpoint || "",
    );

  const academicDetails = [
    [portfolio.degree, "DEGREE"],
    [portfolio.college, "INSTITUTION"],
    [portfolio.currentYear, "ACADEMIC YEAR"],
    [portfolio.graduationYear, "GRADUATION"],
    [portfolio.city, "BASED IN"],
  ].filter(([value]) => isFilled(value));

  const emailMarkup = isFilled(portfolio.email)
    ? `<a class="contact-email" href="mailto:${escapeHtml(portfolio.email)}">
        ${escapeHtml(portfolio.email)} <span aria-hidden="true">↗</span>
      </a>`
    : `<p class="placeholder-note">
        Add your email in <code>src/data/portfolio.js</code> to show a direct email link.
      </p>`;

  // Replace missing local media with a calm placeholder instead of a broken-image icon.
  document.addEventListener(
    "error",
    (event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied)
        return;

      image.dataset.fallbackApplied = "true";
      const fallback = document.createElement("div");
      fallback.className = `image-fallback ${image.className}`.trim();
      fallback.setAttribute("role", "img");
      fallback.setAttribute(
        "aria-label",
        image.alt
          ? `${image.alt} image unavailable`
          : "Portfolio image unavailable",
      );

      const label = document.createElement("span");
      label.textContent = "IMAGE UNAVAILABLE";
      const note = document.createElement("small");
      note.textContent = "CHECK THE ASSET PATH";
      fallback.append(label, note);
      image.replaceWith(fallback);
    },
    true,
  );
  document.querySelector("#app").innerHTML = `
    <header class="site-header">
      <a class="wordmark" href="#top" aria-label="${escapeHtml(name)} — home">
        ${escapeHtml(name)}
      </a>

      <button
        class="menu-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="site-nav"
        aria-label="Open navigation"
      >
        <span></span>
        <span></span>
      </button>

      <nav id="site-nav" class="nav-links" aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#focus">Focus</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
        <a href="./gallery.html">Gallery</a>
        <a href="#contact">Contact</a>
        ${resumeLink}
      </nav>
    </header>

    <main id="main">
      <section class="hero section-wrap" id="top">
        <div class="hero-copy">
          <p class="eyebrow">
            <span class="marker"></span>
            CIVIL ENGINEERING STUDENT
          </p>

          <h1>Designing and Building the<br /><em>spaces we live in.</em></h1>


          <div class="hero-actions">
            <a class="button button-dark" href="#projects">
              Explore my projects <span aria-hidden="true">↓</span>
            </a>
            ${resumeLink}
          </div>

          <div class="hero-meta">
            ${isFilled(portfolio.city) ? `<span>${escapeHtml(portfolio.city)}</span>` : ""}
            ${
              isFilled(portfolio.graduationYear)
                ? `<span>CLASS OF ${escapeHtml(portfolio.graduationYear)}</span>`
                : ""
            }
          </div>
        </div>

        <div class="hero-visual">
          ${imageMarkup(portfolio.portrait, "Portrait of the portfolio owner", "portrait-image", portfolio.portraitWidth, portfolio.portraitHeight)}

          <div class="visual-label">
            <span>FIG. 01</span>
            <span>PROFILE / PORTRAIT</span>
          </div>

          <span class="dimension dimension-top">N—01</span>
          <span class="dimension dimension-side">01 / 04</span>
        </div>

        <div class="hero-index">PORTFOLIO — CIVIL ENGINEERING</div>
      </section>
      ${
        academicDetails.length
          ? `
            <section class="identity-strip section-wrap" aria-label="Academic information">
              ${academicDetails
                .map(
                  ([value, label]) => `
                    <div>
                      <span>${escapeHtml(label)}</span>
                      <strong>${escapeHtml(value)}</strong>
                    </div>
                  `,
                )
                .join("")}
            </section>
          `
          : ""
      }

      <section class="about section-wrap section-block" id="about">
        <div class="section-heading">
          <p class="eyebrow">01 — PROFILE</p>
          <span class="section-rule"></span>
        </div>

        <div class="about-grid">
          <h2>Grounded in<br /><em>curiosity.</em></h2>

          <div class="about-body">
            <p class="lead">
              ${
                isFilled(portfolio.bio)
                  ? escapeHtml(portfolio.bio)
                  : "Add a short biography describing your background and genuine interests in civil engineering."
              }
            </p>
          </div>

          <aside class="about-note">
            <p>Observe carefully.<br />Measure precisely.<br />Build with purpose.</p>
            <span class="note-line"></span>
          </aside>
        </div>
      </section>

      ${
        focusAreas.length || featuredExperience
          ? `
            <section class="focus-section section-wrap section-block" id="focus">
              <div class="section-heading">
                <p class="eyebrow">02 — CIVIL ENGINEERING</p>
                <span class="section-rule"></span>
                <span class="mono-label">FOCUS / PRACTICE</span>
              </div>

              <div class="section-title-row">
                <h2>Focus &amp; <em>experience.</em></h2>
              </div>

              <div class="focus-grid">
                ${
                  focusAreas.length
                    ? `
                      <article class="focus-card focus-areas">
                        <span class="mono-label">AREAS OF INTEREST</span>
                        <h3>Where I’m looking closer.</h3>
                        <div class="focus-tags">
                          ${focusAreas.map((area) => `<span class="tag">${escapeHtml(area)}</span>`).join("")}
                        </div>
                      </article>
                    `
                    : ""
                }

                ${
                  featuredExperience &&
                  (isFilled(featuredExperience.title) ||
                    isFilled(featuredExperience.description))
                    ? `
                      <article class="focus-card focus-experience">
                        <span class="mono-label">HIGHLIGHTED EXPERIENCE</span>
                        <div class="focus-experience-heading">
                          <h3>${escapeHtml(featuredExperience.title || "Practical experience")}</h3>
                          <span class="mono-label">
                            ${escapeHtml(featuredExperience.type || "FIELD EXPERIENCE")}
                            ${isFilled(featuredExperience.date) ? ` · ${escapeHtml(featuredExperience.date)}` : ""}
                          </span>
                        </div>
                        ${isFilled(featuredExperience.description) ? `<p>${escapeHtml(featuredExperience.description)}</p>` : ""}
                        ${
                          hasItems(featuredExperience.tools)
                            ? `<div class="focus-tags">${featuredExperience.tools
                                .filter(isFilled)
                                .map(
                                  (tool) =>
                                    `<span class="tag">${escapeHtml(tool)}</span>`,
                                )
                                .join("")}</div>`
                            : ""
                        }
                      </article>
                    `
                    : ""
                }
              </div>
            </section>
          `
          : ""
      }

      <section class="projects section-wrap section-block" id="projects">
        <div class="section-heading">
          <p class="eyebrow">03 — ACADEMIC WORK</p>
          <span class="section-rule"></span>
          <span class="mono-label">${String(projects.length).padStart(2, "0")} STUDIES</span>
        </div>

        <div class="section-title-row">
          <h2>Project <em>studies.</em></h2>
        </div>


        ${
          projects.length
            ? `
              <div class="project-flow">
                ${projectOrbitMarkup(projects)}
                <div class="project-study-list">
                  ${projects
                    .map(
                      (project, index) => `
                        <button
                          class="project-card project-study-entry"
                          type="button"
                          data-project="${index}"
                          aria-label="View details for ${escapeHtml(project.title || `Project ${project.number}`)}"
                        >
                          <span class="education-step" aria-hidden="true">${escapeHtml(project.number || String(index + 1).padStart(2, "0"))}</span>
                          <div class="project-study-copy">
                            <div class="project-study-meta">
                              <span class="mono-label">${escapeHtml(project.kind || project.category || "PROJECT STUDY")}</span>
                              ${isFilled(project.date) ? `<span class="project-date">${escapeHtml(project.date)}</span>` : ""}
                            </div>
                            <h3>${escapeHtml(project.title || `Project ${project.number}`)}</h3>
                            ${isFilled(project.description) ? `<p>${escapeHtml(project.description)}</p>` : ""}
                          </div>
                          <span class="project-study-thumb" aria-hidden="true">${imageMarkup(project.image, project.alt || project.title, "project-study-image", project.imageWidth, project.imageHeight)}</span>
                          <span class="project-study-arrow" aria-hidden="true">↗</span>
                        </button>
                      `,
                    )
                    .join("")}
                </div>
              </div>
            `
            : `
              <div class="project-empty">
                <div class="empty-grid" aria-hidden="true">
                  <span>01</span><span>02</span><span>03</span><span>04</span>
                </div>
                <div>
                  <span class="mono-label">YOUR WORK, WHEN IT'S READY</span>
                  <p>Add real project titles and descriptions in the content file to make your project studies appear here.</p>
                </div>
              </div>
            `
        }
      </section>

      ${
        hasItems(portfolio.skills)
          ? `
            <section class="skills section-wrap section-block" id="skills">
              <div class="section-heading">
                <p class="eyebrow">04 — CAPABILITIES</p>
                <span class="section-rule"></span>
              </div>

              <div class="section-title-row">
                <h2>Tools of the <em>trade.</em></h2>
              </div>

              <div class="skill-grid">
                ${portfolio.skills
                  .map(
                    (group) => `
                      <article class="skill-group">
                        <span class="mono-label">${escapeHtml(group.category || "")}</span>

                        <ul>
                          ${(group.items || [])
                            .map((item) => {
                              const tool =
                                typeof item === "string" ? item : item.name;
                              const level =
                                typeof item === "object" && item
                                  ? item.level
                                  : "";

                              if (!isFilled(tool)) return "";

                              return `
                                <li>
                                  ${escapeHtml(tool)}
                                  ${isFilled(level) ? `<small>${escapeHtml(level)}</small>` : ""}
                                </li>
                              `;
                            })
                            .join("")}
                        </ul>
                      </article>
                    `,
                  )
                  .join("")}
              </div>
            </section>
          `
          : ""
      }

      ${
        hasItems(portfolio.education)
          ? `
            <section class="education section-wrap section-block" id="education">
              <div class="section-heading">
                <p class="eyebrow">05 — EDUCATION</p>
                <span class="section-rule"></span>
              </div>

              <h2>Learning <em>in progress.</em></h2>

              <div class="education-flow">
                ${educationOrbitMarkup(portfolio.education)}
                <div class="education-list">
                  ${portfolio.education
                    .map(
                      (entry, index) => `
                        <article class="education-entry">
                          <span class="education-step" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
                          <span class="mono-label">
                            ${escapeHtml(entry.start || "")} — ${escapeHtml(entry.end || "")}
                          </span>

                          <div class="education-details">
                            <h3>${escapeHtml(entry.degree || "")}</h3>
                            <p>
                              ${escapeHtml(entry.institution || "")}
                              ${isFilled(entry.location) ? ` · ${escapeHtml(entry.location)}` : ""}
                            </p>
                            ${
                              hasItems(entry.coursework)
                                ? `<small>${escapeHtml(entry.courseworkLabel || "COURSEWORK")} · ${entry.coursework.map(escapeHtml).join(" / ")}</small>`
                                : ""
                            }
                            ${hasItems(entry.labwork) ? `<small>SELECTED LAB COURSES · ${entry.labwork.map(escapeHtml).join(" / ")}</small>` : ""}
                          </div>

                          ${
                            isFilled(entry.result)
                              ? `<span class="result">${escapeHtml(entry.result)}</span>`
                              : ""
                          }
                        </article>
                      `,
                    )
                    .join("")}
                </div>
              </div>
            </section>
          `
          : ""
      }

      ${
        hasItems(portfolio.certifications)
          ? `
            <section class="extras certifications-section section-wrap section-block">
              <div class="section-heading">
                <p class="eyebrow">06 — CERTIFICATIONS & ACHIEVEMENTS</p>
                <span class="section-rule"></span>
              </div>

              <div class="extra-grid">
                ${portfolio.certifications
                  .map(
                    (item) => `
                      <article>
                        <span class="mono-label">${escapeHtml(item.date || "")}</span>
                        <h3>${escapeHtml(item.title || "")}</h3>

                        <p>
                          ${escapeHtml(item.issuer || "")}
                          ${isFilled(item.description) ? ` — ${escapeHtml(item.description)}` : ""}
                        </p>

                        ${
                          isFilled(item.url)
                            ? `<a href="${escapeHtml(item.url)}">View documentation ↗</a>`
                            : ""
                        }
                      </article>
                    `,
                  )
                  .join("")}
              </div>
            </section>
          `
          : ""
      }

      <section class="contact section-wrap section-block" id="contact">
        <div class="section-heading">
          <p class="eyebrow">07 — CONTACT</p>
          <span class="section-rule"></span>
        </div>

        <div class="contact-layout">
          <div>
            <span class="mono-label">OPEN TO MEANINGFUL CONVERSATION</span>
            <h2>Let's build<br /><em>what's next.</em></h2>
          </div>

          <div class="contact-links">
            ${emailMarkup}

            <form
              class="contact-form"
              action="${escapeHtml(portfolio.contactFormEndpoint || "")}"
              method="POST"
            >
              <input
                type="hidden"
                name="_subject"
                value="New portfolio contact"
              />

              <label for="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autocomplete="name"
                required
              />

              <label for="contact-email">Your email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autocomplete="email"
                required
              />

              <label for="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                required
              ></textarea>

              <button class="button button-light" type="submit">
                Send message <span aria-hidden="true">↗</span>
              </button>

              <p class="form-note" role="status" aria-live="polite">
                
              </p>
            </form>
            ${hasConfiguredContactForm ? "" : '<p class="form-note">The contact form is not connected yet. Please use the email link above.</p>'}

            ${isFilled(portfolio.city) ? `<span class="mono-label">${escapeHtml(portfolio.city)}</span>` : ""}
            <div class="social-links">${socialLinks}</div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer section-wrap">
      <a class="wordmark" href="#top">${escapeHtml(name)}</a>
      <span>ENGINEERING / DESIGN / PLACE</span>
      <span>© <span id="current-year"></span></span>
    </footer>

    <dialog class="project-dialog" aria-labelledby="dialog-title">
      <button class="dialog-close" type="button" aria-label="Close project details">×</button>
      <div class="dialog-content"></div>
    </dialog>
  `;

  const courseworkAreas = portfolio.courseworkAreas || [];
  if (courseworkAreas.length) {
    const learning = document.createElement("div");
    learning.className = "coursework-learning";
    learning.setAttribute("aria-labelledby", "coursework-heading");
    const label = document.createElement("span");
    label.className = "mono-label";
    label.textContent = "CIVIL ENGINEERING / COURSEWORK";
    const heading = document.createElement("h3");
    heading.id = "coursework-heading";
    heading.textContent = "Core coursework & laboratory exposure.";
    const note = document.createElement("p");
    note.className = "coursework-note";
    note.textContent = "Selected topics from civil engineering coursework and laboratories. This describes my academic exposure, and littlebit proficiency ratings.";
    const grid = document.createElement("div");
    grid.className = "skill-grid coursework-grid";
    courseworkAreas.forEach((area) => {
      const card = document.createElement("article");
      card.className = "skill-group";
      const category = document.createElement("span");
      category.className = "mono-label";
      category.textContent = area.category;
      const list = document.createElement("ul");
      (area.items || []).forEach((item) => {
        const row = document.createElement("li");
        row.textContent = item;
        list.append(row);
      });
      if (area.favorite) {
        card.classList.add("coursework-favorite");
        const favorite = document.createElement("small");
        favorite.className = "coursework-favorite-label";
        favorite.textContent = "FAVORITE SUBJECT";
        card.append(category, favorite, list);
      } else {
        card.append(category, list);
      }
      grid.append(card);
    });
    learning.append(label, heading, note, grid);
    document.querySelector("#skills")?.append(learning);
  }

  document.title = `${name} — Civil Engineering Portfolio`;
  document.querySelector("#current-year").textContent =
    new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#site-nav");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation",
    );
    navigation.classList.toggle("nav-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("nav-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("nav-open");
      menuButton.focus();
    }
  });

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const status = contactForm.querySelector("[role='status']");
      const submit = contactForm.querySelector("[type='submit']");
      if (!hasConfiguredContactForm) {
        status.textContent = "This form is ready, but message delivery is not connected yet. Add your Formspree endpoint in src/data/portfolio.js.";
        status.dataset.state = "error";
        return;
      }
      submit.disabled = true;
      status.textContent = "Sending your message…";
      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Request failed");
        contactForm.reset();
        status.textContent =
          "Your message was sent. Thank you for reaching out.";
      } catch {
        status.textContent =
          "Your message could not be sent. Please try again or use the email link.";
      } finally {
        submit.disabled = false;
      }
    });
  }

  const dialog = document.querySelector(".project-dialog");
  const dialogContent = dialog.querySelector(".dialog-content");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const project = projects[Number(card.dataset.project)];

      const details = [
        ["OBJECTIVE", project.objective],
        ["TOOLS", hasItems(project.tools) ? project.tools.join(", ") : ""],
        ["CONTRIBUTION", project.contribution],
        ["METHODOLOGY", project.methodology],
        ["RESULTS", project.results],
      ].filter(([, value]) => isFilled(value));

      dialogContent.innerHTML = `
        ${imageMarkup(project.image, project.alt || project.title, "dialog-image")}

        <span class="mono-label">
          ${escapeHtml(project.kind || project.category || "PROJECT")}
          ${isFilled(project.date) ? ` · ${escapeHtml(project.date)}` : ""}
        </span>

        <h2 id="dialog-title">${escapeHtml(project.title || "Project details")}</h2>
        <p class="lead">${escapeHtml(project.description || "")}</p>

        ${details
          .map(
            ([label, value]) => `
              <div class="detail-row">
                <span class="mono-label">${label}</span>
                <p>${escapeHtml(value)}</p>
              </div>
            `,
          )
          .join("")}

        ${
          isFilled(project.report)
            ? `<a class="text-link" href="${escapeHtml(localAssetUrl(project.report))}">View report ↗</a>`
            : ""
        }

        ${
          isFilled(project.link)
            ? `<a class="text-link" href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">Project link ↗</a>`
            : ""
        }
      `;

      dialog.showModal();
    });
  });

  document.querySelector(".dialog-close").addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Reveal existing content once, with a restrained stagger inside each group.
  // Without the observer (or when reduced motion is preferred), content stays visible.
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const revealTargets = [
    ...document.querySelectorAll(
      ".section-heading, .section-title-row > *, .about-grid > *, .focus-card, .project-card, .project-empty, .identity-strip > div, .skill-group, .education-orbit, .education-entry, .extra-grid article, .contact-layout > *",
    ),
  ];

  if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window &&
    revealTargets.length
  ) {
    const groupIndexes = new Map();

    revealTargets.forEach((element) => {
      const group = element.parentElement;
      const index = groupIndexes.get(group) || 0;

      groupIndexes.set(group, index + 1);
      element.classList.add("motion-reveal");
      element.style.setProperty("--reveal-delay", `${(index % 5) * 55}ms`);
    });

    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    revealTargets.forEach((element) => revealObserver.observe(element));
  }
}
