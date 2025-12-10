import { destroySession } from '../../chunks/session_CvEO55jf.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ cookies, redirect }) => {
  await destroySession(cookies);
  return redirect("/admin/login", 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
