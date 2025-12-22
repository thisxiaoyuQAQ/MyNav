import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface Bookmark {
  title: string
  url: string
}

interface BookmarkFolder {
  name: string
  bookmarks: Bookmark[]
}

function decodeHTMLEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' '
  }

  return text.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => entities[entity] || entity)
}

function parseBookmarksHTML(html: string): BookmarkFolder[] {
  const folders: BookmarkFolder[] = []

  // 匹配 <H3> 标签（文件夹）
  const folderRegex = /<H3[^>]*>(.*?)<\/H3>[\s\S]*?<DL>\s*<p>([\s\S]*?)<\/p>\s*<\/DL>/g
  // 匹配 <A> 标签（书签）
  const bookmarkRegex = /<A[^>]*HREF="([^"]*)"[^>]*>(.*?)<\/A>/g

  let folderMatch
  while ((folderMatch = folderRegex.exec(html)) !== null) {
    const folderName = folderMatch[1].trim()
    const folderContent = folderMatch[2]

    const bookmarks: Bookmark[] = []
    let bookmarkMatch

    while ((bookmarkMatch = bookmarkRegex.exec(folderContent)) !== null) {
      const url = bookmarkMatch[1]
      const title = bookmarkMatch[2].trim()

      // 只保留有效的 HTTP/HTTPS 链接
      if (url && title && (url.startsWith('http'))) {
        bookmarks.push({
          title: decodeHTMLEntities(title),
          url,
        })
      }
    }

    if (bookmarks.length > 0) {
      folders.push({
        name: decodeHTMLEntities(folderName),
        bookmarks
      })
    }

    // 重置正则表达式
    bookmarkRegex.lastIndex = 0
  }

  // 如果没有找到文件夹结构的，尝试直接解析根目录的书签
  if (folders.length === 0) {
    const rootBookmarks: Bookmark[] = []
    let bookmarkMatch

    while ((bookmarkMatch = bookmarkRegex.exec(html)) !== null) {
      const url = bookmarkMatch[1]
      const title = bookmarkMatch[2].trim()

      if (url && title && (url.startsWith('http'))) {
        rootBookmarks.push({
          title: decodeHTMLEntities(title),
          url,
        })
      }
    }

    if (rootBookmarks.length > 0) {
      folders.push({
        name: '导入的书签',
        bookmarks: rootBookmarks
      })
    }
  }

  return folders
}

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json()

    if (!filePath) {
      return NextResponse.json(
        { error: '文件路径不能为空' },
        { status: 400 }
      )
    }

    // 读取文件
    const content = await fs.readFile(filePath, 'utf-8')

    // 解析 HTML
    const folders = parseBookmarksHTML(content)

    return NextResponse.json({ folders })
  } catch (error) {
    console.error('读取或解析文件失败:', error)
    return NextResponse.json(
      { error: '读取或解析文件失败: ' + (error as Error).message },
      { status: 500 }
    )
  }
}
