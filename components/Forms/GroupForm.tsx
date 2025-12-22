'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface GroupFormProps {
  initialName?: string
  onSave: (name: string) => void
  onCancel: () => void
  existingNames?: string[]
}

export function GroupForm({ initialName = '', onSave, onCancel, existingNames = [] }: GroupFormProps) {
  const [name, setName] = useState(initialName)
  const [error, setError] = useState('')

  useEffect(() => {
    setName(initialName)
  }, [initialName])

  const validateName = (value: string): string => {
    const trimmed = value.trim()
    if (!trimmed) {
      return '请输入分组名称'
    }
    if (trimmed.length > 50) {
      return '名称不能超过50个字符'
    }
    if (existingNames.includes(trimmed) && trimmed !== initialName) {
      return '该名称已存在'
    }
    return ''
  }

  const handleSubmit = () => {
    const validationError = validateName(name)
    if (validationError) {
      setError(validationError)
      return
    }

    onSave(name.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          分组名称 <span className="text-destructive">*</span>
        </label>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError(validateName(e.target.value))
          }}
          onKeyDown={handleKeyDown}
          error={error}
          placeholder="输入分组名称"
          autoFocus
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
          {initialName ? '更新' : '创建'}
        </Button>
      </div>
    </div>
  )
}