import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 静态导出以适配 Cloudflare Pages 的 Static HTML Export 预设
  output: 'export',
  // 禁用图片优化以兼容静态导出
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8788/api/:path*',
        },
      ]
    }
    return []
  },
}

export default nextConfig
