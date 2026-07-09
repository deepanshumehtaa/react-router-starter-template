# Deploying Next.js to Cloudflare Workers (OpenNext + Wrangler)

## 1. Create the Next.js app

```bash
npx create-next-app@latest my-app
cd my-app
```

## 2. Install the Cloudflare adapter and Wrangler

```bash
npm install @opennextjs/cloudflare
npm install -D wrangler
```

## 3. Add `open-next.config.ts` (project root)

Cloudflare-specific OpenNext settings go **here**, not in `next.config.ts`.

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Optional: override caching behavior, queue, etc.
});
```

## 4. Keep `next.config.ts` as a normal Next.js config

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

## 5. Add `wrangler.jsonc` (project root)

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-app",
  "main": "./.open-next/worker.js",
  "compatibility_date": "2026-06-25",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "directory": "./.open-next/static"
  },
  "upload_source_maps": true
}
```

Keep only **one** wrangler config file (`.json` or `.jsonc`) — having both causes Wrangler to pick one arbitrarily.

## 6. `package.json` scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "cf:build": "opennextjs-cloudflare build",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "start": "next start",
    "lint": "eslint"
  }
}
```

**Important:** `"build"` must stay as `"next build"`. Do **not** set it to `"opennextjs-cloudflare build"` — that command internally runs `npm run build` to build the underlying Next.js app, so pointing `build` back at it creates infinite recursion (Cloudflare's build log shows the OpenNext banner repeating forever and the deployment never finishes).

## 7. Local development

```bash
npm run dev
```

## 8. Build and preview locally (simulates the Workers runtime)

```bash
npm run cf:build
npm run preview
```

## 9. Deploy manually from your machine

```bash
npx wrangler login
npm run deploy
```

## 10. Deploy via Cloudflare's Git integration (Workers Builds / Pages)

In the Cloudflare dashboard project settings:

- **Build command:** `npx opennextjs-cloudflare build`
- **Deploy command:** (leave to Cloudflare's default, or `npx wrangler deploy` if asked)

Do **not** set the dashboard's build command to `npm run build` — that only runs `next build`, not the Cloudflare bundling step.

---

## Problems encountered and fixes

### Problem 1: Infinite build loop, deployment never completes

**Symptom:** Build log shows `opennextjs-cloudflare build` triggering itself over and over, printing the OpenNext banner repeatedly, until it times out.

**Cause:** `package.json` had:

```json
"build": "opennextjs-cloudflare build"
```

`opennextjs-cloudflare build` calls `npm run build` internally to build the Next.js app. Since `build` pointed to itself, this recursed forever.

**Fix:** Set `"build": "next build"` and move the Cloudflare-specific build into its own script (e.g. `"cf:build"`), used only by `preview`/`deploy`, or invoked directly in the platform's build command as `npx opennextjs-cloudflare build`.

Also check `wrangler.jsonc`/`wrangler.json` for a `"build": { "command": "npm run build" }` block — this re-triggers the build during `wrangler deploy` and should be removed since Cloudflare's build pipeline already runs the build step.

### Problem 2: TypeScript error — `defineCloudflareConfig` used in the wrong file

**Symptom:**

```
Type error: Object literal may only specify known properties, and 'typescript' does not exist in type 'CloudflareOverrides'.
> 4 |   typescript: {
```

**Cause:** `next.config.ts` was written using `defineCloudflareConfig` from `@opennextjs/cloudflare`:

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
});
```

`defineCloudflareConfig` is meant for `open-next.config.ts`, not `next.config.ts`. `next build` then rejected the unrecognized Next.js config options.

**Fix:** `next.config.ts` should use plain Next.js config (`NextConfig` type, see step 4 above). Keep `defineCloudflareConfig` only in `open-next.config.ts` (step 3 above).

### Problem 3: Duplicate/conflicting Wrangler config files

**Symptom:** Two files present — `wrangler.json` and `wrangler.jsonc` — with different `name` and `main` paths.

**Fix:** Keep only one wrangler config file matching your actual `.open-next` output structure, and delete the other.

### Problem 4: `The entry-point file at ".open-next/worker.js" was not found`

**Symptom:** Build succeeds, but `wrangler deploy` fails with:

```
✘ [ERROR] The entry-point file at ".open-next/worker.js" was not found.
```

**Cause:** `wrangler.jsonc` had `"main": "./.open-next/server/index.js"`, but `@opennextjs/cloudflare` emits the Workers entry point at `.open-next/worker.js`, not under `server/`.

**Fix:** Set `"main": "./.open-next/worker.js"` in `wrangler.jsonc` (see step 5 above).

---

## Quick command reference

| Command | Purpose |
|---|---|
| `npx create-next-app@latest my-app` | Scaffold a new Next.js app |
| `npm install @opennextjs/cloudflare` | Install Cloudflare adapter |
| `npm install -D wrangler` | Install Wrangler CLI |
| `npm run dev` | Local Next.js dev server |
| `npm run cf:build` (`opennextjs-cloudflare build`) | Build app for Cloudflare Workers |
| `npm run preview` | Build + run locally on the Workers runtime |
| `npx wrangler login` | Authenticate Wrangler with Cloudflare |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npx wrangler deploy` | Deploy only (assumes build already done) |
| `npx wrangler tail` | Stream live logs from the deployed Worker |
