module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
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
    ()=>uploadFile
]);
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
        exportConfig
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/AppContext.tsx",
        lineNumber: 233,
        columnNumber: 10
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

//# sourceMappingURL=%5Broot-of-the-server%5D__392d5c7b._.js.map