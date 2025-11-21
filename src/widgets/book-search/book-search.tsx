import { useState, useRef, useEffect } from 'react'
import { Input } from '@shared/ui'
import searchIcon from '@shared/assets/icons/icon-search.png'
import { getRecentSearches, removeRecentSearch } from '@shared/lib/recent-searches'

interface BookSearchProps {
  onSearch: (query: string) => void
  resultCount: number
}

export const BookSearch = ({ onSearch, resultCount }: BookSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showRecentSearches, setShowRecentSearches] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowRecentSearches(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputClick = () => {
    const searches = getRecentSearches()
    setRecentSearches(searches)
    setShowRecentSearches(searches.length > 0)
  }

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query)
    setShowRecentSearches(false)
    onSearch(query)
  }

  const handleDeleteSearch = (e: React.MouseEvent, query: string) => {
    e.stopPropagation()
    removeRecentSearch(query)
    const updatedSearches = getRecentSearches()
    setRecentSearches(updatedSearches)
    if (updatedSearches.length === 0) {
      setShowRecentSearches(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowRecentSearches(false)
    if (searchQuery.trim().length > 0) {
      onSearch(searchQuery.trim())
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title2" style={{ color: '#1A1E27' }}>
        도서 검색
      </div>
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <div ref={containerRef} className="w-[480px] relative">
          <img 
            src={searchIcon} 
            alt="검색" 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none z-10"
          />
          <Input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleInputClick}
            className="h-[50px] pl-[50px] pr-[10px] py-[10px] text-caption text-text-subtitle"
            style={{ 
              backgroundColor: '#F2F4F6',
              border: 'none',
            }}
          />
          {showRecentSearches && recentSearches.length > 0 && (
            <div 
              className="absolute top-full left-0 right-0 bg-[#F2F4F6] z-50 max-h-[300px] overflow-y-auto mt-1"
            >
              <div className="pb-4">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 hover:bg-palette-white transition-colors group cursor-pointer"
                  >
                    <button
                      type="button"
                      onClick={() => handleRecentSearchClick(search)}
                      className="flex-1 text-left text-body2 text-text-primary"
                    >
                      {search}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteSearch(e, search)}
                      className="ml-2 w-5 h-5 flex items-center justify-center hover:bg-palette-lightGray"
                      aria-label="검색어 삭제"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 3L3 9M3 3L9 9"
                          stroke="#8D94A0"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className="flex items-center justify-center w-[72px] h-[35.27px] rounded-lg border border-palette-gray  hover:bg-palette-lightGray transition-all duration-200 cursor-pointer text-body2 text-text-subtitle"
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

