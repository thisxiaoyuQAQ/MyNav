'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { BookmarkGroup as BookmarkGroupType, Bookmark } from '@/types'
import { BookmarkItem } from './BookmarkItem'
import { Card, CardContent } from '@/components/ui/Card'
import { Plus, Edit2, Trash2, MoreVertical, GripVertical, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAppContext } from '@/app/context/AppContext'

interface BookmarkGroupProps {
  group: BookmarkGroupType
  searchQuery?: string
  onEditBookmark: (groupId: string, bookmark: Bookmark) => void
  onDeleteBookmark: (groupId: string, bookmarkId: string) => void
  onEditGroup: (groupId: string, name: string) => void
  onDeleteGroup: (groupId: string) => void
  onAddBookmark: (groupId: string) => void
  onMoveGroup: (groupId: string, newIndex: number | 'up' | 'down') => void
  allGroups?: BookmarkGroupType[]
}

export function BookmarkGroup({
  group,
  searchQuery,
  onEditBookmark,
  onDeleteBookmark,
  onEditGroup,
  onDeleteGroup,
  onAddBookmark,
  onMoveGroup,
  allGroups = [],
}: BookmarkGroupProps) {
  const { moveBookmark } = useAppContext()
  const [showGroupMenu, setShowGroupMenu] = useState(false)
  const [editingGroup, setEditingGroup] = useState(false)
  const [groupName, setGroupName] = useState(group.name)
  const [isDragOver, setIsDragOver] = useState(false)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 })
  const [isDraggingGroup, setIsDraggingGroup] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  // 滚动相关的 ref
  const scrollInterval = useRef<NodeJS.Timeout | null>(null)
  const isAutoScrolling = useRef(false)
  const isDragging = useRef(false) // 标记是否正在拖拽

  useEffect(() => {
    setPortalContainer(document.body)
  }, [])

  // 全局 dragend 事件监听 - 修复松手后不停止滚动的问题
  useEffect(() => {
    const handleGlobalDragEnd = () => {
      isDragging.current = false
      stopAutoScroll()
    }

    document.addEventListener('dragend', handleGlobalDragEnd)
    return () => document.removeEventListener('dragend', handleGlobalDragEnd)
  }, [])

  // 滚轮事件处理 - 支持拖拽时用滚轮滚动
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 只在拖拽时响应滚轮
      if (!isDragging.current) return

      e.preventDefault()
      e.stopPropagation()

      // 根据滚轮方向滚动 - 使用即时滚动而不是 smooth
      const scrollAmount = e.deltaY > 0 ? 100 : -100
      window.scrollBy(0, scrollAmount)
    }

    document.addEventListener('wheel', handleWheel, { passive: false })
    return () => document.removeEventListener('wheel', handleWheel)
  }, [])

  // 停止自动滚动
  const stopAutoScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current)
      scrollInterval.current = null
    }
    isAutoScrolling.current = false
  }

  // 启动自动滚动
  const startAutoScroll = (direction: 'up' | 'down') => {
    if (isAutoScrolling.current) return

    isAutoScrolling.current = true
    scrollInterval.current = setInterval(() => {
      const scrollAmount = direction === 'up' ? -50 : 50
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' })
    }, 50)
  }

  // 根据鼠标位置计算是否需要滚动
  const handleAutoScroll = (clientY: number) => {
    const scrollThreshold = 100 // 距离屏幕边缘多少像素时开始滚动
    const viewportHeight = window.innerHeight

    // 鼠标靠近顶部，向上滚动
    if (clientY < scrollThreshold) {
      startAutoScroll('up')
    }
    // 鼠标靠近底部，向下滚动
    else if (clientY > viewportHeight - scrollThreshold) {
      startAutoScroll('down')
    }
    // 鼠标在中间区域，停止滚动
    else {
      stopAutoScroll()
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 如果菜单未显示，不处理
      if (!showGroupMenu) return

      // 如果点击的是右键，不处理（由 contextmenu 事件处理）
      if (event.button === 2) return

      // 检查点击是否在菜单内或在 header 内
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setShowGroupMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showGroupMenu])

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

    // 右键菜单位置计算
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

    setShowGroupMenu(true)
  }

  const handleMenuButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const menuWidth = 192 // 48rem * 4 = 192px (w-48)
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
    const menuHeight = 120 // 估算的菜单高度
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

    setShowGroupMenu(!showGroupMenu)
  }

  // 分组拖拽处理 - 使用 moveGroup 函数
  const handleGroupDragStart = (e: React.DragEvent) => {
    e.stopPropagation()
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', group.id)
    setIsDraggingGroup(true)
    isDragging.current = true
  }

  const handleGroupDragEnd = (e: React.DragEvent) => {
    e.stopPropagation()
    setIsDraggingGroup(false)
    isDragging.current = false
    stopAutoScroll()
  }

  const handleGroupDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    handleAutoScroll(e.clientY)
  }

  const handleGroupDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isDragging.current = false
    stopAutoScroll()

    const draggedGroupId = e.dataTransfer.getData('text/plain')
    if (!draggedGroupId || draggedGroupId === group.id) return

    // 找到被拖拽分组的当前索引
    const draggedIndex = allGroups.findIndex(g => g.id === draggedGroupId)
    if (draggedIndex === -1) return

    // 找到目标分组的当前索引
    const targetIndex = allGroups.findIndex(g => g.id === group.id)
    if (targetIndex === -1) return

    // 如果拖拽到自身位置，不处理
    if (draggedIndex === targetIndex) return

    // 计算拖拽位置：根据鼠标在分组中的位置决定插入位置
    const rect = groupRef.current?.getBoundingClientRect()
    if (rect) {
      const relativeY = e.clientY - rect.top
      const isTopHalf = relativeY < rect.height / 2

      // 如果拖拽到上半部分，且是从下方拖拽上来的，目标位置需要调整
      // 如果拖拽到下半部分，且是从上方拖拽下来的，目标位置需要调整
      let newIndex = targetIndex
      if (draggedIndex < targetIndex) {
        // 从上往下拖拽
        newIndex = isTopHalf ? targetIndex - 1 : targetIndex
      } else {
        // 从下往上拖拽
        newIndex = isTopHalf ? targetIndex : targetIndex + 1
      }

      // 边界检查
      newIndex = Math.max(0, Math.min(newIndex, allGroups.length - 1))

      onMoveGroup(draggedGroupId, newIndex)
    } else {
      // 如果无法获取位置，使用默认逻辑
      onMoveGroup(draggedGroupId, targetIndex)
    }
  }

  // 鼠标离开菜单自动消失
  useEffect(() => {
    if (!showGroupMenu) return

    const checkMouseLeave = () => {
      if (menuRef.current && !menuRef.current.matches(':hover') && !headerRef.current?.matches(':hover')) {
        setShowGroupMenu(false)
      }
    }

    // 每100ms检查一次鼠标位置
    const interval = setInterval(checkMouseLeave, 100)

    return () => clearInterval(interval)
  }, [showGroupMenu])

  const handleDragStart = (e: React.DragEvent, bookmark: Bookmark) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', JSON.stringify({
      bookmark,
      fromGroupId: group.id
    }))
    isDragging.current = true
  }

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragOver(false)
    isDragging.current = false
    stopAutoScroll()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
    handleAutoScroll(e.clientY)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget === e.target) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    isDragging.current = false
    stopAutoScroll()

    if (!contentRef.current) return

    const data = e.dataTransfer.getData('text/plain')

    // 检查是否是分组拖拽（纯文本 ID）还是书签拖拽（JSON）
    if (data.startsWith('{')) {
      // 书签拖拽
      try {
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
    // 如果是分组拖拽，handleGroupDrop 会处理，这里不需要做任何事
  }

  return (
    <div
      className="mb-6 group"
      ref={groupRef}
      onDragOver={handleGroupDragOver}
      onDrop={handleGroupDrop}
    >
      <Card className={`border border-border ${isDraggingGroup ? 'opacity-50' : ''}`}>
        <div
          ref={headerRef}
          className="flex items-center justify-between p-4 border-b border-border cursor-move"
          onContextMenu={handleContextMenu}
          draggable
          onDragStart={handleGroupDragStart}
          onDragEnd={handleGroupDragEnd}
        >
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
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
          </div>

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
                onClick={handleMenuButtonClick}
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

      {showGroupMenu && portalContainer && allGroups.length > 0 &&
        createPortal(
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
                  setEditingGroup(true)
                  setShowGroupMenu(false)
                }}
              >
                <Edit2 className="h-4 w-4" />
                重命名分组
              </button>

              {/* 排序选项 */}
              {allGroups.length > 1 && (() => {
                const currentIndex = allGroups.findIndex(g => g.id === group.id)
                const canMoveUp = currentIndex > 0
                const canMoveDown = currentIndex < allGroups.length - 1

                return (
                  <>
                    {canMoveUp && (
                      <button
                        className="context-menu-item flex items-center gap-3 w-full text-left"
                        onClick={() => {
                          onMoveGroup(group.id, 'up')
                          setShowGroupMenu(false)
                        }}
                      >
                        <ArrowUp className="h-4 w-4" />
                        上移
                      </button>
                    )}
                    {canMoveDown && (
                      <button
                        className="context-menu-item flex items-center gap-3 w-full text-left"
                        onClick={() => {
                          onMoveGroup(group.id, 'down')
                          setShowGroupMenu(false)
                        }}
                      >
                        <ArrowDown className="h-4 w-4" />
                        下移
                      </button>
                    )}
                    {(canMoveUp || canMoveDown) && <div className="h-px bg-border my-1"></div>}
                  </>
                )
              })()}

              <button
                className="context-menu-item flex items-center gap-3 text-destructive w-full text-left"
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
