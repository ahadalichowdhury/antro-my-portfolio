# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   SESSION_SECRET=your-secret-key-change-this-in-production
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=changeme
   ```

3. **Initialize admin user:**
   ```bash
   npx tsx scripts/init-admin.ts
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## How Everything Works

### MongoDB Connection (`src/lib/mongodb.ts`)
- Uses MongoDB Node.js driver
- Connection is pooled and reused across requests
- In development, uses a global variable to preserve connection during HMR
- In production, creates a new connection per process
- Collections: `admins`, `posts`, `sessions`

### Admin Authentication (`src/lib/auth.ts` & `src/lib/session.ts`)
- **Password Hashing**: Uses bcrypt with 10 salt rounds
- **Login Flow**:
  1. User submits email/password at `/admin/login`
  2. Server verifies credentials using `verifyAdmin()`
  3. If valid, creates a session in MongoDB
  4. Sets secure HTTP-only cookie with session ID
  5. Cookie expires in 7 days
- **Session Storage**: Sessions stored in MongoDB `sessions` collection
- **Session Validation**: `requireAuth()` checks cookie, looks up session in DB, validates expiration
- **Logout**: Deletes session from DB and clears cookie

### Blog Post Management
- **Create**: `/admin/posts/new` - Form with rich text editor
- **Edit**: `/admin/posts/[id]/edit` - Pre-filled form with existing data
- **Delete**: POST to `/admin/posts/[id]/delete` - Removes from MongoDB
- **Publish/Unpublish**: Toggle checkbox in edit form
- **Rich Text Editor**: React Quill component with toolbar (headings, bold, italic, lists, links, code blocks)
- **Content Storage**: HTML content stored directly in MongoDB `content` field

### SEO & Open Graph (`src/layouts/BaseLayout.astro`)
- **Props**: `title`, `description`, `ogImage`, `ogType`, `canonicalUrl`
- **Auto-generated tags**:
  - Primary: `<title>`, `<meta name="description">`, `<link rel="canonical">`
  - Open Graph: `og:title`, `og:description`, `og:image`, `og:type`, `og:url`
  - Twitter: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- **Blog Posts**: Use article type, include cover image, use post-specific title/description
- **Semantic HTML**: Each page has exactly one `<h1>`, proper heading hierarchy

### Page Structure
- **Home** (`/`): Projects + Recent Blog Posts
- **About** (`/about`): About section + Recent Blog Posts  
- **Blog Listing** (`/blog`): All published posts
- **Blog Post** (`/blog/[slug]`): Individual post with full content
- **Admin Login** (`/admin/login`): Login form
- **Admin Dashboard** (`/admin`): List all posts, create/edit/delete
- **New Post** (`/admin/posts/new`): Create form
- **Edit Post** (`/admin/posts/[id]/edit`): Edit form

## File Organization

```
src/
├── components/        # Reusable UI components
│   ├── Header.astro
│   ├── Footer.astro
│   └── RichTextEditor.tsx (React component)
├── layouts/          # Page layouts
│   └── BaseLayout.astro (with SEO)
├── lib/              # Server-side utilities
│   ├── mongodb.ts    # Database connection
│   ├── models.ts     # TypeScript interfaces & collection getters
│   ├── auth.ts       # Password hashing & verification
│   └── session.ts    # Session management
└── pages/            # Astro pages (file-based routing)
    ├── index.astro
    ├── about.astro
    ├── blog/
    │   ├── index.astro
    │   └── [slug].astro
    └── admin/
        ├── login.astro
        ├── login.ts (API route)
        ├── logout.ts (API route)
        ├── index.astro
        └── posts/
            ├── new.astro
            ├── new.ts (API route)
            └── [id]/
                ├── edit.astro
                ├── edit.ts (API route)
                └── delete.ts (API route)

public/               # Static assets (served as-is)
├── styles.css
├── script.js
└── resource/
```

## Important Notes

1. **All existing CSS and JavaScript are preserved** - No design changes
2. **SPA navigation still works** - Smooth transitions maintained
3. **Dark mode & font toggle** - All existing features work
4. **SEO-first** - All pages are server-rendered with proper meta tags
5. **Security** - Passwords hashed, sessions in DB, HTTP-only cookies

## Deployment

1. Set environment variables in your hosting platform
2. Build: `npm run build`
3. Start: `node dist/server/entry.mjs`
4. Update `astro.config.mjs` with your actual domain for SEO

