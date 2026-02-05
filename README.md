# File Shuttle

Serverless file transfer app on Cloudflare Pages, R2, and KV.

**Preview:** [file.shuttlelab.org](https://file.shuttlelab.org)

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Prerequisites

- [Cloudflare](https://dash.cloudflare.com/) account

## Configuration

### 1. Cloudflare

- **R2:** Create a bucket → **Manage R2 API Tokens** → create token (Admin Read/Write). Note Account ID, Access Key ID, Secret Access Key.
- **KV:** **Workers & Pages** → **KV** → create namespace `FILE_SHUTTLE_KV`. Note Namespace ID.

### 2. Local

Create `.dev.vars` in project root (do not commit):

```bash
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET_NAME=your_bucket_name
```

In `wrangler.toml`, set `id` under `[[kv_namespaces]]` to your KV Namespace ID (or omit for local-only dev).

## Development

- **Next.js only:** `npm run dev` → http://localhost:3000  
- **With API:** Run wrangler and Next in two terminals so `/api/*` is proxied to Pages Functions:

```bash
# Terminal 1
npm run dev:wrangler   # http://localhost:8788

# Terminal 2
npm run dev            # http://localhost:3000
```

`next.config.ts` rewrites `/api/:path*` to `http://localhost:8788` in dev.

## Deployment (Cloudflare Pages)

- **Framework:** Next.js (Static HTML Export)
- **Build:** `npm run build`
- **Output:** `out`
- **Functions:** `functions/` serves `/api/*`

Or CLI: `npm run build` then `npm run deploy`

## Project Layout

- `src/app` — Next App Router pages and styles
- `functions/` — Cloudflare Pages Functions (`/api/*`)
- `wrangler.toml` — Wrangler config
- `.dev.vars` — Local env (git-ignored)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| KV `id` error in wrangler | Remove or comment out the `id` field in `wrangler.toml` for local dev |
| "Specify directory OR proxy" | Use `wrangler pages dev -- npm run dev` without a directory argument |
| Upload/download fails locally | Check `.dev.vars`, KV binding in wrangler output, and `/api/*` in Network tab |
