'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Upload, Download, Copy, Check, Sparkles, ArrowRight, Loader2, AlertCircle, CloudUpload, Info } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type InitUploadResponse = {
  code: string
  uploadUrl: string
}

type DownloadResponse = {
  downloadUrl: string
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<'upload' | 'download'>('upload')
  const [lang, setLang] = useState<'zh' | 'en'>('zh')

  const translations: Record<string, Record<string, string>> = {
    zh: {
      title: '文件穿梭机',
      tagline: '极速 · 安全 · 自动销毁',
      send: '发送 🚀',
      receive: '接收 📦',
      serverless: 'Serverless File Transfer',
      clickSelectFile: '点击选择文件',
      autoStartUpload: '自动开始上传',
      sendSuccess: '发送成功，对方凭此码下载！',
      pickupCode: '取件码',
      sendAnother: '发送另一个文件',
      uploading: '正在极速上传...',
      keepOpen: '请保持页面开启',
      invalidCode: '取件码无效或已过期',
      connectionFailed: '连接失败，请稍后再试',
      downloadNow: '立刻下载',
      checking: '查询中...',
      downloadNote: '文件24小时后即被销毁，请及时保存',
      inputPlaceholder: 'A1B2',
      initFailed: '初始化失败',
      uploadFailed: '上传失败',
      networkError: '网络错误',
      unknownError: '发生未知错误',
      extractFile: '提取文件',
      enter4code: '请输入 4 位取件码',
      autoDeleteNotice: '文件24小时后自动销毁',
      langButton: 'EN',
      shareCopy: '复制：地址 + 取件码',
      shareCopied: '已复制到剪贴板',
      about: '关于'
    },
    en: {
      title: 'File Shuttle',
      tagline: 'Fast · Secure · Self-destruct',
      send: 'Send 🚀',
      receive: 'Receive 📦',
      serverless: 'Serverless File Transfer',
      clickSelectFile: 'Click to select file',
      autoStartUpload: 'Uploads start automatically',
      sendSuccess: 'Sent，Recipient can download with this code!',
      pickupCode: 'Pickup Code',
      sendAnother: 'Send another file',
      uploading: 'Uploading...',
      keepOpen: 'Keep this page open',
      invalidCode: 'Invalid or expired code',
      connectionFailed: 'Connection failed, please try again',
      downloadNow: 'Download',
      checking: 'Checking...',
      downloadNote: 'File will be deleted after download, save it',
      inputPlaceholder: 'A1B2',
      initFailed: 'Initialization failed',
      uploadFailed: 'Upload failed',
      networkError: 'Network error',
      unknownError: 'Unknown error',
      extractFile: 'Retrieve File',
      enter4code: 'Enter 4-digit code',
      autoDeleteNotice: 'Files are deleted after 24 hours',
      langButton: '中文',
      shareCopy: 'Copy: URL + Code',
      shareCopied: 'Copied to clipboard',
      about: 'About'
    }
  }

  const t = (key: string) => translations[lang][key] || key

  return (
    <>
      {/* Top Right Navigation */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <Link
          href="/about"
          className="bg-white/10 text-white rounded-full ring-2 ring-white/30 hover:bg-white/20 transition flex items-center justify-center gap-2 px-5 py-3 font-bold shadow-lg text-lg"
        >
          <Info className="w-5 h-5" />
          {t('about')}
        </Link>
        <button
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          aria-label="切换语言 / Toggle language"
          className="bg-white/10 text-white rounded-full ring-2 ring-white/30 hover:bg-white/20 transition flex items-center justify-center px-5 py-3 font-extrabold shadow-lg text-lg"
        >
          {t('langButton')}
        </button>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-6 selection:bg-pink-200 overflow-y-auto">
        <div className="mb-12 text-center text-white drop-shadow-md mt-28">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-7xl font-black mb-4 tracking-tighter flex items-center justify-center gap-3 drop-shadow-lg">
              🚀{t('title')}📦
            </h1>
          </div>
          <p className="text-2xl text-white/90 font-bold tracking-wide drop-shadow-md">{t('tagline')}</p>
        </div>

        <div className="w-full max-w-2xl relative mb-16 flex flex-col items-center">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-[64px] opacity-40 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-[64px] opacity-40 animate-blob animation-delay-2000"></div>

          <div className="w-full flex flex-row items-stretch justify-center gap-4 md:gap-16 mb-16 relative z-10 px-2">
            <button
              style={{ background: 'linear-gradient(135deg, #f0f0a4ff, #f4c0c7ff)' }}
              onClick={() => setActiveTab('upload')}
              className={cn(
                'flex-1 h-32 md:h-48 rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-4 shadow-xl border-[4px] md:border-[6px]',
                activeTab === 'upload'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-pink border-pink/30 scale-105 shadow-pink-500/40 ring-2 md:ring-4 ring-pink/40 translate-y-[-4px] md:translate-y-[-8px] z-10'
                  : 'bg-pink-100/50 text-pink-500 border-pink hover:bg-pink-200 hover:scale-[1.02] hover:border-pink-300'
              )}
            >
              <div
                className={cn(
                  'p-2 md:p-4 rounded-2xl md:rounded-3xl transition-colors shadow-inner',
                  activeTab === 'upload' ? 'bg-pink/20' : 'bg-pink/60'
                )}
              >
                <Upload className={cn('w-8 h-8 md:w-12 md:h-12', activeTab === 'upload' ? 'text-pink' : 'text-pink-600')} />
              </div>
              <h1 className="text-lg md:text-2xl font-black tracking-tight whitespace-nowrap">{t('send')}</h1>
            </button>

            <button
              style={{ background: 'linear-gradient(135deg, #aacdf8ff, #9c8feeff)' }}
              onClick={() => setActiveTab('download')}
              className={cn(
                'flex-1 h-32 md:h-48 rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-4 shadow-xl border-[4px] md:border-[6px]',
                activeTab === 'download'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white border-white/30 scale-105 shadow-pink-500/40 ring-2 md:ring-4 ring-white/40 translate-y-[-4px] md:translate-y-[-8px] z-10'
                  : 'bg-pink-100/50 text-pink-500 border-white hover:bg-pink-200 hover:scale-[1.02] hover:border-pink-300'
              )}
            >
              <div
                className={cn(
                  'p-2 md:p-4 rounded-2xl md:rounded-3xl transition-colors shadow-inner',
                  activeTab === 'download' ? 'bg-white/20' : 'bg-white/60'
                )}
              >
                <Download className={cn('w-8 h-8 md:w-12 md:h-12', activeTab === 'download' ? 'text-white' : 'text-pink-600')} />
              </div>
              <h1 className="text-lg md:text-2xl font-black tracking-tight whitespace-nowrap">{t('receive')}</h1>
            </button>
          </div>

          <div
            className={cn(
              'w-full backdrop-blur-3xl rounded-[3.5rem] shadow-2xl border-2 border-white/70 p-10 relative z-10 min-h-[480px] flex flex-col justify-center transition-all duration-500',
              activeTab === 'upload' ? 'bg-indigo-50/90' : 'bg-pink-50/90'
            )}
          >
            {activeTab === 'upload' ? <UploadView t={t} /> : <DownloadView t={t} />}
          </div>
        </div>

        <p className="text-base text-white/70 font-bold tracking-[0.2em] uppercase mt-8 drop-shadow">{t('autoDeleteNotice')}</p>
      </div>
    </>
  )
}

function UploadView({ t }: { t: (k: string) => string }) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadCode, setUploadCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const uploadFileXHR = (file: File, url: string) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', url, true)
      xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream')

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100
          setProgress(percentComplete)
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve()
        } else {
          reject(new Error(t('uploadFailed')))
        }
      }

      xhr.onerror = () => reject(new Error(t('networkError')))
      xhr.send(file)
    })
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    const file = e.target.files[0]
    setIsUploading(true)
    setProgress(0)
    setError(null)
    setUploadCode(null)

    try {
      const initRes = await fetch('/api/init-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || 'application/octet-stream',
        }),
      })

      if (!initRes.ok) throw new Error(t('initFailed'))
      const { code, uploadUrl } = (await initRes.json()) as InitUploadResponse

      await uploadFileXHR(file, uploadUrl)

      setUploadCode(code)
    } catch (err) {
      const message = err instanceof Error ? err.message : t('unknownError')
      setError(message)
      setIsUploading(false)
    }
  }

  const copyCode = () => {
    if (uploadCode) {
      navigator.clipboard.writeText(uploadCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const copyShareInfo = () => {
    if (!uploadCode) return
    const text = `${window.location.href}\n${t('pickupCode')}: ${uploadCode}`
    navigator.clipboard.writeText(text)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2000)
  }

  if (uploadCode) {
    return (
      <div className="text-center space-y-10 animate-fade-in-up">
        <div className="relative">
          <div className="absolute inset-0 bg-green-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <div className="relative w-32 h-32 bg-gradient-to-tr from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-300/50">
            <Check className="w-16 h-16" />
          </div>
        </div>

        <div>
          <h3 className="text-4xl font-black text-gray-800 mb-3">{t('sendSuccess')}</h3>
        </div>

        <div
          onClick={copyCode}
          className="bg-white border-[6px] border-violet-100 p-8 rounded-[2.5rem] flex items-center justify-between cursor-pointer hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-200 transition-all group transform hover:-translate-y-2"
        >
          <div className="flex flex-col items-start gap-2">
            <span className="text-[6rem] font-black text-violet-300 uppercase tracking-wider">
              {t('pickupCode')}: {uploadCode}
            </span>
          </div>

          <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300 shadow-sm">
            {copied ? <Check className="w-10 h-10" /> : <Copy className="w-10 h-10" />}
          </div>
        </div>
        <p className="text-gray-400 font-bold"></p>

        <button
          onClick={copyShareInfo}
          aria-label={t('shareCopy')}
          style={{ background: 'linear-gradient(135deg, #9b8af7ff, #f38bb9ff)' }}
          className="w-full min-h-[6rem] text-white rounded-[2.5rem] font-black text-[2.5rem] shadow-2xl shadow-violet-200 hover:shadow-violet-400/60 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-4 ring-8 ring-transparent hover:ring-violet-200"
       >
          {shareCopied ? (
            <>
              <Check className="w-10 h-10" /> {t('shareCopied')}
            </>
          ) : (
            <>
              <Copy className="w-10 h-10" /> {t('shareCopy')}
            </>
          )}
        </button>
        <button
          onClick={() => {
            setUploadCode(null)
            setIsUploading(false)
            setProgress(0)
          }}
          className="min-h-[4rem] w-full py-6 text-gray-400 hover:text-violet-600 font-black text-lg transition-colors flex items-center justify-center gap-2 hover:bg-white/50 rounded-3xl"
        >
          {t('sendAnother')} <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    )
  }

  if (isUploading) {
    return (
      <div className="text-center space-y-12 animate-fade-in py-10">
        <div className="relative w-56 h-56 mx-auto">
          <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
            <circle cx="112" cy="112" r="90" stroke="#e5e7eb" strokeWidth="20" fill="none" />
            <circle
              cx="112"
              cy="112"
              r="90"
              stroke="url(#gradient)"
              strokeWidth="20"
              fill="none"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)}
              strokeLinecap="round"
              className="transition-all duration-200 ease-linear"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-5xl font-black text-gray-700">
              {Math.round(progress)}<span className="text-2xl text-gray-400">%</span>
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-black text-gray-800 mb-3">{t('uploading')}</h3>
          <p className="text-gray-400 font-bold text-xl">{t('keepOpen')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 h-full flex flex-col justify-center">
      <div className="group relative w-full h-96">
        <input type="file" onChange={handleFileSelect} className="hidden" id="file-upload" />
        <label
          htmlFor="file-upload"
          className="cursor-pointer block w-full h-full border-[6px] border-dashed border-indigo-200 bg-white/60 rounded-[3rem] hover:border-indigo-500 hover:bg-indigo-50/90 transition-all duration-300 flex flex-col items-center justify-center gap-10 group-active:scale-[0.98] shadow-inner"
        >
          <div className="w-32 h-32 bg-indigo-100 text-indigo-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-indigo-400/50">
            <CloudUpload className="w-16 h-16" />
          </div>

          <div className="text-center px-8">
            <h1 className="block text-4xl font-black text-gray-700 group-hover:text-indigo-600 mb-4 tracking-tight">{t('clickSelectFile')}</h1>
            <span className="text-gray-400 font-bold text-2xl">{t('autoStartUpload')}</span>
          </div>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-6 rounded-3xl text-lg font-bold flex items-center gap-3 justify-center animate-shake border-4 border-red-100 shadow-md">
          <AlertCircle className="w-8 h-8 flex-shrink-0" /> {error}
        </div>
      )}
    </div>
  )
}

function DownloadView({ t }: { t: (k: string) => string }) {
  const [code, setCode] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return

    setIsChecking(true)
    setError(null)

    try {
      const res = await fetch(`/api/get-download?code=${encodeURIComponent(code)}`)

      if (!res.ok) {
        if (res.status === 404) throw new Error(t('invalidCode'))
        throw new Error(t('connectionFailed'))
      }

      const { downloadUrl } = (await res.json()) as DownloadResponse
      window.location.href = downloadUrl
    } catch (err) {
      const message = err instanceof Error ? err.message : t('unknownError')
      setError(message)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <form onSubmit={handleDownload} className="space-y-10 py-6 h-full flex flex-col justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-black text-gray-800 mb-4">{t('extractFile')}</h1>
        <h2 className="text-4xl font-black text-gray-800 mb-4">{t('enter4code')}</h2>
      </div>

      <div className="relative">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder={t('inputPlaceholder')}
          maxLength={6}
          className="w-full min-h-[6rem] text-center text-[5rem] leading-none font-black text-gray-800 bg-white border-[6px] border-pink-100 rounded-[3rem] py-6 focus:border-pink-500 focus:ring-8 focus:ring-pink-200/50 focus:outline-none transition-all placeholder-gray-200 uppercase tracking-widest shadow-md"
        />
        {code.length > 0 && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2 text-pink-500 animate-pulse">
            <Sparkles className="w-12 h-12" />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-6 rounded-3xl text-lg font-bold flex items-center gap-3 justify-center animate-shake border-4 border-red-100 shadow-md">
          <AlertCircle className="w-8 h-8 flex-shrink-0" /> {error}
        </div>
      )}

      <p className="text-gray-400 font-bold text-center">{t('downloadNote')}</p>

      <button
        style={{ background: 'linear-gradient(135deg, #b9da72ff, #7ef28dff)' }}
        type="submit"
        disabled={!code || isChecking}
        className="w-full min-h-[6rem] bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[2.5rem] font-black text-4xl shadow-2xl shadow-pink-200 hover:shadow-2xl hover:shadow-pink-400/60 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-4 ring-8 ring-transparent hover:ring-pink-200 mt-auto"
      >
        {isChecking ? (
          <>
            <Loader2 className="w-12 h-12 animate-spin" /> {t('checking')}
          </>
        ) : (
          <h1 className="text-gray-400 font-bold text-center">{t('downloadNow')}</h1>
        )}
      </button>
    </form>
  )
}
