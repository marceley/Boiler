# Boiler

Website for Boiler, an underground gallery in Copenhagen by architect Kristian Eley and art historian Johanne Schrøder.

## Features

- 🚀 Server-side rendering with React Router
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔒 TypeScript by default
- 🎨 TailwindCSS for styling
- 📧 Newsletter subscription with Resend
- 📱 Responsive design
- 🔍 SEO optimized with structured data
- 📊 Vercel Analytics integration

## Tech Stack

- **Framework:** React Router v7
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **Email:** Resend
- **Deployment:** Vercel
- **Runtime:** Node.js

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_AUDIENCE_ID=your_audience_id_here
RESEND_FROM_EMAIL=noreply@boiler19.com
```

See [RESEND_SETUP.md](./RESEND_SETUP.md) for detailed setup instructions.

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

## Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

### Vercel Deployment

1. Push your code to a Git repository
2. Import the project in Vercel
3. Add environment variables in Vercel project settings:
   - `RESEND_API_KEY`
   - `RESEND_AUDIENCE_ID`
   - `RESEND_FROM_EMAIL`
4. Deploy

## Caching

DatoCMS content (exhibitions, about page) is cached at Vercel's edge with tag-based invalidation. See the routes that set `Vercel-Cache-Tag: datocms-content` and the `/api/revalidate` webhook endpoint.

### Viewing cached content

Vercel does not expose a list of cached URLs or entries. The cache is opaque, but you can still inspect and manage it:

**Check if a specific URL is cached**

```bash
vercel httpstat https://your-domain.com/exhibitions/current
```

Shows response timing and whether the response came from the CDN cache.

**Response headers**

When a response is served from cache, Vercel adds headers like `x-vercel-cache: HIT` (or `MISS`). Inspect these in the browser's Network tab or with:

```bash
curl -I https://your-domain.com/exhibitions/current
```

**Observability**

In the Vercel dashboard: **Project → Analytics** (or **Observability**). You can see cache hit rates and edge request metrics, but not individual cached URLs.

**Manual revalidation**

- **Admin page:** Visit `/admin/revalidate` and enter your `REVALIDATE_SECRET`
- **CLI:** `vercel cache invalidate --tag datocms-content`
- **API:** `curl -X POST https://your-domain.com/api/revalidate -H "Authorization: Bearer YOUR_REVALIDATE_SECRET"`

## Project Structure

```
├── app/
│   ├── components/      # React components
│   ├── data/           # Data and configuration
│   ├── routes/         # Route handlers and pages
│   ├── root.tsx        # Root layout
│   └── app.css         # Global styles
├── public/             # Static assets
├── build/              # Production build output
└── package.json
```

## Newsletter Subscription

The website includes a newsletter subscription form that:

- Collects name and email
- Uses Resend for email management
- Includes honeypot spam prevention
- Sends notifications to gallery directors
- Stores subscribers in a Resend audience

See [RESEND_SETUP.md](./RESEND_SETUP.md) for setup details.

## Pages

- **Home** (`/`) - Main landing page with newsletter subscription
- **About** (`/about`) - Information about the gallery
- **Contact** (`/contact`) - Contact information and subscription form

## Styling

This project uses [TailwindCSS v4](https://tailwindcss.com/) for styling. Styles are configured in `app/app.css` using the new `@theme` directive.

---

Built with ❤️ using React Router.
