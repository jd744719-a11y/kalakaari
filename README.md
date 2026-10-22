# Kalakari Designs – website revamp (static HTML / CSS / JS)

## Run it locally
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000     # then visit http://localhost:8000

## Structure
    index.html  shop.html  about.html  blog.html  contact.html
    css/styles.css      all styling; colours, fonts and radii are tokens at the top (:root)
    js/products.js      ALL categories + products (edit here, every page updates)
    js/main.js          nav, product rendering, shop filter/search/sort, forms
    assets/images/      your photos (see below)

## Adding product photos
Save a photo as `assets/images/<product-id>.jpg` (ids are in `js/products.js`,
e.g. `secret-candle.jpg`). It replaces the emoji placeholder automatically.
Hero photos: `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`.

## Things to finish before going live
- Product and category links point to the live store (kalakaridesigns.com); there is no cart/checkout in this front-end.
- Newsletter and contact forms are front-end only: wire `data-form` handlers in `js/main.js` to Formspree, Netlify Forms or your API.
- Add support email / phone / address in `contact.html` (see TODO comment).
- Footer policy links (`#`) need real pages.
- Blog page links to the current blog until posts are moved.
- Header/footer are repeated in each HTML file; edit all five when changing them.

## Hosting
Upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or cPanel public_html).
