import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // Change this to your actual Vercel domain after deployment
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['react-quill']
    }
  }
});
