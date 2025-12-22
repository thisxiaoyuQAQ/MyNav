'use client'

import React from 'react'
import { SearchEngine } from '@/types'
import { Dropdown } from '@/components/ui/Dropdown'
import { DEFAULT_SEARCH_ENGINES, getSearchUrl } from '@/lib/searchEngines'

interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface SearchEngineSelectorProps {
  engines: SearchEngine[]
  selectedEngine: string
  onChange: (engineId: string) => void
  className?: string
}

export function SearchEngineSelector({
  engines,
  selectedEngine,
  onChange,
  className,
}: SearchEngineSelectorProps) {
  const defaultOptions: DropdownOption[] = DEFAULT_SEARCH_ENGINES.map(e => ({
    value: e.id,
    label: e.name,
    icon: <span className="text-lg">{e.icon}</span>
  }))

  const customOptions: DropdownOption[] = engines
    .filter(e => e.isCustom)
    .map(e => ({
      value: e.id,
      label: e.name,
      icon: <span className="text-lg">{e.icon}</span>
    }))

  const options: DropdownOption[] = [...defaultOptions, ...customOptions]

  return (
    <Dropdown
      options={options}
      value={selectedEngine}
      onChange={onChange}
      className={className}
      placeholder="选择搜索引擎"
    />
  )
}
