'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Zap, Shield, Lock, Clock, Heart, Share2, X, Check, Info } from 'lucide-react'

export default function AboutPage() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh')
  const [donateOpen, setDonateOpen] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const translations = {
    zh: {
      back: '返回',
      langButton: 'EN',
      heroTitle: '关于文件穿梭机',
      heroSubtitle: '极速、安全、自动销毁的文件传递服务',
      serviceTitle: '我们的服务',
      serviceP1: '文件穿梭机是一个简单而强大的文件传递平台。您只需上传文件，系统会生成一个唯一的四位取件码。将取件码分享给接收者，对方即可下载您的文件。',
      serviceP2: '无需注册、无需登录，随时随地传递您的文件。基于 Serverless 架构，快速稳定。',
      fast: '极速传输',
      fastDesc: '基于全球 CDN 加速，无论您在哪里，都能享受极速的文件上传和下载体验。',
      safe: '安全可靠',
      safeDesc: '采用业界领先的加密技术，确保您的文件在传输和存储过程中的安全性。',
      privacy: '隐私保护',
      privacyDesc: '文件下载后可自动销毁，不留痕迹。我们不收集任何个人信息，真正做到用完即焚。',
      ttl: '限时存储',
      ttlDesc: '文件默认24小时有效期，超时自动删除，确保文件不会永久留存。',
      useCases: '使用场景',
      use1: '临时分享大文件给朋友或同事',
      use2: '跨设备传递文件，无需数据线',
      use3: '向他人发送私密文档',
      use4: '不想留下云盘记录的场景',
      supportTitle: '支持我们',
      supportDesc: '文件穿梭机是一个免费服务，由站长个人维护。如果您觉得这个服务对您有帮助，欢迎通过以下方式支持我们：',
      contactDesc: '如有问题或建议，欢迎联系站长',
      contactEmail: '邮箱',
      shareButton: '分享给朋友',
      shareCopied: '已复制到剪贴板',
      donateButton: '捐赠支持',
      donateTitle: '捐赠支持',
      donateDesc: '扫码或长按保存二维码，支持我们持续运营。',
      wechat: '微信收款码',
      alipay: '支付宝收款码',
      paypal: 'PayPal 收款码',
      close: '关闭',
    },
    en: {
      back: 'Back',
      langButton: '中文',
      heroTitle: 'About File Shuttle',
      heroSubtitle: 'Fast, secure, self-destructing file transfer',
      serviceTitle: 'Our Service',
      serviceP1: 'File Shuttle is a simple yet powerful file transfer platform. Upload your file and get a unique 4-character pickup code. Share the code so others can download your file.',
      serviceP2: 'No registration or login required—transfer files anytime, anywhere. Built on Serverless architecture for speed and reliability.',
      fast: 'Lightning Fast',
      fastDesc: 'Powered by global CDN, enjoy blazing fast upload and download speeds wherever you are.',
      safe: 'Secure & Reliable',
      safeDesc: 'Leading encryption practices keep your files safe during transit and storage.',
      privacy: 'Privacy First',
      privacyDesc: 'Files can be destroyed after download. No personal data is collected—true burn after use.',
      ttl: 'Time-limited Storage',
      ttlDesc: 'Files default to 24 hours and auto-delete afterward, ensuring nothing stays forever.',
      useCases: 'Use Cases',
      use1: 'Temporarily share large files with friends or colleagues',
      use2: 'Transfer files across devices without cables',
      use3: 'Send private documents to others',
      use4: 'Scenarios where you prefer no cloud storage history',
      supportTitle: 'Support Us',
      supportDesc: 'File Shuttle is a free service maintained by the owner. If it helps you, consider supporting us:',
      contactDesc: 'For questions or feedback, contact the owner',
      contactEmail: 'Email',
      shareButton: 'Share with Friends',
      shareCopied: 'Copied to clipboard',
      donateButton: 'Donate',
      donateTitle: 'Support Us',
      donateDesc: 'Scan or save the QR codes to support our service.',
      wechat: 'WeChat',
      alipay: 'Alipay',
      paypal: 'PayPal',
      close: 'Close',
    }
  }

  const t = translations[lang]

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2000)
  }

  return (
    <>
      {/* Top Right Navigation */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <Link
          href="/"
          className="bg-white/10 text-white rounded-full ring-2 ring-white/30 hover:bg-white/20 transition flex items-center justify-center gap-2 px-5 py-3 font-bold shadow-lg text-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          {t.back}
        </Link>
        <button
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          aria-label="Toggle language"
          className="bg-white/10 text-white rounded-full ring-2 ring-white/30 hover:bg-white/20 transition flex items-center justify-center px-5 py-3 font-extrabold shadow-lg text-lg"
        >
          {t.langButton}
        </button>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-start py-24 px-4 sm:px-6 selection:bg-pink-200">
        {/* Decorative blobs */}
        <div className="fixed -top-40 -right-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob pointer-events-none"></div>
        <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>

        <div className="w-full max-w-4xl relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-bold drop-shadow-md">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Service Introduction Card */}
          <div className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-[2.5rem] p-8 md:p-10 mb-8 border-2 border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-800">{t.serviceTitle}</h2>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              {t.serviceP1}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.serviceP2}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Fast */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-100/90 to-orange-100/90 rounded-[2rem] p-6 md:p-8 shadow-xl border-2 border-yellow-200/50 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-800 ml-4">{t.fast}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t.fastDesc}
              </p>
            </div>

            {/* Secure */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-100/90 to-cyan-100/90 rounded-[2rem] p-6 md:p-8 shadow-xl border-2 border-blue-200/50 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-800 ml-4">{t.safe}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t.safeDesc}
              </p>
            </div>

            {/* Privacy */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-green-100/90 to-emerald-100/90 rounded-[2rem] p-6 md:p-8 shadow-xl border-2 border-green-200/50 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-800 ml-4">{t.privacy}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t.privacyDesc}
              </p>
            </div>

            {/* TTL */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-100/90 to-pink-100/90 rounded-[2rem] p-6 md:p-8 shadow-xl border-2 border-purple-200/50 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-800 ml-4">{t.ttl}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t.ttlDesc}
              </p>
            </div>
          </div>

          {/* Use Cases Card */}
          <div className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-[2.5rem] p-8 md:p-10 mb-8 border-2 border-white/50">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-6">{t.useCases}</h2>
            <ul className="space-y-4">
              {[t.use1, t.use2, t.use3, t.use4].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-600 text-lg leading-relaxed pt-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="backdrop-blur-xl bg-gradient-to-r from-pink-500/90 to-rose-600/90 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl mb-8 border-2 border-pink-400/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black">{t.supportTitle}</h2>
            </div>
            <p className="mb-8 text-pink-100 text-lg leading-relaxed">
              {t.supportDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setDonateOpen(true)}
                className="bg-white text-pink-600 hover:bg-pink-50 rounded-full px-8 py-4 font-black flex items-center gap-3 transition-all hover:scale-105 shadow-xl text-lg"
              >
                <Heart className="w-5 h-5" />
                {t.donateButton}
              </button>
              <button
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full px-8 py-4 font-bold flex items-center gap-3 transition-all hover:scale-105 shadow-lg border-2 border-white/30 text-lg"
              >
                <Share2 className="w-5 h-5" />
                {shareCopied ? t.shareCopied : t.shareButton}
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center text-white/90 py-4">
            <p className="font-bold text-lg">{t.contactDesc}</p>
            <p className="mt-2 text-lg">
              {t.contactEmail}:
              <a
                href="mailto:a.tiling120@slmail.me"
                className="text-white underline underline-offset-4 hover:text-pink-200 ml-2 font-bold"
              >
                a.tiling120@slmail.me
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      {donateOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl p-6 md:p-8 animate-fade-in">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-gray-800">{t.donateTitle}</h3>
                <p className="text-gray-500 mt-1">{t.donateDesc}</p>
              </div>
              <button
                type="button"
                onClick={() => setDonateOpen(false)}
                aria-label="关闭"
                className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border-2 border-gray-100 rounded-2xl p-4 hover:border-green-300 hover:shadow-lg transition-all">
                <p className="font-bold text-gray-800 mb-3 text-center">{t.wechat}</p>
                <div className="flex justify-center">
                  <Image
                    src="/wechat-qr.png"
                    alt="微信收款码"
                    width={160}
                    height={160}
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
              </div>
              <div className="border-2 border-gray-100 rounded-2xl p-4 hover:border-blue-300 hover:shadow-lg transition-all">
                <p className="font-bold text-gray-800 mb-3 text-center">{t.alipay}</p>
                <div className="flex justify-center">
                  <Image
                    src="/alipay-qr.png"
                    alt="支付宝收款码"
                    width={160}
                    height={160}
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
              </div>
              <div className="border-2 border-gray-100 rounded-2xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all">
                <p className="font-bold text-gray-800 mb-3 text-center">{t.paypal}</p>
                <div className="flex justify-center">
                  <Image
                    src="/paypal-qr.png"
                    alt="PayPal 收款码"
                    width={160}
                    height={160}
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setDonateOpen(false)}
                className="px-6 py-3 font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
