import { a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BK6VYfps.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_BgMcPR-r.mjs';
import { g as getPostsCollection } from '../chunks/models_CquBuAEI.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(async ($$result, $$props, $$slots) => {
  let recentPosts = [];
  try {
    const postsCollection = await getPostsCollection();
    const allPosts = await postsCollection.find({}).toArray();
    console.log("[About] Found", allPosts.length, "posts in database");
    const mappedPosts = allPosts.map((post) => {
      const mapped = {
        ...post,
        description: post.description || post.excerpt || "",
        createdAt: post.createdAt || post.date || /* @__PURE__ */ new Date(),
        published: typeof post.published === "boolean" ? post.published : true,
        // Default to published if field doesn't exist
        slug: post.slug || post._id?.toString() || ""
        // Use _id as slug if slug doesn't exist
      };
      return mapped;
    }).filter((post) => post.published !== false).sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime();
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    recentPosts = mappedPosts.slice(0, 2);
    console.log("[About] Showing", recentPosts.length, "recent posts");
  } catch (error) {
    console.error("[About] Error fetching blog posts:", error);
    recentPosts = [];
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About - S. M. Ahad Ali Chowdhury", "description": "Learn about S. M. Ahad Ali Chowdhury, a passionate software engineer specializing in backend development with Go, Node.js, and full-stack web applications." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> ${renderComponent($$result2, "Header", $$Header, {})} <!-- About Section --> <section id="about" class="about-section"> <h1>About</h1> <p>
I'm a passionate software engineer with experience in building
        scalable applications and open source projects. My focus is on clean
        code, efficient algorithms, and solving real-world problems. I
        specialize in backend development with Go, Node.js, and full-stack web
        applications.
</p> </section> <!-- Blog Section --> <section id="blog" class="blog-section"> <h2>Recent Blog Posts</h2> <div class="blog-preview"> ${recentPosts.map((post) => {
    const viewCount = post.viewCount || 0;
    const avgReadingTime = post.readingTimes && post.readingTimes.length > 0 ? Math.round(post.readingTimes.reduce((a, b) => a + b, 0) / post.readingTimes.length) : null;
    return renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="blog-item-link"> <div class="blog-item"> <h3>${post.title}</h3> <p class="blog-date"> ${new Date(post.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })} </p> <p>${post.description}</p> <div style="display: flex; gap: 16px; margin-top: 8px; font-size: 12px; color: var(--text-tertiary);"> <span>👁️ ${viewCount} ${viewCount === 1 ? "view" : "views"}</span> ${avgReadingTime !== null && renderTemplate`<span>⏱️ ${avgReadingTime}s avg</span>`} </div> </div> </a>`;
  })} </div> <div class="see-more"> <a href="/blog" class="see-more-btn">See More</a> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, {})} </div> ` })}`;
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/about.astro", void 0);

const $$file = "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
