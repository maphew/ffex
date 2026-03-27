const DEFAULT_URL = "https://claude.ai/new";

const urlInput = document.getElementById("claude-url");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");
const status = document.getElementById("status");

async function loadSettings() {
  const result = await browser.storage.sync.get({ claudeUrl: DEFAULT_URL });
  urlInput.value = result.claudeUrl === DEFAULT_URL ? "" : result.claudeUrl;
}

async function saveSettings() {
  const url = urlInput.value.trim() || DEFAULT_URL;
  await browser.storage.sync.set({ claudeUrl: url });

  // Notify sidebar to reload
  browser.runtime.sendMessage({ action: "updatePanel" }).catch(() => {
    // Sidebar might not be open — that's fine
  });

  // Show confirmation
  status.classList.add("visible");
  setTimeout(() => status.classList.remove("visible"), 2000);
}

saveBtn.addEventListener("click", saveSettings);

resetBtn.addEventListener("click", () => {
  urlInput.value = "";
  saveSettings();
});

urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveSettings();
});

loadSettings();
