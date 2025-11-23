import type { Book } from '@shared/api'
import { STORAGE_KEYS } from '@shared/config/constants'

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

export const isFavorite = (isbn: string): boolean => {
  const favorites = getFavorites()
  return favorites.some((book) => book.isbn === isbn)
}

export const addFavorite = (book: Book): boolean => {
  const favorites = getFavorites()
  
  if (favorites.some((fav) => fav.isbn === book.isbn)) {
    return true
  }
  
  const updated = [...favorites, book]
  
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated))
    window.dispatchEvent(new Event('favoritesChanged'))
    return true
  } catch (error) {
    console.error('Failed to save favorite book to localStorage:', error)
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Cannot save more favorites.')
    }
    return false
  }
}

export const removeFavorite = (isbn: string): void => {
  const favorites = getFavorites()
  const filtered = favorites.filter((book) => book.isbn !== isbn)
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered))
    window.dispatchEvent(new Event('favoritesChanged'))
  } catch (error) {
    console.error('Failed to remove favorite book from localStorage:', error)
  }
}

export const toggleFavorite = (book: Book): boolean => {
  if (isFavorite(book.isbn)) {
    removeFavorite(book.isbn)
    return false
  } else {
    return addFavorite(book)
  }
}

export const clearFavorites = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES)
  } catch (error) {
    console.error('Failed to clear favorites from localStorage:', error)
  }
}

