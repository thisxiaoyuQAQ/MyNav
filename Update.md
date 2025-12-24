# MyNav 更新日志

## 2024-12-24 16:30 - 拖拽滚动优化和管理功能增强

### 新增功能

#### 1. 拖拽时页面自动滚动
- **位置**: `components/Bookmarks/BookmarkGroup.tsx`
- **功能**:
  - 鼠标靠近屏幕边缘（100px）时自动向上/向下滚动
  - 拖拽时支持鼠标滚轮手动滚动
  - 松手后立即停止滚动（通过全局 dragend 监听器）

#### 2. 管理书签按钮
- **位置**: `app/page.tsx` - 分组标签栏末尾
- **功能**: 打开管理模态框

#### 3. 管理模态框 (BookmarkManager 组件)
- **位置**: `app/page.tsx`
- **功能**: 双标签页管理界面

**分组管理标签页：**
- 查看所有分组列表（带序号和手柄图标）
- 上移/下移分组顺序
- 重命名分组（使用 prompt）
- 删除分组（带确认提示）

**书签管理标签页：**
- 分组切换按钮
- 查看当前分组的书签列表
- 上移/下移书签顺序
- 移动书签到其他分组
- 编辑书签（跳转到编辑表单）
- 删除书签（带确认提示）

### 技术实现

#### BookmarkGroup.tsx 修改
```typescript
// 新增滚动状态管理
const scrollInterval = useRef<NodeJS.Timeout | null>(null)
const isAutoScrolling = useRef(false)
const isDragging = useRef(false)

// 全局 dragend 监听 - 修复松手后不停止滚动
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
    if (!isDragging.current) return
    e.preventDefault()
    e.stopPropagation()
    const scrollAmount = e.deltaY > 0 ? 100 : -100
    window.scrollBy(0, scrollAmount)
  }
  document.addEventListener('wheel', handleWheel, { passive: false })
  return () => document.removeEventListener('wheel', handleWheel)
}, [])

// 自动滚动函数
const handleAutoScroll = (clientY: number) => {
  const scrollThreshold = 100
  const viewportHeight = window.innerHeight
  if (clientY < scrollThreshold) {
    startAutoScroll('up')
  } else if (clientY > viewportHeight - scrollThreshold) {
    startAutoScroll('down')
  } else {
    stopAutoScroll()
  }
}
```

#### page.tsx 修改
- 新增 `showBookmarkManager` 状态
- 在分组标签栏添加"管理书签"按钮
- 新增 BookmarkManager 组件（约 280 行代码）

### 修复的问题

1. **松手后不停止滚动的 Bug**
   - 通过全局 `dragend` 事件监听器修复
   - 确保任何拖拽结束都停止滚动

2. **滚轮无法滚动的问题**
   - 移除 `behavior: 'smooth'` 参数
   - 使用即时滚动 `window.scrollBy(0, scrollAmount)`
   - 添加 `e.stopPropagation()` 防止事件冲突

### 文件修改清单

| 文件 | 修改内容 |
|------|---------|
| `components/Bookmarks/BookmarkGroup.tsx` | 添加滚动功能（约 40 行） |
| `app/page.tsx` | 添加管理按钮和 BookmarkManager 组件（约 300 行） |
| `app/context/AppContext.tsx` | 无修改（已存在所需函数） |
| `types/index.ts` | 无修改（已存在所需类型） |

### 功能对照表

| 功能 | 位置 | 状态 |
|------|------|------|
| 鼠标靠近边缘自动滚动 | 拖拽时 | ✅ |
| 滚轮手动滚动 | 拖拽时 | ✅ |
| 松手停止滚动 | 全局 | ✅ |
| 分组排序（拖拽） | 分组标题 | ✅ |
| 分组排序（菜单） | 三点菜单 | ✅ |
| 分组管理（上移/下移） | 管理模态框 | ✅ |
| 分组管理（重命名） | 管理模态框 | ✅ |
| 分组管理（删除） | 管理模态框 | ✅ |
| 书签管理（上移/下移） | 管理模态框 | ✅ |
| 书签管理（跨分组移动） | 管理模态框 | ✅ |
| 书签管理（编辑） | 管理模态框 | ✅ |
| 书签管理（删除） | 管理模态框 | ✅ |

### 构建状态
✅ TypeScript 检查通过
✅ 构建成功
✅ 无错误或警告
