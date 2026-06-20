# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

Static personal portfolio website for Wasif Mujahid (Android Developer), hosted on GitHub Pages at `wasif1.github.io`. Single-page site with sections: About, Projects, Performance, Testimonials, Resume/Experience, and Contact.

## Local Development

No build system or package manager. Open `index.html` directly in a browser, or serve locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## CSS / SCSS

Custom styles are authored in `sass/tooplate-style.scss` (SCSS with variables and mixins) and compiled to `css/tooplate-style.css`. If you edit the SCSS, compile it manually — no build script is configured in this repo. The primary accent color is `$main-color: #ffc200` (yellow).

## Architecture

**Single HTML file**: All page sections live in `index.html`. Section order: `#about` → `#project` → `#performance` → `#testimonials` → `#resume` → `#contact`.

**JavaScript (`js/custom.js`)**: jQuery-based. Initializes dark mode toggle, Headroom.js (hide-on-scroll navbar), Owl Carousel (project/performance image slideshows), and smooth-scroll for nav links.

**Testimonials**: CSS infinite-scroll via `css/testimonials.css` (auto-scrolling `testimonial-slider`). The testimonial cards are duplicated in `index.html` to create a seamless loop. Drag interaction (mouse + touch) handled in `js/testimonials.js`, which is an inline `<script>` tag embedded in the file, not a module.

**Contact form**: Posts to `https://forms.un-static.com/` (external service). `sendmail.php` is fully commented out and not used.

**Vendor assets (do not modify)**:
- `css/bootstrap.min.css`, `js/bootstrap.min.js` — Bootstrap 3
- `js/jquery-3.3.1.min.js`, `js/owl.carousel.min.js`, `js/Headroom.js`, `js/jQuery.headroom.js`, `js/smoothscroll.js`, `js/popper.min.js`
- `css/owl.carousel.min.css`, `css/owl.theme.default.min.css`
- `font/unicons.*` — icon font (also loaded via CDN in `index.html`)

**Project images**: Screenshots stored in `images/project/`. CV PDF is at `doc/wasif_cv.pdf`.
