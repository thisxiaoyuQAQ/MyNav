'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { BookmarkGroup as BookmarkGroupType, Bookmark } from '@/types'
import { BookmarkItem } from './BookmarkItem'
import { Card, CardContent } from '@/components/ui/Card'
import { Plus, Edit2, Trash2, MoreVertical, ChevronDown, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { useAppContext } from '@/app/context/AppContext'

interface BookmarkGroupProps {
  group: BookmarkGroupType
  searchQuery?: string
  onEditBookmark: (groupId: string, bookmark: Bookmark) => void
  onDeleteBookmark: (groupId: string, bookmarkId: string) => void
  onEditGroup: (groupId: string, name: string) => void
  onDeleteGroup: (groupId: string) => void
  onAddBookmark: (groupId: string) => void
  isDragging?: boolean
}

export function BookmarkGroup({
  group,
  searchQuery,
  onEditBookmark,
  onDeleteBookmark,
  onEditGroup,
  onDeleteGroup,
  onAddBookmark,
  isDragging = false,
}: BookmarkGroupProps) {
  const { moveBookmark } = useAppContext()
  const [showGroupMenu, setShowGroupMenu] = useState(false)
  const [editingGroup, setEditingGroup] = useState(false)
  const [groupName, setGroupName] = useState(group.name)
  const [isDragOver, setIsDragOver] = useState(false)
  const [draggedBookmark, setDraggedBookmark] = useState<Bookmark | null>(null)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPortalContainer(document.body)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        headerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setShowGroupMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredBookmarks = searchQuery
    ? group.bookmarks.filter((bookmark) => {
        const query = searchQuery.toLowerCase()
        return (
          bookmark.title.toLowerCase().includes(query) ||
          bookmark.url.toLowerCase().includes(query) ||
          (bookmark.notes && bookmark.notes.toLowerCase().includes(query))
        )
      })
    : group.bookmarks

  const handleSaveGroupName = () => {
    if (groupName.trim() && groupName !== group.name) {
      onEditGroup(group.id, groupName.trim())
    }
    setEditingGroup(false)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowGroupMenu(true)
  }

  const handleDragStart = (e: React.DragEvent, bookmark: Bookmark) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', JSON.stringify({
      bookmark,
      fromGroupId: group.id
    }))
    setDraggedBookmark(bookmark)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedBookmark(null)
    setIsDragOver(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget === e.target) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    if (!contentRef.current) return

    try {
      const data = e.dataTransfer.getData('text/plain')
      const { bookmark: bookmarkToMove, fromGroupId } = JSON.parse(data)

      const container = contentRef.current
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const cols = getComputedStyle(container).gridTemplateColumns.split(' ').length
      const cellWidth = rect.width / cols
      const cellHeight = 100

      const colIndex = Math.floor(x / cellWidth)
      const rowIndex = Math.floor(y / cellHeight)

      const newIndex = rowIndex * cols + colIndex
      const clampedIndex = Math.max(0, Math.min(newIndex, filteredBookmarks.length))

      moveBookmark(
        fromGroupId || '',
        group.id,
        bookmarkToMove.id,
        clampedIndex
      )
    } catch (error) {
      console.error('Failed to parse dragged bookmark data:', error)
    }
  }

  return (
    <div className="mb-6 group">
      <Card className="border border-border">
        <div
          ref={headerRef}
          className="flex items-center justify-between p-4 border-b border-border"
          onContextMenu={handleContextMenu}
        >
          {editingGroup ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveGroupName()
                  } else if (e.key === 'Escape') {
                    setGroupName(group.name)
                    setEditingGroup(false)
                  }
                }}
                autoFocus
                className="flex-1"
              />
              <Button size="sm" onClick={handleSaveGroupName}>
                保存
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setGroupName(group.name)
                  setEditingGroup(false)
                }}
              >
                取消
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 flex-1">
              <h2 className="text-xl font-semibold">{group.name}</h2>
              <span className="text-sm text-muted-foreground">
                ({filteredBookmarks.length})
              </span>
            </div>
          )}

          {!editingGroup && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onAddBookmark(group.id)}
                className="p-2"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowGroupMenu(!showGroupMenu)}
                className="p-2"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <CardContent className="p-0">
          <div
            ref={contentRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4 transition-colors ${
              isDragOver ? 'bg-muted/50 ring-2 ring-ring' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="relative"
              >
                <BookmarkItem
                  bookmark={bookmark}
                  onEdit={() => onEditBookmark(group.id, bookmark)}
                  onDelete={() => onDeleteBookmark(group.id, bookmark.id)}
                  searchQuery={searchQuery}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              </div>
            ))}
          </div>

          {filteredBookmarks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-6 w-6" />
              </div>
              <p>{searchQuery ? '没有找到匹配的书签' : '暂无书签'}</p>
              {!searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddBookmark(group.id)}
                  className="mt-2"
                >
                  添加书签
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {showGroupMenu && portalContainer &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-50 glass-card shadow-2xl w-48"
            style={{
              left: headerRef.current?.getBoundingClientRect().left,
              top: headerRef.current?.getBoundingClientRect().bottom,
            }}
          >
            <div className="py-2">
              <button
                className="context-menu-item flex items-center gap-3"
                onClick={() => {
                  setEditingGroup(true)
                  setShowGroupMenu(false)
                }}
              >
                <Edit2 className="h-4 w-4" />
                重命名分组
              </button>
              <button
                className="context-menu-item flex items-center gap-3 text-destructive"
                onClick={() => {
                  if (confirm('确定要删除这个分组吗？分组内的所有书签也将被删除。')) {
                    onDeleteGroup(group.id)
                  }
                  setShowGroupMenu(false)
                }}
              >
                <Trash2 className="h-4 w-4" />
                删除分组
              </button>
            </div>
          </div>,
          portalContainer
        )}

    </div>
  )
}