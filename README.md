
# Massage Propaganda — Minimal Static Site (Prototype)

This repo contains a fast, minimalist front‑end that follows the brief.

## Structure
```
assets/
  css/styles.css
  data/*.json
  icons/*.svg
  img/*.svg
  js/*.js
index.html
memberships.html
gift-cards.html
collabs.html
massage.html      (dynamic by ?type=classic|sport|...)
toppings.html
robots.txt
sitemap.xml
```

## What to customize before go‑live
- `assets/data/config.json` — **set real Fresha booking URLs** (base and giftcards).
- `assets/data/rating.json` — real Google rating + count (or build a small scraper/cloud function if needed).
- `assets/data/locations.json` — real addresses, map links, from-prices.
- `assets/data/massages.json` — names/descriptions/prices and images from your brandbook.
- `assets/data/toppings.json` — update add‑ons + prices.
- Replace placeholder images in `assets/img/` with real photography or renders (keep them light!).
- Update copy in EN/CZ via `I18N` object inside `assets/js/main.js` (or move to JSON if you prefer).

## Notes
- **Speed**: zero frameworks, no external fonts, lazy images, minimal JS. Inline critical CSS at build time if you want even faster first paint.
- **Interactivity**: hover lift, subtle title movement, slider for collabs, sticky mobile CTA.
- **Accessibility**: semantic HTML, alt tags on images, big targets.
- **Internationalization**: language switch EN/CZ (persists in `localStorage`), strings via `I18N`.
- **Reviews**: you can populate `assets/data/reviews.json` manually or wire a small serverless function to fetch Google reviews periodically.
- **Maps**: location cards include links to Google Maps. If you want embedded maps, replace the link with an `<iframe>`.
- **Membership calculator**: adjustable base price + quantity with tiered discounts (3=10%, 5=15%, 10=20%). Edit in `assets/js/memberships.js`.

## Build / Deploy
It’s static. Host on Netlify/Vercel/S3, or drop into your current hosting. Ensure the site root is `/` so the JSON fetches work from absolute paths.

## License
All placeholders are free to replace. No third‑party libraries used.
