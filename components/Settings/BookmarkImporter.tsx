'use client'

import React, { useState } from 'react'
import { AppConfig, Bookmark, BookmarkGroup } from '@/types'
import { generateId } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Upload, AlertTriangle } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

interface BookmarkImporterProps {
  onImport: (config: AppConfig) => void
  currentConfig: AppConfig
}

interface ParsedBookmark {
  title: string
  url: string
  icon?: string
}

interface ParsedFolder {
  name: string
  bookmarks: ParsedBookmark[]
}

export function BookmarkImporter({ onImport, currentConfig }: BookmarkImporterProps) {
  const [showModal, setShowModal] = useState(false)
  const [parsedData, setParsedData] = useState<ParsedFolder[] | null>(null)
  const [error, setError] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const folders = parseBookmarksHTML(text)

      if (folders.length === 0) {
        setError('未找到有效的书签数据')
        return
      }

      setParsedData(folders)
      setFileName(file.name)
      setShowModal(true)
      setError('')
    } catch (err) {
      setError('解析书签文件失败：' + (err as Error).message)
    }
  }

  const parseBookmarksHTML = (html: string): ParsedFolder[] => {
    const folders: ParsedFolder[] = []

    // 匹配 <H3> 标签（文件夹）
    const folderRegex = /<H3[^>]*>(.*?)<\/H3>[\s\S]*?<DL><p>([\s\S]*?)<\/p><\/DL>/g
    // 匹配 <A> 标签（书签）
    const bookmarkRegex = /<A[^>]*HREF="([^"]*)"[^>]*>(.*?)<\/A>/g

    let folderMatch
    while ((folderMatch = folderRegex.exec(html)) !== null) {
      const folderName = folderMatch[1].trim()
      const folderContent = folderMatch[2]

      const bookmarks: ParsedBookmark[] = []
      let bookmarkMatch

      while ((bookmarkMatch = bookmarkRegex.exec(folderContent)) !== null) {
        const url = bookmarkMatch[1]
        const title = bookmarkMatch[2].trim()

        // 只保留有效的 HTTP/HTTPS 链接
        if (url && title && (url.startsWith('http') || url.startsWith('https'))) {
          bookmarks.push({
            title: decodeHTMLEntities(title),
            url,
            icon: undefined
          })
        }
      }

      if (bookmarks.length > 0) {
        folders.push({
          name: decodeHTMLEntities(folderName),
          bookmarks
        })
      }

      // 重置正则表达式
      bookmarkRegex.lastIndex = 0
    }

    // 如果没有找到文件夹结构的，尝试直接解析根目录的书签
    if (folders.length === 0) {
      const rootBookmarks: ParsedBookmark[] = []
      let bookmarkMatch

      while ((bookmarkMatch = bookmarkRegex.exec(html)) !== null) {
        const url = bookmarkMatch[1]
        const title = bookmarkMatch[2].trim()

        if (url && title && (url.startsWith('http') || url.startsWith('https'))) {
          rootBookmarks.push({
            title: decodeHTMLEntities(title),
            url,
            icon: undefined
          })
        }
      }

      if (rootBookmarks.length > 0) {
        folders.push({
          name: '导入的书签',
          bookmarks: rootBookmarks
        })
      }
    }

    return folders
  }

  const decodeHTMLEntities = (text: string): string => {
    const entities: { [key: string]: string } = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&nbsp;': ' '
    }

    return text.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => entities[entity] || entity)
  }

  const handleConfirmImport = () => {
    if (!parsedData || parsedData.length === 0) return

    const newGroups: BookmarkGroup[] = parsedData.map((folder, index) => {
      const bookmarks: Bookmark[] = folder.bookmarks.map(bm => ({
        id: generateId(),
        title: bm.title,
        url: bm.url,
        icon: bm.icon || undefined,
        notes: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }))

      return {
        id: generateId(),
        name: folder.name,
        bookmarks,
        order: currentConfig.groups.length + index,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })

    const newConfig: AppConfig = {
      ...currentConfig,
      groups: [...currentConfig.groups, ...newGroups]
    }

    onImport(newConfig)
    setShowModal(false)
    setParsedData(null)
  }

  return (
    <>
      <div>
        <input
          type="file"
          accept=".html"
          onChange={handleFileChange}
          className="hidden"
          id="bookmark-file-input"
        />
        <label htmlFor="bookmark-file-input" className="cursor-pointer">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            导入 HTML 书签
          </Button>
        </label>
      </div>

      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setParsedData(null)
          setFileName('')
        }}
        title="导入书签"
      >
        <div className="space-y-4">
          {error ? (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          ) : parsedData ? (
            <>
              <p>
                文件 <strong>{fileName}</strong> 包含：
              </p>

              <div className="glass-card p-4 space-y-3">
                {parsedData.map((folder, index) => (
                  <div key={index} className="border-b border-border last:border-0 pb-3 last:pb-0 last:mb-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        📁 {folder.name}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {folder.bookmarks.length} 个书签
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                这些书签将被添加到新的分组中。
              </p>
            </>
          ) : null}
        </div>
      </Modal>
    </>
  )
}
