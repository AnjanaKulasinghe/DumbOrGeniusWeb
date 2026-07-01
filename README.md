# Dumb or Genius - promotional website

A static, dependency-free promo site for the **Dumb or Genius** app. Built with
plain HTML/CSS/JS so it can be hosted on GitHub Pages with no build step.

**Live URL:** https://dog.koungasolutions.co.nz
**Support:** info@koungasolutions.co.nz

## Structure

```
DumbOrGenius_Web/
├── index.html          Landing page
├── privacy.html        Privacy Policy
├── terms.html          Terms of Service
├── CNAME               Custom domain for GitHub Pages
├── .nojekyll           Serve files as-is (skip Jekyll processing)
└── assets/
    ├── css/style.css   All styling (brand theme)
    ├── js/main.js      Interactions (nav, reveal, confetti, vote demo)
    └── img/logo.png    App logo (copied from the app assets)
```

This folder is self-contained - every asset it uses lives inside it, so it can be
moved to its own repository as-is.

## Fill in before launch

- **App store links:** in `index.html`, search for `TODO` on the two
  `.store-btn` links and replace `href="#"` with the real App Store and Google
  Play URLs. Remove the `aria-disabled="true"` attribute and the `Soon` badge
  once each store is live.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (either as the repo root, or set
   Pages to serve from this subfolder).
2. In **Settings → Pages**, choose the branch to deploy.
3. The included `CNAME` sets the custom domain to `dog.koungasolutions.co.nz`.
4. In your DNS, add a `CNAME` record for `dog` pointing to
   `<your-username>.github.io`.
5. Enable **Enforce HTTPS** once the certificate is issued.

## Local preview

```sh
cd DumbOrGenius_Web
python3 -m http.server 8000
# open http://localhost:8000
```
