'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Bookmark as BookmarkType } from '@/types'
import { getFaviconUrl, formatDate } from '@/lib/utils'
import { Menu, ExternalLink, Edit2, Trash2, LinkIcon } from 'lucide-react'

interface BookmarkItemProps {
  bookmark: BookmarkType
  onEdit: () => void
  onDelete: () => void
  onOpen?: () => void
  searchQuery?: string
  onDragStart?: (e: React.DragEvent, bookmark: BookmarkType) => void
  onDragEnd?: (e: React.DragEvent) => void
}

export function BookmarkItem({
  bookmark,
  onEdit,
  onDelete,
  onOpen,
  searchQuery,
  onDragStart,
  onDragEnd,
}: BookmarkItemProps) {
  const [showMenu, setShowMenu] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const isLongPress = useRef(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    function handleResize() {
      setShowMenu(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowMenu(true)

    // Position menu appropriately
    const menu = document.getElementById(`menu-${bookmark.id}`)
    if (menu && itemRef.current) {
      menu.style.left = `${e.clientX}px`
      menu.style.top = `${e.clientY}px`
    }
  }

  const handleTouchStart = () => {
    isLongPress.current = false
    setShowMenu(false)

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true
      setShowMenu(true)

      // Position menu near the bookmark
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect()
        const menu = document.getElementById(`menu-${bookmark.id}`)
        if (menu) {
          menu.style.left = `${rect.left + rect.width / 2}px`
          menu.style.top = `${rect.bottom}px`
        }
      }
    }, 500)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }

    if (!isLongPress.current) {
      handleClick()
    }
  }

  const handleClick = () => {
    if (onOpen) onOpen()
    window.open(bookmark.url, '_blank')
  }

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="search-highlight">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  const faviconUrl = bookmark.icon || getFaviconUrl(bookmark.url)

  return (
    <>
      <div
        ref={itemRef}
        className="relative group cursor-pointer"
        onContextMenu={handleContextMenu}
        onClick={() => {
          if (!isLongPress.current && !showMenu) handleClick()
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        draggable
        onDragStart={(e) => onDragStart?.(e, bookmark)}
        onDragEnd={onDragEnd}
      >
        <div className="glass-card p-4 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <div className="flex items-start gap-3">
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                className="w-6 h-6 rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            ) : (
              <LinkIcon className="w-6 h-6 text-muted-foreground" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-foreground truncate">
                {bookmark.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {highlightText(bookmark.url, searchQuery || '')}
              </p>
              {bookmark.notes && (
                <p className="text-xs text-muted-foreground mt-2">
                  {highlightText(bookmark.notes, searchQuery || '')}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  访问
                </span>
                <span>{formatDate(bookmark.createdAt)}</span>
              </div>
            </div>
            <button
              className="glass-button p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {showMenu && createPortal(
        <div
          id={`menu-${bookmark.id}`}
          className="fixed z-50 glass-card shadow-2xl w-48"
        >
          <div className="py-2">
            <button
              className="context-menu-item flex items-center gap-3"
              onClick={() => {
                onEdit()
                setShowMenu(false)
              }}
            >
              <Edit2 className="h-4 w-4" />
              编辑
            </button>
            <button
              className="context-menu-item flex items-center gap-3 text-destructive"
              onClick={() => {
                onDelete()
                setShowMenu(false)
              }}
            >
              <Trash2 className="h-4 w-4" />
              删除
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}