"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Upload,
  Download,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  CloudUpload,
  Info,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InitUploadResponse = { code: string; uploadUrl: string };
type DownloadResponse = { downloadUrl: string };

const translations: Record<
  string,
  Record<string, string>
> = {
  zh: {
    title: "文件穿梭机",
    tagline: "极速 · 安全 · 自动销毁",
    send: "发送",
    receive: "接收",
    serverless: "Serverless File Transfer",
    clickSelectFile: "点击选择文件",
    autoStartUpload: "自动开始上传",
    sendSuccess: "发送成功，对方凭此码下载！",
    pickupCode: "取件码",
    sendAnother: "发送另一个文件",
    uploading: "正在极速上传...",
    keepOpen: "请保持页面开启",
    invalidCode: "取件码无效或已过期",
    connectionFailed: "连接失败，请稍后再试",
    downloadNow: "立刻下载",
    checking: "查询中...",
    downloadNote: "文件24小时后即被销毁，请及时保存",
    inputPlaceholder: "A1B2",
    initFailed: "初始化失败",
    uploadFailed: "上传失败",
    networkError: "网络错误",
    unknownError: "发生未知错误",
    extractFile: "提取文件",
    enter4code: "请输入 4 位取件码",
    autoDeleteNotice: "文件24小时后自动销毁",
    langButton: "EN",
    shareCopy: "复制：地址 + 取件码",
    shareCopied: "已复制到剪贴板",
    about: "关于",
  },
  en: {
    title: "File Shuttle",
    tagline: "Fast · Secure · Self-destruct",
    send: "Send",
    receive: "Receive",
    serverless: "Serverless File Transfer",
    clickSelectFile: "Click to select file",
    autoStartUpload: "Uploads start automatically",
    sendSuccess: "Sent. Recipient can download with this code!",
    pickupCode: "Pickup Code",
    sendAnother: "Send another file",
    uploading: "Uploading...",
    keepOpen: "Keep this page open",
    invalidCode: "Invalid or expired code",
    connectionFailed: "Connection failed, please try again",
    downloadNow: "Download",
    checking: "Checking...",
    downloadNote: "File will be deleted after download, save it",
    inputPlaceholder: "A1B2",
    initFailed: "Initialization failed",
    uploadFailed: "Upload failed",
    networkError: "Network error",
    unknownError: "Unknown error",
    extractFile: "Retrieve File",
    enter4code: "Enter 4-digit code",
    autoDeleteNotice: "Files are deleted after 24 hours",
    langButton: "中文",
    shareCopy: "Copy: URL + Code",
    shareCopied: "Copied to clipboard",
    about: "About",
  },
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<"upload" | "download">("upload");
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const t = (key: string) => translations[lang][key] || key;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-end items-center gap-3">
          <Button variant="outline" size="default" asChild>
            <Link href="/about" className="flex items-center gap-2">
              <Info className="size-5" />
              {t("about")}
            </Link>
          </Button>
          <a
            href="https://github.com/ShuttleLab/file-shuttle"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
          <Button
            variant="outline"
            size="default"
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
          >
            {t("langButton")}
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            {t("tagline")}
          </p>
        </div>

        <div className="w-full max-w-2xl flex gap-5 justify-center mb-10">
          <Button
            variant={activeTab === "upload" ? "default" : "outline"}
            size="xl"
            className={cn(
              "flex-1 min-h-[7rem] md:min-h-[8rem] text-lg md:text-xl",
              activeTab === "upload" && "ring-2 ring-primary ring-offset-2 shadow-lg"
            )}
            onClick={() => setActiveTab("upload")}
          >
            <Upload className="size-7 md:size-8" />
            {t("send")}
          </Button>
          <Button
            variant={activeTab === "download" ? "default" : "outline"}
            size="xl"
            className={cn(
              "flex-1 min-h-[7rem] md:min-h-[8rem] text-lg md:text-xl",
              activeTab === "download" && "ring-2 ring-primary ring-offset-2 shadow-lg"
            )}
            onClick={() => setActiveTab("download")}
          >
            <Download className="size-7 md:size-8" />
            {t("receive")}
          </Button>
        </div>

        <Card className="w-full max-w-2xl shadow-lg border-2">
          <CardContent className="pt-8 pb-8 min-h-[420px]">
            {activeTab === "upload" ? (
              <UploadView t={t} />
            ) : (
              <DownloadView t={t} />
            )}
          </CardContent>
        </Card>

        <p className="text-base text-muted-foreground mt-10 font-medium uppercase tracking-wider">
          {t("autoDeleteNotice")}
        </p>
      </main>
    </div>
  );
}

function UploadView({ t }: { t: (k: string) => string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadCode, setUploadCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const uploadFileXHR = (file: File, url: string) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.setRequestHeader(
        "Content-Type",
        file.type || "application/octet-stream"
      );
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable)
          setProgress((e.loaded / e.total) * 100);
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(t("uploadFailed")));
      };
      xhr.onerror = () => reject(new Error(t("networkError")));
      xhr.send(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setIsUploading(true);
    setProgress(0);
    setError(null);
    setUploadCode(null);
    try {
      const initRes = await fetch("/api/init-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || "application/octet-stream",
        }),
      });
      if (!initRes.ok) throw new Error(t("initFailed"));
      const { code, uploadUrl } = (await initRes.json()) as InitUploadResponse;
      await uploadFileXHR(file, uploadUrl);
      setUploadCode(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("unknownError"));
    } finally {
      setIsUploading(false);
    }
  };

  const copyCode = () => {
    if (uploadCode) {
      navigator.clipboard.writeText(uploadCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyShareInfo = () => {
    if (!uploadCode) return;
    navigator.clipboard.writeText(
      `${window.location.href}\n${t("pickupCode")}: ${uploadCode}`
    );
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  if (uploadCode) {
    return (
      <div className="space-y-8 text-center">
        <div className="size-24 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto">
          <Check className="size-12" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">
          {t("sendSuccess")}
        </h3>
        <div
          onClick={copyCode}
          className="p-6 rounded-xl border-2 border-primary/40 bg-primary/10 cursor-pointer hover:border-primary/60 hover:bg-primary/15 flex items-center justify-between gap-4 transition-colors"
        >
          <span className="text-2xl md:text-3xl font-bold text-foreground tracking-wider">
            {t("pickupCode")}: {uploadCode}
          </span>
          <div className="shrink-0 rounded-xl bg-primary/20 p-4 text-primary">
            {copied ? <Check className="size-8" /> : <Copy className="size-8" />}
          </div>
        </div>
        <Button onClick={copyShareInfo} className="w-full text-lg" size="xl">
          {shareCopied ? t("shareCopied") : t("shareCopy")}
        </Button>
        <Button
          variant="ghost"
          className="w-full text-base"
          size="lg"
          onClick={() => {
            setUploadCode(null);
            setProgress(0);
          }}
        >
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  if (isUploading) {
    return (
      <div className="space-y-8 text-center py-8">
        <div className="relative size-44 mx-auto">
          <svg className="size-full -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="76"
              stroke="currentColor"
              strokeWidth="14"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="88"
              cy="88"
              r="76"
              stroke="currentColor"
              strokeWidth="14"
              fill="none"
              strokeDasharray={2 * Math.PI * 76}
              strokeDashoffset={2 * Math.PI * 76 * (1 - progress / 100)}
              strokeLinecap="round"
              className="text-primary transition-all duration-200"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground">
          {t("uploading")}
        </h3>
        <p className="text-muted-foreground text-lg">{t("keepOpen")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <input
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      <Label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center gap-8 min-h-[300px] rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 cursor-pointer transition-all"
      >
        <div className="size-24 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
          <CloudUpload className="size-12" />
        </div>
        <div className="text-center">
          <p className="font-bold text-foreground text-xl">
            {t("clickSelectFile")}
          </p>
          <p className="text-muted-foreground text-base mt-2">
            {t("autoStartUpload")}
          </p>
        </div>
      </Label>
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-destructive/50 bg-destructive/10 text-destructive text-base font-medium">
          <AlertCircle className="size-6 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}

function DownloadView({ t }: { t: (k: string) => string }) {
  const [code, setCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    setIsChecking(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/get-download?code=${encodeURIComponent(code)}`
      );
      if (!res.ok) {
        if (res.status === 404) throw new Error(t("invalidCode"));
        throw new Error(t("connectionFailed"));
      }
      const { downloadUrl } = (await res.json()) as DownloadResponse;
      window.location.href = downloadUrl;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("unknownError")
      );
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <form
      onSubmit={handleDownload}
      className="space-y-8 flex flex-col min-h-[320px]"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          {t("extractFile")}
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">{t("enter4code")}</p>
      </div>
      <div className="space-y-3">
        <Label htmlFor="code" className="text-base font-semibold">
          {t("pickupCode")}
        </Label>
        <Input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder={t("inputPlaceholder")}
          maxLength={6}
          className="text-center text-3xl font-bold tracking-widest h-16 rounded-xl border-2"
        />
      </div>
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-destructive/50 bg-destructive/10 text-destructive text-base font-medium">
          <AlertCircle className="size-6 shrink-0" />
          {error}
        </div>
      )}
      <p className="text-muted-foreground text-base text-center">
        {t("downloadNote")}
      </p>
      <Button
        type="submit"
        size="xl"
        className="w-full mt-auto text-lg"
        disabled={!code.trim() || isChecking}
      >
        {isChecking ? (
          <>
            <Loader2 className="size-6 animate-spin mr-2" />
            {t("checking")}
          </>
        ) : (
          t("downloadNow")
        )}
      </Button>
    </form>
  );
}
