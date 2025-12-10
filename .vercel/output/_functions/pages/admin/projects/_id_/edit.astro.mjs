import { c as createAstro, a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../../../chunks/astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../../chunks/BaseLayout_BK6VYfps.mjs';
import { requireAuth } from '../../../../chunks/session_CvEO55jf.mjs';
import { b as getProjectsCollection } from '../../../../chunks/models_CquBuAEI.mjs';
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
    return Astro2.redirect("/admin/projects");
  }
  const projectsCollection = await getProjectsCollection();
  const project = await projectsCollection.findOne({ _id: new ObjectId(id) });
  if (!project) {
    return Astro2.redirect("/admin/projects");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Edit Project - Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <h1>Edit Project</h1> <form method="POST"${addAttribute(`/admin/projects/${id}/edit-api`, "action")} id="project-form" style="margin-top: 30px;"> <div style="margin-bottom: 20px;"> <label for="title" style="display: block; margin-bottom: 8px; font-weight: 500;">Title</label> <input type="text" id="title" name="title"${addAttribute(project.title, "value")} required style="
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
          ">${project.description}</textarea> </div> <div style="margin-bottom: 20px;"> <label for="githubLink" style="display: block; margin-bottom: 8px; font-weight: 500;">GitHub Link</label> <input type="url" id="githubLink" name="githubLink"${addAttribute(project.githubLink, "value")} required placeholder="https://github.com/username/repo" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label for="liveUrl" style="display: block; margin-bottom: 8px; font-weight: 500;">Live URL (Optional)</label> <input type="url" id="liveUrl" name="liveUrl"${addAttribute(project.liveUrl || "", "value")} placeholder="https://example.com" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div style="margin-bottom: 20px;"> <label for="order" style="display: block; margin-bottom: 8px; font-weight: 500;">Order</label> <input type="number" id="order" name="order"${addAttribute(project.order, "value")} required min="1" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> <small style="color: var(--text-tertiary); font-size: 13px;">Display order (1, 2, 3, etc.)</small> </div> <div style="margin-bottom: 20px;"> <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"> <input type="checkbox" name="published" id="published" value="true"${addAttribute(project.published, "checked")}> <span>Publish immediately</span> </label> </div> <div style="display: flex; gap: 12px;"> <button type="submit" style="
            padding: 12px 24px;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
          ">
Update Project
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
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/projects/[id]/edit.astro", void 0);

const $$file = "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/projects/[id]/edit.astro";
const $$url = "/admin/projects/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
