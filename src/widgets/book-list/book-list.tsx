import { useEffect, useRef, useState, useCallback } from 'react'
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
  emptyType?: 'no-results' | 'no-favorites'
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
  emptyType = 'no-results',
}: BookListProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set())
  const [favoriteBooks, setFavoriteBooks] = useState<Set<string>>(new Set())

  useEffect(() => {
    const favorites = getFavorites()
    setFavoriteBooks(new Set(favorites.map((book) => book.isbn)))
  }, [])

  const toggleBookDetail = useCallback((isbn: string) => {
    setExpandedBooks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(isbn)) {
        newSet.delete(isbn)
      } else {
        newSet.add(isbn)
      }
      return newSet
    })
  }, [])

  const handleToggleFavorite = useCallback((book: Book, e: React.MouseEvent) => {
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
    if (onFavoriteChange) {
      onFavoriteChange()
    }
  }, [onFavoriteChange])

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-body1 text-text-secondary">검색 중...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-body1 text-text-secondary">검색 중 오류가 발생했습니다.</div>
      </div>
    )
  }

  if (!hasSearched && books.length === 0) {
    return <EmptyState type="initial" />
  }

  if (hasSearched && books.length === 0) {
    return <EmptyState type={emptyType} />
  }

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
      {hasNextPage && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {isFetchingNextPage && (
            <div className="text-body1 text-text-secondary">더 불러오는 중...</div>
          )}
        </div>
      )}
      {!hasNextPage && books.length > 0 && (
        <div className="h-20 flex items-center justify-center">
          <div className="text-body1 text-text-secondary">모든 결과를 불러왔습니다.</div>
        </div>
      )}
    </div>
  )
}

