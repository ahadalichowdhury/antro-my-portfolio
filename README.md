# Portfolio Website with Astro + MongoDB

A modern portfolio website built with Astro, featuring a full backend with MongoDB, admin authentication, and blog management.

## Features

- ✅ **Astro Framework** - Fast, modern static site generation with SSR
- ✅ **MongoDB Integration** - Full database support for blog posts and admin users
- ✅ **Admin Authentication** - Secure login system with bcrypt password hashing
- ✅ **Blog Management** - Full CRUD operations for blog posts
- ✅ **Rich Text Editor** - React Quill editor for creating blog posts
- ✅ **SEO Optimized** - Complete Open Graph and meta tag support
- ✅ **Dark Mode** - System preference detection with manual toggle
- ✅ **Font Toggle** - Multiple font family options
- ✅ **SPA-like Navigation** - Smooth page transitions

## Project Structure

```
portfolio-website/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── RichTextEditor.tsx
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro # SEO-enabled base layout
│   ├── lib/                # Server-side utilities
│   │   ├── mongodb.ts      # MongoDB connection
│   │   ├── models.ts       # Database models
│   │   ├── auth.ts         # Authentication logic
│   │   └── session.ts      # Session management
│   └── pages/              # Astro pages (file-based routing)
│       ├── index.astro     # Home page
│       ├── about.astro     # About page
│       ├── blog/           # Blog pages
│       │   ├── index.astro # Blog listing
│       │   └── [slug].astro # Individual blog post
│       └── admin/          # Admin pages
│           ├── login.astro # Admin login
│           ├── index.astro # Admin dashboard
│           └── posts/      # Blog post management
├── public/                 # Static assets
│   ├── styles.css
│   ├── script.js
│   └── resource/
└── scripts/               # Utility scripts
    └── init-admin.ts      # Initialize admin user
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
SESSION_SECRET=your-secret-key-change-this-in-production
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme
```

### 3. Initialize Admin User

```bash
npx tsx scripts/init-admin.ts
```

This will create the first admin user using the credentials from your `.env` file.

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:4321`

### 5. Build for Production

```bash
npm run build
npm run preview
```

## MongoDB Collections

### `admins`

- `email` (string) - Admin email address
- `hashedPassword` (string) - Bcrypt hashed password
- `createdAt` (Date) - Account creation date

### `posts`

- `title` (string) - Blog post title
- `slug` (string) - URL-friendly identifier
- `description` (string) - Short description for listings
- `content` (string) - HTML content from rich text editor
- `coverImage` (string, optional) - Cover image URL
- `tags` (string[]) - Array of tags
- `createdAt` (Date) - Creation timestamp
- `updatedAt` (Date) - Last update timestamp
- `authorId` (ObjectId) - Reference to admin user
- `published` (boolean) - Publication status

## How It Works

### MongoDB Connection

- Connection is handled in `src/lib/mongodb.ts`
- Uses connection pooling for efficiency
- Supports both development (with HMR) and production modes

### Admin Authentication

- Passwords are hashed using bcrypt (10 rounds)
- Sessions are stored in secure HTTP-only cookies
- Session validation happens on protected routes
- Login endpoint: `/admin/login` (POST)
- Logout endpoint: `/admin/logout` (POST)

### Blog Post Management

1. **Create**: Navigate to `/admin/posts/new`
2. **Edit**: Click "Edit" on any post in the dashboard
3. **Delete**: Click "Delete" (with confirmation)
4. **Publish/Unpublish**: Toggle checkbox in edit form

### SEO & Open Graph

- Each page uses `BaseLayout.astro` which accepts SEO props
- Automatically generates:
  - `<title>` tags
  - Meta descriptions
  - Open Graph tags (og:title, og:description, og:image, og:type, og:url)
  - Twitter Card tags
  - Canonical URLs
- Blog posts use article-specific OG tags with cover images

## Deployment

### Render / Railway / Vercel (Node.js)

1. Set environment variables in your hosting platform
2. Build command: `npm run build`
3. Start command: `node dist/server/entry.mjs`
4. Ensure MongoDB Atlas allows connections from your server IP

### Environment Variables Required

- `MONGODB_URI` - Your MongoDB connection string
- `SESSION_SECRET` - Random secret for session encryption
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password (change after first login!)

## Notes

- All existing CSS and JavaScript are preserved exactly as they were
- The design and styling remain unchanged
- SPA navigation is maintained for smooth transitions
- Dark mode and font toggle features work as before
- All pages are server-side rendered for SEO
