import { useState } from 'react'
import { Input, Button, Typography } from '@shared/ui'
import searchIcon from '@shared/assets/icons/Search.png'

export const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [resultCount, setResultCount] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 검색 기능 구현
    console.log('검색어:', searchQuery)
    // 임시로 결과 개수 설정 (실제로는 API 응답에서 받아옴)
    setResultCount(0)
  }

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="title2" className="text-text-primary font-bold">
        도서검색
      </Typography>
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
            className="pl-12 h-[50px]"
          />
        </div>
        <Button type="submit" className="w-[72px]">
          검색
        </Button>
      </form>
      {resultCount !== null && (
        <div className="flex items-center gap-2">
          <Typography variant="body1" className="text-text-primary">
            도서 검색 결과
          </Typography>
          <Typography variant="body1" className="text-text-secondary">
            총 {resultCount}건
          </Typography>
        </div>
      )}
    </div>
  )
}

