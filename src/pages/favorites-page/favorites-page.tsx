import { useEffect, useState } from 'react'
import { Header } from '@widgets/header'
import { BookList } from '@widgets/book-list'
import { getFavorites } from '@shared/lib/favorites'
import { PAGE_SIZE, STORAGE_KEYS } from '@shared/config/constants'
import type { Book } from '@shared/api'

export const FavoritesPage = () => {
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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[960px] mx-auto pb-16">
        <div className="mt-[72px] flex flex-col gap-8">
          {/* 타이틀 및 결과 카운트 */}
          <div className="flex flex-col gap-4">
            <div className="text-title2 text-text-primary">
                내가 찜한 책
            </div>
            <div className="text-caption text-text-primary leading-6">
              찜한 책 총 <span className="text-palette-primary">{resultCount}</span>건
            </div>
          </div>

          {/* 책 리스트 */}
          <BookList 
            books={displayedBooks}
            hasSearched={true}
            isLoading={false}
            isError={false}
            hasNextPage={hasNextPage}
            onLoadMore={handleLoadMore}
            onFavoriteChange={loadFavorites}
          />
        </div>
      </main>
    </div>
  )
}

