import type { APIRoute } from "astro";
import { getPostsCollection } from "../lib/models";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.href || "https://ahadchowdhury.site").replace(/\/$/, "");

  // Get all published blog posts
  let posts: any[] = [];
  try {
    const postsCollection = await getPostsCollection();
    const allPosts = await postsCollection.find({}).toArray();

    posts = allPosts
      .map((post: any) => {
        return {
          ...post,
          published:
            typeof post.published === "boolean" ? post.published : true,
          slug: post.slug || post._id?.toString() || "",
          updatedAt:
            post.updatedAt || post.createdAt || post.date || new Date(),
        };
      })
      .filter((post: any) => post.published !== false && post.slug);
  } catch (error) {
    console.error("[Sitemap] Error fetching posts:", error);
  }

  const today = new Date().toISOString().split("T")[0];

  // Static pages with lastmod
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
    { url: "/about", priority: "0.8", changefreq: "monthly", lastmod: today },
    { url: "/blog", priority: "0.9", changefreq: "weekly", lastmod: today },
  ];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
      .map(
        (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join("\n")}
${posts
      .map((post) => {
        const lastmod =
          post.updatedAt instanceof Date
            ? post.updatedAt.toISOString().split("T")[0]
            : new Date(post.updatedAt).toISOString().split("T")[0];
        return `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      })
      .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
