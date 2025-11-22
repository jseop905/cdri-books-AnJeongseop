import type { Book } from '@shared/api'
import { Button, Tooltip } from '@shared/ui'
import likeOnIcon from '@shared/assets/icons/like-on.png'
import likeOffIcon from '@shared/assets/icons/like-off.png'

interface BookCardProps {
  book: Book
  isFavorite: boolean
  onToggleFavorite: (book: Book, e: React.MouseEvent) => void
  onToggleDetail: (isbn: string) => void
  isExpanded: boolean
}

/**
 * 책 카드 기본 뷰 컴포넌트
 * 축약된 형태의 책 정보를 표시합니다.
 * 
 * FSD 구조: widgets/book-list/ui
 * - 도메인 특화 컴포넌트이므로 widgets 내부에 위치
 * - BookList 위젯의 일부로 사용되며, 독립적으로 재사용 가능한 구조
 */
export const BookCard = ({
  book,
  isFavorite,
  onToggleFavorite,
  onToggleDetail,
  isExpanded,
}: BookCardProps) => {
  return (
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
          onClick={(e) => onToggleFavorite(book, e)}
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
            if (book.url) {
              window.open(book.url, '_blank')
            }
          }}
          className="w-[115px] h-[48px] px-[20px] py-[13px] rounded text-body2"
        >
          구매하기
        </Button>

        {/* 상세보기 아래화살표 버튼 */}
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
  )
}

