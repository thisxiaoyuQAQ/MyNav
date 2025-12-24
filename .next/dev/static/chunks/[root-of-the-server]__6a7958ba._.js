(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[next]/internal/font/google/inter_5972bc34.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_5972bc34-module__OU16Qa__className",
});
}),
"[next]/internal/font/google/inter_5972bc34.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5972bc34.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/lib/searchEngines.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_SEARCH_ENGINES",
    ()=>DEFAULT_SEARCH_ENGINES,
    "getSearchUrl",
    ()=>getSearchUrl
]);
const DEFAULT_SEARCH_ENGINES = [
    {
        id: 'google',
        name: 'Google',
        url: 'https://www.google.com/search?q={query}',
        icon: '🔍'
    },
    {
        id: 'bing',
        name: 'Bing',
        url: 'https://www.bing.com/search?q={query}',
        icon: '🔎'
    },
    {
        id: 'baidu',
        name: '百度',
        url: 'https://www.baidu.com/s?wd={query}',
        icon: '度'
    },
    {
        id: 'duckduckgo',
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q={query}',
        icon: '🦆'
    }
];
function getSearchUrl(engine, query) {
    return engine.url.replace('{query}', encodeURIComponent(query));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "downloadFile",
    ()=>downloadFile,
    "escapeRegExp",
    ()=>escapeRegExp,
    "formatDate",
    ()=>formatDate,
    "generateId",
    ()=>generateId,
    "getFaviconUrl",
    ()=>getFaviconUrl,
    "uploadFile",
    ()=>uploadFile,
    "useMounted",
    ()=>useMounted
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function cn(...inputs) {
    const classes = inputs.filter(Boolean).map((input)=>{
        if (typeof input === 'string' || typeof input === 'number') {
            return String(input);
        }
        if (typeof input === 'object' && input !== null) {
            return Object.entries(input).filter(([, value])=>Boolean(value)).map(([key])=>key).join(' ');
        }
        return '';
    }).join(' ');
    return classes.replace(/\s+/g, ' ').trim();
}
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function getFaviconUrl(url) {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch  {
        return '';
    }
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    if (days < 7) return `${days} 天前`;
    if (days < 30) return `${Math.floor(days / 7)} 周前`;
    return date.toLocaleDateString('zh-CN');
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function downloadFile(filename, content) {
    const blob = new Blob([
        content
    ], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
function uploadFile(accept = '.json') {
    return new Promise((resolve, reject)=>{
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = accept;
        input.onchange = (e)=>{
            const file = e.target.files?.[0];
            if (!file) {
                reject(new Error('No file selected'));
                return;
            }
            const reader = new FileReader();
            reader.onload = (event)=>{
                resolve(String(event.target?.result || ''));
            };
            reader.onerror = ()=>reject(new Error('Failed to read file'));
            reader.readAsText(file);
        };
        input.click();
    });
}
function useMounted() {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMounted.useEffect": ()=>{
            setMounted(true);
        }
    }["useMounted.useEffect"], []);
    return mounted;
}
_s(useMounted, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/context/AppContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useAppContext",
    ()=>useAppContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$searchEngines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/searchEngines.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const DEFAULT_CONFIG = {
    version: '1.0.0',
    selectedSearchEngine: 'google',
    searchEngines: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$searchEngines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SEARCH_ENGINES"],
    groups: [],
    theme: 'system',
    pageTitle: 'MyNav - Personal Browser Navigation',
    pageDescription: 'A beautiful and lightweight personal browser navigation page',
    heroTitle: 'MyNav',
    heroDescription: '您的个人浏览器导航中心'
};
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useAppContext() {
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
_s(useAppContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function AppProvider({ children, initialConfig }) {
    _s1();
    const [config, setConfig] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        "AppProvider.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const saved = localStorage.getItem('my-nav-config');
            if (saved) {
                // Safety check: if saved data is too large, don't even try to parse it
                if (saved.length > 5000000) {
                    console.warn('Saved config is too large, clearing it.');
                    localStorage.removeItem('my-nav-config');
                    return initialConfig || DEFAULT_CONFIG;
                }
                try {
                    const parsed = JSON.parse(saved);
                    return {
                        ...DEFAULT_CONFIG,
                        ...parsed
                    };
                } catch  {
                    localStorage.removeItem('my-nav-config');
                    return initialConfig || DEFAULT_CONFIG;
                }
            }
            return initialConfig || DEFAULT_CONFIG;
        }
    }["AppProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    const configString = JSON.stringify(config);
                    // Check if the data is too large before attempting to save
                    if (configString.length > 4500000) {
                        console.warn('Config too large for localStorage, skipping save. Consider reducing icon sizes or notes.');
                        return;
                    }
                    localStorage.setItem('my-nav-config', configString);
                } catch (error) {
                    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                        console.error('localStorage quota exceeded. Config not saved.');
                    // Optionally notify user here
                    } else {
                        console.error('Failed to save config:', error);
                    }
                }
            }
        }
    }["AppProvider.useEffect"], [
        config
    ]);
    const updateConfig = (newConfig)=>{
        setConfig(newConfig);
    };
    const addBookmark = (groupId, bookmarkData)=>{
        setConfig((prev)=>{
            const newGroups = prev.groups.map((group)=>{
                if (group.id === groupId) {
                    const newBookmark = {
                        ...bookmarkData,
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])(),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    return {
                        ...group,
                        bookmarks: [
                            ...group.bookmarks,
                            newBookmark
                        ],
                        updatedAt: new Date().toISOString()
                    };
                }
                return group;
            });
            return {
                ...prev,
                groups: newGroups
            };
        });
    };
    const updateBookmark = (groupId, bookmarkId, updates)=>{
        setConfig((prev)=>{
            const newGroups = prev.groups.map((group)=>{
                if (group.id === groupId) {
                    return {
                        ...group,
                        bookmarks: group.bookmarks.map((bookmark)=>{
                            if (bookmark.id === bookmarkId) {
                                return {
                                    ...bookmark,
                                    ...updates,
                                    updatedAt: new Date().toISOString()
                                };
                            }
                            return bookmark;
                        }),
                        updatedAt: new Date().toISOString()
                    };
                }
                return group;
            });
            return {
                ...prev,
                groups: newGroups
            };
        });
    };
    const deleteBookmark = (groupId, bookmarkId)=>{
        setConfig((prev)=>{
            const newGroups = prev.groups.map((group)=>{
                if (group.id === groupId) {
                    return {
                        ...group,
                        bookmarks: group.bookmarks.filter((b)=>b.id !== bookmarkId),
                        updatedAt: new Date().toISOString()
                    };
                }
                return group;
            });
            return {
                ...prev,
                groups: newGroups
            };
        });
    };
    const addGroup = (name)=>{
        setConfig((prev)=>{
            const newGroup = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])(),
                name,
                bookmarks: [],
                order: prev.groups.length,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            return {
                ...prev,
                groups: [
                    ...prev.groups,
                    newGroup
                ]
            };
        });
    };
    const updateGroup = (groupId, name)=>{
        setConfig((prev)=>{
            const newGroups = prev.groups.map((group)=>{
                if (group.id === groupId) {
                    return {
                        ...group,
                        name,
                        updatedAt: new Date().toISOString()
                    };
                }
                return group;
            });
            return {
                ...prev,
                groups: newGroups
            };
        });
    };
    const deleteGroup = (groupId)=>{
        setConfig((prev)=>{
            return {
                ...prev,
                groups: prev.groups.filter((g)=>g.id !== groupId)
            };
        });
    };
    const moveBookmark = (fromGroupId, toGroupId, bookmarkId, newIndex)=>{
        setConfig((prev)=>{
            let movedBookmark = null;
            const newGroups = prev.groups.map((group)=>{
                if (group.id === fromGroupId) {
                    movedBookmark = group.bookmarks.find((b)=>b.id === bookmarkId) || null;
                    return {
                        ...group,
                        bookmarks: group.bookmarks.filter((b)=>b.id !== bookmarkId),
                        updatedAt: new Date().toISOString()
                    };
                }
                return group;
            });
            if (movedBookmark) {
                const targetIndex = newGroups.findIndex((g)=>g.id === toGroupId);
                if (targetIndex !== -1) {
                    const bookmarks = [
                        ...newGroups[targetIndex].bookmarks
                    ];
                    if (newIndex !== undefined && newIndex >= 0 && newIndex <= bookmarks.length) {
                        bookmarks.splice(newIndex, 0, movedBookmark);
                    } else {
                        bookmarks.push(movedBookmark);
                    }
                    newGroups[targetIndex] = {
                        ...newGroups[targetIndex],
                        bookmarks,
                        updatedAt: new Date().toISOString()
                    };
                }
            }
            return {
                ...prev,
                groups: newGroups
            };
        });
    };
    const moveGroup = (groupId, newIndex)=>{
        setConfig((prev)=>{
            const groupIndex = prev.groups.findIndex((g)=>g.id === groupId);
            if (groupIndex === -1) return prev;
            const newGroups = [
                ...prev.groups
            ];
            const [movedGroup] = newGroups.splice(groupIndex, 1);
            const clampedIndex = Math.max(0, Math.min(newIndex, newGroups.length));
            newGroups.splice(clampedIndex, 0, movedGroup);
            return {
                ...prev,
                groups: newGroups
            };
        });
    };
    const importConfig = (newConfig)=>{
        setConfig(newConfig);
    };
    const exportConfig = ()=>{
        return config;
    };
    const resetToDefault = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('my-nav-config');
        }
        setConfig(DEFAULT_CONFIG);
    };
    const value = {
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
        exportConfig,
        resetToDefault
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/AppContext.tsx",
        lineNumber: 267,
        columnNumber: 10
    }, this);
}
_s1(AppProvider, "Rtzyjp35etZl0UTpUn/LGh0okZY=");
_c = AppProvider;
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adjustHsl",
    ()=>adjustHsl,
    "applyThemeColor",
    ()=>applyThemeColor,
    "generateThemeFromColor",
    ()=>generateThemeFromColor,
    "hexToRgb",
    ()=>hexToRgb,
    "hslToString",
    ()=>hslToString,
    "rgbToHex",
    ()=>rgbToHex,
    "rgbToHsl",
    ()=>rgbToHsl,
    "useTheme",
    ()=>useTheme,
    "validateRgbColor",
    ()=>validateRgbColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: h * 360,
        s: s * 100,
        l: l * 100
    };
}
function adjustHsl(hsl, adjustments) {
    return {
        h: (hsl.h + (adjustments.hue || 0) + 360) % 360,
        s: Math.max(0, Math.min(100, hsl.s + (adjustments.saturation || 0))),
        l: Math.max(0, Math.min(100, hsl.l + (adjustments.lightness || 0)))
    };
}
function hslToString(hsl) {
    return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
}
function generateThemeFromColor(rgb) {
    const baseHsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    // Light mode
    const light = {
        primary: hslToString(baseHsl),
        secondary: hslToString(adjustHsl(baseHsl, {
            lightness: 10
        })),
        accent: hslToString(adjustHsl(baseHsl, {
            hue: 30
        })),
        background: '0 0% 100%',
        foreground: '222.2 84% 4.9%',
        card: '0 0% 100%',
        border: '214.3 31.8% 91.4%',
        ring: hslToString(baseHsl)
    };
    // Dark mode - adjusted for better contrast
    const dark = {
        primary: hslToString(adjustHsl(baseHsl, {
            saturation: -10,
            lightness: 10
        })),
        secondary: hslToString(adjustHsl(baseHsl, {
            saturation: -15,
            lightness: 5
        })),
        accent: hslToString(adjustHsl(baseHsl, {
            hue: 30,
            saturation: -10,
            lightness: 10
        })),
        background: '222.2 84% 4.9%',
        foreground: '210 40% 98%',
        card: '222.2 84% 4.9%',
        border: '217.2 32.6% 33.5%',
        ring: '224.3 76.3% 94.1%'
    };
    return {
        light,
        dark
    };
}
function applyThemeColor(rgb) {
    if (!rgb) {
        // Reset to default theme
        document.documentElement.style.removeProperty('--primary');
        document.documentElement.style.removeProperty('--primary-foreground');
        document.documentElement.style.removeProperty('--secondary');
        document.documentElement.style.removeProperty('--secondary-foreground');
        document.documentElement.style.removeProperty('--accent');
        document.documentElement.style.removeProperty('--accent-foreground');
        document.documentElement.style.removeProperty('--ring');
        return;
    }
    const theme = generateThemeFromColor(rgb);
    function applyMode(mode, themeObj) {
        const modeSelector = mode === 'dark' ? '.dark' : ':root';
        const style = document.documentElement.style;
        // Apply theme variables
        style.setProperty('--primary', themeObj.primary);
        style.setProperty('--primary-foreground', mode === 'dark' ? '222.2 84% 4.9%' : '210 40% 98%');
        style.setProperty('--secondary', themeObj.secondary);
        style.setProperty('--secondary-foreground', mode === 'dark' ? '210 40% 98%' : '222.2 84% 4.9%');
        style.setProperty('--accent', themeObj.accent);
        style.setProperty('--accent-foreground', mode === 'dark' ? '210 40% 98%' : '222.2 84% 4.9%');
        style.setProperty('--ring', themeObj.ring);
    }
    applyMode('light', theme.light);
    // Apply dark mode to .dark class
    const darkStyles = `
    .dark {
      --primary: ${theme.dark.primary};
      --primary-foreground: 222.2 84% 4.9%;
      --secondary: ${theme.dark.secondary};
      --secondary-foreground: 210 40% 98%;
      --accent: ${theme.dark.accent};
      --accent-foreground: 210 40% 98%;
      --ring: ${theme.dark.ring};
    }
  `;
    // Remove existing style if any
    const existingStyle = document.querySelector('#dynamic-theme');
    if (existingStyle) {
        existingStyle.remove();
    }
    // Add new style
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dynamic-theme';
    styleSheet.textContent = darkStyles;
    document.head.appendChild(styleSheet);
}
function validateRgbColor(color) {
    return color && typeof color === 'object' && typeof color.r === 'number' && typeof color.g === 'number' && typeof color.b === 'number' && color.r >= 0 && color.r <= 255 && color.g >= 0 && color.g <= 255 && color.b >= 0 && color.b <= 255;
}
function useTheme(config) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTheme.useEffect": ()=>{
            if (config.themeColor && validateRgbColor(config.themeColor)) {
                applyThemeColor(config.themeColor);
            } else {
                applyThemeColor(undefined);
            }
        }
    }["useTheme.useEffect"], [
        config.themeColor
    ]);
}
_s(useTheme, "OD7bBpZva5O2jO+Puf00hKivP7c=");
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function rgbToHex({ r, g, b }) {
    return `#${[
        r,
        g,
        b
    ].map((x)=>{
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5972bc34.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/theme.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ThemeHandler() {
    _s();
    const { config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeHandler.useEffect": ()=>{
            document.title = config.pageTitle;
        }
    }["ThemeHandler.useEffect"], [
        config.pageTitle
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeHandler.useEffect": ()=>{
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = config.pageDescription;
            } else {
                const meta = document.createElement('meta');
                meta.name = 'description';
                meta.content = config.pageDescription;
                document.head.appendChild(meta);
            }
        }
    }["ThemeHandler.useEffect"], [
        config.pageDescription
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])(config);
    return null;
}
_s(ThemeHandler, "Lka/s7foj7FwmKLjAc9/5Myh14M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ThemeHandler;
function LayoutContent({ children }) {
    _s1();
    const { config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "LayoutContent.useEffect": ()=>{
            setMounted(true);
        }
    }["LayoutContent.useEffect"], []);
    // Use default config values for SSR to avoid hydration mismatch
    const backgroundImage = mounted ? config.backgroundImage : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen relative",
        style: {
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: backgroundImage ? 'cover' : undefined,
            backgroundPosition: backgroundImage ? 'center' : undefined,
            backgroundAttachment: backgroundImage ? 'fixed' : undefined
        },
        suppressHydrationWarning: true,
        children: [
            !backgroundImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black -z-10"
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this),
            backgroundImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm -z-10"
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s1(LayoutContent, "3L1joyg0ZLbdYF9hGf0YBUQ0HUY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"]
    ];
});
_c1 = LayoutContent;
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "zh-CN",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "description",
                    content: "A beautiful and lightweight personal browser navigation page"
                }, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].className,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppProvider"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeHandler, {}, void 0, false, {
                            fileName: "[project]/app/layout.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutContent, {
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/app/layout.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_c2 = RootLayout;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ThemeHandler");
__turbopack_context__.k.register(_c1, "LayoutContent");
__turbopack_context__.k.register(_c2, "RootLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__6a7958ba._.js.map