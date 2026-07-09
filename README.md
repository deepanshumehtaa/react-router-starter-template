This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

 > npx create-next-app@latest


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


to deploy on claudflare worker:

> npm install @opennextjs/cloudflare@latest

> npm install -D wrangler@latest

> create wrangler.jsonc and not wrangler.json, if wrangler.json is there delete that

```
{
  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "core-app",

  "main": "./.open-next/worker.js",

  "compatibility_date": "2026-06-25",

  "compatibility_flags": [
    "nodejs_compat",
    "global_fetch_strictly_public"
  ],

  "assets": {
    "directory": "./.open-next/assets",
    "binding": "ASSETS"
  },

  "upload_source_maps": true,

  "vars": {
    "VALUE_FROM_CLOUDFLARE": "Hello from Cloudflare"
  },

  "d1_databases": [
    {
      "binding": "DB_BINDING",
      "database_name": "test-lite-db",
      "database_id": "feb3521b-04c3-4e10-8b97-8adf5145be0d"
    }
  ]
}
```

> create open-next.config.ts  [Controls how your Next.js application is transformed and packaged to run on Cloudflare Workers.]
```
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // incrementalCache: r2IncrementalCache,
});
```

check build if it is building or not: `npx open-next build --debug`


> Package.json need to have:
```
"scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "build:cf": "npx @opennextjs/cloudflare build",
    "preview:cf": "npx @opennextjs/cloudflare preview",
    "deploy:cf": "npx @opennextjs/cloudflare deploy",
    "start": "next start",
    "lint": "next lint"
  },
```

# Most Important:
1. check in your wrangler.jsonc, `name` should be same as app name in cloudflare
2. In Your Cloudflare dashboard check commands that being executed to buld and deploy, in settings section under `Build configuration` and set those to:
```
Build command: npm run build:cf
Deploy command: npm run deploy
Non-production branch deploy command: npm run deploy
```
