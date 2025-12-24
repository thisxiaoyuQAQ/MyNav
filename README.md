# 🚀 MyNav - 你的个人导航中心

<div align="center">

![MyNav](https://img.shields.io/badge/MyNav-v1.0.0-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.16-06B6D4?style=flat-square&logo=tailwindcss)

一个现代化、优雅且功能强大的个人浏览器导航页面 ✨

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [使用指南](#-使用指南) • [技术栈](#-技术栈) • [贡献指南](#-贡献指南)

</div>

---

## 🌟 为什么选择 MyNav？

**MyNav** 是一个基于 Next.js 16 + React 19 + TypeScript 构建的现代化个人导航中心，它将你的所有重要链接、书签和搜索引擎整合在一个优雅的界面中。

### 🎯 核心优势

- ✨ **极致美观**：现代化的 UI 设计，支持玻璃拟态效果
- 🎨 **完全可定制**：自定义标题、描述、主题颜色、背景图片
- 📱 **响应式设计**：完美适配桌面、平板和移动设备
- 🔄 **数据持久化**：所有数据保存在本地，无需服务器
- 📦 **导入导出**：轻松备份和恢复你的配置
- ⚡ **极速搜索**：智能搜索书签标题、URL 和备注
- 🎯 **拖拽排序**：直观的拖放操作体验

## ✨ 功能特性

### 📚 书签管理
- ✅ 创建、编辑、删除书签
- ✅ 书签分组管理
- ✅ 智能搜索和过滤
- ✅ 自动获取网站图标 (favicon)
- ✅ 支持书签备注
- ✅ 拖拽排序（分组内 & 跨组）

### 🔍 搜索引擎
- ✅ 内置主流搜索引擎 (Google, Bing, 百度, DuckDuckGo)
- ✅ 一键切换搜索引擎
- ✅ 智能 URL 识别 (支持 http://, https://, 域名, IP 地址等)
- ✅ 自定义搜索引擎支持

### 🎨 个性化设置
- ✅ 自定义页面标题和描述
- ✅ 自定义 Hero 区域文案
- ✅ 主题颜色选择
- ✅ 背景图片设置
- ✅ 浅色/深色/系统主题
- ✅ 一键重置

### 💾 数据管理
- ✅ 自动保存到 localStorage
- ✅ JSON 格式导入/导出
- ✅ 数据验证和错误处理
- ✅ 安全的存储限制检查

## 🚀 快速开始

### 前置要求

- Node.js 16.8+
- npm / yarn / pnpm / bun

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/yourusername/mynav.git
cd MyNav
```

2. **安装依赖**
```bash
npm install
# 或
pnpm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **打开浏览器**
访问 [http://localhost:3000](http://localhost:3000)

### 生产构建

```bash
npm run build
npm run start
```

## 📖 使用指南

### 添加书签

1. 点击"添加分组"创建分类（如：工作、学习、娱乐）
2. 在分组卡片中点击"➕"按钮
3. 填写书签信息：
   - **标题**：网站名称
   - **URL**：网站地址 (支持多种格式)
   - **图标**：可选的自定义图标 URL
   - **备注**：可选的描述信息

### 搜索书签

- 在搜索框中输入关键词
- 实时过滤匹配的书签
- 支持搜索标题、URL 和备注

### 数据备份

1. 点击右上角"设置"
2. 在"备份与恢复"部分
3. 点击"导出配置"下载 JSON 文件
4. 如需恢复，点击"导入配置"选择文件

### 自定义主题

1. 打开设置面板
2. 修改以下选项：
   - 页面标题和描述
   - Hero 区域文案
   - 主题颜色 (RGB 格式)
   - 背景图片 URL
3. 点击"保存"应用更改

## 🛠️ 技术栈

### 核心框架
- **Next.js 16.0.1** - React 19 框架
- **React 19.0.0** - UI 库
- **TypeScript 5.7.2** - 类型安全

### 样式与 UI
- **Tailwind CSS 3.4.16** - 实用优先的 CSS 框架
- **Lucide React** - 精美的图标库
- **自定义组件** - 从零构建的 UI 组件

### 工具与配置
- **ESLint 9** - 代码质量检查
- **PostCSS** - CSS 处理
- **localStorage** - 数据持久化

## 📁 项目结构

```
MyNav/
├── app/                          # Next.js App Router
│   ├── context/
│   │   └── AppContext.tsx       # 全局状态管理
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 主页组件
├── components/                   # React 组件
│   ├── Bookmarks/               # 书签相关
│   │   ├── BookmarkGroup.tsx
│   │   └── BookmarkItem.tsx
│   ├── Forms/                   # 表单组件
│   │   ├── BookmarkForm.tsx
│   │   └── GroupForm.tsx
│   ├── Search/                  # 搜索功能
│   │   ├── SearchBar.tsx
│   │   └── SearchEngineSelector.tsx
│   ├── Settings/                # 设置面板
│   │   ├── SettingsPanel.tsx
│   │   ├── ImportExport.tsx
│   │   └── BookmarkImporter.tsx
│   └── ui/                      # 通用 UI 组件
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Input.tsx
│       └── ...
├── lib/                         # 工具库
│   ├── searchEngines.ts        # 搜索引擎配置
│   ├── theme.ts                # 主题工具
│   └── utils.ts                # 通用工具
├── types/                       # TypeScript 类型
│   └── index.ts
├── hooks/                       # 自定义 Hooks
│   └── useDragAndDrop.ts
└── public/                      # 静态资源
```

## 🔧 核心模块详解

### 1. 状态管理 (AppContext)

**位置**: `app/context/AppContext.tsx`

负责所有数据的管理和持久化：
- 📥 加载/保存到 localStorage
- ➕ CRUD 操作 (书签 & 分组)
- 🔄 导入/导出配置
- 🎨 主题管理
- 📊 数据验证

**主要 API**:
```typescript
// 书签操作
addBookmark(groupId, bookmarkData)
updateBookmark(groupId, bookmarkId, updates)
deleteBookmark(groupId, bookmarkId)

// 分组操作
addGroup(name)
updateGroup(groupId, name)
deleteGroup(groupId)

// 数据管理
importConfig(config)
exportConfig()
resetToDefault()
```

### 2. 搜索模块

**位置**: `components/Search/SearchBar.tsx`

智能搜索功能：
- 🔍 实时过滤
- 🎯 URL 智能识别
- 🌐 搜索引擎切换

**支持的 URL 格式**:
- `http://example.com`
- `https://example.com`
- `example.com`
- `www.example.com`
- `192.168.1.1`
- `localhost:3000`

### 3. 书签组件

#### BookmarkGroup (分组容器)
- 📦 管理整个分组
- 🎯 拖放区域处理
- 📋 上下文菜单
- 🏷️ 分组标签页

#### BookmarkItem (单个书签)
- 🌐 自动获取 favicon
- 🔍 搜索高亮
- 📱 长按支持
- 🖱️ 右键菜单

### 4. UI 组件库

所有组件都在 `components/ui/` 目录下：

| 组件 | 功能 |
|------|------|
| `Button` | 多种样式变体的按钮 |
| `Modal` | 带动画的模态框 |
| `Input` | 支持图标的输入框 |
| `Card` | 内容容器卡片 |
| `Dropdown` | 下拉菜单 |
| `ConfirmDialog` | 确认对话框 |

## 🎨 主题系统

### 颜色配置

项目使用 CSS 变量定义主题，支持自定义：

```typescript
// tailwind.config.ts
colors: {
  primary: 'hsl(var(--primary))',
  // ... 其他颜色
}
```

### 主题模式

- **Light** ☀️ - 浅色主题
- **Dark** 🌙 - 深色主题
- **System** 💻 - 跟随系统设置

### 自定义主题颜色

在设置中输入 RGB 值：
```typescript
{
  r: 59,  // 0-255
  g: 130,
  b: 246
}
```

## 📊 数据持久化

### 存储格式

所有数据保存在 `localStorage` 的 `my-nav-config` 键中：

```json
{
  "version": "1.0.0",
  "selectedSearchEngine": "google",
  "searchEngines": [...],
  "groups": [...],
  "theme": "system",
  "heroTitle": "MyNav",
  "heroDescription": "您的个人浏览器导航中心",
  "themeColor": { "r": 59, "g": 130, "b": 246 }
}
```

### 存储限制

- ⚠️ 最大 5MB
- ⚠️ 超过限制会自动阻止保存
- ✅ 保存前会进行大小检查

## 🔍 故障排除

### 常见问题

**Q: 数据没有保存？**
- 检查浏览器是否启用了 localStorage
- 查看控制台是否有错误信息
- 确认数据大小未超过 5MB 限制

**Q: 拖拽不工作？**
- 确保在支持的浏览器中使用
- 检查是否有 JavaScript 错误

**Q: 导入失败？**
- 确认 JSON 文件格式正确
- 检查文件是否损坏

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request
---

<div align="center">

**Made with ❤️ by [Your Name]**

[![Star on GitHub](https://img.shields.io/github/stars/thisxiaoyuQAQ/MyNav?style=social)](https://github.com/thisxiaoyuQAQ/MyNav)

</div>
