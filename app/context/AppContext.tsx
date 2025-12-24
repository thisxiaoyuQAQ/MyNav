'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { AppContextType, AppConfig, Bookmark, BookmarkGroup } from '@/types'
import { DEFAULT_SEARCH_ENGINES } from '@/lib/searchEngines'
import { generateId } from '@/lib/utils'

const DEFAULT_CONFIG: AppConfig = {
  version: '1.0.0',
  selectedSearchEngine: 'google',
  searchEngines: DEFAULT_SEARCH_ENGINES,
  groups: [],
  theme: 'system',
  pageTitle: 'MyNav - Personal Browser Navigation',
  pageDescription: 'A beautiful and lightweight personal browser navigation page',
  heroTitle: 'MyNav',
  heroDescription: '您的个人浏览器导航中心',
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

interface AppProviderProps {
  children: React.ReactNode
  initialConfig?: AppConfig
}

export function AppProvider({ children, initialConfig }: AppProviderProps) {
  // Always start with the same default config on both server and client
  const [config, setConfig] = React.useState<AppConfig>(initialConfig || DEFAULT_CONFIG)

  // Load from localStorage after mount to avoid hydration mismatch
  React.useEffect(() => {
    const saved = localStorage.getItem('my-nav-config')
    if (saved) {
      // Safety check: if saved data is too large, don't even try to parse it
      if (saved.length > 5000000) {
        console.warn('Saved config is too large, clearing it.')
        localStorage.removeItem('my-nav-config')
        return
      }
      try {
        const parsed = JSON.parse(saved)
        setConfig(prev => ({ ...prev, ...parsed }))
      } catch {
        localStorage.removeItem('my-nav-config')
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const configString = JSON.stringify(config)
        // Check if the data is too large before attempting to save
        if (configString.length > 4500000) { // ~4.5MB, leaving buffer for 5MB limit
          console.warn('Config too large for localStorage, skipping save. Consider reducing icon sizes or notes.')
          return
        }
        localStorage.setItem('my-nav-config', configString)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          console.error('localStorage quota exceeded. Config not saved.')
          // Optionally notify user here
        } else {
          console.error('Failed to save config:', error)
        }
      }
    }
  }, [config])

  const updateConfig = (newConfig: AppConfig) => {
    setConfig(newConfig)
  }

  const addBookmark = (groupId: string, bookmarkData: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => {
    setConfig(prev => {
      const newGroups = prev.groups.map(group => {
        if (group.id === groupId) {
          const newBookmark: Bookmark = {
            ...bookmarkData,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          return {
            ...group,
            bookmarks: [...group.bookmarks, newBookmark],
            updatedAt: new Date().toISOString(),
          }
        }
        return group
      })
      return { ...prev, groups: newGroups }
    })
  }

  const updateBookmark = (groupId: string, bookmarkId: string, updates: Partial<Bookmark>) => {
    setConfig(prev => {
      const newGroups = prev.groups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            bookmarks: group.bookmarks.map(bookmark => {
              if (bookmark.id === bookmarkId) {
                return {
                  ...bookmark,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              }
              return bookmark
            }),
            updatedAt: new Date().toISOString(),
          }
        }
        return group
      })
      return { ...prev, groups: newGroups }
    })
  }

  const deleteBookmark = (groupId: string, bookmarkId: string) => {
    setConfig(prev => {
      const newGroups = prev.groups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            bookmarks: group.bookmarks.filter(b => b.id !== bookmarkId),
            updatedAt: new Date().toISOString(),
          }
        }
        return group
      })
      return { ...prev, groups: newGroups }
    })
  }

  const addGroup = (name: string) => {
    setConfig(prev => {
      const newGroup: BookmarkGroup = {
        id: generateId(),
        name,
        bookmarks: [],
        order: prev.groups.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return { ...prev, groups: [...prev.groups, newGroup] }
    })
  }

  const updateGroup = (groupId: string, name: string) => {
    setConfig(prev => {
      const newGroups = prev.groups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            name,
            updatedAt: new Date().toISOString(),
          }
        }
        return group
      })
      return { ...prev, groups: newGroups }
    })
  }

  const deleteGroup = (groupId: string) => {
    setConfig(prev => {
      return { ...prev, groups: prev.groups.filter(g => g.id !== groupId) }
    })
  }

  const moveBookmark = (fromGroupId: string, toGroupId: string, bookmarkId: string, newIndex?: number) => {
    setConfig(prev => {
      let movedBookmark: Bookmark | null = null

      const newGroups = prev.groups.map(group => {
        if (group.id === fromGroupId) {
          movedBookmark = group.bookmarks.find(b => b.id === bookmarkId) || null
          return {
            ...group,
            bookmarks: group.bookmarks.filter(b => b.id !== bookmarkId),
            updatedAt: new Date().toISOString(),
          }
        }
        return group
      })

      if (movedBookmark) {
        const targetIndex = newGroups.findIndex(g => g.id === toGroupId)
        if (targetIndex !== -1) {
          const bookmarks = [...newGroups[targetIndex].bookmarks]
          if (newIndex !== undefined && newIndex >= 0 && newIndex <= bookmarks.length) {
            bookmarks.splice(newIndex, 0, movedBookmark)
          } else {
            bookmarks.push(movedBookmark)
          }
          newGroups[targetIndex] = {
            ...newGroups[targetIndex],
            bookmarks,
            updatedAt: new Date().toISOString(),
          }
        }
      }

      return { ...prev, groups: newGroups }
    })
  }

  const moveGroup = (groupId: string, newIndex: number | 'up' | 'down') => {
    setConfig(prev => {
      const groupIndex = prev.groups.findIndex(g => g.id === groupId)
      if (groupIndex === -1) return prev

      const newGroups = [...prev.groups]
      const [movedGroup] = newGroups.splice(groupIndex, 1)

      let targetIndex: number

      if (newIndex === 'up') {
        targetIndex = Math.max(0, groupIndex - 1)
      } else if (newIndex === 'down') {
        targetIndex = Math.min(newGroups.length, groupIndex + 1)
      } else {
        targetIndex = newIndex as number
      }

      const clampedIndex = Math.max(0, Math.min(targetIndex, newGroups.length))
      newGroups.splice(clampedIndex, 0, movedGroup)

      // 更新所有分组的 order 字段
      const updatedGroups = newGroups.map((group, index) => ({
        ...group,
        order: index,
        updatedAt: group.id === groupId ? new Date().toISOString() : group.updatedAt,
      }))

      return { ...prev, groups: updatedGroups }
    })
  }

  const importConfig = (newConfig: AppConfig) => {
    setConfig(newConfig)
  }

  const exportConfig = (): AppConfig => {
    return config
  }

  const resetToDefault = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('my-nav-config')
    }
    setConfig(DEFAULT_CONFIG)
  }

  const value: AppContextType = {
    config,
    updateConfig,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    addGroup,
    updateGroup,
    deleteGroup,
    moveBookmark,
    moveGroup,
    importConfig,
    exportConfig,
    resetToDefault,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
