# How Everything Works - Detailed Explanation

## MongoDB Connection

**File**: `src/lib/mongodb.ts`

- Uses the official MongoDB Node.js driver
- Connection is established once and reused across requests (connection pooling)
- In development: Uses a global variable to preserve connection during Hot Module Replacement (HMR)
- In production: Creates a new connection per Node.js process
- The `getDatabase()` function returns the database instance for collection access
- Collections are accessed through helper functions in `models.ts`

## Admin Authentication Flow

**Files**: `src/lib/auth.ts`, `src/lib/session.ts`

### Password Security
- Passwords are hashed using `bcryptjs` with 10 salt rounds
- When creating an admin: `hashPassword()` generates a secure hash
- When logging in: `verifyPassword()` compares plain text password with stored hash
- Original passwords are never stored in the database

### Login Process (`/admin/login`)
1. User submits email and password via POST form
2. Server calls `verifyAdmin(email, password)`:
   - Looks up admin by email in MongoDB
   - Compares submitted password with stored hash using bcrypt
   - Returns admin object if valid, null if invalid
3. If valid, `createSession()` is called:
   - Generates a unique session ID (UUID)
   - Stores session in MongoDB `sessions` collection with:
     - `sessionId`: Unique identifier
     - `email`: Admin's email
     - `expires`: Expiration date (7 days from now)
   - Sets HTTP-only cookie named `admin_session` with the session ID
   - Cookie is secure (HTTPS only in production), httpOnly (not accessible via JavaScript), and sameSite: strict

### Session Validation
- `requireAuth(cookies)` is called on protected routes:
  1. Extracts session ID from cookie
  2. Looks up session in MongoDB
  3. Checks if session exists and hasn't expired
  4. Returns `{ email }` if valid, `null` if invalid/expired
  5. If expired, automatically cleans up the session

### Logout
- Deletes session from MongoDB
- Clears the cookie
- Redirects to login page

## Blog Post CRUD Operations

### Create Post (`/admin/posts/new`)
1. Admin fills out form with:
   - Title, slug, description
   - Rich text content (via React Quill editor)
   - Tags (comma-separated)
   - Publish checkbox
2. On submit, JavaScript syncs editor HTML to hidden textarea
3. POST to `/admin/posts/new.ts`:
   - Validates all required fields
   - Checks if slug already exists (must be unique)
   - Parses tags into array
   - Gets current admin's ID from session
   - Inserts new document into `posts` collection
   - Redirects to admin dashboard

### Edit Post (`/admin/posts/[id]/edit`)
1. Loads existing post data from MongoDB
2. Pre-fills form with current values
3. Rich text editor initialized with existing HTML content
4. On submit, updates document in MongoDB
5. Validates slug uniqueness (excluding current post)

### Delete Post (`/admin/posts/[id]/delete`)
1. POST request to delete endpoint
2. Finds post by ID and deletes from MongoDB
3. Redirects to dashboard

### Publish/Unpublish
- Toggle checkbox in edit form
- Updates `published` field in MongoDB
- Only published posts appear on public blog pages

## Rich Text Editor

**File**: `src/components/RichTextEditor.tsx`

- React component using `react-quill` library
- Toolbar includes: headings, bold, italic, underline, lists, links, code blocks
- Content is stored as HTML in MongoDB
- On form submit, editor HTML is synced to hidden textarea
- Editor supports dark mode via CSS variables
- Initial content can be passed via `initialValue` prop (for edit mode)

## SEO & Open Graph Implementation

**File**: `src/layouts/BaseLayout.astro`

### How It Works
- BaseLayout accepts props: `title`, `description`, `ogImage`, `ogType`, `canonicalUrl`
- Automatically generates all meta tags in the `<head>`
- Each page passes its specific SEO data

### Tags Generated
1. **Primary SEO**:
   - `<title>` - Page title
   - `<meta name="description">` - Page description
   - `<link rel="canonical">` - Canonical URL

2. **Open Graph** (for social sharing):
   - `og:title` - Title for social previews
   - `og:description` - Description for social previews
   - `og:image` - Image for social previews
   - `og:type` - Type (website or article)
   - `og:url` - Full URL of the page

3. **Twitter Cards**:
   - `twitter:card` - Card type (summary_large_image)
   - `twitter:title`, `twitter:description`, `twitter:image`

### Per Page Usage
- **Home page**: Uses default title/description
- **About page**: Custom title/description
- **Blog listing**: Blog-specific SEO
- **Blog posts**: Uses post data (title, description, cover image) for article-type OG tags

### Semantic HTML
- Each page has exactly one `<h1>` tag
- Proper heading hierarchy (h1 → h2 → h3)
- All content is server-rendered (no client-side only content)
- Clean, crawlable HTML structure

## Project Structure Benefits

- **File-based routing**: Astro automatically creates routes from `src/pages/` structure
- **Server-side rendering**: All pages are pre-rendered for SEO
- **API routes**: `.ts` files in `pages/` become API endpoints
- **Component reusability**: Header, Footer, Layouts shared across pages
- **Type safety**: TypeScript interfaces for MongoDB documents
- **Separation of concerns**: Auth, database, models in separate files

## Deployment Considerations

1. **Environment Variables**: Must be set in hosting platform
2. **MongoDB Atlas**: Whitelist your server IP addresses
3. **Node.js Version**: Ensure compatibility (Node 18+ recommended)
4. **Build Output**: `dist/` folder contains server entry point
5. **Static Assets**: `public/` folder is served as-is
6. **Session Cleanup**: Consider running cleanup job periodically for expired sessions

