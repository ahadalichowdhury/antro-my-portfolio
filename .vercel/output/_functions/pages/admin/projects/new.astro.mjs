import { c as createAstro, a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_BK6VYfps.mjs';
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
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "New Project - Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <h1>Create New Project</h1> <form method="POST" action="/admin/projects/new-api" id="project-form" style="margin-top: 30px;"> <div style="margin-bottom: 20px;"> <label for="title" style="display: block; margin-bottom: 8px; font-weight: 500;">Title</label> <input type="text" id="title" name="title" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label for="description" style="display: block; margin-bottom: 8px; font-weight: 500;">Description</label> <textarea id="description" name="description" required rows="4" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "></textarea> </div> <div style="margin-bottom: 20px;"> <label for="githubLink" style="display: block; margin-bottom: 8px; font-weight: 500;">GitHub Link</label> <input type="url" id="githubLink" name="githubLink" required placeholder="https://github.com/username/repo" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label for="liveUrl" style="display: block; margin-bottom: 8px; font-weight: 500;">Live URL (Optional)</label> <input type="url" id="liveUrl" name="liveUrl" placeholder="https://example.com" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label for="order" style="display: block; margin-bottom: 8px; font-weight: 500;">Order</label> <input type="number" id="order" name="order" required min="1" value="1" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> <small style="color: var(--text-tertiary); font-size: 13px;">Display order (1, 2, 3, etc.)</small> </div> <div style="margin-bottom: 20px;"> <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"> <input type="checkbox" name="published" id="published" value="true"> <span>Publish immediately</span> </label> </div> <div style="display: flex; gap: 12px;"> <button type="submit" style="
            padding: 12px 24px;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
          ">
Create Project
</button> <a href="/admin/projects" style="
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
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/projects/new.astro", void 0);

const $$file = "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/projects/new.astro";
const $$url = "/admin/projects/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
