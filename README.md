# Sheshi - Financial Intelligence Platform

React 19 + TypeScript + Tailwind CSS v4 + Vite web application.

---

## 🚀 How to View & Run the Website

### Option 1: View on Localhost (Recommended for Development)

To start the local development server with hot module reloading:

```bash
npm run dev
```

Open your browser and navigate to:
**[http://localhost:5173](http://localhost:5173)**

---

### Option 2: View in HTML Directly (No Web Server Required)

A standalone, fully self-contained HTML file has been generated for offline and direct viewing:

```bash
npm run build:singlefile
```

You can now open the generated file directly in any browser (Chrome, Safari, Edge, Firefox) by double-clicking it or running:

```bash
open dist-singlefile/index.html
```

All JavaScript, CSS, and SVG assets are bundled into this single `.html` file.

---

### Option 3: Production Build & Local Preview

To build the standard production distribution:

```bash
npm run build
```

This compiles optimized, production-ready static assets into the `dist/` directory with relative `./` paths.

To preview this production build locally:

```bash
npm run preview
```

Open your browser at **[http://localhost:4173](http://localhost:4173)**.

---

## 🌐 Deploying to Hosting Platforms

The `dist/` directory contains standard static files that can be deployed to any static hosting provider.

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in this folder, or connect your Git repository to Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify
1. Drag and drop the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop), or
2. Connect your Git repository to Netlify:
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages
1. Push to GitHub.
2. In repository **Settings > Pages**, select **GitHub Actions** and use the standard Vite/Static HTML workflow.
   - Because relative paths (`base: './'`) are configured, the site will work out of the box even under repository subpaths (`https://username.github.io/repo-name/`).

### Cloudflare Pages / AWS S3 / Firebase Hosting
- Build command: `npm run build`
- Output directory: `dist`

---

## 📁 Project Structure

```
├── index.html              # Clean HTML5 shell with SEO metadata & favicon
├── vite.config.ts          # Vite configuration (Tailwind v4, React 19, SingleFile build)
├── package.json            # Scripts & dependencies
├── src/
│   ├── App.tsx             # Main Sheshi interactive platform & multi-page components
│   ├── main.tsx            # React root mount
│   ├── index.css           # Global theme & Tailwind v4 styling
│   └── imports/            # Reference image assets
├── dist/                   # Production build output (relative asset links)
└── dist-singlefile/        # Self-contained single-file HTML (offline viewing)
```
