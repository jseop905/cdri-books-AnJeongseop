import { useEffect, useRef, useState } from 'react'
import type { Book } from '@shared/api'
import { getFavorites, toggleFavorite } from '@shared/lib/favorites'
import { BookCard, BookDetail, EmptyState } from './ui'

interface BookListProps {
  books: Book[]
  hasSearched: boolean
  isLoading?: boolean
  isError?: boolean
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  onLoadMore?: () => void
  onFavoriteChange?: () => void
}

export const BookList = ({ 
  books, 
  hasSearched, 
  isLoading, 
  isError,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  onFavoriteChange,
}: BookListProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set())
  const [favoriteBooks, setFavoriteBooks] = useState<Set<string>>(new Set())

  // 초기 찜 상태 로드
  useEffect(() => {
    const favorites = getFavorites()
    setFavoriteBooks(new Set(favorites.map((book) => book.isbn)))
  }, [])

  const toggleBookDetail = (isbn: string) => {
    setExpandedBooks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(isbn)) {
        newSet.delete(isbn)
      } else {
        newSet.add(isbn)
      }
      return newSet
    })
  }

  const handleToggleFavorite = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation()
    const isNowFavorite = toggleFavorite(book)
    setFavoriteBooks((prev) => {
      const newSet = new Set(prev)
      if (isNowFavorite) {
        newSet.add(book.isbn)
      } else {
        newSet.delete(book.isbn)
      }
      return newSet
    })
    // 찜 상태 변경 시 부모 컴포넌트에 알림
    if (onFavoriteChange) {
      onFavoriteChange()
    }
  }

  // Intersection Observer로 하단 감지
  useEffect(() => {
    if (!hasNextPage || !onLoadMore || isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasNextPage, onLoadMore, isLoading, isFetchingNextPage])

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-body1 text-text-secondary">검색 중...</div>
      </div>
    )
  }

  // 에러 발생
  if (isError) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-body1 text-text-secondary">검색 중 오류가 발생했습니다.</div>
      </div>
    )
  }

  // 페이지 최초 접근 시
  if (!hasSearched && books.length === 0) {
    return <EmptyState type="initial" />
  }

  // 검색 결과가 없는 경우
  if (hasSearched && books.length === 0) {
    return <EmptyState type="no-results" />
  }

  // 검색 전 또는 결과가 있는 경우
  if (books.length === 0) {
    return null
  }

  return (
    <div className="w-[960px] mx-auto">
      <div className="flex flex-col gap-4 w-full">
        {books.map((book, index) => {
          const isExpanded = expandedBooks.has(book.isbn)
          const isFavorite = favoriteBooks.has(book.isbn)
          
          return (
            <div key={`${book.isbn}-${index}`}>
              {!isExpanded ? (
                <BookCard
                  book={book}
                  isFavorite={isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleDetail={toggleBookDetail}
                  isExpanded={isExpanded}
                />
              ) : (
                <BookDetail
                  book={book}
                  isFavorite={isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleDetail={toggleBookDetail}
                />
              )}
            </div>
          )
        })}
      </div>
      {/* 무한 스크롤 트리거 요소 */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {isFetchingNextPage && (
            <div className="text-body1 text-text-secondary">더 불러오는 중...</div>
          )}
        </div>
      )}
      {/* 모든 데이터 로드 완료 */}
      {!hasNextPage && books.length > 0 && (
        <div className="h-20 flex items-center justify-center">
          <div className="text-body1 text-text-secondary">모든 결과를 불러왔습니다.</div>
        </div>
      )}
    </div>
  )
}

