import { memo } from 'react'
import bookIcon from '@shared/assets/icons/icon-book.png'

interface EmptyStateProps {
  type: 'initial' | 'no-results'
}

export const EmptyState = memo(({ type }: EmptyStateProps) => {
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
})

