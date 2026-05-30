import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import node from "@astrojs/node";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "ezhha3lz",
  dataset: "production",
  apiVersion: "2025-05-11",
  useCdn: true,
});

const posts = await sanityClient.fetch(
  `*[_type == "post" && !(_id in path("drafts.**"))]{
    "slug": slug.current,
    publishedAt
  }`
);

const authors = await sanityClient.fetch(
  `*[_type == "author"]{ "slug": slug.current }`
);

const toolPages = new Set([
  "/gamertag-price-checker",
  "/gamercard-generator",
  "/xbox-gamertag-availability-checker",
  "/xbox-gamertag-search",
  "/gamertag-optimizer",
]);

const corePages = new Set([
  "/",
  "/tools",
  "/blog",
  "/glossary",
]);

const supportPages = new Set([
  "/about",
  "/contact",
]);

const legalPages = new Set([
  "/privacy-policy",
  "/terms-and-conditions",
]);

export default defineConfig({
  output: "server",
  site: "https://xboxgamertaggenerator.com",
  adapter: node({ mode: "standalone" }),
  trailingSlash: "ignore",

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  integrations: [
    react(),
    sanity({
      projectId: 'ezhha3lz',
      dataset: 'production',
      useCdn: true,
      apiVersion: '2025-05-11',
      studioBasePath: '/studio',
    }),
    sitemap({
      customPages: [
        ...posts.map(post =>
          `https://xboxgamertaggenerator.com/${post.slug}`
        ),
        ...authors.map(author =>
          `https://xboxgamertaggenerator.com/author/${author.slug}`
        ),
      ],
      filter: (page) =>
        !page.includes("/api/") &&
        !page.includes("/admin/") &&
        !page.includes("/studio/"),

      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, "") || "/";

        if (path === "/") {
          return { ...item, priority: 1.0, changefreq: "daily" };
        }

        if (toolPages.has(path)) {
          return { ...item, priority: 0.9, changefreq: "weekly" };
        }

        if (corePages.has(path)) {
          return { ...item, priority: 0.8, changefreq: "weekly" };
        }

        if (supportPages.has(path)) {
          return { ...item, priority: 0.6, changefreq: "monthly" };
        }

        if (legalPages.has(path)) {
          return { ...item, priority: 0.3, changefreq: "yearly" };
        }

        return { ...item, priority: 0.7, changefreq: "monthly" };
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});