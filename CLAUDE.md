# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FeelProfit is an affiliate content site built with Astro v5, delivering actionable guides across three content hubs: Money, AI Tools, and Family. The site uses content collections for blog posts and embeds affiliate CTAs within MDX content.

## Development Commands

```sh
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

### Content-First Structure

The site is organized around **three content hubs**, defined in `src/content.config.ts:9`:

- `money` - Budgeting, cashback, investing
- `ai-tools` - Automation, productivity tools
- `family` - Baby/pet essentials, routines

Each hub has a dedicated index page (`src/pages/{hub}/index.astro`) that filters posts by the `hub` frontmatter field.

### Content Collections Flow

1. **Posts are MDX files** in `src/content/posts/` with frontmatter schema defined in `src/content.config.ts`
2. **Hub pages** (`src/pages/{hub}/index.astro`) filter posts via `getCollection("posts", (p) => p.data.hub === "money" && !p.data.draft)`
3. **Individual post pages** are generated via `getStaticPaths()` in `src/pages/posts/[slug].astro`
4. **Homepage** (`src/pages/index.astro`) shows the latest 12 posts across all hubs

### Affiliate System

Affiliate offers are centralized in `src/lib/offers.ts` as a typed `Record<string, { name, url, badge? }>`. Posts embed affiliate CTAs using:

```mdx
import CTAAffiliate from "../../components/CTAAffiliate.astro";

<CTAAffiliate ids={["ynab", "rocketmoney"]} />
```

The `CTAAffiliate` component (`src/components/CTAAffiliate.astro`) maps IDs to offer data and renders an amber-themed callout with `rel="sponsored noopener"` links.

### Layout & Styling

- **Base layout**: `src/components/Layout.astro` provides the HTML shell with:
  - Sticky header navigation to the three hubs
  - Footer with newsletter slot (via `<slot name="newsletter" />`)
  - SEO meta tags (OG, Twitter cards)
  - Optional Google Analytics via `PUBLIC_GA_ID` env var
  - Optional Search Console verification via `PUBLIC_SC_VERIFICATION` env var

- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin. Global CSS is minimal (`src/styles/global.css` just imports Tailwind). The site uses Tailwind's utility classes directly in components.

### Post Rendering

Posts are rendered using Astro's `entry.render()` pattern:

1. `getStaticPaths()` in `src/pages/posts/[slug].astro` enumerates all posts
2. Each post entry is passed as a prop
3. `entry.render()` returns a `<Content />` component for the MDX body
4. The post page wraps `<Content />` in a `<Layout>` with article metadata

### Newsletter Integration

The `NewsletterInline` component (`src/components/NewsletterInline.astro`) is a form placeholder. The action URL (`https://example.com/newsletter/subscribe`) needs to be replaced with a real newsletter service endpoint (e.g., ConvertKit, Mailchimp).

## Working with Content

### Adding a New Post

1. Create `src/content/posts/your-slug.mdx`
2. Add frontmatter with required fields: `title`, `date`, and optional `hub`, `summary`, `tags`, `hero`, `draft`
3. Import and use `<CTAAffiliate>` component to embed affiliate offers
4. The post will automatically appear on the homepage and its respective hub page (if `hub` is set and `draft` is not true)

### Adding a New Affiliate Offer

1. Add an entry to `src/lib/offers.ts`:
   ```ts
   yourofferId: {
     name: "Display Name",
     url: "https://affiliate.link?utm_source=feelprofit&utm_medium=blog",
     badge: "Optional label" // e.g., "Popular", "Best Value"
   }
   ```
2. Reference the ID in any post: `<CTAAffiliate ids={["yourofferId"]} />`

### Environment Variables

Optional environment variables for production:

- `PUBLIC_GA_ID` - Google Analytics tracking ID
- `PUBLIC_SC_VERIFICATION` - Google Search Console verification code

These are referenced in `src/components/Layout.astro:10-11` using `import.meta.env`.

## Site Configuration

- **Site URL**: Set in `astro.config.mjs:7` for canonical URLs and sitemap generation
- **Integrations**: MDX and sitemap are pre-configured
- **TypeScript**: Uses Astro's strict tsconfig preset

## Important Patterns

- **Draft posts**: Set `draft: true` in frontmatter to exclude from production builds
- **Date sorting**: Posts are sorted by `date` field (newest first) on all listing pages
- **Hub filtering**: Hub pages use `getCollection` with a predicate to filter by `hub` and exclude drafts
- **Affiliate disclosure**: Automatically included in `CTAAffiliate` component
- **Post cards**: Use `PostCard` component for consistent grid layouts with optional hero images
