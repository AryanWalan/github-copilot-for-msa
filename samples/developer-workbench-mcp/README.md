# Developer Workbench MCP

A local, secret-free MCP server for collecting approved developer-learning links into a browser-importable Netscape bookmark HTML file.

## Requirements

- Node.js 22 or later

## Install and verify

```bash
npm ci
npm test
npm run typecheck
```

Start the server from this directory with `npm start`. It communicates over stdio, so protocol messages are written to stdout and diagnostics must be written to stderr.

The server exposes:

- `add_learning_links`: validates one to five HTTPS links and writes `output/developer-learning-bookmarks.html`.
- `list_learning_links`: reads the current collection before new links are proposed.

The server never modifies Chrome or Edge profiles and never accepts an arbitrary output path.
