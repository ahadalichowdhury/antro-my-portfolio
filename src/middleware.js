/**
 * Set Cache-Control on HTML responses so the browser can cache pages
 * and serve them quickly on repeat visits (stale-while-revalidate).
 */
/** @type {import("astro").MiddlewareHandler} */
export async function onRequest(_context, next) {
  const response = await next();
  // Allow short browser cache and stale-while-revalidate for smooth UX
  response.headers.set(
    "Cache-Control",
    "public, max-age=0, stale-while-revalidate=60"
  );
  return response;
}
