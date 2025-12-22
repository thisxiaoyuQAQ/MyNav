'use client'

import React, { useEffect, useState } from 'react'
import { Bookmark, SearchEngine } from '@/types'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getFaviconUrl } from '@/lib/utils'
import { useAppContext } from '@/app/context/AppContext'

interface BookmarkFormProps {
  groupId: string
  bookmark?: Bookmark
  onSave: (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

export function BookmarkForm({ groupId, bookmark, onSave, onCancel }: BookmarkFormProps) {
  const { config } = useAppContext()
  const [formData, setFormData] = useState<Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    url: '',
    notes: '',
  })

  useEffect(() => {
    if (bookmark) {
      setFormData({
        title: bookmark.title,
        url: bookmark.url,
        icon: bookmark.icon,
        notes: bookmark.notes || '',
      })
    }
  }, [bookmark])

  const [errors, setErrors] = useState<{
    title?: string
    url?: string
  }>({})

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    if (!formData.title.trim()) {
      newErrors.title = '请输入书签名称'
    }

    if (!formData.url.trim()) {
      newErrors.url = '请输入URL'
    } else {
      try {
        new URL(formData.url)
      } catch {
        newErrors.url = '请输入有效的URL'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const submitData = {
      ...formData,
      icon: formData.icon || getFaviconUrl(formData.url),
    }

    onSave(submitData)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit()
    }
  }

  const handleUrlBlur = () => {
    if (formData.url && !formData.title) {
      try {
        const url = new URL(formData.url)
        setFormData(prev => ({
          ...prev,
          title: url.hostname.replace('www.', ''),
        }))
      } catch {}
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          名称 <span className="text-destructive">*</span>
        </label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          onKeyDown={handleKeyDown}
          error={errors.title}
          placeholder="输入书签名称"
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          URL <span className="text-destructive">*</span>
        </label>
        <Input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          onBlur={handleUrlBlur}
          onKeyDown={handleKeyDown}
          error={errors.url}
          placeholder="https://example.com"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">备注</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          onKeyDown={handleKeyDown}
          className="glass-input w-full h-20 resize-none"
          placeholder="添加备注（可选）"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleSubmit}
        >
          {bookmark ? '更新' : '添加'}
        </Button>
      </div>
    </div>
  )
}