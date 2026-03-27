# Claude for Firefox

A Firefox extension that brings [Claude AI](https://claude.ai) to your browser sidebar — the Firefox equivalent of the [Claude Chrome extension](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn).

## Features

- **Sidebar panel** — Chat with Claude in a sidebar while browsing any website
- **Toolbar toggle** — Click the toolbar icon to show/hide the Claude sidebar
- **Keyboard shortcut** — Press `Alt+C` to toggle the sidebar (customizable via `about:addons`)
- **Context menu integration** — Right-click to:
  - Ask Claude about selected text
  - Ask Claude about the current page (extracts page content)
  - Ask Claude about a link
  - Ask Claude about an image
- **Configurable URL** — Pin a specific Claude conversation in the sidebar
- **Dark mode** — Respects your system theme

## Installation

### From source (temporary, for development)

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on..."**
3. Select the `manifest.json` file from this directory
4. The Claude sidebar icon will appear in your toolbar

### Building an XPI package

```bash
# Install web-ext (Mozilla's extension tool)
npm install -g web-ext

# Build the extension
web-ext build

# The .xpi file will be in web-ext-artifacts/
```

### Permanent installation (unsigned)

1. Navigate to `about:config`
2. Set `xpinstall.signatures.required` to `false` (Firefox Developer Edition or Nightly only)
3. Drag the `.xpi` file into Firefox

## Usage

1. Click the Claude icon in the toolbar or press `Alt+C` to open the sidebar
2. Sign in to your Claude account if needed
3. Start chatting!

### Context menu

Select text on any page, right-click, and choose **"Ask Claude about..."** to copy the selected text with page context to your clipboard. Paste it into the Claude sidebar to continue.

### Settings

Right-click the extension icon → **"Manage Extension"** → **"Options"** to configure:
- **Claude URL** — Set a specific conversation URL to pin in the sidebar

## Differences from the Chrome Extension

The official Claude Chrome extension includes advanced features like browser automation, workflow recording, and scheduled tasks that rely on Chrome-specific APIs. This Firefox extension focuses on the core experience:

| Feature | Chrome Extension | Firefox Extension |
|---------|:---:|:---:|
| Sidebar chat | ✓ | ✓ |
| Toolbar toggle | ✓ | ✓ |
| Keyboard shortcut | ✓ | ✓ |
| Context menu (selected text) | ✓ | ✓ |
| Page content extraction | ✓ | ✓ |
| Browser automation | ✓ | ✗ |
| Workflow recording | ✓ | ✗ |
| Scheduled tasks | ✓ | ✗ |
| Multi-tab management | ✓ | ✗ |

## Requirements

- Firefox 109 or later
- A Claude account (free or paid) at [claude.ai](https://claude.ai)

## License

[Mozilla Public License 2.0](LICENSE)
