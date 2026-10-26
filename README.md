# Sarvendhra Portfolio — Interactive Masterplan Edition

This is an update to the original four-file website. It keeps the previous visual design, light/dark themes, navigation, filters, animated elements and project pop-ups, and integrates the user's actual **Langley Flow** masterplan from `Final Master Plan.pdf`.

## Open the website

Unzip the archive, then open `index.html` in a modern browser. No build tools, subscriptions, APIs, databases or paid hosting are needed. All project images are stored locally in `assets/`.

## What changed

- The Langley Flow featured project now shows the actual masterplan, extracted directly from the supplied PDF.
- A new **interactive masterplan explorer** lets visitors select 13 design elements, filter by theme, pan and zoom the plan, and read short explanations from the original submitted sheet.
- The original annotated sheet is available as an optimized high-resolution JPEG from the explorer.
- The Langley case-study popup now links to the explorer.
- All original sections and interactions remain.

## Deploy for free on GitHub Pages

1. Create a public GitHub repository called `yourusername.github.io` (or another name).
2. Upload `index.html`, `styles.css`, `script.js`, and the complete `assets` folder to the repository root.
3. Under Settings → Pages, set Source to `Deploy from a branch`, Branch `main`, Folder `/ (root)`.
4. Visit the published URL after deployment completes.

No paid domain is required. A GitHub Pages URL is free.

## Accuracy and privacy checks before publishing

- **Other projects, experience, dates and bio** are unchanged from the earlier draft. The user previously flagged some as inaccurate; review them before publishing.
- **Email and LinkedIn are placeholders** (`your-email@example.com` and `#`); replace them.
- The website copy of the annotated sheet **omits the student number for privacy**. The user’s original uploaded PDF remains unchanged. Check the rest of the sheet before public release.
- The clean masterplan was extracted as an embedded image; hotspots are approximate locations based on the original labelled drawing. The descriptions are transcribed or paraphrased from that drawing, not invented additional design claims.
- Images are optimized for fast free static hosting. The original 80 MB PDF is intentionally not included in the site.

## Files

- `index.html` — page structure
- `styles.css` — design and responsive styles
- `script.js` — all interactions and masterplan navigation
- `assets/langley-flow-masterplan.webp` — clean masterplan extracted from source PDF
- `assets/langley-flow-feature.webp` — editorial crop for the project card
- `assets/langley-flow-original-sheet.jpg` — optimized annotated original sheet
