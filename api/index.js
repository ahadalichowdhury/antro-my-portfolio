// Vercel serverless function entry point for Astro Node.js server
// This wraps the standalone Node.js server to work with Vercel's serverless functions

export default async function handler(req, res) {
  // Import the built server entry point
  const { handler: astroHandler } = await import('../.output/server/entry.mjs');
  
  // Convert Vercel's request/response to Node.js format
  const url = `http://${req.headers.host}${req.url}`;
  
  // Create Node.js-compatible request object
  const nodeReq = {
    method: req.method,
    url: url,
    headers: req.headers,
    body: req.body,
    on: () => {},
    once: () => {},
    removeListener: () => {}
  };
  
  // Create Node.js-compatible response object
  let statusCode = 200;
  let headers = {};
  let body = '';
  
  const nodeRes = {
    writeHead: (code, h) => {
      statusCode = code;
      headers = { ...headers, ...h };
    },
    setHeader: (key, value) => {
      headers[key] = value;
    },
    write: (chunk) => {
      body += chunk;
    },
    end: (chunk) => {
      if (chunk) body += chunk;
      res.status(statusCode);
      Object.keys(headers).forEach(key => {
        res.setHeader(key, headers[key]);
      });
      res.send(body);
    }
  };
  
  try {
    await astroHandler(nodeReq, nodeRes);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
}

