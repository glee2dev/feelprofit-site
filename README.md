# FeelProfit

Practical Life Upgrades — A content site delivering actionable guides and curated tools across Money, AI, and Family topics.

## About

FeelProfit is a content-driven website that helps readers improve their lives through:

- **Money**: Budgeting tools, cashback strategies, and beginner investing guides
- **AI Tools**: Productivity automation, time-saving tools, and prompt packs
- **Family**: Baby checklists, pet essentials, and daily routines

The site features blog posts, affiliate recommendations, and a newsletter subscription system.

## Tech Stack

- **Astro v5** - Static site generator with content collections
- **Tailwind CSS v4** - Utility-first styling via Vite plugin
- **MDX** - Markdown with embedded components for rich content
- **Sitemap** - Automated XML sitemap generation

## Project Structure

```
feelprofit/
├── public/             # Static assets (favicon, images)
├── src/
│   ├── components/     # Reusable Astro components
│   │   ├── Layout.astro
│   │   ├── PostCard.astro
│   │   ├── CTAAffiliate.astro
│   │   └── NewsletterInline.astro
│   ├── content/        # Content collections
│   │   └── posts/      # Blog posts in MDX format
│   ├── lib/            # Utilities and data
│   │   └── offers.ts   # Affiliate offer definitions
│   ├── pages/          # File-based routing
│   │   ├── index.astro
│   │   ├── posts/[slug].astro
│   │   ├── money/
│   │   ├── ai-tools/
│   │   └── family/
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
└── astro.config.mjs
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```sh
npm install
```

### Development

Start the local dev server:

```sh
npm run dev
```

The site will be available at `http://localhost:4321`

### Building

Build the production site:

```sh
npm run build
```

Output will be in the `./dist/` directory.

### Preview

Preview the production build locally:

```sh
npm run preview
```

## Content Management

### Adding Posts

Create new MDX files in `src/content/posts/`:

```mdx
---
title: "Your Post Title"
date: "2025-01-15"
hub: "money"  # money | ai-tools | family
summary: "Brief description for cards and SEO"
tags: ["budgeting", "tips"]
hero: "/images/og/default.png"
draft: false  # Set to true to hide from production
---

Your content here...
```

### Content Collections Schema

Posts support the following frontmatter fields (defined in `src/content.config.ts`):

- `title` (required): Post title
- `date` (required): Publication date (YYYY-MM-DD)
- `hub` (optional): Content hub - `money`, `ai-tools`, or `family`
- `summary` (optional): Short description
- `tags` (optional): Array of tags
- `hero` (optional): Hero image path
- `draft` (optional): Hide post if true
- `updated` (optional): Last updated date

### Managing Affiliate Offers

Edit `src/lib/offers.ts` to add or update affiliate links:

```ts
export const OFFERS: Record<string, { name: string; url: string; badge?: string }> = {
  yourOffer: {
    name: "Your Offer Name",
    url: "https://partner.example.com/link?utm_source=feelprofit",
  },
};
```

Reference offers in posts using the `CTAAffiliate` component:

```mdx
import CTAAffiliate from "../../components/CTAAffiliate.astro";

<CTAAffiliate ids={["ynab", "rocketmoney"]} />
```

## Configuration

### Site Settings

Edit `astro.config.mjs` to configure:

```js
export default {
  site: "https://feelprofit.com", // Production URL for sitemap
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwind()] },
};
```

### Styling

Global styles are in `src/styles/global.css`. Tailwind v4 is configured via the Vite plugin and uses the new `@theme` directive for customization.

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Deployment

The site generates static HTML and can be deployed to any static hosting provider:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront

## License

Private project - All rights reserved

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com)
