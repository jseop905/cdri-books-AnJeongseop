import { useState } from 'react'
import { Input } from '@shared/ui'
import searchIcon from '@shared/assets/icons/Search.png'

export const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [resultCount, setResultCount] = useState<number>(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 검색 기능 구현
    console.log('검색어:', searchQuery)
    // 임시로 결과 개수 설정 (실제로는 API 응답에서 받아옴)
    setResultCount(0)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title2" style={{ color: '#1A1E27' }}>
        도서 검색
      </div>
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <div className="w-[480px] relative">
          <img 
            src={searchIcon} 
            alt="검색" 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          />
          <Input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[50px] pl-[50px] pr-[10px] py-[10px] rounded-[100px] text-caption text-text-subtitle"
            style={{ 
              backgroundColor: '#F2F4F6',
              border: 'none',
            }}
          />
        </div>
        <div
          className="flex items-center justify-center w-[72px] h-[35.27px] rounded-lg border border-palette-gray bg-transparent hover:bg-palette-lightGray transition-all duration-200 cursor-pointer text-body2 text-text-subtitle"
          onClick={() => {
            // TODO: 상세검색 이벤트 구현
          }}
        >
          상세검색
        </div>
      </form>
      <div className="flex items-center gap-4">
        <div 
          className="text-text-primary"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 500,
            letterSpacing: '0%',
          }}
        >
          도서 검색 결과
        </div>
        <div 
          className="text-text-primary"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 500,
            letterSpacing: '0%',
          }}
        >
          총 <span className="text-palette-primary">{resultCount}</span>건
        </div>
      </div>
    </div>
  )
}

