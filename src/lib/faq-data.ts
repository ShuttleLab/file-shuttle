type Bilingual = { zh: string; en: string };
type Step = Bilingual;
type FaqItem = { q: Bilingual; a: Bilingual };
type HowTo = { id: string; name: Bilingual; steps: Step[] };

export const WHO_FOR: Bilingual[] = [
  { zh: "需要给同事发送大文件但邮箱附件有大小限制的职场人士", en: "Professionals who need to send large files to colleagues but hit email attachment limits" },
  { zh: "给非技术亲属传文件、不想让他们安装任何应用的人", en: "Anyone sharing files with non-technical family members who don't want to install apps" },
  { zh: "需要跨设备临时传文件的用户（手机到电脑、Mac 到 Windows）", en: "Users transferring files across devices — phone to PC, Mac to Windows" },
  { zh: "一次性分享敏感文件、事后不想留在云端的人", en: "People sharing sensitive files who don't want them lingering in the cloud" },
];

export const WHEN_USE: Bilingual[] = [
  { zh: "一个 50MB 的 PDF 或设计稿要发给客户，但邮箱说文件太大", en: "You have a 50MB PDF or design file to send a client, but email says it's too large" },
  { zh: "给爸妈发视频，微信压缩太狠画质全毁", en: "You're sending a video to family, but WeChat crushes the quality" },
  { zh: "公司电脑做完了，要把文件传到家里电脑继续", en: "You finished work on the office PC and need the file on your home computer" },
  { zh: "给朋友发安装包，QQ 拒绝传输", en: "You're sending an installer to a friend, but QQ blocks the transfer" },
  { zh: "临时分享合同，不想让对方在网盘永久看到", en: "You need to share a contract temporarily — you don't want it permanently visible in a cloud drive" },
];

export const HOWTOS: HowTo[] = [
  {
    id: "send",
    name: { zh: "如何发送文件", en: "How to send a file" },
    steps: [
      { zh: "打开 file.shuttlelab.org，点击「发送」按钮", en: "Open file.shuttlelab.org and click the 'Send' button" },
      { zh: "点击上传区域选择文件，上传会自动开始", en: "Click the upload area to select a file — upload starts automatically" },
      { zh: "上传完成后，页面显示 4 位取件码", en: "When upload finishes, the page shows a 4-character pickup code" },
      { zh: "复制取件码或点击「复制：地址 + 取件码」分享给对方", en: "Copy the code or click 'Copy: URL + Code' to share with the recipient" },
    ],
  },
  {
    id: "receive",
    name: { zh: "如何接收文件", en: "How to receive a file" },
    steps: [
      { zh: "打开 file.shuttlelab.org，点击「接收」按钮", en: "Open file.shuttlelab.org and click the 'Receive' button" },
      { zh: "输入对方给你的 4 位取件码", en: "Enter the 4-character pickup code from the sender" },
      { zh: "点击「立刻下载」，文件会直接下载到你的设备", en: "Click 'Download' — the file downloads directly to your device" },
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    q: { zh: "单个文件最大能传多大？", en: "What is the maximum file size?" },
    a: { zh: "实际上限约 5 GB——这是 Cloudflare R2 单次 PUT 请求的最大体积，而 File Shuttle 目前使用单次 PUT 上传（未启用分片上传，分片才能支持到 5 TB）。日常使用中，几百 MB 到几 GB 的文件可正常传输。上传速度受你的网络带宽和到 Cloudflare 边缘节点的延迟影响。", en: "The practical limit is about 5 GB — this is Cloudflare R2's single-PUT request size cap, and File Shuttle currently uploads via a single PUT (multipart upload would be needed to reach R2's 5 TB object ceiling). In daily use, files from hundreds of megabytes up to a few gigabytes transfer fine. Speed depends on your network bandwidth and latency to Cloudflare's edge." },
  },
  {
    q: { zh: "文件会保存多久？", en: "How long are files stored?" },
    a: { zh: "文件元数据（取件码映射）在 KV 存储中保留 24 小时后自动过期。过期后取件码失效，文件无法被下载。R2 中的文件对象本身不会自动删除，但因为没有取件码指向它，实际上已不可访问。", en: "File metadata (code-to-key mapping) is stored in KV with a 24-hour TTL and expires automatically. After expiry, the pickup code stops working and the file becomes inaccessible. The R2 object itself isn't auto-deleted, but without a valid code pointing to it, it's effectively unreachable." },
  },
  {
    q: { zh: "别人能猜到我的取件码看到我的文件吗？", en: "Can someone guess my pickup code and access my file?" },
    a: { zh: "取件码由 4 个字符组成，字符集为 A-H、J-N、P-Z、2-9（去掉了易混淆的 I、1、O、0），共 32 个字符。总组合数为 32⁴ = 1,048,576。系统在生成时会检查 KV 中是否已存在相同码，最多重试 5 次。没有速率限制或防爆破机制，因此理论上存在被暴力枚举的可能——但由于码的生命周期仅 24 小时且是一次性使用场景，实际风险较低。", en: "The code uses 4 characters from a 32-character set (A-H, J-N, P-Z, 2-9 — excluding confusable I, 1, O, 0), giving 32⁴ = 1,048,576 possible combinations. The system checks for collisions in KV with up to 5 retries. There is no rate-limiting or brute-force protection, so theoretical enumeration is possible — but the 24-hour TTL and one-time-use nature keep practical risk low." },
  },
  {
    q: { zh: "是端到端加密吗？", en: "Is it end-to-end encrypted?" },
    a: { zh: "不是。文件以明文形式存储在 Cloudflare R2 中。传输过程使用 HTTPS 加密（TLS），但服务器端可以访问文件内容。如果你需要传输高度敏感的文件，建议先用 7-Zip 或 VeraCrypt 加密后再上传。", en: "No. Files are stored in plaintext on Cloudflare R2. Transport is encrypted via HTTPS (TLS), but the server can access file contents. For highly sensitive files, encrypt them first with 7-Zip or VeraCrypt before uploading." },
  },
  {
    q: { zh: "免费吗？有用量限制吗？", en: "Is it free? Are there usage limits?" },
    a: { zh: "完全免费，无需注册账号。没有每日上传次数或文件数量的限制。这是一个由 ShuttleLab 维护的免费服务。", en: "Completely free, no account required. There are no daily upload limits or file count restrictions. This is a free service maintained by ShuttleLab." },
  },
  {
    q: { zh: "一个取件码可以被下载几次？", en: "How many times can a pickup code be used to download?" },
    a: { zh: "没有下载次数限制。在取件码过期前（24 小时内），任何人持有码都可以多次下载。取件码过期后即失效。", en: "There is no download count limit. Anyone with the code can download multiple times within the 24-hour window before expiry. Once the code expires, it stops working." },
  },
  {
    q: { zh: "我可以提前手动删除文件吗？", en: "Can I delete a file manually before it expires?" },
    a: { zh: "目前不支持手动删除。文件会在 24 小时后自动过期。如果你需要立即销毁某个文件，可以联系 support@shuttlelab.org 请求手动处理。", en: "Manual deletion is not currently supported. Files expire automatically after 24 hours. If you need to destroy a file immediately, contact support@shuttlelab.org for manual removal." },
  },
  {
    q: { zh: "上传和下载速度受什么影响？", en: "What affects upload and download speed?" },
    a: { zh: "速度主要取决于你的网络带宽和到 Cloudflare 边缘节点的延迟。文件上传到 Cloudflare R2，下载通过预签名 URL 直连 R2，不经过我们的服务器中转。Cloudflare 的全球 CDN 通常能提供较快的下载速度。", en: "Speed depends primarily on your network bandwidth and latency to Cloudflare's edge nodes. Files upload directly to Cloudflare R2, and downloads use presigned URLs that connect straight to R2 — no relay through our servers. Cloudflare's global CDN typically delivers fast downloads." },
  },
  {
    q: { zh: "文件类型有限制吗？", en: "Are there file type restrictions?" },
    a: { zh: "没有文件类型限制。任何类型的文件都可以上传和下载——PDF、视频、安装包、压缩包、图片等均支持。系统会根据你上传时的文件 MIME 类型设置 Content-Type。", en: "No file type restrictions. Any file type can be uploaded and downloaded — PDFs, videos, installers, archives, images, and more. The system sets the Content-Type based on the MIME type of your uploaded file." },
  },
  {
    q: { zh: "服务器在哪里？数据存在哪个国家？", en: "Where are the servers? Which country stores my data?" },
    a: { zh: "文件存储在 Cloudflare R2 中。R2 是 Cloudflare 的对象存储服务，数据分布在其全球边缘网络上。Cloudflare 默认会在离你最近的边缘节点存储和读取数据，不绑定特定国家。具体的数据驻留策略取决于 Cloudflare 的全球基础设施。", en: "Files are stored in Cloudflare R2, Cloudflare's object storage service. Data is distributed across their global edge network. Cloudflare stores and retrieves data from the nearest edge node by default — not tied to a specific country. Exact data residency depends on Cloudflare's global infrastructure." },
  },
];

export const COMPARISON = {
  zh: {
    heading: "File Shuttle 与同类工具对比",
    columns: ["工具", "文件大小限制", "保留时长", "需要账号", "跨平台", "自动销毁", "免费"],
    rows: [
      ["File Shuttle", "约 5 GB", "24 小时", "—", "✓", "✓", "✓"],
      ["WeTransfer", "2 GB（免费版）", "7 天", "—", "✓", "—", "部分"],
      ["Firefox Send", "已停服", "—", "—", "—", "—", "—"],
      ["百度网盘", "4 GB（单文件）", "永久", "需要", "✓", "—", "限速"],
      ["微信/QQ", "100 MB~1 GB", "永久", "需要", "部分", "—", "✓"],
      ["AirDrop", "无限制", "即时", "—", "仅 Apple", "—", "✓"],
    ],
  },
  en: {
    heading: "File Shuttle vs alternatives",
    columns: ["Tool", "File Size Limit", "Retention", "Account Required", "Cross-Platform", "Auto-Destruct", "Free"],
    rows: [
      ["File Shuttle", "~5 GB", "24 hours", "No", "✓", "✓", "✓"],
      ["WeTransfer", "2 GB (free tier)", "7 days", "No", "✓", "No", "Partial"],
      ["Firefox Send", "Discontinued", "—", "—", "—", "—", "—"],
      ["Google Drive", "15 GB (free)", "Permanent", "Yes", "✓", "No", "15 GB free"],
      ["WeChat / QQ", "100 MB–1 GB", "Permanent", "Yes", "Partial", "No", "✓"],
      ["AirDrop", "No limit", "Instant", "No", "Apple only", "No", "✓"],
    ],
  },
};

export const HEADINGS = {
  whoFor: { zh: "File Shuttle 适合谁？", en: "Who is File Shuttle for?" },
  whenUse: { zh: "什么时候用 File Shuttle？", en: "When should I use File Shuttle?" },
  howTo: { zh: "操作步骤", en: "How to use" },
  faq: { zh: "常见问题", en: "Frequently Asked Questions" },
};

export const aboutFaqData = { FAQS, HOWTOS, COMPARISON };
