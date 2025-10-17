# Recipe: React Router + GitHub + Vercel Boilerplate

This recipe walks you through creating a production-ready React Router application from scratch, pushing it to GitHub, and deploying it to Vercel.

## Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Git installed and configured
- GitHub account
- Vercel account (free tier works)

## Step 1: Create a New React Router Project

```bash
# Create a new project using the React Router CLI
npx create-react-router@latest my-project-name

# When prompted, choose:
# - TypeScript: Yes
# - Install dependencies: Yes
```

Or for the exact configuration used in this boilerplate:

```bash
# Navigate to your projects directory
cd ~/Documents/Github

# Create the project
npx create-react-router@latest my-project-name

# Navigate into the project
cd my-project-name
```

## Step 2: Verify Local Setup

```bash
# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to verify the app is running.

## Step 3: Configure for Vercel

Create a `vercel.json` file in the root of your project:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build/client",
  "framework": "react-router"
}
```

## Step 4: Initialize Git Repository

```bash
# Initialize git (if not already done by create-react-router)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: React Router boilerplate"
```

## Step 5: Push to GitHub

### Option A: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if you don't have it
# macOS: brew install gh
# Or download from: https://cli.github.com/

# Authenticate (one-time setup)
gh auth login

# Create a new repository and push
gh repo create my-project-name --public --source=. --push
```

### Option B: Manual GitHub Setup

1. Go to [github.com](https://github.com) and create a new repository
2. **Do NOT** initialize with README, .gitignore, or license
3. Copy the repository URL
4. Run these commands:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR-USERNAME/my-project-name.git

# Push to GitHub
git branch -M master  # or main, depending on your preference
git push -u origin master
```

## Step 6: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally (one-time setup)
npm install -g vercel

# Login to Vercel (one-time setup)
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Choose your account
# - Link to existing project? No
# - Project name? (press enter to use current directory name)
# - In which directory is your code located? ./
# - Override settings? No

# For production deployment
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel should auto-detect React Router settings
6. Click "Deploy"

## Project Structure

```
my-project-name/
├── app/
│   ├── app.css              # Global styles
│   ├── root.tsx             # Root component
│   ├── routes.ts            # Route configuration
│   └── routes/
│       └── home.tsx         # Home page route
├── public/
│   └── favicon.ico          # Public assets
├── package.json             # Dependencies and scripts
├── react-router.config.ts   # React Router configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment config
└── README.md                # Project documentation
```

## Key Dependencies

This boilerplate includes:

- **React Router v7** - Full-stack routing and SSR
- **React 19** - Latest React with server components
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Fast build tool and dev server

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server locally
npm run typecheck  # Run TypeScript type checking
```

## Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build/client",
  "framework": "react-router"
}
```

### react-router.config.ts
```typescript
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,  // Enable server-side rendering
} satisfies Config;
```

## Post-Setup Checklist

- [ ] Local development server runs successfully
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] Production build completes (`npm run build`)
- [ ] Git repository initialized and committed
- [ ] Code pushed to GitHub
- [ ] Vercel deployment successful
- [ ] Custom domain configured (optional)
- [ ] Environment variables set in Vercel (if needed)

## Environment Variables

If your project needs environment variables:

1. Create a `.env` file locally (add to .gitignore)
2. In Vercel dashboard:
   - Go to Project Settings
   - Navigate to Environment Variables
   - Add your variables for Production/Preview/Development

## Troubleshooting

### Build fails on Vercel
- Check that `vercel.json` is in the root directory
- Verify Node.js version (should be 18+)
- Check build logs for specific errors

### GitHub push rejected
- Verify you have write access to the repository
- Check if you need to pull changes first: `git pull origin master`

### Local dev server won't start
- Delete `node_modules` and run `npm install` again
- Check for port conflicts (default: 5173)
- Verify Node.js version

## Next Steps

After setup, you can:

1. Add new routes in `app/routes/`
2. Configure authentication
3. Add database integration
4. Set up CI/CD pipelines
5. Add testing (Jest, Vitest, Playwright)
6. Configure custom domain in Vercel

## Resources

- [React Router Docs](https://reactrouter.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)

---

**Created:** October 2025  
**React Router Version:** 7.9.2  
**Node Version:** 18+

