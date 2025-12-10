import { ObjectId } from 'mongodb';
import { g as getPostsCollection } from '../../../../chunks/models_CquBuAEI.mjs';
import { requireAuth } from '../../../../chunks/session_CvEO55jf.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ params, cookies, redirect }) => {
  const session = await requireAuth(cookies);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Post ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const postsCollection = await getPostsCollection();
  await postsCollection.deleteOne({ _id: new ObjectId(id) });
  return redirect("/admin", 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
