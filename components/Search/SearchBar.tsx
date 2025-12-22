'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SearchEngine, SearchEngine as SearchEngineType } from '@/types'
import { Search, ChevronDown } from 'lucide-react'
import { DEFAULT_SEARCH_ENGINES, getSearchUrl } from '@/lib/searchEngines'
import { useMounted } from '@/lib/utils'

interface SearchBarProps {
  engines: SearchEngine[]
  selectedEngine: string
  onEngineChange: (engineId: string) => void
  placeholder?: string
}

export function SearchBar({
  engines,
  selectedEngine,
  onEngineChange,
  placeholder = '搜索或输入网址...',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const mounted = useMounted()

  const allEngines = [...DEFAULT_SEARCH_ENGINES, ...engines.filter(e => e.isCustom)]
  const currentEngine = allEngines.find(e => e.id === selectedEngine) || DEFAULT_SEARCH_ENGINES[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const trimmedQuery = query.trim()

    // Check if query is a URL
    if (isValidUrl(trimmedQuery)) {
      const url = trimmedQuery.startsWith('http') ? trimmedQuery : `https://${trimmedQuery}`
      window.open(url, '_blank')
    } else {
      // Perform search
      const searchUrl = getSearchUrl(currentEngine, trimmedQuery)
      window.open(searchUrl, '_blank')
    }

    setQuery('')
  }

  const isValidUrl = (str: string): boolean => {
    // 检查是否包含协议
    if (str.startsWith('http://') || str.startsWith('https://')) {
      try {
        new URL(str)
        return true
      } catch {
        return false
      }
    }

    // 检查常见域名格式
    const domainPattern = /^(?!.*\s)([a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:[0-9]+)?(\/.*)?$/
    if (domainPattern.test(str)) {
      try {
        new URL(`https://${str}`)
        return true
      } catch {
        return false
      }
    }

    // 检查是否是 IP 地址
    const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})(:[0-9]+)?(\/.*)?$/
    if (ipv4Pattern.test(str)) {
      const parts = str.split('.')
      if (parts.length >= 4) {
        const isValidIp = parts.slice(0, 4).every(part => {
          const num = parseInt(part, 10)
          return num >= 0 && num <= 255
        })
        if (isValidIp) {
          return true
        }
      }
    }

    // 检查 localhost
    if (str.startsWith('localhost') || str.startsWith('127.0.0.1')) {
      return true
    }

    return false
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="glass-input w-full pl-12 pr-40 py-4 text-lg rounded-full"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="glass-button px-3 py-2 flex items-center gap-2"
            >
              <span className="text-lg" suppressHydrationWarning>
                {mounted ? currentEngine.icon : DEFAULT_SEARCH_ENGINES[0].icon}
              </span>
              <span className="hidden sm:inline">{currentEngine.name}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 glass-card max-h-60 overflow-y-auto z-10">
            <div className="py-2">
              {allEngines.map((engine) => (
                <button
                  key={engine.id}
                  type="button"
                  onClick={() => {
                    onEngineChange(engine.id)
                    setShowDropdown(false)
                    inputRef.current?.focus()
                  }}
                  className={`w-full text-left context-menu-item flex items-center gap-3 ${
                    engine.id === selectedEngine ? 'bg-accent text-accent-foreground' : ''
                  }`}
                >
                  <span className="text-lg w-6">{engine.icon}</span>
                  <span className="flex-1">{engine.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
