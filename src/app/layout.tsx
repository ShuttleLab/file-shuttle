import './globals.css'

export const metadata = {
  title: '文件穿梭机 | File Shuttle',
  description: '极速 · 安全 · 自动销毁 | Fast · Secure · Self-destruct file transfer',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
