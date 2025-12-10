import { c as createAstro, a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../../../chunks/astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../../chunks/BaseLayout_BK6VYfps.mjs';
import { R as RichTextEditor } from '../../../../chunks/RichTextEditor_Dc4S8CUr.mjs';
import { requireAuth } from '../../../../chunks/session_CvEO55jf.mjs';
import { g as getPostsCollection } from '../../../../chunks/models_CquBuAEI.mjs';
import { ObjectId } from 'mongodb';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  const session = await requireAuth(Astro2.cookies);
  if (!session) {
    return Astro2.redirect("/admin/login");
  }
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/admin");
  }
  const postsCollection = await getPostsCollection();
  const post = await postsCollection.findOne({ _id: new ObjectId(id) });
  if (!post) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Edit Post - Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <h1>Edit Post</h1> <form method="POST"${addAttribute(`/admin/posts/${id}/edit-api`, "action")} id="post-form" style="margin-top: 30px;"> <div style="margin-bottom: 20px;"> <label for="title" style="display: block; margin-bottom: 8px; font-weight: 500;">Title</label> <input type="text" id="title" name="title"${addAttribute(post.title, "value")} required style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label for="slug" style="display: block; margin-bottom: 8px; font-weight: 500;">Slug</label> <input type="text" id="slug" name="slug"${addAttribute(post.slug, "value")} required style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label for="description" style="display: block; margin-bottom: 8px; font-weight: 500;">Description</label> <textarea id="description" name="description" required rows="3" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          ">${post.description}</textarea> </div> <div style="margin-bottom: 20px;"> <label for="coverImage" style="display: block; margin-bottom: 8px; font-weight: 500;">Cover Image URL</label> <input type="url" id="coverImage" name="coverImage"${addAttribute(post.coverImage || "", "value")} placeholder="https://example.com/image.jpg" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> <small style="color: var(--text-tertiary); font-size: 13px;">Optional: URL to the cover image for this post</small> <div id="image-preview" style="margin-top: 12px; display: none;"> <img id="preview-img" src="" alt="Preview" style="max-width: 100%; max-height: 300px; border-radius: 6px; border: 1px solid var(--border-color);"> </div> ${post.coverImage && renderTemplate`<div style="margin-top: 12px;"> <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 8px;">Current image:</p> <img${addAttribute(post.coverImage, "src")} alt="Current cover" style="max-width: 100%; max-height: 300px; border-radius: 6px; border: 1px solid var(--border-color);"> </div>`} </div> <div style="margin-bottom: 20px;"> <label for="content" style="display: block; margin-bottom: 8px; font-weight: 500;">Content</label> ${renderComponent($$result2, "RichTextEditor", RichTextEditor, { "client:load": true, "initialValue": post.content, "client:component-hydration": "load", "client:component-path": "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/components/RichTextEditor", "client:component-export": "default" })} <textarea id="content" name="content" style="display: none;">${post.content}</textarea> </div> <div style="margin-bottom: 20px;"> <label for="tags" style="display: block; margin-bottom: 8px; font-weight: 500;">Tags (comma-separated)</label> <input type="text" id="tags" name="tags"${addAttribute(post.tags.join(", "), "value")} style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"> <input type="checkbox" name="published" id="published" value="true"${addAttribute(post.published, "checked")}> <span>Published</span> </label> </div> <div style="display: flex; gap: 12px;"> <button type="submit" style="
            padding: 12px 24px;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
          ">
Update Post
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
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/posts/[id]/edit.astro", void 0);

const $$file = "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/posts/[id]/edit.astro";
const $$url = "/admin/posts/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
