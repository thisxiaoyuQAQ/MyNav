// 搜索引擎
export interface SearchEngine {
  id: string;
  name: string;
  url: string;
  icon: string;
  isCustom?: boolean;
}

// 书签
export interface Bookmark {
  id: string;
  title: string;
  url: string;
  icon?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// 书签分组
export interface BookmarkGroup {
  id: string;
  name: string;
  bookmarks: Bookmark[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

// 应用配置
export interface AppConfig {
  version: string;
  selectedSearchEngine: string;
  searchEngines: SearchEngine[];
  groups: BookmarkGroup[];
  theme: 'light' | 'dark' | 'system';
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  heroDescription: string;
  backgroundImage?: string;
  themeColor?: {
    r: number;
    g: number;
    b: number;
  };
}

// Context 类型
export interface AppContextType {
  config: AppConfig;
  updateConfig: (config: AppConfig) => void;
  addBookmark: (groupId: string, bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBookmark: (groupId: string, bookmarkId: string, updates: Partial<Bookmark>) => void;
  deleteBookmark: (groupId: string, bookmarkId: string) => void;
  addGroup: (name: string) => void;
  updateGroup: (groupId: string, name: string) => void;
  deleteGroup: (groupId: string) => void;
  moveBookmark: (fromGroupId: string, toGroupId: string, bookmarkId: string, newIndex?: number) => void;
  moveGroup: (groupId: string, newIndex: number | 'up' | 'down') => void;
  importConfig: (config: AppConfig) => void;
  exportConfig: () => AppConfig;
  resetToDefault: () => void;
}
