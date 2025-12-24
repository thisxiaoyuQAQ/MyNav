'use client'

import React, { useState, useRef } from 'react'
import { useAppContext } from '@/app/context/AppContext'
import { rgbToHex, hexToRgb, validateRgbColor } from '@/lib/theme'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Upload, Palette, ImageIcon, Globe, RotateCcw } from 'lucide-react'

// Section component - 定义在模块顶层，避免每次渲染都重新创建
const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-8 last:mb-0">{children}</div>
)

export function SettingsPanel() {
  const { config, updateConfig, resetToDefault } = useAppContext()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Local state for form fields
  const [pageTitle, setPageTitle] = useState(config.pageTitle)
  const [pageDescription, setPageDescription] = useState(config.pageDescription)
  const [heroTitle, setHeroTitle] = useState(config.heroTitle)
  const [heroDescription, setHeroDescription] = useState(config.heroDescription)
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('')

  // Theme color state
  const [themeColorHex, setThemeColorHex] = useState(
    config.themeColor ? rgbToHex(config.themeColor) : '#3b82f6'
  )

  // Note: We intentionally don't sync local state with config changes here
  // to avoid re-renders during typing. Local state is only initialized once.

  // Handle basic settings save
  const handleSaveBasicSettings = () => {
    updateConfig({
      ...config,
      pageTitle,
      pageDescription,
      heroTitle,
      heroDescription,
    })
  }

  // Handle theme color change
  const handleThemeColorChange = (color: string) => {
    setThemeColorHex(color)
    const rgb = hexToRgb(color)
    if (rgb && validateRgbColor(rgb)) {
      updateConfig({
        ...config,
        themeColor: rgb,
      })
    }
  }

  // Handle theme color reset
  const handleResetThemeColor = () => {
    setThemeColorHex('#3b82f6')
    updateConfig({
      ...config,
      themeColor: undefined,
    })
  }

  // Handle background image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('图片文件大小不能超过5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (result) {
          updateConfig({
            ...config,
            backgroundImage: result,
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle background image URL
  const handleSetBackgroundImageUrl = () => {
    if (!backgroundImageUrl.trim()) {
      alert('请输入有效的图片URL')
      return
    }

    if (!backgroundImageUrl.startsWith('http://') && !backgroundImageUrl.startsWith('https://')) {
      alert('请输入有效的http://或https://开头的URL')
      return
    }

    updateConfig({
      ...config,
      backgroundImage: backgroundImageUrl,
    })
  }

  // Handle remove background image
  const handleRemoveBackgroundImage = () => {
    updateConfig({
      ...config,
      backgroundImage: undefined,
    })
    setBackgroundImageUrl('')
  }

  // Handle reset to default
  const handleResetToDefault = () => {
    resetToDefault()
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              基础设置
            </CardTitle>
            <CardDescription>自定义浏览器标题和描述</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pageTitle">浏览器标题</Label>
              <Input
                id="pageTitle"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                placeholder="MyNav - Personal Browser Navigation"
              />
              <p className="text-sm text-muted-foreground mt-1">显示在浏览器标签页的标题</p>
            </div>

            <div>
              <Label htmlFor="pageDescription">浏览器描述</Label>
              <Input
                id="pageDescription"
                value={pageDescription}
                onChange={(e) => setPageDescription(e.target.value)}
                placeholder="A beautiful and lightweight personal browser navigation page"
              />
              <p className="text-sm text-muted-foreground mt-1">用于搜索引擎结果的描述</p>
            </div>

            <div>
              <Label htmlFor="heroTitle">首页标题</Label>
              <Input
                id="heroTitle"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="MyNav"
              />
              <p className="text-sm text-muted-foreground mt-1">显示在首页的主标题</p>
            </div>

            <div>
              <Label htmlFor="heroDescription">首页描述</Label>
              <Input
                id="heroDescription"
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                placeholder="您的个人浏览器导航中心"
              />
              <p className="text-sm text-muted-foreground mt-1">显示在首页的副标题</p>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveBasicSettings}>保存基础设置</Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              主题颜色
            </CardTitle>
            <CardDescription>自定义主题颜色（可选）</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex-1">
                  <Label htmlFor="themeColor" className="block mb-2">主题色</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      id="themeColor"
                      value={themeColorHex}
                      onChange={(e) => handleThemeColorChange(e.target.value)}
                      className="h-12 w-20 border rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    />
                    <Input
                      type="text"
                      value={themeColorHex}
                      onChange={(e) => handleThemeColorChange(e.target.value)}
                      placeholder="#3b82f6"
                      className="w-32 font-mono"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    选择主题颜色，将应用于所有强调色和UI组件
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-sm text-muted-foreground mb-2 sm:text-center">预览</p>
                  <div
                    className="w-24 h-24 rounded-xl shadow-md border-2 border-border transition-all hover:shadow-lg hover:scale-105"
                    style={{ backgroundColor: themeColorHex }}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end border-t border-border">
                <Button variant="outline" onClick={handleResetThemeColor}>
                  重置为默认
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              背景图片
            </CardTitle>
            <CardDescription>自定义背景图片（可选）</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="pb-4 border-b border-border">
                <Label className="block mb-2 font-medium">上传图片</Label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Upload className="h-4 w-4" />
                    选择图片
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="text-sm text-muted-foreground">
                    支持 JPG、PNG、GIF、WebP 格式，最大 5MB
                  </span>
                </div>
              </div>

              <div className="pb-4 border-b border-border">
                <Label htmlFor="backgroundImageUrl" className="block mb-2 font-medium">或输入图片URL</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="backgroundImageUrl"
                    type="url"
                    value={backgroundImageUrl}
                    onChange={(e) => setBackgroundImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1"
                  />
                  <Button onClick={handleSetBackgroundImageUrl} className="whitespace-nowrap">
                    应用
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  输入有效的图片URL（http:// 或 https://）
                </p>
              </div>

              {config.backgroundImage && (
                <div className="space-y-4">
                  <div>
                    <Label className="block mb-2 font-medium">当前背景图片</Label>
                    {config.backgroundImage.startsWith('data:') ? (
                      <div className="p-3 bg-muted/50 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                          已上传本地图片
                        </p>
                      </div>
                    ) : (
                      <div className="mt-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={config.backgroundImage}
                          alt="背景图片预览"
                          className="max-w-full h-56 object-cover rounded-lg border border-border shadow-sm transition-shadow hover:shadow-md"
                        />
                      </div>
                    )}
                  </div>
                  <div className="pt-2 flex justify-end">
                    <Button variant="destructive" onClick={handleRemoveBackgroundImage}>
                      移除背景图片
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              重置设置
            </CardTitle>
            <CardDescription>恢复所有设置到初始状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                此操作将清除所有配置，包括书签、分组、自定义主题、背景图片等，恢复到初始的默认状态。此操作不可撤销，请谨慎操作。
              </p>
              <div className="pt-2 flex justify-end">
                <Button variant="destructive" onClick={handleResetToDefault}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  恢复默认设置
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}
