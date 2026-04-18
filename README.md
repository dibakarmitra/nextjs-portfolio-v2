# Next.js Portfolio v2

A modern, lightweight, high-performance portfolio built with Next.js, TypeScript, and MDX.

## 🚀 Features

- **Static-First**: Blazing fast performance with Next.js App Router.
- **MDX Powered**: Write notes/blogs using markdown in the `contents/` directory.
- **Contact Form**: Integrated with Resend API for seamless email submissions.
- **SEO Optimized**: Dynamic `sitemap.ts` and `robots.ts` generation.
- **Premium UI**: Clean, modern design with dark mode and smooth animations.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Content**: MDX (`next-mdx-remote`)
- **Email**: Resend
- **Deployment**: Optimized for Vercel/Static Hosting

## 🏁 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Environment**:
   Create a `.env.local` file:
   ```bash
   APP_NAME="Your Portfolio"
   APP_URL="http://localhost:3000"
   RESEND_API_KEY="re_..."
   CONTACT_EMAIL_FROM="onboarding@resend.dev"
   CONTACT_EMAIL_TO="your@email.com"
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

- `config/data.ts`: Main source of truth for profile, projects, and resume data.
- `contents/`: All blog/notes in `.mdx` format.
- `components/web/`: UI components and layout sections.
- `app/api/send/`: Resend email integration route.

## 📜 Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run format`: Format code with Prettier.
- `npm run lint`: Run ESLint checks.