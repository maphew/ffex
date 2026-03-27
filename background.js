// Toggle sidebar when toolbar button is clicked
browser.action.onClicked.addListener(() => {
  browser.sidebarAction.toggle();
});

// Create context menu items
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "claude-selection",
    title: "Ask Claude about \"%s\"",
    contexts: ["selection"]
  });

  browser.contextMenus.create({
    id: "claude-page",
    title: "Ask Claude about this page",
    contexts: ["page"]
  });

  browser.contextMenus.create({
    id: "claude-link",
    title: "Ask Claude about this link",
    contexts: ["link"]
  });

  browser.contextMenus.create({
    id: "claude-image",
    title: "Ask Claude about this image",
    contexts: ["image"]
  });
});

// Handle context menu clicks
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  // Open the sidebar first
  await browser.sidebarAction.open();

  if (info.menuItemId === "claude-selection") {
    // Send selected text to sidebar
    browser.runtime.sendMessage({
      action: "sendToClaude",
      type: "selection",
      text: info.selectionText,
      pageUrl: tab.url,
      pageTitle: tab.title
    });
  } else if (info.menuItemId === "claude-page") {
    // Extract page content via content script
    try {
      const results = await browser.tabs.sendMessage(tab.id, {
        action: "getPageContent"
      });
      browser.runtime.sendMessage({
        action: "sendToClaude",
        type: "page",
        text: results.content,
        pageUrl: tab.url,
        pageTitle: tab.title
      });
    } catch (e) {
      // Fallback: just send URL and title
      browser.runtime.sendMessage({
        action: "sendToClaude",
        type: "page",
        text: "(Page content unavailable)",
        pageUrl: tab.url,
        pageTitle: tab.title
      });
    }
  } else if (info.menuItemId === "claude-link") {
    browser.runtime.sendMessage({
      action: "sendToClaude",
      type: "selection",
      text: `Link: ${info.linkUrl}`,
      pageUrl: tab.url,
      pageTitle: tab.title
    });
  } else if (info.menuItemId === "claude-image") {
    browser.runtime.sendMessage({
      action: "sendToClaude",
      type: "selection",
      text: `Image: ${info.srcUrl}`,
      pageUrl: tab.url,
      pageTitle: tab.title
    });
  }
});
