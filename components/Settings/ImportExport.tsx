'use client'

import React, { useState, useRef } from 'react'
import { AppConfig, Bookmark, BookmarkGroup } from '@/types'
import { uploadFile, downloadFile, generateId } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Upload, Download, AlertTriangle, FileText } from 'lucide-react'

interface ImportExportProps {
  config: AppConfig
  onImport: (config: AppConfig) => void
}

export function ImportExport({ config, onImport }: ImportExportProps) {
  const [showImportModal, setShowImportModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showHTMLImportModal, setShowHTMLImportModal] = useState(false)
  const [importedData, setImportedData] = useState<AppConfig | null>(null)
  const [htmlFolders, setHtmlFolders] = useState<any[]>([])
  const [fileName, setFileName] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const htmlFileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleHTMLImportClick = () => {
    console.log('🖱️ HTML Import button clicked')
    console.log('📁 File input ref:', htmlFileInputRef.current)
    htmlFileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const data = JSON.parse(text)

      if (validateConfig(data)) {
        setImportedData(data)
        setShowImportModal(true)
        setValidationError('')
      } else {
        setValidationError('配置文件格式不正确')
      }
    } catch (error) {
      setValidationError('无法解析配置文件')
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleHTMLFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('📂 File input changed')
    const file = e.target.files?.[0]
    if (!file) {
      console.log('❌ No file selected')
      return
    }

    console.log('✅ File selected:', file.name)

    try {
      const text = await file.text()
      console.log('📄 File text loaded, length:', text.length)

      const folders = parseHTMLBookmarks(text)
      console.log('📁 Parsed folders:', folders.length)

      if (folders.length === 0) {
        console.log('⚠️ No valid bookmark data found')
        setValidationError('未找到有效的书签数据')
        return
      }

      setHtmlFolders(folders)
      setFileName(file.name)
      setShowHTMLImportModal(true)
      setValidationError('')
      console.log('✅ Modal should be shown')
    } catch (err) {
      console.error('❌ Error parsing file:', err)
      setValidationError('解析书签文件失败：' + (err as Error).message)
    }

    // Reset file input
    if (htmlFileInputRef.current) {
      htmlFileInputRef.current.value = ''
    }
  }

  const parseHTMLBookmarks = (html: string): any[] => {
    console.log('🔄 Starting HTML parsing, text length:', html.length)
    const folders: any[] = []
    // Match folder structure: <DT><H3>folder name</H3>...<DL><p>content</DL>
    const folderRegex = /<DT>\s*<H3[^>]*>(.*?)<\/H3>[\s\S]*?<DL><p>([\s\S]*?)<\/DL>/g
    // Match bookmarks: <DT><A href="...">title</A>
    const bookmarkRegex = /<DT>\s*<A[^>]*HREF="([^"]*)"[^>]*>(.*?)<\/A>/g

    let folderMatch
    let folderCount = 0
    while ((folderMatch = folderRegex.exec(html)) !== null) {
      folderCount++
      const folderName = folderMatch[1].trim()
      const folderContent = folderMatch[2]
      console.log(`📂 Found folder ${folderCount}:`, folderName)

      const bookmarks: any[] = []
      let bookmarkMatch
      let bookmarkCount = 0

      // Parse bookmarks within this folder
      while ((bookmarkMatch = bookmarkRegex.exec(folderContent)) !== null) {
        bookmarkCount++
        const url = bookmarkMatch[1]
        const title = bookmarkMatch[2].trim()

        if (url && title && (url.startsWith('http'))) {
          bookmarks.push({
            title: decodeHTMLEntities(title),
            url,
          })
          console.log(`  🔖 Bookmark ${bookmarkCount}:`, title.substring(0, 50))
        } else {
          console.log(`  ⚠️ Skipping invalid bookmark ${bookmarkCount}:`, { url, title: title?.substring(0, 30) })
        }
      }

      if (bookmarks.length > 0) {
        folders.push({
          name: decodeHTMLEntities(folderName),
          bookmarks
        })
        console.log(`✅ Added folder with ${bookmarks.length} bookmarks`)
      } else {
        console.log(`⚠️ Skipping empty folder:`, folderName)
      }

      bookmarkRegex.lastIndex = 0
    }

    console.log(`🏁 Parsing complete. Found ${folders.length} folders with bookmarks`)
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

  const handleConfirmHTMLImport = () => {
    if (!htmlFolders || htmlFolders.length === 0) return

    const newGroups = htmlFolders.map((folder: any, index: number) => {
      const bookmarks = folder.bookmarks.map((bm: any) => ({
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
        order: config.groups.length + index,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })

    const newConfig = {
      ...config,
      groups: [...config.groups, ...newGroups]
    }

    onImport(newConfig)
    setShowHTMLImportModal(false)
    setHtmlFolders([])
    if (htmlFileInputRef.current) {
      htmlFileInputRef.current.value = ''
    }
  }

  const validateConfig = (data: any): data is AppConfig => {
    // Basic validation for required fields
    if (!data || typeof data !== 'object') return false
    if (typeof data.version !== 'string') return false
    if (typeof data.selectedSearchEngine !== 'string') return false
    if (!Array.isArray(data.searchEngines)) return false
    if (!Array.isArray(data.groups)) return false

    // Validate groups and bookmarks
    const groupsValid = data.groups.every((group: any) =>
      group.id &&
      group.name &&
      Array.isArray(group.bookmarks) &&
      group.bookmarks.every((bookmark: any) =>
        bookmark.id &&
        bookmark.title &&
        bookmark.url
      )
    )
    if (!groupsValid) return false

    // Validate optional fields if they exist
    if ('pageTitle' in data && typeof data.pageTitle !== 'string') return false
    if ('pageDescription' in data && typeof data.pageDescription !== 'string') return false
    if ('heroTitle' in data && typeof data.heroTitle !== 'string') return false
    if ('heroDescription' in data && typeof data.heroDescription !== 'string') return false
    if ('backgroundImage' in data && typeof data.backgroundImage !== 'string') return false

    // Validate themeColor if it exists
    if ('themeColor' in data && data.themeColor !== undefined && data.themeColor !== null) {
      if (typeof data.themeColor !== 'object') return false
      if (typeof data.themeColor.r !== 'number' ||
          typeof data.themeColor.g !== 'number' ||
          typeof data.themeColor.b !== 'number') return false
      if (data.themeColor.r < 0 || data.themeColor.r > 255 ||
          data.themeColor.g < 0 || data.themeColor.g > 255 ||
          data.themeColor.b < 0 || data.themeColor.b > 255) return false
    }

    return true
  }

  const handleConfirmImport = () => {
    if (importedData) {
      onImport(importedData)
      setShowImportModal(false)
      setImportedData(null)
    }
  }

  const handleExport = () => {
    const exportData = {
      ...config,
      exportDate: new Date().toISOString(),
      appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    }

    const json = JSON.stringify(exportData, null, 2)
    downloadFile(`my-nav-config-${Date.now()}.json`, json)
    setShowExportModal(true)
  }

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleImportClick}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          导入配置
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          导出配置
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleHTMLImportClick}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          导入 HTML 书签
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={htmlFileInputRef}
          type="file"
          accept=".html"
          onChange={handleHTMLFileChange}
          className="hidden"
        />
      </div>

      {/* Import Modal */}
      <Modal
        open={showImportModal}
        onClose={() => {
          setShowImportModal(false)
          setImportedData(null)
        }}
        title="导入配置"
      >
        <div className="space-y-4">
          {validationError ? (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>{validationError}</p>
            </div>
          ) : (
            <>
              <p>确定要导入这个配置文件吗？</p>

              {importedData && (
                <div className="glass-card p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">版本：</span> {importedData.version}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">分组数量：</span> {importedData.groups.length}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">书签总数：</span>{' '}
                    {importedData.groups.reduce((acc, group) => acc + group.bookmarks.length, 0)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">自定义搜索引擎：</span>{' '}
                    {importedData.searchEngines.filter((e) => e.isCustom).length}
                  </p>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                导入将覆盖当前所有配置。建议先导出备份。
              </p>
            </>
          )}
        </div>
      </Modal>

      {/* Export Modal */}
      <Modal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="配置已导出"
      >
        <div className="space-y-4">
          <p>配置文件已成功下载到本地。</p>
          <div className="glass-card p-4 space-y-2">
            <p className="text-sm">
              <span className="font-medium">版本：</span> {config.version}
            </p>
            <p className="text-sm">
              <span className="font-medium">分组数量：</span> {config.groups.length}
            </p>
            <p className="text-sm">
              <span className="font-medium">书签总数：</span>{' '}
              {config.groups.reduce((acc, group) => acc + group.bookmarks.length, 0)}
            </p>

            {/* 显示自定义设置信息 */}
            {config.pageTitle !== 'MyNav - Personal Browser Navigation' && (
              <p className="text-sm">
                <span className="font-medium">自定义标题：</span> ✓
              </p>
            )}
            {config.themeColor && (
              <p className="text-sm">
                <span className="font-medium">自定义主题色：</span> ✓
              </p>
            )}
            {config.backgroundImage && (
              <p className="text-sm">
                <span className="font-medium">自定义背景图：</span> ✓
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            配置文件已保存到下载文件夹。
          </p>
        </div>
      </Modal>

      {/* HTML Import Modal */}
      <Modal
        open={showHTMLImportModal}
        onClose={() => {
          setShowHTMLImportModal(false)
          setHtmlFolders([])
          setFileName('')
          if (htmlFileInputRef.current) {
            htmlFileInputRef.current.value = ''
          }
        }}
        title="导入 HTML 书签"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowHTMLImportModal(false)
                setHtmlFolders([])
                setFileName('')
                if (htmlFileInputRef.current) {
                  htmlFileInputRef.current.value = ''
                }
              }}
            >
              取消
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmHTMLImport}
              disabled={!htmlFolders || htmlFolders.length === 0}
            >
              确认导入
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {validationError ? (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>{validationError}</p>
            </div>
          ) : htmlFolders && htmlFolders.length > 0 ? (
            <>
              <p>
                文件 <strong>{fileName}</strong> 包含：
              </p>

              <div className="glass-card p-4 space-y-3 max-h-64 overflow-y-auto">
                {htmlFolders.map((folder: any, index: number) => (
                  <div key={index} className="border-b border-border last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        📁 {folder.name}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {folder.bookmarks?.length || 0} 个书签
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