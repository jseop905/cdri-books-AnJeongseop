import { useEffect, useRef, useState } from 'react'
import bookIcon from '@shared/assets/icons/icon-book.png'
import likeOnIcon from '@shared/assets/icons/like-on.png'
import likeOffIcon from '@shared/assets/icons/like-off.png'
import type { Book } from '@shared/api'
import { Button, Tooltip } from '@shared/ui'
import { getFavorites, toggleFavorite } from '@shared/lib/favorites'

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
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-8">
        <img 
          src={bookIcon} 
          alt="검색어를 입력해주세요." 
          className="w-20 h-20"
        />
        <div className="text-caption text-text-secondary">
          검색어를 입력해주세요.
        </div>
      </div>
    )
  }

  // 검색 결과가 없는 경우
  if (hasSearched && books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-8">
        <img 
          src={bookIcon} 
          alt="검색 결과 없음" 
          className="w-20 h-20"
        />
        <div className="text-caption text-text-secondary">
          검색된 결과가 없습니다.
        </div>
      </div>
    )
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
              {/* 기본 행 */}
              {!isExpanded && (
                <div 
                  className="w-full h-[100px] flex items-center bg-palette-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                >
                {/* 책 이미지 */}
                <div className="w-[80px] h-[80px] bg-palette-lightGray overflow-hidden rounded flex-shrink-0 ml-[48px] mr-[48px] relative">
                  <img 
                    src={book.thumbnail || 'https://via.placeholder.com/80x80?text=No+Image'} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {/* 찜 아이콘 */}
                  <button
                    onClick={(e) => handleToggleFavorite(book, e)}
                    className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src={isFavorite ? likeOnIcon : likeOffIcon} 
                      alt={isFavorite ? '찜 해제' : '찜하기'}
                      className="w-full h-full"
                    />
                  </button>
                </div>

                {/* 책 제목과 저자 */}
                <div className="flex-1 px-4 min-w-0 flex items-center gap-2">
                  <Tooltip content={book.title} position="top">
                    <div className="text-title3 text-text-primary line-clamp-1">
                      {book.title}
                    </div>
                  </Tooltip>
                  <Tooltip content={book.authors.join(', ')} position="top">
                    <div className="text-body2 text-text-secondary line-clamp-1">
                      {book.authors.join(', ')}
                    </div>
                  </Tooltip>
                </div>

                {/* 가격 */}
                <div className="px-4 flex-shrink-0 mr-[48px]">
                  <div className="text-title3 text-text-primary">
                    {book.sale_price > 0 ? book.sale_price.toLocaleString() : book.price.toLocaleString()}원
                  </div>
                </div>

                {/* 버튼 그룹 */}
                <div className="flex items-center gap-2 mr-4">
                  {/* 구매하기 버튼 */}
                  <Button
                    variant="primary"
                    onClick={() => {
                      alert(`${book.title}\n구매가 완료되었습니다.`)
                    }}
                    className="w-[115px] h-[48px] px-[20px] py-[13px] rounded text-body2"
                  >
                    구매하기
                  </Button>

                  {/* 상세보기 아래화살표 버튼 */}
                  <Button
                    variant="lightGray"
                    onClick={() => toggleBookDetail(book.isbn)}
                    className="w-[115px] h-[48px] py-[13px] rounded text-body2 flex items-center gap-1"
                  >
                    상세보기
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              )}

              {/* 상세 정보 아코디언 */}
              {isExpanded && (
                <div className="w-full bg-palette-white rounded-lg shadow-sm mt-2 overflow-hidden">
                  <div className="flex gap-6">
                    {/* 좌측: 이미지와 정보 */}
                    <div className="flex gap-6 flex-1">
                      {/* 책 이미지 */}
                      <div className="w-[200px] h-[280px] ml-[48px] bg-palette-lightGray overflow-hidden rounded flex-shrink-0 relative">
                        <img 
                          src={book.thumbnail || 'https://via.placeholder.com/200x280?text=No+Image'} 
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                        {/* 찜 아이콘 */}
                        <button
                          onClick={(e) => handleToggleFavorite(book, e)}
                          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <img 
                            src={isFavorite ? likeOnIcon : likeOffIcon} 
                            alt={isFavorite ? '찜 해제' : '찜하기'}
                            className="w-full h-full"
                          />
                        </button>
                      </div>

                      {/* 제목, 저자, 책소개 */}
                      <div className="flex-1 flex flex-col gap-8">
                        {/* 제목과 저자 */}
                        <div className="flex items-center gap-2 pt-8 min-w-0">
                          <Tooltip content={book.title} position="top">
                            <div className="text-title2 text-text-primary line-clamp-1">
                              {book.title}
                            </div>
                          </Tooltip>
                          <Tooltip content={book.authors.join(', ')} position="top">
                            <div className="text-body2 text-text-secondary line-clamp-1">
                              {book.authors.join(', ')}
                            </div>
                          </Tooltip>
                        </div>

                        {/* 책소개 */}
                        <div className="flex flex-col gap-8 flex-1 min-h-0">
                          <div className="text-body1 text-text-primary font-bold">
                            책소개
                          </div>
                          <div className="text-body2 text-text-secondary leading-relaxed overflow-y-auto max-h-[400px] pr-2">
                            {book.contents || '책소개가 없습니다.'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 우측: 상세보기 버튼, 가격, 구매하기 */}
                    <div className="flex flex-col items-end justify-between w-[200px] flex-shrink-0">
                      {/* 상세보기 버튼 (우상단) */}
                      <Button
                        variant="lightGray"
                        onClick={() => toggleBookDetail(book.isbn)}
                        className="w-[115px] h-[48px] py-[13px] rounded text-body2 flex items-center gap-1"
                      >
                        상세보기
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="rotate-180"
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>

                      {/* 가격 정보와 구매하기 버튼 (하단 정렬) */}
                      <div className="flex flex-col items-end gap-4 w-full">
                        {/* 가격 정보 */}
                        <div className="flex flex-col items-end gap-2 w-full">
                          {book.sale_price > 0 && book.sale_price < book.price ? (
                            <>
                              {/* 원가 */}
                              <div className="flex items-center gap-2">
                                <div 
                                  style={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    lineHeight: '22px',
                                    color: '#8D94A0',
                                  }}
                                >
                                  원가
                                </div>
                                <div 
                                  className="line-through"
                                  style={{
                                    fontWeight: 350,
                                    fontSize: '18px',
                                    lineHeight: '26px',
                                    color: '#1A1E27',
                                  }}
                                >
                                  {book.price.toLocaleString()}원
                                </div>
                              </div>
                              {/* 할인가 */}
                              <div className="flex items-center gap-2">
                                <div 
                                  style={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    lineHeight: '22px',
                                    color: '#8D94A0',
                                  }}
                                >
                                  할인가
                                </div>
                                <div 
                                  style={{
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    lineHeight: '26px',
                                    color: '#1A1E27',
                                  }}
                                >
                                  {book.sale_price.toLocaleString()}원
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div 
                                style={{
                                  fontWeight: 500,
                                  fontSize: '10px',
                                  lineHeight: '22px',
                                  color: '#8D94A0',
                                }}
                              >
                                원가
                              </div>
                              <div 
                                style={{
                                  fontWeight: 350,
                                  fontSize: '18px',
                                  lineHeight: '26px',
                                  color: '#1A1E27',
                                }}
                              >
                                {book.price.toLocaleString()}원
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 구매하기 버튼 */}
                        <Button
                          variant="primary"
                          onClick={() => {
                            alert(`${book.title}\n구매가 완료되었습니다.`)
                          }}
                          className="w-full h-[48px] px-[20px] py-[13px] rounded text-body2"
                        >
                          구매하기
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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

