import { useEffect, useState } from 'react'
import { getFavorites } from '@shared/lib/favorites'
import { PAGE_SIZE, STORAGE_KEYS } from '@shared/config/constants'
import type { Book } from '@shared/api'

export const useFavoritesList = () => {
  const [allFavoriteBooks, setAllFavoriteBooks] = useState<Book[]>([])
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const loadFavorites = () => {
    const favorites = getFavorites()
    setAllFavoriteBooks(favorites)
    setDisplayedBooks(favorites.slice(0, PAGE_SIZE.FAVORITES))
    setCurrentPage(1)
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.FAVORITES || e.key === null) {
        loadFavorites()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('favoritesChanged', loadFavorites)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('favoritesChanged', loadFavorites)
    }
  }, [])

  useEffect(() => {
    const endIndex = currentPage * PAGE_SIZE.FAVORITES
    setDisplayedBooks(allFavoriteBooks.slice(0, endIndex))
  }, [currentPage, allFavoriteBooks])

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const hasNextPage = displayedBooks.length < allFavoriteBooks.length
  const resultCount = allFavoriteBooks.length

  return {
    displayedBooks,
    hasNextPage,
    resultCount,
    onLoadMore: handleLoadMore,
    onFavoriteChange: loadFavorites,
  }
}

