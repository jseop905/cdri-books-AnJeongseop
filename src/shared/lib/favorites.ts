import type { Book } from '@shared/api'
import { STORAGE_KEYS } from '@shared/config/constants'

/**
 * 찜 목록을 가져옵니다.
 * @returns 찜한 책 목록 배열
 */
export const getFavorites = (): Book[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES)
    if (!stored) return []
    
    const favorites = JSON.parse(stored) as Book[]
    return Array.isArray(favorites) ? favorites : []
  } catch (error) {
    console.error('Failed to get favorites from localStorage:', error)
    return []
  }
}

/**
 * 특정 책이 찜 목록에 있는지 확인합니다.
 * @param isbn 책의 ISBN
 * @returns 찜 여부
 */
export const isFavorite = (isbn: string): boolean => {
  const favorites = getFavorites()
  return favorites.some((book) => book.isbn === isbn)
}

/**
 * 찜 목록에 책을 추가합니다.
 * @param book 추가할 책 정보
 * @returns 저장 성공 여부
 */
export const addFavorite = (book: Book): boolean => {
  const favorites = getFavorites()
  
  // 이미 찜한 책인지 확인
  if (favorites.some((fav) => fav.isbn === book.isbn)) {
    return true
  }
  
  // 찜 목록에 추가
  const updated = [...favorites, book]
  
  // localStorage에 저장
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated))
    // 같은 탭에서의 변경을 알리기 위한 커스텀 이벤트 발생
    window.dispatchEvent(new Event('favoritesChanged'))
    return true
  } catch (error) {
    console.error('Failed to save favorite book to localStorage:', error)
    // QuotaExceededError인 경우
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Cannot save more favorites.')
    }
    return false
  }
}

/**
 * 찜 목록에서 책을 제거합니다.
 * @param isbn 제거할 책의 ISBN
 */
export const removeFavorite = (isbn: string): void => {
  const favorites = getFavorites()
  const filtered = favorites.filter((book) => book.isbn !== isbn)
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered))
    // 같은 탭에서의 변경을 알리기 위한 커스텀 이벤트 발생
    window.dispatchEvent(new Event('favoritesChanged'))
  } catch (error) {
    console.error('Failed to remove favorite book from localStorage:', error)
  }
}

/**
 * 찜 목록을 토글합니다.
 * @param book 토글할 책 정보
 * @returns 찜 상태 (추가: true, 제거: false)
 */
export const toggleFavorite = (book: Book): boolean => {
  if (isFavorite(book.isbn)) {
    removeFavorite(book.isbn)
    return false
  } else {
    const success = addFavorite(book)
    if (!success) {
      // 저장 실패 시 기존 상태 유지
      return false
    }
    return true
  }
}

/**
 * 찜 목록을 모두 삭제합니다.
 */
export const clearFavorites = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES)
  } catch (error) {
    console.error('Failed to clear favorites from localStorage:', error)
  }
}

