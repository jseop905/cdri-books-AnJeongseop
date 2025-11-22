import { useState, useRef, useEffect } from 'react'
import { Input, Button } from '@shared/ui'
import searchIcon from '@shared/assets/icons/icon-search.png'
import { getRecentSearches, removeRecentSearch } from '@shared/lib/recent-searches'

interface BookSearchProps {
  onSearch: (query: string, target?: 'title' | 'isbn' | 'publisher' | 'person') => void
  resultCount: number
}

type SearchTarget = 'title' | 'person' | 'publisher'

export const BookSearch = ({ onSearch, resultCount }: BookSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showRecentSearches, setShowRecentSearches] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showDetailSearch, setShowDetailSearch] = useState(false)
  const [detailSearchTarget, setDetailSearchTarget] = useState<SearchTarget>('title')
  const [detailSearchQuery, setDetailSearchQuery] = useState('')
  const [showSelectDropdown, setShowSelectDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const detailSearchRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowRecentSearches(false)
      }
      if (detailSearchRef.current && !detailSearchRef.current.contains(event.target as Node)) {
        setShowDetailSearch(false)
      }
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowSelectDropdown(false)
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
      // 상세 검색 내용 초기화
      setDetailSearchQuery('')
      setDetailSearchTarget('title')
      setShowDetailSearch(false)
      onSearch(searchQuery.trim())
    }
  }

  const handleDetailSearchClick = () => {
    setShowDetailSearch(!showDetailSearch)
  }

  const handleDetailSearchSubmit = () => {
    const trimmedQuery = detailSearchQuery.trim()
    if (trimmedQuery.length > 0) {
      // 기본 검색 내용 초기화
      setSearchQuery('')
      onSearch(trimmedQuery, detailSearchTarget)
      setShowDetailSearch(false)
      // 상세 검색 내용은 유지 (초기화하지 않음)
    }
  }

  const handleDetailSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleDetailSearchSubmit()
    }
  }

  const handleCloseDetailSearch = () => {
    setShowDetailSearch(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title2 text-text-primary">
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
            className="h-[50px] pl-[50px] pr-[10px] py-[10px] text-caption text-text-subtitle bg-palette-lightGray border-none"
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
        <div className="relative" ref={detailSearchRef}>
          <div
            className="flex items-center justify-center w-[72px] h-[35.27px] rounded-lg border border-palette-gray hover:bg-palette-lightGray transition-all duration-200 cursor-pointer text-body2 text-text-subtitle"
            onClick={handleDetailSearchClick}
          >
            상세검색
          </div>
          {showDetailSearch && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-palette-white rounded-lg shadow-lg z-50">
              {/* 닫기 버튼 영역 */}
              <div className="flex justify-end p-1 pb-0">
                <button
                  type="button"
                  onClick={handleCloseDetailSearch}
                  className="w-6 h-6 flex items-center justify-center hover:bg-palette-lightGray rounded transition-colors"
                  aria-label="닫기"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="#8D94A0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              {/* 팝업 본문 */}
              <div className="px-6 pt-[36px] pb-[36px] flex flex-col gap-4">
                {/* 셀렉트 박스와 검색어 입력 */}
                <div className="flex gap-2">
                  <div className="relative w-[100px]" ref={selectRef}>
                    {/* 셀렉트 박스 */}
                    <div
                      onClick={() => setShowSelectDropdown(!showSelectDropdown)}
                      className="w-full h-[36px] border-0 border-b border-palette-gray rounded-none bg-transparent cursor-pointer flex items-center justify-between relative"
                    >
                      <div className="pl-2 text-body2-bold text-text-primary">
                        {detailSearchTarget === 'title' ? '제목' : detailSearchTarget === 'person' ? '저자명' : '출판사'}
                      </div>
                      {/* 화살표 아이콘 */}
                      <div className="pr-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="#8D94A0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* 드롭다운 메뉴 */}
                    {showSelectDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-palette-white border border-palette-gray rounded-lg shadow-lg z-50">
                        {detailSearchTarget !== 'title' && (
                          <div
                            onClick={() => {
                              setDetailSearchTarget('title')
                              setShowSelectDropdown(false)
                            }}
                            className="px-4 py-2 hover:bg-palette-lightGray cursor-pointer transition-colors text-body2 text-text-subtitle"
                          >
                            제목
                          </div>
                        )}
                        {detailSearchTarget !== 'person' && (
                          <div
                            onClick={() => {
                              setDetailSearchTarget('person')
                              setShowSelectDropdown(false)
                            }}
                            className="px-4 py-2 hover:bg-palette-lightGray cursor-pointer transition-colors text-body2 text-text-subtitle"
                          >
                            저자명
                          </div>
                        )}
                        {detailSearchTarget !== 'publisher' && (
                          <div
                            onClick={() => {
                              setDetailSearchTarget('publisher')
                              setShowSelectDropdown(false)
                            }}
                            className="px-4 py-2 hover:bg-palette-lightGray cursor-pointer transition-colors text-body2 text-text-subtitle"
                          >
                            출판사
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="검색어 입력"
                      value={detailSearchQuery}
                      onChange={(e) => setDetailSearchQuery(e.target.value)}
                      onKeyPress={handleDetailSearchKeyPress}
                      className="w-full h-[36px] px-2 border-0 border-b border-palette-gray rounded-none text-caption transition-all duration-200 focus:outline-none focus:border-palette-primary focus:ring-0 placeholder:text-text-subtitle"
                    />
                  </div>
                </div>

                {/* 검색하기 버튼 */}
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleDetailSearchSubmit}
                  className="w-full py-3 rounded text-body2"
                >
                  검색하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
      <div className="flex items-center gap-4">
        <div className="text-caption text-text-primary leading-6">
          도서 검색 결과
        </div>
        <div className="text-caption text-text-primary leading-6">
          총 <span className="text-palette-primary">{resultCount}</span>건
        </div>
      </div>
    </div>
  )
}

