import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";

/** @type {import('astro').AstroUserConfig} */
export default {
  site: "https://feelprofit.com",
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwind()] },
};
