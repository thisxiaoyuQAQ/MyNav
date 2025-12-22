'use client'

import React, { useEffect } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from './context/AppContext'
import { useAppContext } from '@/app/context/AppContext'
import { useTheme } from '@/lib/theme'

const inter = Inter({ subsets: ['latin'] })

function ThemeHandler() {
  const { config } = useAppContext()

  useEffect(() => {
    document.title = config.pageTitle
  }, [config.pageTitle])

  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (metaDescription) {
      metaDescription.content = config.pageDescription
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = config.pageDescription
      document.head.appendChild(meta)
    }
  }, [config.pageDescription])

  useTheme(config)

  return null
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { config } = useAppContext()

  return (
    <main
      className="min-h-screen relative"
      style={{
        backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
        backgroundSize: config.backgroundImage ? 'cover' : undefined,
        backgroundPosition: config.backgroundImage ? 'center' : undefined,
        backgroundAttachment: config.backgroundImage ? 'fixed' : undefined,
      }}
    >
      {!config.backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black -z-10" />
      )}
      {config.backgroundImage && (
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm -z-10" />
      )}
      <div className="relative">
        {children}
      </div>
    </main>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="description" content="A beautiful and lightweight personal browser navigation page" />
      </head>
      <body className={inter.className}>
        <AppProvider>
          <ThemeHandler />
          <LayoutContent>{children}</LayoutContent>
        </AppProvider>
      </body>
    </html>
  )
}
