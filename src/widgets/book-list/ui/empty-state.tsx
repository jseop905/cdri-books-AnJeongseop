import { memo } from 'react'
import bookIcon from '@shared/assets/icons/icon-book.png'

interface EmptyStateProps {
  type: 'initial' | 'no-results' | 'no-favorites'
}

const emptyStateMessages: Record<EmptyStateProps['type'], string> = {
  'initial': '검색어를 입력해주세요.',
  'no-results': '검색된 결과가 없습니다.',
  'no-favorites': '찜한 책이 없습니다.',
}

const emptyStateAltTexts: Record<EmptyStateProps['type'], string> = {
  'initial': '검색어를 입력해주세요.',
  'no-results': '검색 결과 없음',
  'no-favorites': '찜한 책 없음',
}

export const EmptyState = memo(({ type }: EmptyStateProps) => {
  const message = emptyStateMessages[type]
  const altText = emptyStateAltTexts[type]

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

