# EP01 photo export protocol

Export your episode photos into **this folder** (`public/images/ep01/`), then tell
me the filenames and captions and I'll wire them into the gallery.

## Naming
- All lowercase, words separated by hyphens.
- Start with the location/subject, then a two-digit number.
- Format: `<subject>-<NN>.jpg`

Examples:
```
inverness-01.jpg
kyle-of-lochalsh-01.jpg
isle-of-skye-01.jpg
isle-of-skye-02.jpg
malham-cove-01.jpg
thurso-01.jpg
```

## File specs
- **Format:** JPEG (`.jpg`).
- **Size:** long edge ≈ 1600 px is plenty for the web.
- **Weight:** aim for < 500 KB each (GitHub Pages serves these directly).
- Keep the originals elsewhere; this folder is for web-ready copies.

## After exporting
Once the files are here, they get referenced in `src/content/episodes.ts` under the
episode's `photos: [...]` array, e.g.:
```ts
photos: [
  { src: '/images/ep01/isle-of-skye-01.jpg', caption: 'Isle of Skye' },
  { src: '/images/ep01/malham-cove-01.jpg', caption: 'Malham Cove' },
],
```
Note the path starts at `/images/...` (no `public/`) — that's how the built site
sees it.
