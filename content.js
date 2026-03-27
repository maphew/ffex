// Content script: extracts page text when requested by the background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getPageContent") {
    // Extract meaningful text content from the page
    const content = extractPageContent();
    sendResponse({ content });
  }
});

function extractPageContent() {
  // Try to get article content first (for blog posts, articles, etc.)
  const article = document.querySelector("article");
  if (article) {
    return truncate(cleanText(article.innerText));
  }

  // Try common main content selectors
  const mainSelectors = ["main", "[role='main']", "#content", ".content", "#main"];
  for (const selector of mainSelectors) {
    const el = document.querySelector(selector);
    if (el && el.innerText.trim().length > 100) {
      return truncate(cleanText(el.innerText));
    }
  }

  // Fallback to body, excluding nav, footer, header, sidebar elements
  const body = document.body.cloneNode(true);
  const removeSelectors = [
    "nav", "header", "footer", "aside",
    "[role='navigation']", "[role='banner']", "[role='contentinfo']",
    "script", "style", "noscript", ".sidebar", "#sidebar"
  ];
  for (const sel of removeSelectors) {
    body.querySelectorAll(sel).forEach(el => el.remove());
  }

  return truncate(cleanText(body.innerText));
}

function cleanText(text) {
  return text
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function truncate(text, maxLength = 8000) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "\n\n[Content truncated...]";
}
