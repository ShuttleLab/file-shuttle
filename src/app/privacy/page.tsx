"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function PrivacyPage() {
  const { lang } = useI18n();
  const zh = lang === "zh";
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-4" />
        {zh ? "返回首页" : "Back to Home"}
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        {zh ? "隐私政策" : "Privacy Policy"}
      </h1>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
        <p>{zh ? "最后更新：2026 年 5 月" : "Last updated: May 2026"}</p>

        <h2 className="text-foreground">
          {zh ? "1. 我们如何处理你的文件" : "1. How we handle your files"}
        </h2>
        <p>
          {zh
            ? "文件穿梭机是一个通过口令在设备间传输文件的工具。你上传的文件会通过加密连接传输到 Cloudflare R2 存储，并在下载后自动删除。我们不会查看、分析或长期存储你的文件内容。"
            : "File Shuttle is a tool for transferring files between devices using room codes. Your uploaded files are transmitted to Cloudflare R2 storage over an encrypted connection and automatically deleted after download. We never view, analyze, or permanently store your file content."}
        </p>

        <h2 className="text-foreground">
          {zh ? "2. 数据保留" : "2. Data retention"}
        </h2>
        <p>
          {zh
            ? "文件有 24 小时的自动过期时间，到期后自动删除。你也可以随时手动删除已上传的文件。文件元数据（如文件名）存储在 KV 中，同样在 24 小时后过期。"
            : "Files have a 24-hour auto-expiry and are deleted automatically. You can also manually delete uploaded files at any time. File metadata (such as filenames) is stored in KV and also expires after 24 hours."}
        </p>

        <h2 className="text-foreground">
          {zh ? "3. 无追踪、无 Cookie" : "3. No tracking, no cookies"}
        </h2>
        <p>
          {zh
            ? "我们不使用 Cookie，不嵌入第三方分析或追踪脚本。"
            : "We don't use cookies and don't embed any third-party analytics or tracking scripts."}
        </p>

        <h2 className="text-foreground">
          {zh ? "4. 第三方服务" : "4. Third-party services"}
        </h2>
        <p>
          {zh
            ? "文件存储在 Cloudflare R2 上，元数据存储在 Cloudflare KV 中。网站托管在 Cloudflare Pages 上。Cloudflare 会按其隐私政策记录基础的访问日志（如 IP、UA），用于安全与可用性保护。"
            : "Files are stored on Cloudflare R2, with metadata in Cloudflare KV. The site is hosted on Cloudflare Pages. Cloudflare records basic access logs (IP, UA) per its own privacy policy, used for security and reliability."}
        </p>

        <h2 className="text-foreground">
          {zh ? "5. 联系我们" : "5. Contact"}
        </h2>
        <p>
          {zh ? "隐私相关问题请联系：" : "For privacy inquiries, contact:"}{" "}
          <a href="mailto:support@shuttlelab.org" className="text-primary">
            support@shuttlelab.org
          </a>
        </p>
      </div>
    </div>
  );
}