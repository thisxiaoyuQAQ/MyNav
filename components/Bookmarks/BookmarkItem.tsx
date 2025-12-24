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
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 })
  const itemRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const isLongPress = useRef(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 如果菜单未显示，不处理
      if (!showMenu) return

      // 如果点击的是右键，不处理（由 contextmenu 事件处理）
      if (event.button === 2) return

      // 检查点击是否在菜单内或在卡片内
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        itemRef.current &&
        !itemRef.current.contains(event.target as Node)
      ) {
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
  }, [showMenu])

  // 鼠标离开菜单自动消失
  useEffect(() => {
    if (!showMenu) return

    const checkMouseLeave = () => {
      if (menuRef.current && !menuRef.current.matches(':hover') && !itemRef.current?.matches(':hover')) {
        setShowMenu(false)
      }
    }

    // 每100ms检查一次鼠标位置
    const interval = setInterval(checkMouseLeave, 100)

    return () => clearInterval(interval)
  }, [showMenu])

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()

    // Position menu at cursor position with boundary detection
    const menuWidth = 192
    const menuHeight = 120
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let left = e.clientX
    let top = e.clientY

    // 边界检测：如果右侧空间不足，向左偏移
    if (left + menuWidth > viewportWidth) {
      left = viewportWidth - menuWidth - 10
    }

    // 边界检测：如果下方空间不足，向上偏移
    if (top + menuHeight > viewportHeight) {
      top = viewportHeight - menuHeight - 10
    }

    // 边界检测：确保不会超出左边界
    if (left < 0) {
      left = 10
    }

    // 边界检测：确保不会超出上边界
    if (top < 0) {
      top = 10
    }

    setMenuPosition({
      left,
      top
    })

    setShowMenu(true)
  }

  const handleTouchStart = () => {
    isLongPress.current = false
    setShowMenu(false)

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true
      setShowMenu(true)

      // Position menu near the bookmark with boundary detection
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect()
        const menuWidth = 192
        const menuHeight = 120
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let left = rect.left + rect.width / 2 - menuWidth / 2
        let top = rect.bottom

        // 边界检测
        if (left + menuWidth > viewportWidth) {
          left = viewportWidth - menuWidth - 10
        }
        if (left < 0) {
          left = 10
        }
        if (top + menuHeight > viewportHeight) {
          top = rect.top - menuHeight - 4
        }
        if (top < 0) {
          top = 10
        }

        setMenuPosition({
          left,
          top
        })
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

  const handleMenuButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const menuWidth = 192
    const menuHeight = 120
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // 计算理想的菜单位置（按钮正下方）
    let left = rect.left
    let top = rect.bottom + 4 // 4px 间距

    // 边界检测：如果右侧空间不足，将菜单向左偏移
    if (rect.left + menuWidth > viewportWidth) {
      left = rect.right - menuWidth
    }

    // 边界检测：如果下方空间不足，将菜单显示在按钮上方
    if (top + menuHeight > viewportHeight) {
      top = rect.top - menuHeight - 4
    }

    // 边界检测：确保不会超出左边界
    if (left < 0) {
      left = 10
    }

    // 边界检测：确保不会超出上边界
    if (top < 0) {
      top = 10
    }

    setMenuPosition({
      left,
      top
    })

    setShowMenu(!showMenu)
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
    return string.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')
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
              onClick={handleMenuButtonClick}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {showMenu && createPortal(
        <div
          ref={menuRef}
          className="fixed z-50 glass-card shadow-2xl w-48 rounded-xl overflow-hidden"
          style={{
            left: menuPosition.left,
            top: menuPosition.top,
          }}
        >
          <div className="py-1">
            <button
              className="context-menu-item flex items-center gap-3 w-full text-left"
              onClick={() => {
                onEdit()
                setShowMenu(false)
              }}
            >
              <Edit2 className="h-4 w-4" />
              编辑
            </button>
            <div className="h-px bg-border my-1"></div>
            <button
              className="context-menu-item flex items-center gap-3 text-destructive w-full text-left"
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
