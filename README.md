# Modern Developer Portfolio

A sleek, high-performance, product-inspired portfolio template built with Next.js, Tailwind CSS, and Framer Motion. Features a warm neutral dark design system (no blue tint), clamp-based responsive typography, and full-width stacked project cards.

## Features

- **True Dark Theme**: Custom CSS variable system for a deep, warm charcoal aesthetic similar to Linear and Vercel.
- **Fluid Typography**: Uses CSS `clamp()` to scale fonts seamlessly from mobile to desktop.
- **Config-Driven**: Easily customize name, experience, links, and content via a single `src/config.ts` file without digging through components.
- **Framer Motion Animations**: Subtle entry animations, hover effects, and spring-based interactions for a premium feel.
- **Next.js & Turbopack**: Optimized static build via `output: 'export'` for easy hosting on GitHub Pages or Vercel.

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd swapnil-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update Configuration:**
   Open `src/config.ts` and replace the placeholder data (name, email, github, linkedin, experience) with your own information.

4. **Add Your Resume:**
   Place your resume at `public/resume.pdf`.

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Customization Guide

- **Colors & Fonts**: Modify `src/app/globals.css` to tweak the `--bg`, `--surface`, and `--accent` CSS variables. The font is currently set to Geist via `next/font`.
- **Projects**: Edit `src/components/ProjectGrid.tsx` to update your showcase projects.
- **Skills**: Edit `src/components/InteractiveSkillsSection.tsx`.
- **Career Timeline**: Update `MILESTONES` in `src/components/CareerJourney.tsx`.
- **Gallery**: Update `POLAROIDS` and add images in `src/components/AnimalGallery.tsx`.

## Deployment

The project is configured to output a static export (`output: "export"` in `next.config.ts`), making it perfect for GitHub Pages. 

To build for production:
```bash
npm run build
```
The optimized static files will be placed in the `out/` directory.

## License

MIT License. Free to fork, use, and modify.
