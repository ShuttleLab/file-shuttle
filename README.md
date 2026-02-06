# File Shuttle

Serverless file transfer app.

**Preview:** [file.shuttlelab.org](https://file.shuttlelab.org)

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000


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