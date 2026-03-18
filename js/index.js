let tutorials = [];
let tutorialsLoaded = false;
let observerStarted = false;
let indexInitInProgress = false;
let lastInitializedContainer = null;

async function loadTutorials() {
  if (tutorialsLoaded) return tutorials;

  const response = await fetch("data/tutorials.json");
  if (!response.ok) {
    throw new Error(`Failed to load tutorials: ${response.status}`);
  }

  const data = await response.json();
  tutorials = Array.isArray(data)
    ? data
    : (Array.isArray(data.tutorials) ? data.tutorials : []);

  tutorialsLoaded = true;
  return tutorials;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = String(text ?? "");
  return div.innerHTML;
}

function trimText(text, maxLength = 255) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  return clean.length > maxLength ? clean.slice(0, maxLength).trimEnd() + "..." : clean;
}

function getUniqueSections(data) {
  return [...new Set((data || []).map(item => item.section).filter(Boolean))].sort();
}

function getUniqueTags(data) {
  return [...new Set((data || []).flatMap(item => Array.isArray(item.tags) ? item.tags : []))].sort();
}

function populateFilters(pageRoot) {
  const sectionFilter = pageRoot.querySelector("#sectionFilter");
  const tagFilter = pageRoot.querySelector("#tagFilter");

  if (!sectionFilter || !tagFilter) return;

  sectionFilter.innerHTML = `<option value="all">All Sections</option>`;
  tagFilter.innerHTML = `<option value="all">All Tags</option>`;

  getUniqueSections(tutorials).forEach(section => {
    const option = document.createElement("option");
    option.value = section;
    option.textContent = section;
    sectionFilter.appendChild(option);
  });

  getUniqueTags(tutorials).forEach(tag => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagFilter.appendChild(option);
  });
}

function filterTutorials(pageRoot) {
  const searchValue = (pageRoot.querySelector("#searchInput")?.value || "").toLowerCase().trim();
  const sectionValue = pageRoot.querySelector("#sectionFilter")?.value || "all";
  const tagValue = pageRoot.querySelector("#tagFilter")?.value || "all";

  return tutorials.filter(tutorial => {
    const title = String(tutorial.title || "").toLowerCase();
    const text = String(tutorial.text || "").toLowerCase();
    const section = String(tutorial.section || "").toLowerCase();
    const tags = Array.isArray(tutorial.tags) ? tutorial.tags : [];

    const matchesSearch =
      title.includes(searchValue) ||
      text.includes(searchValue) ||
      section.includes(searchValue) ||
      tags.some(tag => String(tag).toLowerCase().includes(searchValue));

    const matchesSection = sectionValue === "all" || tutorial.section === sectionValue;
    const matchesTag = tagValue === "all" || tags.includes(tagValue);

    return matchesSearch && matchesSection && matchesTag;
  });
}

function groupBySection(data) {
  return data.reduce((groups, tutorial) => {
    const section = tutorial.section || "Uncategorized";
    if (!groups[section]) groups[section] = [];
    groups[section].push(tutorial);
    return groups;
  }, {});
}

function createTutorialCard(tutorial) {
  const tagsHtml = (Array.isArray(tutorial.tags) ? tutorial.tags : [])
    .map(tag => `<span class="badge bg-secondary me-1 mb-1">${escapeHtml(tag)}</span>`)
    .join("");

  return `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card tutorial-card h-100">
        <div class="card-body d-flex flex-column">
          <div class="mb-2">
            <span class="badge bg-primary">${escapeHtml(tutorial.section || "Uncategorized")}</span>
          </div>

          <h5 class="card-title">${escapeHtml(tutorial.title || "Untitled")}</h5>
          <p class="card-text text-muted">${escapeHtml(trimText(tutorial.text || ""))}</p>

          <div class="mb-3">${tagsHtml}</div>

          <div class="mt-auto">
            <button
              type="button"
              class="btn btn-outline-primary tutorial-card-link"
              data-slug="${escapeHtml(tutorial.slug || "")}"
            >
              Open Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTutorials(pageRoot) {
  const container = pageRoot.querySelector("#tutorialsContainer");
  if (!container) return;

  const filtered = filterTutorials(pageRoot);

  if (!filtered.length) {
    container.innerHTML = `
      <div class="text-center py-5 text-muted">
        <h4>No tutorials found</h4>
        <p>Try changing your search or filters.</p>
      </div>
    `;
    return;
  }

  const grouped = groupBySection(filtered);

  container.innerHTML = Object.keys(grouped)
    .sort()
    .map(section => `
      <div class="section-group mb-4">
        <h3 class="border-start border-4 ps-3 mb-3">${escapeHtml(section)}</h3>
        <div class="row">
          ${grouped[section].map(createTutorialCard).join("")}
        </div>
      </div>
    `)
    .join("");
}

function saveTutorialListState(pageRoot) {
  const state = {
    search: pageRoot.querySelector("#searchInput")?.value || "",
    section: pageRoot.querySelector("#sectionFilter")?.value || "all",
    tag: pageRoot.querySelector("#tagFilter")?.value || "all",
    scrollY: window.scrollY || 0
  };

  sessionStorage.setItem("tutorialListState", JSON.stringify(state));
}

function restoreTutorialListState(pageRoot) {
  const raw = sessionStorage.getItem("tutorialListState");
  if (!raw) return;

  try {
    const state = JSON.parse(raw);

    const searchInput = pageRoot.querySelector("#searchInput");
    const sectionFilter = pageRoot.querySelector("#sectionFilter");
    const tagFilter = pageRoot.querySelector("#tagFilter");

    if (searchInput) searchInput.value = state.search || "";
    if (sectionFilter) sectionFilter.value = state.section || "all";
    if (tagFilter) tagFilter.value = state.tag || "all";

    renderTutorials(pageRoot);

    setTimeout(() => {
      window.scrollTo(0, Number(state.scrollY || 0));
    }, 0);
  } catch (error) {
    console.error("Failed to restore tutorial list state:", error);
  }
}

function selectTutorial(slug) {
  if (!slug) return;

  const pageRoot = document.getElementById("main-section");
  if (pageRoot) {
    saveTutorialListState(pageRoot);
  }

  sessionStorage.setItem("selectedTutorialSlug", slug);

  if (typeof window.loadContent === "function") {
    window.loadContent("tutorial");
  } else {
    console.error("window.loadContent is not available");
  }
}

function bindTutorialIndexEvents(pageRoot) {
  const searchInput = pageRoot.querySelector("#searchInput");
  const sectionFilter = pageRoot.querySelector("#sectionFilter");
  const tagFilter = pageRoot.querySelector("#tagFilter");

  if (searchInput && !searchInput.dataset.bound) {
    searchInput.addEventListener("input", () => renderTutorials(pageRoot));
    searchInput.dataset.bound = "true";
  }

  if (sectionFilter && !sectionFilter.dataset.bound) {
    sectionFilter.addEventListener("change", () => renderTutorials(pageRoot));
    sectionFilter.dataset.bound = "true";
  }

  if (tagFilter && !tagFilter.dataset.bound) {
    tagFilter.addEventListener("change", () => renderTutorials(pageRoot));
    tagFilter.dataset.bound = "true";
  }

  if (!pageRoot.dataset.cardClickBound) {
    pageRoot.addEventListener("click", event => {
      const button = event.target.closest(".tutorial-card-link");
      if (!button) return;
      selectTutorial(button.dataset.slug);
    });

    pageRoot.dataset.cardClickBound = "true";
  }
}

async function initTutorialIndex() {
  const pageRoot = document.getElementById("main-section");
  if (!pageRoot || indexInitInProgress) return;

  const container = pageRoot.querySelector("#tutorialsContainer");
  if (!container) return;

  if (container === lastInitializedContainer) return;

  indexInitInProgress = true;
  lastInitializedContainer = container;

  try {
    await loadTutorials();
    bindTutorialIndexEvents(pageRoot);
    populateFilters(pageRoot);
    renderTutorials(pageRoot);
    restoreTutorialListState(pageRoot);
  } catch (error) {
    console.error("initTutorialIndex error:", error);
    container.innerHTML = `
      <div class="alert alert-danger">
        Failed to load tutorials: ${escapeHtml(error?.message || error)}
      </div>
    `;
  } finally {
    indexInitInProgress = false;
  }
}

function startTutorialIndexObserver() {
  if (observerStarted) return;
  observerStarted = true;

  const mainSection = document.getElementById("main-section");
  if (!mainSection) return;

  const observer = new MutationObserver(() => {
    initTutorialIndex();
  });

  observer.observe(mainSection, {
    childList: true
  });

  initTutorialIndex();
}

document.addEventListener("DOMContentLoaded", startTutorialIndexObserver);