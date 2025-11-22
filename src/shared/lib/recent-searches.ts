import { RECENT_SEARCHES, STORAGE_KEYS } from '@shared/config/constants'

/**
 * 최근 검색어를 가져옵니다.
 * 브라우저 종료 후에도 데이터가 유지됩니다 (localStorage 사용).
 * @returns 최근 검색어 배열 (최신순)
 */
export const getRecentSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES)
    if (!stored) return []
    
    const searches = JSON.parse(stored) as string[]
    return Array.isArray(searches) ? searches : []
  } catch (error) {
    console.error('Failed to get recent searches from localStorage:', error)
    // 손상된 데이터 복구 시도
    try {
      localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES)
    } catch {
      // 무시
    }
    return []
  }
}

/**
 * 최근 검색어를 저장합니다.
 * 브라우저 종료 후에도 데이터가 유지됩니다 (localStorage 사용).
 * @param query 검색어
 */
export const addRecentSearch = (query: string): void => {
  if (!query.trim()) return
  
  try {
    const searches = getRecentSearches()
    
    // 중복 제거 (기존 항목 제거)
    const filtered = searches.filter((search) => search !== query)
    
    // 최신 검색어를 맨 앞에 추가
    const updated = [query, ...filtered].slice(0, RECENT_SEARCHES.MAX_COUNT)
    
    // localStorage에 저장
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to save recent search to localStorage:', error)
    // QuotaExceededError인 경우
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Cannot save more recent searches.')
    }
  }
}

/**
 * 특정 최근 검색어를 삭제합니다.
 * 브라우저 종료 후에도 변경사항이 유지됩니다 (localStorage 사용).
 * @param query 삭제할 검색어
 */
export const removeRecentSearch = (query: string): void => {
  try {
    const searches = getRecentSearches()
    const filtered = searches.filter((search) => search !== query)
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to remove recent search from localStorage:', error)
  }
}

/**
 * 최근 검색어를 모두 삭제합니다.
 * 브라우저 종료 후에도 변경사항이 유지됩니다 (localStorage 사용).
 */
export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES)
  } catch (error) {
    console.error('Failed to clear recent searches from localStorage:', error)
  }
}

