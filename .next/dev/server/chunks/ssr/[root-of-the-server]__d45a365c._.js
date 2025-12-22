module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[next]/internal/font/google/inter_5972bc34.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_5972bc34-module__OU16Qa__className",
});
}),
"[next]/internal/font/google/inter_5972bc34.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5972bc34.module.css [app-ssr] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/lib/searchEngines.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
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
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    return mounted;
}
}),
"[project]/app/context/AppContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useAppContext",
    ()=>useAppContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$searchEngines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/searchEngines.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const DEFAULT_CONFIG = {
    version: '1.0.0',
    selectedSearchEngine: 'google',
    searchEngines: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$searchEngines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_SEARCH_ENGINES"],
    groups: [],
    theme: 'system',
    pageTitle: 'MyNav - Personal Browser Navigation',
    pageDescription: 'A beautiful and lightweight personal browser navigation page',
    heroTitle: 'MyNav',
    heroDescription: '您的个人浏览器导航中心'
};
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useAppContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
function AppProvider({ children, initialConfig }) {
    const [config, setConfig] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(()=>{
        const saved = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return initialConfig || DEFAULT_CONFIG;
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
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
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])(),
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
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])(),
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
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/AppContext.tsx",
        lineNumber: 241,
        columnNumber: 10
    }, this);
}
}),
"[project]/lib/theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (config.themeColor && validateRgbColor(config.themeColor)) {
            applyThemeColor(config.themeColor);
        } else {
            applyThemeColor(undefined);
        }
    }, [
        config.themeColor
    ]);
}
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
}),
"[project]/app/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5972bc34.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/theme.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function ThemeHandler() {
    const { config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.title = config.pageTitle;
    }, [
        config.pageTitle
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = config.pageDescription;
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = config.pageDescription;
            document.head.appendChild(meta);
        }
    }, [
        config.pageDescription
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])(config);
    return null;
}
function LayoutContent({ children }) {
    const { config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppContext"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen relative",
        style: {
            backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
            backgroundSize: config.backgroundImage ? 'cover' : undefined,
            backgroundPosition: config.backgroundImage ? 'center' : undefined,
            backgroundAttachment: config.backgroundImage ? 'fixed' : undefined
        },
        children: [
            !config.backgroundImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black -z-10"
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this),
            config.backgroundImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm -z-10"
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "zh-CN",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "description",
                    content: "A beautiful and lightweight personal browser navigation page"
                }, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].className,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppProvider"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeHandler, {}, void 0, false, {
                            fileName: "[project]/app/layout.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutContent, {
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/app/layout.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d45a365c._.js.map