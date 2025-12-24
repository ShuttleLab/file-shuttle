# File Shuttle (文件穿梭机)

A serverless file transfer application powered by Cloudflare Pages, R2, and KV.

preview（预览）[file.videotools.cn](https://file.videotools.cn)

## 🚀 Prerequisites

You need a [Cloudflare](https://dash.cloudflare.com/) account.

## 🛠️ Configuration Steps

### 1. Cloudflare Dashboard Setup
1.  **R2 Storage**:
    *   Create a bucket (e.g., `file-shuttle-bucket`).
    *   Go to **R2** -> **Manage R2 API Tokens**.
    *   Create a token with **Admin Read/Write** permissions.
    *   Copy the `Access Key ID`, `Secret Access Key`, and your `Account ID`.
2.  **KV Namespace**:
    *   Go to **Workers & Pages** -> **KV**.
    *   Create a namespace named `FILE_SHUTTLE_KV`.
    *   Copy the `Namespace ID`.

### 2. Local Configuration
Create a `.dev.vars` file in the root directory (do not commit this file):

```bash
# file-shuttle/.dev.vars
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET_NAME=your_bucket_name
```

Update `wrangler.toml`:
*   Replace `id = "YOUR_KV_NAMESPACE_ID_HERE"` with your actual KV Namespace ID.
*   (Optional) You can also put the non-secret variables (Account ID, Bucket Name) directly in `wrangler.toml` under `[vars]`.

## 💻 Development

Start the full-stack development server (Frontend + Backend Functions):

```bash
npx wrangler pages dev . -- npm run dev
```

*   Frontend: http://localhost:5173
*   Backend API: http://localhost:8788 (Proxied automatically)

## 📦 Deployment

1.  Push this code to a GitHub repository.
2.  Go to Cloudflare Dashboard -> **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
3.  Select your repository.
4.  **Build Settings**:
    *   Framework Preset: `Vite`
    *   Build command: `npm run build`
    *   Build output directory: `dist`
5.  **Environment Variables**:
    *   Add your `R2_...` variables and `FILE_SHUTTLE_KV` binding in the Cloudflare Pages settings dashboard after the project is created.