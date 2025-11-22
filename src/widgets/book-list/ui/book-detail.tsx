import type { Book } from '@shared/api'
import { Button, Tooltip } from '@shared/ui'
import likeOnIcon from '@shared/assets/icons/like-on.png'
import likeOffIcon from '@shared/assets/icons/like-off.png'
import { PriceDisplay } from './price-display'

interface BookDetailProps {
  book: Book
  isFavorite: boolean
  onToggleFavorite: (book: Book, e: React.MouseEvent) => void
  onToggleDetail: (isbn: string) => void
}

/**
 * 책 상세 정보 컴포넌트
 * 확장된 형태의 책 정보를 표시합니다.
 * 
 * FSD 구조: widgets/book-list/ui
 * - 도메인 특화 컴포넌트이므로 widgets 내부에 위치
 * - BookCard와 함께 BookList 위젯의 일부로 사용
 * - PriceDisplay 컴포넌트를 재사용하여 중복 제거
 */
export const BookDetail = ({
  book,
  isFavorite,
  onToggleFavorite,
  onToggleDetail,
}: BookDetailProps) => {
  return (
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
              onClick={(e) => onToggleFavorite(book, e)}
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
            onClick={() => onToggleDetail(book.isbn)}
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
              <PriceDisplay price={book.price} salePrice={book.sale_price} />
            </div>

            {/* 구매하기 버튼 */}
            <Button
              variant="primary"
              onClick={() => {
                if (book.url) {
                  window.open(book.url, '_blank')
                }
              }}
              className="w-full h-[48px] px-[20px] py-[13px] rounded text-body2"
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

