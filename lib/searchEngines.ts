import { SearchEngine } from '@/types';

export const DEFAULT_SEARCH_ENGINES: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com/search?q={query}',
    icon: '🔍',
  },
  {
    id: 'bing',
    name: 'Bing',
    url: 'https://www.bing.com/search?q={query}',
    icon: '🔎',
  },
  {
    id: 'baidu',
    name: '百度',
    url: 'https://www.baidu.com/s?wd={query}',
    icon: '度',
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q={query}',
    icon: '🦆',
  },
];

export function getSearchUrl(engine: SearchEngine, query: string): string {
  return engine.url.replace('{query}', encodeURIComponent(query));
}
