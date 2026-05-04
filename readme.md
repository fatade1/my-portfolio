# Fatade — Portfolio Website

Personal portfolio for Fatade, a Creative Director, Brand Designer & Product Designer.

## File Structure

```
├── index.html          — Main page (all sections)
├── packages.html       — Packages page
├── work.html           — Work/Projects page
├── css/
│   ├── variables.css   — Design tokens (colors, fonts, spacing)
│   ├── base.css        — CSS reset, typography, scrollbar
│   ├── utilities.css   — Utility classes (layout, spacing, responsive)
│   └── components.css  — Custom components (cards, gradients, animations)
├── js/
│   ├── main.js         — Mobile menu, smooth scroll, animations, form
│   ├── analytics-init.js — Vercel Web Analytics initialization
│   └── analytics.mjs   — Vercel Analytics module
├── assets/
│   └── hero-bg.jpg     — Hero background image
└── readme.md
```

## Features

- **Vercel Web Analytics**: Privacy-friendly, real-time traffic insights integrated on all pages
- Responsive design with mobile navigation
- Dark/light theme toggle
- Smooth scrolling and animations
- Contact form integration

## Development

### Prerequisites

```bash
npm install
```

### Local Development

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

## Analytics

This project uses [Vercel Web Analytics](https://vercel.com/docs/analytics) to track page views and user interactions. The analytics are:
- Privacy-friendly (no cookies, no personal data collection)
- Automatically enabled on all HTML pages
- Only active in production (disabled in development mode)

To view analytics data, visit your [Vercel Dashboard](https://vercel.com/dashboard) after deploying the site.