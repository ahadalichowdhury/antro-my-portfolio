import { c as createAstro, a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_BK6VYfps.mjs';
import { R as RichTextEditor } from '../../../chunks/RichTextEditor_Dc4S8CUr.mjs';
import { requireAuth } from '../../../chunks/session_CvEO55jf.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const session = await requireAuth(Astro2.cookies);
  if (!session) {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "New Post - Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <h1>Create New Post</h1> <form method="POST" action="/admin/posts/new-api" id="post-form" style="margin-top: 30px;"> <div style="margin-bottom: 20px;"> <label for="title" style="display: block; margin-bottom: 8px; font-weight: 500;">Title</label> <input type="text" id="title" name="title" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label for="slug" style="display: block; margin-bottom: 8px; font-weight: 500;">Slug</label> <input type="text" id="slug" name="slug" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> <small style="color: var(--text-tertiary); font-size: 13px;">URL-friendly version of the title (e.g., "my-blog-post")</small> </div> <div style="margin-bottom: 20px;"> <label for="description" style="display: block; margin-bottom: 8px; font-weight: 500;">Description</label> <textarea id="description" name="description" required rows="3" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "></textarea> </div> <div style="margin-bottom: 20px;"> <label for="coverImage" style="display: block; margin-bottom: 8px; font-weight: 500;">Cover Image URL</label> <input type="url" id="coverImage" name="coverImage" placeholder="https://example.com/image.jpg" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> <small style="color: var(--text-tertiary); font-size: 13px;">Optional: URL to the cover image for this post</small> <div id="image-preview" style="margin-top: 12px; display: none;"> <img id="preview-img" src="" alt="Preview" style="max-width: 100%; max-height: 300px; border-radius: 6px; border: 1px solid var(--border-color);"> </div> </div> <div style="margin-bottom: 20px;"> <label for="content" style="display: block; margin-bottom: 8px; font-weight: 500;">Content</label> ${renderComponent($$result2, "RichTextEditor", RichTextEditor, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/components/RichTextEditor", "client:component-export": "default" })} <textarea id="content" name="content" style="display: none;"></textarea> </div> <div style="margin-bottom: 20px;"> <label for="tags" style="display: block; margin-bottom: 8px; font-weight: 500;">Tags (comma-separated)</label> <input type="text" id="tags" name="tags" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"> <input type="checkbox" name="published" id="published" value="true"> <span>Publish immediately</span> </label> </div> <div style="display: flex; gap: 12px;"> <button type="submit" style="
            padding: 12px 24px;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
          ">
Create Post
</button> <a href="/admin" style="
            padding: 12px 24px;
            background-color: var(--border-color);
            color: var(--text-color);
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            display: inline-block;
          ">
Cancel
</a> </div> </form> </div>  ` })}`;
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/posts/new.astro", void 0);

const $$file = "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/posts/new.astro";
const $$url = "/admin/posts/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
