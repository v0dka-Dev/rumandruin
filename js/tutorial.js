let tutorialObserverStarted = false;
let tutorialInitInProgress = false;
let lastInitializedTutorialContainer = null;

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = String(text ?? "");
  return div.innerHTML;
}

async function loadTutorialData() {
  const response = await fetch("data/tutorials.json");
  if (!response.ok) {
    throw new Error(`Failed to load tutorials: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data)
    ? data
    : (Array.isArray(data.tutorials) ? data.tutorials : []);
}

function getSelectedSlug() {
  return sessionStorage.getItem("selectedTutorialSlug") || "";
}

function showMessage(container, message, type = "warning") {
  if (!container) return;

  container.innerHTML = `
    <div class="alert alert-${type}">
      ${escapeHtml(message)}
    </div>
  `;
}

function renderTutorial(container, tutorial) {
  const tagsHtml = (Array.isArray(tutorial.tags) ? tutorial.tags : [])
    .map(tag => `<span class="badge bg-secondary me-1 mb-1">${escapeHtml(tag)}</span>`)
    .join("");

  container.innerHTML = `
    <h1>${escapeHtml(tutorial.title || "Untitled")}</h1>
    <p class="text-muted mb-3">Section: ${escapeHtml(tutorial.section || "Uncategorized")}</p>
    <div class="mb-4">${tagsHtml}</div>

    <div class="tutorial-content ql-editor">
      ${tutorial.content || `<p>${escapeHtml(tutorial.text || "No tutorial content available.")}</p>`}
    </div>
  `;
}

async function initTutorialPage() {
  const pageRoot = document.getElementById("main-section");
  if (!pageRoot || tutorialInitInProgress) return;

  const container = pageRoot.querySelector("#tutorialContainer");
  if (!container) return;

  if (container === lastInitializedTutorialContainer) return;

  tutorialInitInProgress = true;
  lastInitializedTutorialContainer = container;

  try {
    showMessage(container, "Loading tutorial...", "secondary");

    const tutorials = await loadTutorialData();
    const slug = getSelectedSlug();

    console.log("Selected tutorial slug:", slug);
    console.log("Tutorial data loaded:", tutorials);

    if (!slug) {
      showMessage(container, "No tutorial selected.", "warning");
      return;
    }

    const tutorial = tutorials.find(item => item.slug === slug);

    if (!tutorial) {
      showMessage(container, `Tutorial not found for slug: ${slug}`, "danger");
      return;
    }

    renderTutorial(container, tutorial);
  } catch (error) {
    console.error("initTutorialPage error:", error);
    showMessage(container, `Failed to load tutorial: ${error?.message || error}`, "danger");
  } finally {
    tutorialInitInProgress = false;
  }
}

function bindTutorialPageEvents() {
  
  const mainSection = document.getElementById("main-section");
  if (!mainSection || mainSection.dataset.tutorialBackBound === "true") return;

  mainSection.addEventListener("click", event => {
    const backButton = event.target.closest(".tutorial-back-button");
    if (!backButton) return;

    if (typeof window.loadContent === "function") {
      window.loadContent("tutorial_index");
    } else {
      console.error("window.loadContent is not available");
    }
  });

  mainSection.dataset.tutorialBackBound = "true";
}

function startTutorialObserver() {
  if (tutorialObserverStarted) return;
  tutorialObserverStarted = true;

  const mainSection = document.getElementById("main-section");
  if (!mainSection) return;

  bindTutorialPageEvents();

  const observer = new MutationObserver(() => {
    initTutorialPage();
  });

  observer.observe(mainSection, {
    childList: true
  });

  initTutorialPage();
}

document.addEventListener("DOMContentLoaded", startTutorialObserver);