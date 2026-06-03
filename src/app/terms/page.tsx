"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function TermsPage() {
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
        {zh ? "服务条款" : "Terms of Service"}
      </h1>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
        <p>{zh ? "最后更新：2026 年 5 月" : "Last updated: May 2026"}</p>

        <h2 className="text-foreground">
          {zh ? "1. 服务说明" : "1. Service description"}
        </h2>
        <p>
          {zh
            ? "文件穿梭机是一个免费的跨设备文件传输工具，通过口令实现设备间的文件共享。本工具按「现状」提供，不对传输的完整性或可靠性作出保证。"
            : "File Shuttle is a free cross-device file transfer tool that enables file sharing between devices using room codes. The service is provided \"as is\" without warranties of completeness or reliability."}
        </p>

        <h2 className="text-foreground">
          {zh ? "2. 用户责任" : "2. User responsibilities"}
        </h2>
        <p>
          {zh
            ? "请仅传输你拥有合法权利处理的文件。请勿使用本工具传输违法、有害或侵权的内容。你应对通过你的口令传输的所有文件负责。"
            : "Only transfer files you have the legal right to handle. Do not use this tool to transfer illegal, harmful, or infringing content. You are responsible for all files transferred through your room code."}
        </p>

        <h2 className="text-foreground">
          {zh ? "3. 免责声明" : "3. Disclaimer"}
        </h2>
        <p>
          {zh
            ? "本工具不对因使用本服务而产生的任何直接或间接损失负责，包括但不限于因文件传输失败、数据丢失或文件损坏而产生的损失。"
            : "We are not liable for any direct or indirect damages arising from the use of the service, including but not limited to losses caused by failed file transfers, data loss, or file corruption."}
        </p>

        <h2 className="text-foreground">
          {zh ? "4. 条款变更" : "4. Changes"}
        </h2>
        <p>
          {zh
            ? "我们保留随时更新本条款的权利。继续使用本服务即视为接受更新后的条款。"
            : "We reserve the right to update these terms. Continued use of the service constitutes acceptance of the updated terms."}
        </p>

        <h2 className="text-foreground">
          {zh ? "5. 联系我们" : "5. Contact"}
        </h2>
        <p>
          <a href="mailto:support@shuttlelab.org" className="text-primary">
            support@shuttlelab.org
          </a>
        </p>
      </div>
    </div>
  );
}