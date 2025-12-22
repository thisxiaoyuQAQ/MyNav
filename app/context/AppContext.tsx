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
  const [config, setConfig] = React.useState<AppConfig>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('my-nav-config') : null
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return { ...DEFAULT_CONFIG, ...parsed }
      } catch {
        return initialConfig || DEFAULT_CONFIG
      }
    }
    return initialConfig || DEFAULT_CONFIG
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('my-nav-config', JSON.stringify(config))
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

  const moveGroup = (groupId: string, newIndex: number) => {
    setConfig(prev => {
      const groupIndex = prev.groups.findIndex(g => g.id === groupId)
      if (groupIndex === -1) return prev

      const newGroups = [...prev.groups]
      const [movedGroup] = newGroups.splice(groupIndex, 1)

      const clampedIndex = Math.max(0, Math.min(newIndex, newGroups.length))
      newGroups.splice(clampedIndex, 0, movedGroup)

      return { ...prev, groups: newGroups }
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
