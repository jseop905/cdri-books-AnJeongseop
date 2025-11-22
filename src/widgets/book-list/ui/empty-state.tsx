import bookIcon from '@shared/assets/icons/icon-book.png'

interface EmptyStateProps {
  type: 'initial' | 'no-results'
}

/**
 * 빈 상태 컴포넌트
 * 검색 전 상태와 검색 결과 없음 상태를 표시합니다.
 * 
 * FSD 구조: widgets/book-list/ui
 * - 도메인 특화 컴포넌트이므로 widgets 내부에 위치
 * - 범용 EmptyState가 아니라 도서 검색에 특화되어 있어 widgets 내부가 적절
 */
export const EmptyState = ({ type }: EmptyStateProps) => {
  const message = type === 'initial' 
    ? '검색어를 입력해주세요.' 
    : '검색된 결과가 없습니다.'
  
  const altText = type === 'initial'
    ? '검색어를 입력해주세요.'
    : '검색 결과 없음'

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-8">
      <img 
        src={bookIcon} 
        alt={altText} 
        className="w-20 h-20"
      />
      <div className="text-caption text-text-secondary">
        {message}
      </div>
    </div>
  )
}

