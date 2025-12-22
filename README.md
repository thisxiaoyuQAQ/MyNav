# MyNav - 个人浏览器导航页面

MyNav 是一个简洁、优雅且功能强大的个人浏览器导航页面，基于 Next.js 和 React 构建。它提供了智能搜索、书签管理、自定义主题等丰富的功能，帮助您快速访问常用网站和管理书签。

## ✨ 功能特性

### 🎯 智能搜索
- 支持 Google、Bing、百度、DuckDuckGo 等多种搜索引擎
- 智能识别 URL，在地址栏中输入网址可直接访问
- 支持 IP 地址和本地地址（如 localhost）的直接访问
- 实时切换搜索引擎

### 📚 书签管理
- 分组管理书签，支持添加、编辑、删除分组
- 拖放式书签排序，支持跨组移动书签
- 书签搜索功能，可按标题、URL 和备注搜索
- 支持自定义书签图标（自动获取网站 favicon）
- 为书签添加备注信息

### 🎨 个性化定制
- 自定义页面标题、描述和主标题
- 自定义背景图片
- 自定义主题颜色
- 浅色/深色主题切换

### 🔧 高级功能
- **导入导出**：支持 JSON 格式的配置导入导出，方便备份和迁移
- **响应式设计**：完美适配桌面端和移动端
- **触摸优化**：支持长按菜单，适用于移动设备
- **右键菜单**：丰富的右键菜单操作
- **统计信息**：显示分组和书签数量统计

### 🚀 其他特性
- 本地存储保存配置，无需后端
- 流畅的动画效果和交互体验
- 清晰的视觉层次和排版设计
- 完整的 TypeScript 类型支持

## 🛠️ 技术栈

- **框架**：Next.js 16.0.1（React 19）
- **语言**：TypeScript 5.7.2
- **样式**：Tailwind CSS 3.4.16
- **UI 组件**：自定义组件 + Lucide React 图标
- **构建工具**：ESLint + PostCSS

## 📁 项目结构

```
MyNav/
├── app/                          # Next.js 13+ App Router
│   ├── context/
│   │   └── AppContext.tsx       # 全局状态管理上下文
│   ├── layout.tsx               # 根布局组件
│   └── page.tsx                 # 主页组件
├── components/                   # React 组件
│   ├── Bookmarks/               # 书签相关组件
│   │   ├── BookmarkGroup.tsx   # 书签分组组件
│   │   └── BookmarkItem.tsx    # 书签项组件
│   ├── Forms/                   # 表单组件
│   │   ├── BookmarkForm.tsx    # 书签表单
│   │   └── GroupForm.tsx       # 分组表单
│   ├── Search/                  # 搜索相关组件
│   │   ├── SearchBar.tsx       # 搜索栏组件
│   │   └── SearchEngineSelector.tsx # 搜索引擎选择器
│   ├── Settings/                # 设置相关组件
│   │   ├── SettingsPanel.tsx   # 设置面板
│   │   ├── ImportExport.tsx    # 导入导出组件
│   │   └── BookmarkImporter.tsx # 书签导入器
│   └── ui/                      # 通用 UI 组件
│       ├── Button.tsx          # 按钮
│       ├── Card.tsx            # 卡片
│       ├── Input.tsx           # 输入框
│       ├── Modal.tsx           # 模态框
│       ├── ConfirmDialog.tsx   # 确认对话框
│       ├── Dropdown.tsx        # 下拉菜单
│       └── Label.tsx           # 标签
├── lib/                         # 工具库
│   ├── searchEngines.ts        # 搜索引擎配置
│   ├── theme.ts                # 主题相关工具
│   └── utils.ts                # 通用工具函数
├── types/                       # TypeScript 类型定义
│   └── index.ts                # 所有类型定义
├── hooks/                       # 自定义 React Hooks
│   └── useDragAndDrop.ts       # 拖放 Hook（预留）
├── public/                      # 静态资源（如需要）
├── .env.local                   # 环境变量配置
├── tailwind.config.ts           # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 项目依赖
```

## 🚀 快速开始

### 前置要求

- Node.js 16.8 或更高版本
- npm、yarn、pnpm 或 bun 包管理器

### 安装步骤

1. **克隆项目**

```bash
git clone <repository-url>
cd MyNav
```

2. **安装依赖**

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. **启动开发服务器**

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

4. **构建生产版本**

```bash
npm run build
npm run start
```

## 💻 代码模块说明

### 核心模块

#### 1. 状态管理（AppContext）

**文件**：`app/context/AppContext.tsx`

负责全局状态管理，包括：
- 配置数据的加载和保存（localStorage）
- 书签和分组的 CRUD 操作
- 数据导入导出
- 重置为默认配置

**主要函数**：
- `addBookmark`: 添加书签
- `updateBookmark`: 更新书签
- `deleteBookmark`: 删除书签
- `addGroup`: 添加分组
- `updateGroup`: 更新分组
- `deleteGroup`: 删除分组
- `moveBookmark`: 移动书签（跨组）
- `moveGroup`: 移动分组（排序）
- `importConfig`: 导入配置
- `exportConfig`: 导出配置
- `resetToDefault`: 重置配置

#### 2. 主页面（Home）

**文件**：`app/page.tsx`

主页面组件，负责：
- 页面布局和组织
- 搜索功能（筛选书签）
- 分组标签页导航
- 模态框管理（书签、分组、设置）
- 空状态处理

#### 3. 搜索模块（SearchBar）

**文件**：`components/Search/SearchBar.tsx`

智能搜索栏，功能包括：
- 搜索引擎切换
- URL 智能识别
- 表单提交处理
- 自动补全（预留）

**支持的 URL 格式**：
- 带协议：http://、https://
- 域名格式：example.com、www.example.com
- IP 地址：192.168.1.1、127.0.0.1:8080
- 本地地址：localhost、localhost:3000

#### 4. 书签模块

##### BookmarkGroup（书签分组）

**文件**：`components/Bookmarks/BookmarkGroup.tsx`

管理整个分组，包括：
- 分组标题和元信息
- 上下文菜单（右键菜单）
- 拖放区域处理
- 分组嵌套书签显示

**拖放逻辑**：
- 计算拖放位置的网格坐标
- 支持书签在分组内重排序
- 支持跨组移动书签

##### BookmarkItem（书签项）

**文件**：`components/Bookmarks/BookmarkItem.tsx`

单个书签组件，包括：
- 网站图标显示（自动获取 favicon）
- 文本高亮（搜索匹配）
- 上下文菜单
- 长按支持（移动设备）

**交互特性**：
- 左键/触摸：打开链接
- 右键/长按：显示菜单
- 拖拽：移动书签

#### 5. 设置模块

##### SettingsPanel（设置面板）

**文件**：`components/Settings/SettingsPanel.tsx`

页面自定义设置，包括：
- 基础信息设置（标题、描述）
- 主题颜色选择
- 背景图片上传/设置
- 重置功能

##### ImportExport（导入导出）

**文件**：`components/Settings/ImportExport.tsx`

数据备份和恢复：
- 导出当前配置为 JSON 文件
- 导入 JSON 配置文件
- 文件读取和解析

#### 6. 工具库（lib）

##### utils.ts

**文件**：`lib/utils.ts`

通用工具函数：
- `cn`: CSS 类名合并
- `generateId`: 生成唯一 ID
- `getFaviconUrl`: 获取网站 favicon
- `formatDate`: 格式化日期显示
- `downloadFile`: 文件下载
- `uploadFile`: 文件上传
- `useMounted`: 客户端挂载 Hook

##### searchEngines.ts

**文件**：`lib/searchEngines.ts`

搜索引擎配置：
- 默认搜索引擎列表
- 搜索 URL 模板
- 搜索 URL 生成函数

支持的默认搜索引擎：
- Google
- Bing
- 百度
- DuckDuckGo

##### theme.ts

**文件**：`lib/theme.ts`

主题相关工具：
- RGB 到 Hex 转换
- Hex 到 RGB 转换
- 颜色验证

#### 7. 类型定义（types/index.ts）

**文件**：`types/index.ts`

所有 TypeScript 接口和类型：
- `SearchEngine`: 搜索引擎接口
- `Bookmark`: 书签接口
- `BookmarkGroup`: 书签分组接口
- `AppConfig`: 应用配置接口
- `AppContextType`: 上下文类型接口

#### 8. UI 组件

所有 UI 组件都在 `components/ui/` 目录下：

- **Button**: 按钮组件，支持多种样式变体
- **Card**: 卡片组件，用于内容容器
- **Input**: 输入框组件，支持图标和标签
- **Modal**: 模态框组件，支持动画和遮罩
- **ConfirmDialog**: 确认对话框
- **Dropdown**: 下拉菜单组件
- **Label**: 标签组件

## 🎨 样式和主题

项目使用 Tailwind CSS 进行样式管理，主要特点：

### 自定义样式

在 `tailwind.config.ts` 中定义：

- 自定义颜色变量
- 玻璃拟态效果（glass-effect）
- 上下文菜单样式（context-menu）
- 搜索高亮（search-highlight）
- 响应式断点

### 主题系统

支持三种主题模式：
- `light`: 浅色主题
- `dark`: 深色主题
- `system`: 跟随系统设置

主题颜色可自定义，支持 RGB 格式。

## 🔌 数据持久化

应用使用 localStorage 进行数据持久化：

```typescript
// 配置键值
localStorage.setItem('my-nav-config', JSON.stringify(config))
```

持久化数据包括：
- 所有书签和分组信息
- 搜索引擎配置
- 主题设置
- 自定义标题和描述
- 背景图片 URL

## ♿ 可访问性

- 语义化的 HTML 结构
- ARIA 标签支持
- 键盘导航支持
- 高对比度模式
- 响应式设计

## 🚀 部署

项目可以轻松部署到各种平台：

### 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPOSITORY_URL)

### 其他平台

- **Netlify**: 支持静态部署
- **GitHub Pages**: 支持静态导出
- **Docker**: 可自行构建 Docker 镜像

## 🤝 贡献

欢迎贡献代码、提出建议或报告问题！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 📝 开发计划

- [ ] 添加搜索引擎自定义功能（自定义 URL）
- [ ] 支持标签页嵌套
- [ ] 添加书签收藏/置顶功能
- [ ] 支持多主题预设
- [ ] 添加书签访问统计
- [ ] 支持云端同步（可选）
- [ ] 添加浏览器扩展支持
- [ ] 支持批量导入/导出
- [ ] 添加更多排序选项
- [ ] 支持动态壁纸

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 💡 常见问题

### Q: 数据存储在哪里？

A: 所有数据都存储在浏览器的 localStorage 中，不会上传到服务器。

### Q: 如何备份我的书签？

A: 使用设置中的"导入/导出"功能，可以导出当前配置为 JSON 文件。

### Q: 支持多少书签？

A: 受 localStorage 浏览器限制，通常支持数千个书签。

### Q: 是否支持移动设备？

A: 完全支持！采用响应式设计，并对触摸操作进行了优化。

## 📞 联系方式

如有问题或建议，请通过以下方式联系我们：

- 项目地址：[GitHub Repository](https://github.com/yourusername/mynav)
- 问题反馈：[Issues](https://github.com/yourusername/mynav/issues)
- 邮件：your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
