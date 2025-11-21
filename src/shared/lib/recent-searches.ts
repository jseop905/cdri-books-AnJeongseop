import { getCookie, setCookie } from './cookie'

const RECENT_SEARCHES_KEY = 'recent_searches'
const MAX_RECENT_SEARCHES = 10

/**
 * 최근 검색어를 가져옵니다.
 * @returns 최근 검색어 배열 (최신순)
 */
export const getRecentSearches = (): string[] => {
  const cookieValue = getCookie(RECENT_SEARCHES_KEY)
  if (!cookieValue) return []
  
  try {
    const searches = JSON.parse(cookieValue) as string[]
    return Array.isArray(searches) ? searches : []
  } catch {
    return []
  }
}

/**
 * 최근 검색어를 저장합니다.
 * @param query 검색어
 */
export const addRecentSearch = (query: string): void => {
  if (!query.trim()) return
  
  const searches = getRecentSearches()
  
  // 중복 제거 (기존 항목 제거)
  const filtered = searches.filter((search) => search !== query)
  
  // 최신 검색어를 맨 앞에 추가
  const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES)
  
  // Cookie에 저장
  setCookie(RECENT_SEARCHES_KEY, JSON.stringify(updated), 30)
}

/**
 * 특정 최근 검색어를 삭제합니다.
 * @param query 삭제할 검색어
 */
export const removeRecentSearch = (query: string): void => {
  const searches = getRecentSearches()
  const filtered = searches.filter((search) => search !== query)
  setCookie(RECENT_SEARCHES_KEY, JSON.stringify(filtered), 30)
}

/**
 * 최근 검색어를 모두 삭제합니다.
 */
export const clearRecentSearches = (): void => {
  setCookie(RECENT_SEARCHES_KEY, JSON.stringify([]), 30)
}

