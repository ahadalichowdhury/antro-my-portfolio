// Vercel serverless function entry point for Astro Node.js server
// This wraps the standalone Node.js server to work with Vercel's serverless functions

import { createServer } from 'http';
import { handler as astroHandler } from '../dist/server/entry.mjs';

export default async function handler(req, res) {
  try {
    // Create a mock Node.js request object
    const url = `http://${req.headers.host}${req.url}`;
    const nodeReq = {
      method: req.method,
      url: url,
      headers: req.headers,
      body: req.body,
      on: () => {},
      once: () => {},
      removeListener: () => {}
    };
    
    // Create a mock Node.js response object
    let statusCode = 200;
    let responseHeaders = {};
    let responseBody = '';
    let responseEnded = false;
    
    const nodeRes = {
      writeHead: (code, h) => {
        statusCode = code;
        if (h) {
          responseHeaders = { ...responseHeaders, ...h };
        }
      },
      setHeader: (key, value) => {
        responseHeaders[key] = value;
      },
      getHeader: (key) => responseHeaders[key],
      write: (chunk) => {
        if (!responseEnded) {
          responseBody += chunk;
        }
      },
      end: (chunk) => {
        if (responseEnded) return;
        responseEnded = true;
        if (chunk) responseBody += chunk;
        
        // Send response to Vercel
        res.status(statusCode);
        Object.keys(responseHeaders).forEach(key => {
          res.setHeader(key, responseHeaders[key]);
        });
        res.send(responseBody);
      }
    };
    
    // Call the Astro handler
    await astroHandler(nodeReq, nodeRes);
    
    // If response wasn't ended by Astro, end it now
    if (!responseEnded) {
      res.status(statusCode);
      Object.keys(responseHeaders).forEach(key => {
        res.setHeader(key, responseHeaders[key]);
      });
      res.send(responseBody || '');
    }
  } catch (error) {
    console.error('Error handling request:', error);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  }
}

