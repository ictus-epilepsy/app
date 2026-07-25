# Ictus — design prototype

A self-contained, single-file **front-end prototype** of the Ictus epilepsy
tracking & support app. This is a design/UX reference for the production build
(the Next.js + FastAPI app in this repo).

## View it
Double-click **`ictus-prototype.html`** (or drag it into any browser).
No build step, no server, no dependencies — all HTML/CSS/JS and fonts are inlined.

## What it shows
Onboarding, home dashboard, seizure logging, daily factors, pattern insights,
learning resources, a peer community feed, and a nearby support-group finder —
with the intended visual design (muted forest-green on charcoal, IBM Plex Sans +
Newsreader type). Sample data is generated in-memory; nothing leaves the browser.

> Note: this is the design prototype only. The production implementation lives
> in the `api/` (FastAPI) and `src/` (Next.js) folders.




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
