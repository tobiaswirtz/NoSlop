# ✒️ InkWeight

Inline confidence-weighted writing — see which parts of your text are rock-solid and which still need a second thought.

<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/inkweight-demo.gif" width="700" alt="InkWeight demo"/>
</p>

---

## Features

* **Inline confidence slider** – select any text, drag the slider in the Bubble Menu; weight & opacity update live.
* **Google-Docs-style page** – centred white sheet on a grey canvas.
* **Low-Confidence View** – toggle to focus on paragraphs < 50 % confidence.
* **HTML Export** – retains `data-confidence` attributes for downstream use.
* **Local-first** – document autosaves to `localStorage`; no backend required.

---

## Tech Stack

* React 18 + TypeScript
* Vite 5
* [TipTap](https://tiptap.dev/) (ProseMirror) rich-text engine
* Tailwind CSS 3

---

## Quick start

### Prerequisites

* Node.js >= 18
* npm >= 9 (comes with Node)

### 1. Clone the repo

```bash
git clone https://github.com/your-org/inkweight.git
cd inkweight
```

> **ℹ️  Note** The actual app lives in the `newwriting` sub-folder (keeps the root free for docs & config).

### 2. Install dependencies

```bash
cd newwriting          # jump into the app folder
npm install            # grab packages (~200 MB)
```

### 3. Run the dev server

```bash
npm run dev -- --host   # launches Vite; prints local & LAN URLs
```

Open the shown URL (default `http://localhost:5173`) in your browser.

### 4. Build for production (optional)

```bash
npm run build          # outputs to dist/
```

`npm run preview` serves the production build locally.

---

## How to use

1. Start typing on the page.
2. Highlight a word, sentence, or paragraph.
3. A Bubble Menu appears – drag the slider to the desired confidence %. The text immediately changes its "ink weight".
4. Use *Toggle Low Confidence View* (top-left buttons) to focus feedback.
5. Click *Export HTML* to download a standalone file for sharing.

Everything is stored in the browser; clearing site data resets the doc.

---

## Roadmap

- Adding multipe assumptions per confidence-leveled statement to see where the level of confidence comes from

Contributions welcome! 🧑‍💻

---

## License

MIT © 2025 InkWeight contributors 