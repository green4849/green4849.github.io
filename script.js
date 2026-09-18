const data = window.portfolioData;

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderResearch = () => {
  const target = document.querySelector("#research-grid");
  target.innerHTML = data.research
    .map(
      (item, index) => `
        <article class="research-card reveal" style="--delay: ${index * 80}ms">
          <div class="research-card-head">
            <span class="research-number">${escapeHtml(item.number)}</span>
            <span class="status-badge">${escapeHtml(item.status)}</span>
          </div>
          <p class="research-period">${escapeHtml(item.period)}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="research-summary">${escapeHtml(item.summary)}</p>
          <details>
            <summary>연구 내용 자세히 보기</summary>
            <ul>
              ${item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
            </ul>
          </details>
          <div class="tag-list">
            ${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
};

const publicationMarkup = (item, index) => `
  <article
    class="publication-item reveal${item.draft ? " is-draft" : ""}"
    data-type="${escapeHtml(item.type)}"
    style="--delay: ${Math.min(index * 60, 240)}ms"
  >
    <div class="publication-year">${escapeHtml(item.year)}</div>
    <div class="publication-body">
      <div class="publication-meta">
        <span>${escapeHtml(item.typeLabel)}</span>
        <span>${escapeHtml(item.role)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.venue)}</p>
    </div>
    <span class="publication-note">${escapeHtml(item.note)}</span>
  </article>
`;

const renderPublications = (filter = "all") => {
  const target = document.querySelector("#publication-list");
  const filtered = data.publications.filter(
    (item) =>
      (data.showDrafts || !item.draft) &&
      (filter === "all" || item.type === filter)
  );
  target.innerHTML = filtered.map(publicationMarkup).join("");
  observeReveals(target);
};

const renderHonors = (selector, items) => {
  const target = document.querySelector(selector);
  target.innerHTML = items
    .map(
      (item, index) => `
        <article class="timeline-item reveal" style="--delay: ${Math.min(index * 50, 250)}ms">
          <div class="timeline-dot" aria-hidden="true"></div>
          <time>${escapeHtml(item.year)}</time>
          <div class="timeline-content">
            <div class="timeline-title-row">
              <h3>${escapeHtml(item.title)}</h3>
              <span>${escapeHtml(item.category)}</span>
            </div>
            <p>${escapeHtml(item.detail)}</p>
            <small>${escapeHtml(item.organization)}</small>
          </div>
        </article>
      `
    )
    .join("");
};

const renderActivities = () => {
  const target = document.querySelector("#activity-grid");
  target.innerHTML = data.activities
    .map(
      (item, index) => `
        <article class="activity-card reveal" style="--delay: ${index * 60}ms">
          <div class="activity-label">${escapeHtml(item.label)}</div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
          <time>${escapeHtml(item.period)}</time>
        </article>
      `
    )
    .join("");
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function observeReveals(root = document) {
  root.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => {
    revealObserver.observe(element);
  });
}

const setupPublicationFilters = () => {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      renderPublications(button.dataset.filter);
    });
  });
};

const setupNavigation = () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("#nav-links");

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "메뉴 열기" : "메뉴 닫기");
    links.classList.toggle("is-open", !isOpen);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "메뉴 열기");
    });
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...links.querySelectorAll("a")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${current.target.id}`
        );
      });
    },
    { rootMargin: "-28% 0px -58%", threshold: [0, 0.2, 0.5] }
  );
  sections.forEach((section) => sectionObserver.observe(section));
};

const setupTheme = () => {
  const root = document.documentElement;
  const button = document.querySelector(".theme-toggle");
  const stored = localStorage.getItem("portfolio-theme");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (preferredDark ? "dark" : "light");

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    button.setAttribute(
      "aria-label",
      theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"
    );
  };

  applyTheme(initial);
  button.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });
};

const showToast = (message) => {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
};

const setupCvButton = () => {
  const button = document.querySelector("#cv-button");
  button.addEventListener("click", () => {
    if (data.cvUrl) {
      window.open(data.cvUrl, "_blank", "noopener,noreferrer");
      return;
    }
    showToast("CV PDF가 완성되면 data.js의 cvUrl에 경로를 연결해 주세요.");
  });
};

renderResearch();
renderPublications();
renderHonors("#award-list", data.awards);
renderActivities();
renderHonors("#scholarship-list", data.scholarships);
setupPublicationFilters();
setupNavigation();
setupTheme();
setupCvButton();
observeReveals();
document.querySelector("#current-year").textContent = new Date().getFullYear();
