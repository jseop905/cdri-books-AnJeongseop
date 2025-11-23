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
    // 첫 페이지만 표시
    setDisplayedBooks(favorites.slice(0, PAGE_SIZE.FAVORITES))
    setCurrentPage(1)
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  // 찜 목록이 변경될 때마다 업데이트
  useEffect(() => {
    // localStorage 변경 이벤트 리스너
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.FAVORITES || e.key === null) {
        loadFavorites()
      }
    }

    // 다른 탭에서의 변경 감지
    window.addEventListener('storage', handleStorageChange)
    
    // 같은 탭에서의 변경 감지를 위한 커스텀 이벤트
    const handleCustomStorageChange = () => {
      loadFavorites()
    }
    window.addEventListener('favoritesChanged', handleCustomStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('favoritesChanged', handleCustomStorageChange)
    }
  }, [])

  // 페이지 변경 시 displayedBooks 업데이트
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

