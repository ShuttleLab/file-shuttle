import React, { useState } from 'react';
import { Upload, Download, Copy, Check, Sparkles, Cloud, ArrowRight, Loader2, AlertCircle, CloudUpload } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'download'>('upload');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 selection:bg-pink-200 overflow-y-auto">
      
      {/* 头部区域 */}
      <div className="mb-12 text-center text-white drop-shadow-md mt-10">
        <div className="inline-flex items-center justify-center p-5 bg-white/20 backdrop-blur-md rounded-[2rem] mb-6 ring-4 ring-white/30 shadow-2xl animate-bounce-slow">
          <Cloud className="w-16 h-16 text-white fill-white" />
        </div>
        <h1 className="text-9xl font-black mb-4 tracking-tighter flex items-center justify-center gap-3 drop-shadow-lg">
          文件穿梭机
        </h1>
        <p className="text-33xl text-white/90 font-bold tracking-wide drop-shadow-md">极速 · 安全 · 私密</p>
      </div>

      {/* 主容器 */}
      <div className="w-full max-w-2xl relative mb-16 flex flex-col items-center">
        
        {/* 背景装饰光斑 */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-[64px] opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-[64px] opacity-40 animate-blob animation-delay-2000"></div>

        {/* 顶部功能入口 - 强制左右并排 (flex-row) */}
        <div className="w-full flex flex-row items-stretch justify-center gap-4 md:gap-16 mb-16 relative z-10 px-2">
          
          {/* 发送按钮 - 自动宽度 (flex-1) */}
          <button
            style={{ background: 'linear-gradient(135deg, #f0f0a4ff, #f4c0c7ff)' }}
            onClick={() => setActiveTab('upload')}
            className={cn(
              "flex-1 h-32 md:h-48 rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-4 shadow-xl border-[4px] md:border-[6px]",
              activeTab === 'upload' 
                ? "bg-gradient-to-br from-pink-500 to-rose-600 text-pink border-pink/30 scale-105 shadow-pink-500/40 ring-2 md:ring-4 ring-pink/40 translate-y-[-4px] md:translate-y-[-8px] z-10" 
                : "bg-pink-100/50 text-pink-500 border-pink hover:bg-pink-200 hover:scale-[1.02] hover:border-pink-300"
            )}
          >
            <div className={cn(
              "p-2 md:p-4 rounded-2xl md:rounded-3xl transition-colors shadow-inner",
              activeTab === 'upload' ? "bg-pink/20" : "bg-pink/60"
            )}>
               <Upload className={cn("w-8 h-8 md:w-12 md:h-12", activeTab === 'upload' ? "text-pink" : "text-pink-600")} />
            </div>
            <h1 className="text-lg md:text-2xl font-black tracking-tight whitespace-nowrap">发送 🚀</h1>
          </button>

          {/* 接收按钮 - 自动宽度 (flex-1) */}
          <button
            style={{ background: 'linear-gradient(135deg, #aacdf8ff, #9c8feeff)' }}
            onClick={() => setActiveTab('download')}
            className={cn(
              "flex-1 h-32 md:h-48 rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-4 shadow-xl border-[4px] md:border-[6px]",
              activeTab === 'download' 
                ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white border-white/30 scale-105 shadow-pink-500/40 ring-2 md:ring-4 ring-white/40 translate-y-[-4px] md:translate-y-[-8px] z-10" 
                : "bg-pink-100/50 text-pink-500 border-white hover:bg-pink-200 hover:scale-[1.02] hover:border-pink-300"
            )}
          >
             <div className={cn(
              "p-2 md:p-4 rounded-2xl md:rounded-3xl transition-colors shadow-inner",
              activeTab === 'download' ? "bg-white/20" : "bg-white/60"
            )}>
               <Download className={cn("w-8 h-8 md:w-12 md:h-12", activeTab === 'download' ? "text-white" : "text-pink-600")} />
            </div>
            <h1 className="text-lg md:text-2xl font-black tracking-tight whitespace-nowrap">接收 📦</h1>
          </button>
        </div>

        {/* 功能卡片 */}
        <div className={cn(
            "w-full backdrop-blur-3xl rounded-[3.5rem] shadow-2xl border-2 border-white/70 p-10 relative z-10 min-h-[480px] flex flex-col justify-center transition-all duration-500",
            activeTab === 'upload' ? "bg-indigo-50/90" : "bg-pink-50/90"
        )}>
          {activeTab === 'upload' ? <UploadView /> : <DownloadView />}
        </div>

      </div>
      
      <p className="text-base text-white/70 font-bold tracking-[0.2em] uppercase mt-8 drop-shadow">
        Serverless File Transfer
      </p>
    </div>
  );
}

const UploadView = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadCode, setUploadCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const uploadFileXHR = (file: File, url: string) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error('上传失败'));
        }
      };

      xhr.onerror = () => reject(new Error('网络错误'));
      xhr.send(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    setProgress(0);
    setError(null);
    setUploadCode(null);

    try {
      const initRes = await fetch('/api/init-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          filename: file.name,
          contentType: file.type || 'application/octet-stream' 
        }),
      });

      if (!initRes.ok) throw new Error('初始化失败');
      const { code, uploadUrl } = await initRes.json();

      await uploadFileXHR(file, uploadUrl);

      setUploadCode(code);
    } catch (err: any) {
      setError(err.message || '发生未知错误');
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
          <h3 className="text-4xl font-black text-gray-800 mb-3">发送成功！</h3>
          <p className="text-gray-500 font-bold text-xl">对方凭此码下载</p>
        </div>
        
        <div 
          onClick={copyCode}
          className="bg-white border-[6px] border-violet-100 p-8 rounded-[2.5rem] flex items-center justify-between cursor-pointer hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-200 transition-all group transform hover:-translate-y-2"
        >
          <div className="flex flex-col items-start gap-2">
             <span className="text-[6rem] font-black text-violet-300 uppercase tracking-wider">   取件码: {uploadCode}</span>
             {/* <span className="font-mono text-6xl font-black text-violet-600 tracking-widest">
              {uploadCode}
            </span> */}
          </div>
         
          <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300 shadow-sm">
            {copied ? <Check className="w-10 h-10" /> : <Copy className="w-10 h-10" />}
          </div>
        </div>
        <p className="text-gray-400 font-bold">请妥善保存取件码，文件3天后自动销毁</p>
        <button 
          onClick={() => { setUploadCode(null); setIsUploading(false); setProgress(0); }}
          className="min-h-[4rem] w-full py-6 text-gray-400 hover:text-violet-600 font-black text-lg transition-colors flex items-center justify-center gap-2 hover:bg-white/50 rounded-3xl"
        >
          发送另一个文件 <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    );
  }

  if (isUploading) {
    return (
      <div className="text-center space-y-12 animate-fade-in py-10">
        <div className="relative w-56 h-56 mx-auto">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
              <circle cx="112" cy="112" r="90" stroke="#e5e7eb" strokeWidth="20" fill="none" />
              <circle 
                cx="112" cy="112" r="90" 
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
                <span className="text-5xl font-black text-gray-700">{Math.round(progress)}<span className="text-2xl text-gray-400">%</span></span>
            </div>
        </div>

        <div>
          <h3 className="text-3xl font-black text-gray-800 mb-3">正在极速上传...</h3>
          <p className="text-gray-400 font-bold text-xl">请保持页面开启</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 h-full flex flex-col justify-center">
      <div className="group relative w-full h-96">
        <input 
          type="file" 
          onChange={handleFileSelect} 
          className="hidden" 
          id="file-upload"
        />
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer block w-full h-full border-[6px] border-dashed border-indigo-200 bg-white/60 rounded-[3rem] hover:border-indigo-500 hover:bg-indigo-50/90 transition-all duration-300 flex flex-col items-center justify-center gap-10 group-active:scale-[0.98] shadow-inner"
        >
           <div className="w-32 h-32 bg-indigo-100 text-indigo-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-indigo-400/50">
            <CloudUpload className="w-16 h-16" />
          </div>
          
          <div className="text-center px-8">
            <h1 className="block text-4xl font-black text-gray-700 group-hover:text-indigo-600 mb-4 tracking-tight">点击选择文件</h1>
            <span className="text-gray-400 font-bold text-2xl">自动开始上传</span>
          </div>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-6 rounded-3xl text-lg font-bold flex items-center gap-3 justify-center animate-shake border-4 border-red-100 shadow-md">
          <AlertCircle className="w-8 h-8 flex-shrink-0" /> {error}
        </div>
      )}
    </div>
  );
};

const DownloadView = () => {
  const [code, setCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    setIsChecking(true);
    setError(null);

    try {
      const res = await fetch(`/api/get-download?code=${encodeURIComponent(code)}`);
      
      if (!res.ok) {
        if (res.status === 404) throw new Error('取件码无效或已过期');
        throw new Error('连接失败，请稍后再试');
      }

      const { downloadUrl } = await res.json();
      window.location.href = downloadUrl;
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <form onSubmit={handleDownload} className="space-y-10 py-6 h-full flex flex-col justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-black text-gray-800 mb-4">提取文件</h1>
        <h2 className="text-4xl font-black text-gray-800 mb-4">请输入 4 位取件码</h2>
        {/* <p className="text-gray-400 font-bold text-xl">请输入 4 位取件码</p> */}
      </div>

      <div className="relative">
        <input
          type="text"
          
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="A1B2"
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
      <p className="text-gray-400 font-bold text-center">文件3天后自动销毁，请及时保存</p>
      <button
        style={{ background: 'linear-gradient(135deg, #b9da72ff, #7ef28dff)' }}
        type="submit"
        disabled={!code || isChecking}
        className="w-full min-h-[6rem] bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[2.5rem] font-black text-4xl shadow-2xl shadow-pink-200 hover:shadow-2xl hover:shadow-pink-400/60 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-4 ring-8 ring-transparent hover:ring-pink-200 mt-auto"
      >
        {isChecking ? (
          <>
            <Loader2 className="w-12 h-12 animate-spin" /> 查询中...
          </>
        ) : (
          // '立刻下载'
          <h1 className="text-gray-400 font-bold text-center">立刻下载</h1>
        )}
      </button>
    </form>
  );
};

export default App;