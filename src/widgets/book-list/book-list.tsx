import { useEffect, useRef } from 'react'
import bookIcon from '@shared/assets/icons/icon-book.png'
import type { Book } from '@shared/api'
import { Button, Tooltip } from '@shared/ui'

interface BookListProps {
  books: Book[]
  hasSearched: boolean
  isLoading?: boolean
  isError?: boolean
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  onLoadMore?: () => void
}

export const BookList = ({ 
  books, 
  hasSearched, 
  isLoading, 
  isError,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: BookListProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)

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
        {books.map((book, index) => (
          <div 
            key={`${book.isbn}-${index}`}
            className="w-full h-[100px] flex items-center bg-palette-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {/* 책 이미지 */}
            <div className="w-[80px] h-[80px] bg-palette-lightGray overflow-hidden rounded flex-shrink-0 ml-[48px] mr-[48px]">
              <img 
                src={book.thumbnail || 'https://via.placeholder.com/80x80?text=No+Image'} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
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
            <div className="flex items-center gap-2">
              {/* 구매하기 버튼 */}
              <Button
                variant="primary"
                onClick={() => {
                  // TODO: 구매하기 기능 구현
                }}
                className="w-[115px] h-[48px] px-[20px] py-[13px] rounded text-body2"
              >
                구매하기
              </Button>

              {/* 상세보기 아래화살표 버튼 */}
              <Button
                variant="lightGray"
                onClick={() => {
                  // TODO: 상세보기 기능 구현
                }}
                className="w-[115px] h-[48px] px-[20px] py-[13px] rounded text-body2"
              >
                상세보기
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
        ))}
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

