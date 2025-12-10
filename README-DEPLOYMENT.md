# Deploying to Vercel

## Prerequisites

1. A GitHub account
2. A Vercel account (sign up at https://vercel.com)
3. MongoDB Atlas account (or your MongoDB connection string)

## Quick Deployment Guide

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Astro
5. **Configure Build Settings**:
   - Framework Preset: **Astro**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. **Add Environment Variables** (Click "Environment Variables"):
   - `MONGODB_URI` - Your MongoDB connection string
   - Add any other variables from your `.env` file
7. Click **"Deploy"**

#### Using Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

### Step 3: Configure Environment Variables

**Important**: After adding environment variables, you must redeploy!

1. Go to your project in Vercel dashboard
2. Go to **Settings** → **Environment Variables**
3. Add:
   - `MONGODB_URI` - Your MongoDB connection string
   - Any other variables you need
4. Go to **Deployments** tab and click **"Redeploy"**

### Step 4: Update Site URL

After deployment, you'll get a URL like `https://your-project.vercel.app`

1. Update `astro.config.mjs`:

```javascript
site: 'https://your-project.vercel.app', // Your actual Vercel domain
```

2. Commit and push:

```bash
git add astro.config.mjs
git commit -m "Update site URL for Vercel"
git push
```

### Step 5: Configure MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Go to **Network Access**
3. Add IP Address: `0.0.0.0/0` (allows all IPs) OR add Vercel's IP ranges
4. Save changes

## Important Notes

✅ **Environment Variables**: Never commit `.env` file. Always add them in Vercel dashboard  
✅ **MongoDB**: Make sure MongoDB Atlas allows connections from Vercel  
✅ **Build Time**: First build takes 2-5 minutes  
✅ **Custom Domain**: Add custom domain in Vercel project settings  
✅ **Auto Deploy**: Every push to main branch auto-deploys

## Troubleshooting

### Build Fails

- Check Vercel build logs
- Verify all dependencies are in `package.json`
- Make sure Node.js version is compatible (20.x recommended)

### MongoDB Connection Issues

- Verify `MONGODB_URI` is set correctly in Vercel
- Check MongoDB Atlas IP whitelist
- Ensure MongoDB cluster is running

### 404 Errors

- Check `vercel.json` configuration
- Verify routes are correct
- Check server logs in Vercel dashboard

### Environment Variables Not Working

- Make sure variables are added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

## Support

For more help:

- Vercel Docs: https://vercel.com/docs
- Astro Docs: https://docs.astro.build
- Check Vercel build logs for specific errors
