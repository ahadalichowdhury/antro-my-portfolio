import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_vmYG7z1L.mjs';
import { manifest } from './manifest_9TN9Ktt5.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin/login-api.astro.mjs');
const _page4 = () => import('./pages/admin/logout.astro.mjs');
const _page5 = () => import('./pages/admin/posts/new.astro.mjs');
const _page6 = () => import('./pages/admin/posts/new-api.astro.mjs');
const _page7 = () => import('./pages/admin/posts/_id_/delete.astro.mjs');
const _page8 = () => import('./pages/admin/posts/_id_/edit.astro.mjs');
const _page9 = () => import('./pages/admin/posts/_id_/edit-api.astro.mjs');
const _page10 = () => import('./pages/admin/projects/new.astro.mjs');
const _page11 = () => import('./pages/admin/projects/new-api.astro.mjs');
const _page12 = () => import('./pages/admin/projects/_id_/delete.astro.mjs');
const _page13 = () => import('./pages/admin/projects/_id_/edit.astro.mjs');
const _page14 = () => import('./pages/admin/projects/_id_/edit-api.astro.mjs');
const _page15 = () => import('./pages/admin/projects.astro.mjs');
const _page16 = () => import('./pages/admin.astro.mjs');
const _page17 = () => import('./pages/api/track-view.astro.mjs');
const _page18 = () => import('./pages/blog/_slug_.astro.mjs');
const _page19 = () => import('./pages/blog.astro.mjs');
const _page20 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/login-api.ts", _page3],
    ["src/pages/admin/logout.ts", _page4],
    ["src/pages/admin/posts/new.astro", _page5],
    ["src/pages/admin/posts/new-api.ts", _page6],
    ["src/pages/admin/posts/[id]/delete.ts", _page7],
    ["src/pages/admin/posts/[id]/edit.astro", _page8],
    ["src/pages/admin/posts/[id]/edit-api.ts", _page9],
    ["src/pages/admin/projects/new.astro", _page10],
    ["src/pages/admin/projects/new-api.ts", _page11],
    ["src/pages/admin/projects/[id]/delete.ts", _page12],
    ["src/pages/admin/projects/[id]/edit.astro", _page13],
    ["src/pages/admin/projects/[id]/edit-api.ts", _page14],
    ["src/pages/admin/projects/index.astro", _page15],
    ["src/pages/admin/index.astro", _page16],
    ["src/pages/api/track-view.ts", _page17],
    ["src/pages/blog/[slug].astro", _page18],
    ["src/pages/blog/index.astro", _page19],
    ["src/pages/index.astro", _page20]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
