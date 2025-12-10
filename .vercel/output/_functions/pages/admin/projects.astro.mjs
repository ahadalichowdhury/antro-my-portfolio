import { c as createAstro, a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BK6VYfps.mjs';
import { requireAuth } from '../../chunks/session_CvEO55jf.mjs';
import { b as getProjectsCollection } from '../../chunks/models_CquBuAEI.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = await requireAuth(Astro2.cookies);
  if (!session) {
    return Astro2.redirect("/admin/login");
  }
  const projectsCollection = await getProjectsCollection();
  const projects = await projectsCollection.find({}).sort({ order: 1 }).toArray();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Projects Management - Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;"> <h1>Projects Management</h1> <div style="display: flex; gap: 12px;"> <a href="/admin/projects/new" style="
            padding: 10px 20px;
            background-color: var(--accent-color);
            color: white;
            text-decoration: none;
            border-radius: 6px;
          ">
New Project
</a> <a href="/admin" style="
            padding: 10px 20px;
            background-color: var(--border-color);
            color: var(--text-color);
            text-decoration: none;
            border-radius: 6px;
          ">
Back to Dashboard
</a> <form method="POST" action="/admin/logout" style="display: inline;"> <button type="submit" style="
              padding: 10px 20px;
              background-color: #dc3545;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
            ">
Logout
</button> </form> </div> </div> <div style="margin-bottom: 40px;"> <h2>All Projects</h2> <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 20px;"> ${projects.length > 0 ? projects.map((project) => renderTemplate`<div style="
                border: 1px solid var(--border-color);
                border-radius: 6px;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "> <div> <h3 style="margin-bottom: 8px;"> ${project.title} ${!project.published && renderTemplate`<span style="color: #999; font-size: 14px;">(Draft)</span>`} </h3> <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 4px;">
Order: ${project.order} </p> <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 4px;">
GitHub: <a${addAttribute(project.githubLink, "href")} target="_blank" rel="noopener noreferrer" style="color: var(--accent-color);">${project.githubLink}</a> </p> ${project.liveUrl && renderTemplate`<p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 8px;">
Live URL: <a${addAttribute(project.liveUrl, "href")} target="_blank" rel="noopener noreferrer" style="color: var(--accent-color);">${project.liveUrl}</a> </p>`} <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 8px;">${project.description}</p> </div> <div style="display: flex; gap: 8px;"> <a${addAttribute(`/admin/projects/${project._id}/edit`, "href")} style="
                    padding: 8px 16px;
                    background-color: var(--accent-color);
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    font-size: 14px;
                  ">
Edit
</a> <form method="POST"${addAttribute(`/admin/projects/${project._id}/delete`, "action")} style="display: inline;"> <button type="submit" onclick="return confirm('Are you sure you want to delete this project?')" style="
                      padding: 8px 16px;
                      background-color: #dc3545;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      cursor: pointer;
                      font-size: 14px;
                    ">
Delete
</button> </form> </div> </div>`) : renderTemplate`<p style="color: var(--text-secondary); text-align: center; padding: 40px;">
No projects found. Create your first project!
</p>`} </div> </div> </div> ` })}`;
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/projects/index.astro", void 0);

const $$file = "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/projects/index.astro";
const $$url = "/admin/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
