# Animation Assistant (v2) — ocean-themed site

**Tags:** `nextjs` `react` `tailwindcss` `vercel` `landing-page` `animation` `education` `javascript`

The rebuilt **Animation Assistant** website — an ocean-themed, Safari-coder-inspired layout for teaching kids to animate.

## Stack

- **Next.js 14** (App Router) + **React 18** + **Tailwind CSS**
- Lessons authored in Markdown (`react-markdown` + `remark-gfm`), built into `src/data/lessons.json` by `scripts/build-lessons.js` on dev/build
- Lesson cards, page shell, header/footer components in `src/components/`
- Vercel-ready: `npm run build` produces a standard static-capable Next build

## Scripts

```bash
npm run dev     # build lessons + next dev
npm run build   # build lessons + next build
npm run start   # next start
npm run lint    # next lint
```

Lessons live under `src/app/lessons/` with dynamic routing from the generated lesson index.