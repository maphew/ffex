const DEFAULT_URL = "https://claude.ai/new";

const frame = document.getElementById("claude-frame");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorMessage = document.getElementById("error-message");
const retryBtn = document.getElementById("retry-btn");
const openTabBtn = document.getElementById("open-tab-btn");
const toast = document.getElementById("toast");

let claudeUrl = DEFAULT_URL;

async function loadSettings() {
  const result = await browser.storage.sync.get({ claudeUrl: DEFAULT_URL });
  claudeUrl = result.claudeUrl;
}

function showLoading() {
  loading.classList.remove("hidden");
  error.classList.add("hidden");
  frame.style.display = "none";
}

function showError(msg) {
  loading.classList.add("hidden");
  error.classList.remove("hidden");
  frame.style.display = "none";
  errorMessage.textContent = msg;
}

function showFrame() {
  loading.classList.add("hidden");
  error.classList.add("hidden");
  frame.style.display = "block";
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2500);
}

function loadClaude(url) {
  showLoading();
  frame.src = url || claudeUrl;
}

frame.addEventListener("load", () => {
  // If the frame loaded successfully, show it
  showFrame();
});

retryBtn.addEventListener("click", () => {
  loadClaude();
});

openTabBtn.addEventListener("click", () => {
  browser.tabs.create({ url: claudeUrl });
});

// Listen for messages from background script (e.g., context menu actions)
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "sendToClaude") {
    // Build a Claude URL with the text pre-filled
    const text = message.text;
    const pageUrl = message.pageUrl;
    const pageTitle = message.pageTitle;

    let prompt = "";
    if (message.type === "selection") {
      prompt = `Regarding this text from "${pageTitle}" (${pageUrl}):\n\n"${text}"\n\n`;
    } else if (message.type === "page") {
      prompt = `Regarding the page "${pageTitle}" (${pageUrl}):\n\n${text}\n\n`;
    }

    // Store the prompt and load Claude - the user can paste it
    if (prompt) {
      navigator.clipboard.writeText(prompt).then(() => {
        showToast("Copied to clipboard — paste into Claude");
      }).catch(() => {
        showToast("Text ready — open Claude to chat");
      });
    }

    // Make sure the sidebar shows Claude
    loadClaude();
  } else if (message.action === "updatePanel") {
    loadSettings().then(() => loadClaude());
  }
});

// Initialize
loadSettings().then(() => loadClaude());
