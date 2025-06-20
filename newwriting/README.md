# InkWeight Prototype

Quick prototype built with React, Vite, TipTap, and Tailwind CSS.

## Getting Started

```bash
# install dependencies
npm install

# run dev server
npm run dev
```

The editor stores its document in `localStorage` under the key `inkweight-doc`. Use the *Export HTML* button to download a standalone HTML file retaining `data-confidence` attributes.

## Features

* Confidence slider (0–100 %) applies a *confidence* mark to the current selection.
* Visual encoding: opacity + font-weight interpolate between 0 % and 100 %.
* *Low Confidence View* toggle hides text ≥ 50 % confidence.
* Autosave to `localStorage`.
* HTML export preserving marks. 