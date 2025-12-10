import { c as createAstro, a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BK6VYfps.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_BgMcPR-r.mjs';
import { g as getPostsCollection } from '../chunks/models_CquBuAEI.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const currentPage = Math.max(1, parseInt(Astro2.url.searchParams.get("page") || "1"));
  const postsPerPage = 10;
  const skip = (currentPage - 1) * postsPerPage;
  let posts = [];
  let totalPosts = 0;
  let totalPages = 0;
  try {
    const postsCollection = await getPostsCollection();
    const query = {
      $or: [
        { published: true },
        { published: { $exists: false } },
        { published: { $eq: null } }
      ]
    };
    totalPosts = await postsCollection.countDocuments(query);
    totalPages = Math.ceil(totalPosts / postsPerPage);
    console.log("[Blog Index] Total published posts:", totalPosts);
    console.log("[Blog Index] Fetching page", currentPage, "of", totalPages);
    const fetchedPosts = await postsCollection.find(query).sort({ createdAt: -1, date: -1 }).skip(skip).limit(postsPerPage).toArray();
    posts = fetchedPosts.map((post) => {
      return {
        ...post,
        description: post.description || post.excerpt || "",
        createdAt: post.createdAt || post.date || /* @__PURE__ */ new Date(),
        published: typeof post.published === "boolean" ? post.published : true,
        slug: post.slug || post._id?.toString() || ""
      };
    });
    console.log("[Blog Index] Fetched", posts.length, "posts for page", currentPage);
  } catch (error) {
    console.error("[Blog Index] Error fetching blog posts:", error);
    posts = [];
  }
  const startIndex = skip;
  const endIndex = Math.min(skip + postsPerPage, totalPosts);
  const pageNumbersToShow = [];
  if (totalPages > 0) {
    for (let i = 1; i <= totalPages; i++) {
      const isFirst = i === 1;
      const isLast = i === totalPages;
      const isNearCurrent = i >= currentPage - 1 && i <= currentPage + 1;
      if (isFirst || isLast || isNearCurrent) {
        pageNumbersToShow.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbersToShow.push(-1);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog - S. M. Ahad Ali Chowdhury", "description": "Read the latest blog posts about software engineering, Go, Node.js, and full-stack development." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> ${renderComponent($$result2, "Header", $$Header, {})} <!-- Blog Section --> <section class="blog-section"> <h1>All Blog Posts</h1> ${totalPosts > 0 && renderTemplate`<div> <p style="color: var(--text-secondary); margin-bottom: 20px;">
Showing ${startIndex + 1}-${Math.min(endIndex, totalPosts)} of ${totalPosts} posts
</p> <div class="blog-list"> ${posts.map((post) => {
    const viewCount = post.viewCount || 0;
    const avgReadingTime = post.readingTimes && post.readingTimes.length > 0 ? Math.round(post.readingTimes.reduce((a, b) => a + b, 0) / post.readingTimes.length) : null;
    return renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="blog-card-link"> <div class="blog-card"> <h3>${post.title}</h3> <p class="blog-date"> ${new Date(post.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })} </p> <p>${post.description}</p> <div style="display: flex; gap: 16px; margin-top: 12px; font-size: 13px; color: var(--text-tertiary);"> <span>👁️ ${viewCount} ${viewCount === 1 ? "view" : "views"}</span> ${avgReadingTime !== null && renderTemplate`<span>⏱️ ${avgReadingTime}s avg read</span>`} </div> </div> </a>`;
  })} </div> ${totalPages > 1 && renderTemplate`<div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 40px; flex-wrap: wrap;"> ${currentPage > 1 ? renderTemplate`<a${addAttribute(`/blog?page=${currentPage - 1}`, "href")} style="
                    padding: 10px 20px;
                    background-color: var(--accent-color);
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 14px;
                  ">
← Previous
</a>` : renderTemplate`<span style="padding: 10px 20px; color: var(--text-tertiary); font-size: 14px;">← Previous</span>`} <div style="display: flex; gap: 4px; align-items: center;"> ${pageNumbersToShow.map((pageNum) => {
    if (pageNum === -1) {
      return renderTemplate`<span style="padding: 0 4px; color: var(--text-tertiary);">...</span>`;
    }
    if (pageNum === currentPage) {
      return renderTemplate`<span style="
                          padding: 10px 16px;
                          background-color: var(--accent-color);
                          color: white;
                          border-radius: 6px;
                          font-size: 14px;
                          font-weight: 600;
                        "> ${pageNum} </span>`;
    }
    return renderTemplate`<a${addAttribute(`/blog?page=${pageNum}`, "href")} style="
                        padding: 10px 16px;
                        background-color: var(--bg-secondary);
                        color: var(--text-color);
                        text-decoration: none;
                        border-radius: 6px;
                        font-size: 14px;
                        border: 1px solid var(--border-color);
                      "> ${pageNum} </a>`;
  })} </div> ${currentPage < totalPages ? renderTemplate`<a${addAttribute(`/blog?page=${currentPage + 1}`, "href")} style="
                    padding: 10px 20px;
                    background-color: var(--accent-color);
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 14px;
                  ">
Next →
</a>` : renderTemplate`<span style="padding: 10px 20px; color: var(--text-tertiary); font-size: 14px;">Next →</span>`} </div>`} </div>`} ${totalPosts === 0 && renderTemplate`<p style="color: var(--text-secondary); text-align: center; padding: 40px;">
No blog posts found.
</p>`} </section> ${renderComponent($$result2, "Footer", $$Footer, {})} </div> ` })}`;
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/blog/index.astro", void 0);

const $$file = "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
