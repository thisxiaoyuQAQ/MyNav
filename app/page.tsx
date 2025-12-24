'use client'

import { useState, useMemo } from 'react'
import { SearchBar } from '@/components/Search/SearchBar'
import { BookmarkGroup } from '@/components/Bookmarks/BookmarkGroup'
import { ImportExport } from '@/components/Settings/ImportExport'
import { SettingsPanel } from '@/components/Settings/SettingsPanel'
import { BookmarkForm } from '@/components/Forms/BookmarkForm'
import { GroupForm } from '@/components/Forms/GroupForm'
import { Modal } from '@/components/ui/Modal'
import { Bookmark, BookmarkGroup as BookmarkGroupType } from '@/types'
import { useAppContext } from '@/app/context/AppContext'
import { Plus, Search as SearchIcon, Settings, GripVertical, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Home() {
  const {
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
  } = useAppContext()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [editingBookmark, setEditingBookmark] = useState<{
    groupId: string
    bookmark: Bookmark | null
  } | null>(null)
  const [showGroupForm, setShowGroupForm] = useState(false)
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showBookmarkManager, setShowBookmarkManager] = useState(false)

  const filteredGroups = useMemo(() => {
    let groups = [...config.groups].sort((a, b) => a.order - b.order)

    // 如果选中了分组，先过滤分组
    if (selectedGroupId) {
      groups = groups.filter(group => group.id === selectedGroupId)
    }

    // 如果有搜索词，在分组内过滤书签
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      groups = groups
        .map((group) => ({
          ...group,
          bookmarks: group.bookmarks.filter(
            (bookmark) =>
              bookmark.title.toLowerCase().includes(query) ||
              bookmark.url.toLowerCase().includes(query) ||
              (bookmark.notes && bookmark.notes.toLowerCase().includes(query))
          ),
        }))
        .filter((group) => group.bookmarks.length > 0)
    }

    return groups
  }, [config.groups, selectedGroupId, searchQuery])

  const handleAddBookmark = (groupId: string) => {
    setEditingBookmark({ groupId, bookmark: null })
  }

  const handleEditBookmark = (groupId: string, bookmark: Bookmark) => {
    setEditingBookmark({ groupId, bookmark })
  }

  const handleBookmarkSave = (bookmarkData: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingBookmark) {
      if (editingBookmark.bookmark) {
        updateBookmark(editingBookmark.groupId, editingBookmark.bookmark.id, bookmarkData)
      } else {
        addBookmark(editingBookmark.groupId, bookmarkData)
      }
      setEditingBookmark(null)
    }
  }

  const handleAddGroup = () => {
    setEditingGroupId(null)
    setShowGroupForm(true)
  }

  const handleEditGroup = (groupId: string) => {
    setEditingGroupId(groupId)
    setShowGroupForm(true)
  }

  const handleGroupSave = (name: string) => {
    if (editingGroupId) {
      updateGroup(editingGroupId, name)
    } else {
      addGroup(name)
    }
    setShowGroupForm(false)
    setEditingGroupId(null)
  }

  const hasContent = config.groups.some((group) => group.bookmarks.length > 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      {/* Header */}
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          suppressHydrationWarning
        >
          {config.heroTitle}
        </h1>
        <p className="text-muted-foreground" suppressHydrationWarning>
          {config.heroDescription}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          engines={config.searchEngines}
          selectedEngine={config.selectedSearchEngine}
          onEngineChange={(engineId) =>
            updateConfig({ ...config, selectedSearchEngine: engineId })
          }
        />
      </div>

      {/* Quick Search */}
      <div className="mb-6 flex gap-3">
        <div className="flex-1">
          <Input
            icon={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="在书签中搜索（名称、URL、备注）"
          />
        </div>
        <Button onClick={handleAddGroup} variant="secondary">
          <Plus className="h-4 w-4" />
          添加分组
        </Button>
        <Button onClick={() => setShowSettings(true)} variant="ghost">
          设置
        </Button>
      </div>

      {/* Group Tabs */}
      {config.groups.length > 0 && (
        <div className="mb-6 border-b border-border overflow-x-auto">
          <div className="flex space-x-1 min-w-max pb-2 items-center">
            <button
              onClick={() => setSelectedGroupId(null)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedGroupId === null
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              全部 ({config.groups.reduce((acc, g) => acc + g.bookmarks.length, 0)})
            </button>
            {config.groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  selectedGroupId === group.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {group.name} ({group.bookmarks.length})
              </button>
            ))}
            <Button
              onClick={() => setShowBookmarkManager(true)}
              variant="ghost"
              size="sm"
              className="ml-auto px-3 py-2 text-sm"
            >
              <Settings className="h-4 w-4 mr-1" />
              管理书签
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {hasContent || searchQuery ? (
        <div className="space-y-6">
          {filteredGroups.map((group) => (
            <BookmarkGroup
              key={group.id}
              group={group}
              searchQuery={searchQuery}
              onEditBookmark={handleEditBookmark}
              onDeleteBookmark={deleteBookmark}
              onEditGroup={(id, name) => updateGroup(id, name)}
              onDeleteGroup={deleteGroup}
              onAddBookmark={handleAddBookmark}
              onMoveGroup={moveGroup}
              allGroups={config.groups}
            />
          ))}

          {filteredGroups.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <SearchIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">没有找到匹配的书签</h3>
              <p className="text-muted-foreground">尝试使用其他关键词搜索</p>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center">
            <Plus className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">开始使用 MyNav</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            创建您的第一个书签分组，开始组织您的常用网站
          </p>
          <div className="space-x-3">
            <Button size="lg" onClick={handleAddGroup}>
              <Plus className="h-5 w-5" />
              添加分组
            </Button>
            <Button size="lg" variant="ghost" onClick={() => setShowSettings(true)}>
              导入配置
            </Button>
          </div>
        </div>
      )}

      {/* Bookmarks Modal */}
      <Modal
        open={editingBookmark !== null}
        onClose={() => setEditingBookmark(null)}
        title={editingBookmark?.bookmark ? '编辑书签' : '添加书签'}
      >
        {editingBookmark && (
          <BookmarkForm
            groupId={editingBookmark.groupId}
            bookmark={editingBookmark.bookmark || undefined}
            onSave={handleBookmarkSave}
            onCancel={() => setEditingBookmark(null)}
          />
        )}
      </Modal>

      {/* Group Modal */}
      <Modal
        open={showGroupForm}
        onClose={() => {
          setShowGroupForm(false)
          setEditingGroupId(null)
        }}
        title={editingGroupId ? '编辑分组' : '添加分组'}
      >
        <GroupForm
          initialName={
            editingGroupId
              ? config.groups.find((g) => g.id === editingGroupId)?.name || ''
              : ''
          }
          existingNames={config.groups.map((g) => g.name)}
          onSave={handleGroupSave}
          onCancel={() => {
            setShowGroupForm(false)
            setEditingGroupId(null)
          }}
        />
      </Modal>

      {/* Settings Modal */}
      <Modal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        title="设置"
      >
        <div className="space-y-6">
          {/* Settings Panel */}
          <div>
            <h3 className="text-lg font-medium mb-3">自定义设置</h3>
            <SettingsPanel onClose={() => setShowSettings(false)} />
          </div>

          {/* Import/Export */}
          <div>
            <h3 className="text-lg font-medium mb-3">备份与恢复</h3>
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">导入/导出配置</h4>
                  <p className="text-sm text-muted-foreground">
                    备份当前配置或恢复之前的配置
                  </p>
                </div>
              </div>
              <ImportExport config={config} onImport={importConfig} />
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-medium mb-3">关于</h3>
            <div className="glass-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">MyNav v{config.version}</h4>
                  <p className="text-sm text-muted-foreground">
                    一个简洁优雅的个人浏览器导航页面
                  </p>
                </div>
                <Button
                  onClick={() =>
                    window.open('https://github.com/yourusername/mynav', '_blank')
                  }
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-lg font-medium mb-3">统计信息</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card p-3 text-center">
                <div className="text-2xl font-bold text-primary">
                  {config.groups.length}
                </div>
                <div className="text-sm text-muted-foreground">分组</div>
              </div>
              <div className="glass-card p-3 text-center">
                <div className="text-2xl font-bold text-primary">
                  {config.groups.reduce((acc, group) => acc + group.bookmarks.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">书签</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Bookmark Manager Modal */}
      <Modal
        open={showBookmarkManager}
        onClose={() => setShowBookmarkManager(false)}
        title="管理书签顺序"
      >
        <BookmarkManager
          groups={config.groups}
          onMoveBookmark={moveBookmark}
          onEditBookmark={(groupId, bookmark) => {
            setEditingBookmark({ groupId, bookmark })
            setShowBookmarkManager(false)
          }}
          onDeleteBookmark={deleteBookmark}
          onClose={() => setShowBookmarkManager(false)}
        />
      </Modal>
    </div>
  )
}

// Bookmark Manager Component
function BookmarkManager({
  groups,
  onMoveBookmark,
  onEditBookmark,
  onDeleteBookmark,
  onClose,
}: {
  groups: BookmarkGroupType[]
  onMoveBookmark: (fromGroupId: string, toGroupId: string, bookmarkId: string, newIndex?: number) => void
  onEditBookmark: (groupId: string, bookmark: Bookmark) => void
  onDeleteBookmark: (groupId: string, bookmarkId: string) => void
  onClose: () => void
}) {
  const [selectedGroup, setSelectedGroup] = useState<string>(groups[0]?.id || '')

  // 获取当前选中分组的书签
  const currentGroup = groups.find(g => g.id === selectedGroup)
  const bookmarks = currentGroup?.bookmarks || []

  // 移动书签到另一个分组
  const moveToGroup = (bookmarkId: string, targetGroupId: string, index: number) => {
    onMoveBookmark(selectedGroup, targetGroupId, bookmarkId, index)
  }

  // 在当前分组内移动顺序
  const moveBookmarkOrder = (bookmarkId: string, direction: 'up' | 'down') => {
    const currentIndex = bookmarks.findIndex(b => b.id === bookmarkId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= bookmarks.length) return

    // 先删除，再插入
    const bookmark = bookmarks[currentIndex]
    const newBookmarks = [...bookmarks]
    newBookmarks.splice(currentIndex, 1)
    newBookmarks.splice(newIndex, 0, bookmark)

    // 通过 moveBookmark 实现：删除后重新插入
    onMoveBookmark(selectedGroup, selectedGroup, bookmarkId, newIndex)
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        暂无分组，请先创建分组
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 分组选择 */}
      <div className="flex gap-2 flex-wrap">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedGroup(group.id)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              selectedGroup === group.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>

      {/* 书签列表 */}
      <div className="border rounded-lg overflow-hidden">
        {bookmarks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            该分组暂无书签
          </div>
        ) : (
          <div className="divide-y">
            {bookmarks.map((bookmark, index) => (
              <div key={bookmark.id} className="flex items-center gap-2 p-3 hover:bg-muted/50">
                {/* 拖拽手柄和序号 */}
                <div className="flex flex-col items-center gap-1 w-8">
                  <span className="text-xs text-muted-foreground">{index + 1}</span>
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>

                {/* 书签信息 */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{bookmark.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{bookmark.url}</div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center gap-1">
                  {/* 上移 */}
                  {index > 0 && (
                    <button
                      onClick={() => moveBookmarkOrder(bookmark.id, 'up')}
                      className="p-1.5 hover:bg-muted rounded"
                      title="上移"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                  )}

                  {/* 下移 */}
                  {index < bookmarks.length - 1 && (
                    <button
                      onClick={() => moveBookmarkOrder(bookmark.id, 'down')}
                      className="p-1.5 hover:bg-muted rounded"
                      title="下移"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  )}

                  {/* 移动到其他分组 */}
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        // 移动到目标分组的末尾
                        moveToGroup(bookmark.id, e.target.value, groups.find(g => g.id === e.target.value)?.bookmarks.length || 0)
                        // 重置选择
                        e.target.value = ''
                      }
                    }}
                    className="text-xs p-1.5 border rounded bg-background"
                    defaultValue=""
                  >
                    <option value="">移动到...</option>
                    {groups
                      .filter(g => g.id !== selectedGroup)
                      .map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                  </select>

                  {/* 编辑 */}
                  <button
                    onClick={() => onEditBookmark(selectedGroup, bookmark)}
                    className="p-1.5 hover:bg-muted rounded text-blue-600"
                    title="编辑"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  {/* 删除 */}
                  <button
                    onClick={() => {
                      if (confirm(`确定要删除书签 "${bookmark.title}" 吗？`)) {
                        onDeleteBookmark(selectedGroup, bookmark.id)
                      }
                    }}
                    className="p-1.5 hover:bg-muted rounded text-destructive"
                    title="删除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          关闭
        </Button>
      </div>
    </div>
  )
}
