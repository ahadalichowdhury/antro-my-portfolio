# SEO Guide for Portfolio Website

This guide explains the SEO implementation and how to improve your Google rankings.

## ✅ What's Already Implemented

### 1. **Meta Tags**

- Title tags on every page
- Meta descriptions (important for click-through rates)
- Canonical URLs (prevents duplicate content issues)
- Open Graph tags (for social media sharing)
- Twitter Card tags
- Author and keywords meta tags

### 2. **Structured Data (JSON-LD)**

- **Homepage**: Person schema with your profile information
- **About Page**: AboutPage schema
- **Blog Posts**: BlogPosting schema with author, dates, and content info

This helps Google understand your content better and can result in rich snippets in search results.

### 3. **Sitemap**

- Dynamic sitemap at `/sitemap.xml`
- Includes all static pages and blog posts
- Automatically updates when you add new posts
- Helps Google discover and index all your pages

### 4. **Robots.txt**

- Located at `/robots.txt`
- Allows search engines to crawl your site
- Blocks admin and API routes from being indexed

### 5. **Semantic HTML**

- Proper heading hierarchy (h1 → h2 → h3)
- One `<h1>` per page
- Article tags for blog posts
- Clean, crawlable HTML structure

## 🚀 Steps to Improve Google Rankings

### Step 1: Update Your Site URL (CRITICAL)

✅ **Already configured!** Your site URL is set to `https://ahadchowdhury.site` in:

- `astro.config.mjs`
- `public/robots.txt`
- `src/pages/sitemap.xml.ts`
- All page templates

If you need to change it in the future, update these files:

1. **`astro.config.mjs`**:

```javascript
site: 'https://ahadchowdhury.site',
```

2. **`public/robots.txt`**:

```
Sitemap: https://ahadchowdhury.site/sitemap.xml
```

3. **`src/pages/sitemap.xml.ts`**:

```typescript
const siteUrl = site?.href || "https://ahadchowdhury.site";
```

### Step 2: Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (your website URL)
3. Verify ownership (Vercel provides DNS verification)
4. Submit your sitemap: `https://ahadchowdhury.site/sitemap.xml`

### Step 3: Submit to Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site and submit sitemap

### Step 4: Create Quality Content

**For Blog Posts:**

- Write 1000+ words for better rankings
- Use relevant keywords naturally
- Include internal links to other posts
- Add images with descriptive alt text
- Update old posts regularly

**Keywords to Target:**

- "software engineer Bangladesh"
- "backend developer Node.js"
- "Golang developer"
- "AWS cloud engineer"
- "Docker Kubernetes expert"
- Your name: "S. M. Ahad Ali Chowdhury"

### Step 5: Build Backlinks

- Share your blog posts on social media
- Post on Reddit, Hacker News, Dev.to
- Comment on relevant blogs with your website link
- Add your website to your GitHub profile
- Add to your LinkedIn profile
- Submit to developer directories

### Step 6: Optimize Page Speed

Your site is already optimized with:

- Server-side rendering (SSR)
- Minimal JavaScript
- Optimized images

**Additional Tips:**

- Use WebP format for images
- Enable Vercel's automatic image optimization
- Minimize external scripts

### Step 7: Mobile-Friendly

Your site is already responsive, but ensure:

- All pages work well on mobile
- Text is readable without zooming
- Buttons are easily clickable

### Step 8: Regular Updates

- Publish new blog posts regularly (at least once a month)
- Update existing content
- Add new projects
- Keep information current

## 📊 Monitoring Your Rankings

### Tools to Use:

1. **Google Search Console**

   - See which keywords bring traffic
   - Monitor indexing status
   - Check for errors

2. **Google Analytics** (Optional)

   - Track visitor behavior
   - See which pages are popular

3. **Ahrefs / SEMrush** (Free tier available)
   - Check keyword rankings
   - Analyze competitors

## 🎯 Quick Wins

1. **Add Alt Text to Images**

   - All images should have descriptive alt text
   - Helps with accessibility and SEO

2. **Internal Linking**

   - Link between related blog posts
   - Link from homepage to important pages
   - Use descriptive anchor text

3. **Update Meta Descriptions**

   - Make them compelling (50-160 characters)
   - Include target keywords
   - Encourage clicks

4. **Add FAQ Section** (Optional)
   - Answer common questions about your work
   - Can appear as rich snippets in Google

## ⚠️ Common Mistakes to Avoid

1. **Don't keyword stuff** - Write naturally
2. **Don't duplicate content** - Each page should be unique
3. **Don't ignore mobile** - Most searches are mobile
4. **Don't forget to update sitemap URL** - Critical for indexing
5. **Don't use "click here" links** - Use descriptive text

## 📈 Expected Timeline

- **Week 1-2**: Google starts crawling your site
- **Week 2-4**: Pages start appearing in search results
- **Month 2-3**: Rankings improve with regular content
- **Month 3-6**: Significant traffic from organic search

**Remember**: SEO is a long-term strategy. Consistency is key!

## 🔍 Testing Your SEO

1. **Check if Google can see your site**:

   - Use Google's "Fetch as Google" in Search Console
   - Or use: `site:ahadchowdhury.site` in Google search

2. **Validate structured data**:

   - Use [Google's Rich Results Test](https://search.google.com/test/rich-results)

3. **Check mobile-friendliness**:

   - Use [Google's Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

4. **Test page speed**:
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)

## 📝 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Update site URL in config files
3. ✅ Submit to Google Search Console
4. ✅ Start creating regular blog content
5. ✅ Share on social media
6. ✅ Monitor and improve

Good luck with your SEO journey! 🚀
