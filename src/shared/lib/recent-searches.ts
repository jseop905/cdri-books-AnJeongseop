import { RECENT_SEARCHES, STORAGE_KEYS } from '@shared/config/constants'

export const getRecentSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES)
    if (!stored) return []
    
    const searches = JSON.parse(stored) as string[]
    return Array.isArray(searches) ? searches : []
  } catch (error) {
    console.error('Failed to get recent searches from localStorage:', error)
    try {
      localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES)
    } catch {
      // 손상된 데이터 복구 실패 시 무시
    }
    return []
  }
}

export const addRecentSearch = (query: string): void => {
  if (!query.trim()) return
  
  try {
    const searches = getRecentSearches()
    const filtered = searches.filter((search) => search !== query)
    const updated = [query, ...filtered].slice(0, RECENT_SEARCHES.MAX_COUNT)
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to save recent search to localStorage:', error)
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Cannot save more recent searches.')
    }
  }
}

export const removeRecentSearch = (query: string): void => {
  try {
    const searches = getRecentSearches()
    const filtered = searches.filter((search) => search !== query)
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to remove recent search from localStorage:', error)
  }
}

export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES)
  } catch (error) {
    console.error('Failed to clear recent searches from localStorage:', error)
  }
}

