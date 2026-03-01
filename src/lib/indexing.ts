/**
 * Google Indexing API utility
 *
 * Automatically notifies Google when a blog post is published or updated.
 * This triggers an immediate crawl instead of waiting days/weeks for
 * Google to discover the page on its own.
 *
 * Setup required (see README-DEPLOYMENT.md for full guide):
 *   1. Create a Google Cloud project & enable "Indexing API"
 *   2. Create a Service Account, download the JSON key
 *   3. Add the service account as an Owner in Google Search Console
 *   4. Set GOOGLE_INDEXING_CLIENT_EMAIL and GOOGLE_INDEXING_PRIVATE_KEY
 *      environment variables in Vercel
 */

const SITE_URL = "https://ahadchowdhury.site";
const INDEXING_API = "https://indexing.googleapis.com/v3/urlNotifications:publish";

/**
 * Create a signed JWT for Google APIs using only the Web Crypto API
 * (no external libraries needed — works on Vercel Edge/Node runtimes).
 */
async function createJWT(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    sub: clientEmail,
    aud: "https://indexing.googleapis.com/",
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const signingInput = `${encode(header)}.${encode(payload)}`;

  // Clean up the PEM key (Vercel stores newlines as \n in env vars)
  const pemKey = privateKey.replace(/\\n/g, "\n");
  const pemBody = pemKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const keyBuffer = Buffer.from(pemBody, "base64");

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(signingInput)
  );

  const signatureB64 = Buffer.from(signature).toString("base64url");
  return `${signingInput}.${signatureB64}`;
}

/**
 * Get a short-lived OAuth2 access token from Google using the service account JWT.
 */
async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const jwt = await createJWT(clientEmail, privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get access token: ${text}`);
  }

  const data = await res.json() as { access_token: string };
  return data.access_token;
}

/**
 * Notify Google's Indexing API about a URL.
 *
 * @param slug  - The blog post slug (e.g. "my-first-post")
 * @param type  - "URL_UPDATED" when publishing/updating, "URL_DELETED" when deleting
 */
export async function notifyGoogleIndexing(
  slug: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<void> {
  const clientEmail = import.meta.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = import.meta.env.GOOGLE_INDEXING_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    console.log(
      "[Indexing] Skipping — GOOGLE_INDEXING_CLIENT_EMAIL or GOOGLE_INDEXING_PRIVATE_KEY not set"
    );
    return;
  }

  const url = `${SITE_URL}/blog/${slug}`;

  try {
    const accessToken = await getAccessToken(clientEmail, privateKey);

    const res = await fetch(INDEXING_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url, type }),
    });

    if (res.ok) {
      console.log(`[Indexing] ✅ Notified Google: ${type} → ${url}`);
    } else {
      const text = await res.text();
      console.warn(`[Indexing] ⚠️  Google API returned ${res.status}: ${text}`);
    }
  } catch (err) {
    // Non-fatal — post is saved to DB regardless. Just log and move on.
    console.error("[Indexing] ❌ Failed to notify Google Indexing API:", err);
  }
}
