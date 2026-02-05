"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Zap,
  Shield,
  Lock,
  Clock,
  Heart,
  Share2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const translations = {
  zh: {
    back: "返回",
    langButton: "EN",
    heroTitle: "关于文件穿梭机",
    heroSubtitle: "极速、安全、自动销毁的文件传递服务",
    serviceTitle: "我们的服务",
    serviceP1:
      "文件穿梭机是一个简单而强大的文件传递平台。您只需上传文件，系统会生成一个唯一的四位取件码。将取件码分享给接收者，对方即可下载您的文件。",
    serviceP2:
      "无需注册、无需登录，随时随地传递您的文件。基于 Serverless 架构，快速稳定。",
    fast: "极速传输",
    fastDesc:
      "基于全球 CDN 加速，无论您在哪里，都能享受极速的文件上传和下载体验。",
    safe: "安全可靠",
    safeDesc: "采用业界领先的加密技术，确保您的文件在传输和存储过程中的安全性。",
    privacy: "隐私保护",
    privacyDesc:
      "文件下载后可自动销毁，不留痕迹。我们不收集任何个人信息，真正做到用完即焚。",
    ttl: "限时存储",
    ttlDesc: "文件默认24小时有效期，超时自动删除，确保文件不会永久留存。",
    useCases: "使用场景",
    use1: "临时分享大文件给朋友或同事",
    use2: "跨设备传递文件，无需数据线",
    use3: "向他人发送私密文档",
    use4: "不想留下云盘记录的场景",
    supportTitle: "支持我们",
    supportDesc:
      "文件穿梭机是一个免费服务，由站长个人维护。如果您觉得这个服务对您有帮助，欢迎通过以下方式支持我们：",
    contactDesc: "如有问题或建议，欢迎联系站长",
    contactEmail: "邮箱",
    shareButton: "分享给朋友",
    shareCopied: "已复制到剪贴板",
    donateButton: "捐赠支持",
    donateTitle: "捐赠支持",
    donateDesc: "扫码或长按保存二维码，支持我们持续运营。",
    wechat: "微信收款码",
    alipay: "支付宝收款码",
    paypal: "PayPal 收款码",
    close: "关闭",
  },
  en: {
    back: "Back",
    langButton: "中文",
    heroTitle: "About File Shuttle",
    heroSubtitle: "Fast, secure, self-destructing file transfer",
    serviceTitle: "Our Service",
    serviceP1:
      "File Shuttle is a simple yet powerful file transfer platform. Upload your file and get a unique 4-character pickup code. Share the code so others can download your file.",
    serviceP2:
      "No registration or login required—transfer files anytime, anywhere. Built on Serverless architecture for speed and reliability.",
    fast: "Lightning Fast",
    fastDesc:
      "Powered by global CDN, enjoy blazing fast upload and download speeds wherever you are.",
    safe: "Secure & Reliable",
    safeDesc:
      "Leading encryption practices keep your files safe during transit and storage.",
    privacy: "Privacy First",
    privacyDesc:
      "Files can be destroyed after download. No personal data is collected—true burn after use.",
    ttl: "Time-limited Storage",
    ttlDesc:
      "Files default to 24 hours and auto-delete afterward, ensuring nothing stays forever.",
    useCases: "Use Cases",
    use1: "Temporarily share large files with friends or colleagues",
    use2: "Transfer files across devices without cables",
    use3: "Send private documents to others",
    use4: "Scenarios where you prefer no cloud storage history",
    supportTitle: "Support Us",
    supportDesc:
      "File Shuttle is a free service maintained by the owner. If it helps you, consider supporting us:",
    contactDesc: "For questions or feedback, contact the owner",
    contactEmail: "Email",
    shareButton: "Share with Friends",
    shareCopied: "Copied to clipboard",
    donateButton: "Donate",
    donateTitle: "Support Us",
    donateDesc: "Scan or save the QR codes to support our service.",
    wechat: "WeChat",
    alipay: "Alipay",
    paypal: "PayPal",
    close: "Close",
  },
};

export default function AboutPage() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [shareCopied, setShareCopied] = useState(false);
  const t = translations[lang];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="outline" size="default" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="size-5" />
              {t.back}
            </Link>
          </Button>
          <Button
            variant="outline"
            size="default"
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
          >
            {t.langButton}
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-muted-foreground font-medium">{t.heroSubtitle}</p>
        </div>

        <Card className="mb-8 border-2 shadow-md">
          <CardContent className="pt-8 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <Info className="size-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t.serviceTitle}
              </h2>
            </div>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">{t.serviceP1}</p>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.serviceP2}</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-chart-1/40 bg-chart-1/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="size-14 rounded-xl bg-chart-1/20 text-chart-1 flex items-center justify-center">
                  <Zap className="size-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground ml-4">
                  {t.fast}
                </h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">{t.fastDesc}</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-chart-2/40 bg-chart-2/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="size-14 rounded-xl bg-chart-2/20 text-chart-2 flex items-center justify-center">
                  <Shield className="size-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground ml-4">
                  {t.safe}
                </h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">{t.safeDesc}</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-chart-3/40 bg-chart-3/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="size-14 rounded-xl bg-chart-3/20 text-chart-3 flex items-center justify-center">
                  <Lock className="size-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground ml-4">
                  {t.privacy}
                </h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">{t.privacyDesc}</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-chart-4/40 bg-chart-4/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="size-14 rounded-xl bg-chart-4/20 text-chart-4 flex items-center justify-center">
                  <Clock className="size-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground ml-4">
                  {t.ttl}
                </h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">{t.ttlDesc}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-2 shadow-md">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {t.useCases}
            </h2>
            <ul className="space-y-4 text-muted-foreground text-base leading-relaxed">
              {[t.use1, t.use2, t.use3, t.use4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className={[
                      "text-chart-1",
                      "text-chart-2",
                      "text-chart-3",
                      "text-chart-4",
                    ][i]}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="bg-gradient-to-r from-primary via-primary to-chart-5 text-primary-foreground rounded-2xl p-10 mb-10 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Heart className="size-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">{t.supportTitle}</h2>
          </div>
          <p className="mb-8 opacity-90 text-lg leading-relaxed">{t.supportDesc}</p>
          <div className="flex flex-wrap gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-background text-foreground hover:bg-muted text-base font-semibold"
                >
                  <Heart className="size-5 mr-2" />
                  {t.donateButton}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t.donateTitle}</DialogTitle>
                  <DialogDescription>{t.donateDesc}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-3">
                    <p className="font-medium text-foreground mb-2 text-sm text-center">
                      {t.wechat}
                    </p>
                    <div className="relative mx-auto size-40">
                      <Image
                        src="/wechat-qr.png"
                        alt="微信收款码"
                        fill
                        sizes="160px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="font-medium text-foreground mb-2 text-sm text-center">
                      {t.alipay}
                    </p>
                    <div className="relative mx-auto size-40">
                      <Image
                        src="/alipay-qr.png"
                        alt="支付宝收款码"
                        fill
                        sizes="160px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="font-medium text-foreground mb-2 text-sm text-center">
                      {t.paypal}
                    </p>
                    <div className="relative mx-auto size-40">
                      <Image
                        src="/paypal-qr.png"
                        alt="PayPal 收款码"
                        fill
                        sizes="160px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">{t.close}</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 text-base font-semibold"
              onClick={handleShare}
            >
              <Share2 className="size-5 mr-2" />
              {shareCopied ? t.shareCopied : t.shareButton}
            </Button>
          </div>
        </div>

        <div className="text-center text-muted-foreground text-lg">
          <p className="font-medium">{t.contactDesc}</p>
          <p className="mt-2">
            {t.contactEmail}:{" "}
            <a
              href="mailto:a.tiling120@slmail.me"
              className="text-primary hover:underline underline-offset-4"
            >
              a.tiling120@slmail.me
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
