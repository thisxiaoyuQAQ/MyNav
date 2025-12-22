'use client'

import { useState, useRef, useEffect } from 'react'

type DraggableType = 'bookmark' | 'group'

interface DragState {
  type: DraggableType
  id: string
  groupId?: string // For bookmarks
  index?: number // Original index
}

interface DropTarget {
  type: DraggableType
  id: string
  groupId?: string // For bookmarks
  index?: number // Target index
}

export function useDragAndDrop() {
  const [dragState, setDragState] = useState<DragState | null>(null)
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const onDragStart = (state: DragState) => (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', JSON.stringify(state))
    setDragState(state)
    setIsDragging(true)

    // Add visual feedback
    e.currentTarget.classList.add('opacity-50')
  }

  const onDragOver = (target: DropTarget) => (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDropTarget(target)

    // Visual feedback
    e.currentTarget.classList.add('border-primary', 'border-2')
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-primary', 'border-2')
    setDropTarget(null)
  }

  const onDrop = (target: DropTarget, onDropCallback: (source: DragState, target: DropTarget) => void) => (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove('border-primary', 'border-2')

    if (!dragState || !isValidDrop(dragState, target)) return

    onDropCallback(dragState, target)
    resetDragState()
  }

  const onDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50')
    resetDragState()
  }

  const resetDragState = () => {
    setDragState(null)
    setDropTarget(null)
    setIsDragging(false)

    // Clean up any visual states
    document.querySelectorAll('.border-primary').forEach(el => {
      el.classList.remove('border-primary', 'border-2')
    })
    document.querySelectorAll('.opacity-50').forEach(el => {
      el.classList.remove('opacity-50')
    })
  }

  const isValidDrop = (source: DragState, target: DropTarget): boolean => {
    // Can't drop on self
    if (source.type === target.type && source.id === target.id) return false

    // Bookmarks can be moved between groups
    if (source.type === 'bookmark' && target.type === 'group') return true

    // Groups can be reordered
    if (source.type === 'group' && target.type === 'group') return true

    // Bookmarks can be reordered within group
    if (source.type === 'bookmark' && target.type === 'bookmark' && source.groupId === target.groupId) return true

    return false
  }

  // Auto reset if drag is cancelled (e.g., ESC key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetDragState()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    isDragging,
    dragState,
    dropTarget,
    resetDragState,
  }
}
