import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@shared/ui'
import { cn } from '@shared/lib/cn'
import { getRecentSearches, removeRecentSearch } from '@shared/lib/recent-searches'

interface BookSearchProps {
  onSearch: (query: string, target?: 'title' | 'isbn' | 'publisher' | 'person') => void
  resultCount: number
}

type SearchTarget = 'title' | 'person' | 'publisher'

const SEARCH_TARGET_LABELS: Record<SearchTarget, string> = {
  title: '제목',
  person: '저자명',
  publisher: '출판사',
}

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

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowRecentSearches(false)
    }
    if (detailSearchRef.current && !detailSearchRef.current.contains(event.target as Node)) {
      setShowDetailSearch(false)
    }
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setShowSelectDropdown(false)
    }
  }, [])

  useEffect(() => {
    if (showRecentSearches || showDetailSearch || showSelectDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showRecentSearches, showDetailSearch, showSelectDropdown, handleClickOutside])

  const handleInputFocus = useCallback(() => {
    const searches = getRecentSearches()
    setRecentSearches(searches)
    setShowRecentSearches(searches.length > 0)
  }, [])

  const handleRecentSearchClick = useCallback((query: string) => {
    setSearchQuery(query)
    setShowRecentSearches(false)
    onSearch(query)
  }, [onSearch])

  const handleDeleteSearch = useCallback((e: React.MouseEvent, query: string) => {
    e.stopPropagation()
    removeRecentSearch(query)
    const updatedSearches = getRecentSearches()
    setRecentSearches(updatedSearches)
    if (updatedSearches.length === 0) {
      setShowRecentSearches(false)
    }
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim().length > 0) {
      setDetailSearchQuery('')
      setDetailSearchTarget('title')
      setShowDetailSearch(false)
      onSearch(searchQuery.trim())
      setShowRecentSearches(false)
    }
  }, [searchQuery, onSearch])

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (searchQuery.trim().length > 0) {
        setDetailSearchQuery('')
        setDetailSearchTarget('title')
        setShowDetailSearch(false)
        onSearch(searchQuery.trim())
        setShowRecentSearches(false)
      }
    }
  }, [searchQuery, onSearch])

  const handleDetailSearchClick = useCallback(() => {
    setShowDetailSearch((prev) => !prev)
  }, [])

  const handleDetailSearchSubmit = useCallback(() => {
    const trimmedQuery = detailSearchQuery.trim()
    if (trimmedQuery.length > 0) {
      setSearchQuery('')
      onSearch(trimmedQuery, detailSearchTarget)
      setShowDetailSearch(false)
    }
  }, [detailSearchQuery, detailSearchTarget, onSearch])

  const handleDetailSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleDetailSearchSubmit()
    }
  }, [handleDetailSearchSubmit])

  const handleCloseDetailSearch = useCallback(() => {
    setShowDetailSearch(false)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title2 text-text-primary">
        도서 검색
      </div>
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <div ref={containerRef} className="relative w-full max-w-[480px]">
          <svg
            className="absolute top-1/2 left-2.5 -translate-y-1/2 w-5 h-5 pointer-events-none z-10"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM18 18l-4.35-4.35"
              stroke="#353C49"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            className={cn(
              'w-full h-[50px] pl-[51px] pr-[10px] py-[10px] text-caption text-text-subtitle bg-palette-lightGray border-none transition-all duration-200',
              'focus:outline-none focus:ring-0 placeholder:text-text-subtitle',
              {
                'rounded-t-3xl rounded-b-none': showRecentSearches && recentSearches.length > 0,
                'rounded-3xl': !showRecentSearches || recentSearches.length === 0,
              }
            )}
          />
          {showRecentSearches && recentSearches.length > 0 && (
            <div className="bg-palette-lightGray absolute top-full left-0 flex w-full flex-col gap-4 rounded-b-3xl py-6 pr-6 pl-[51px] z-10 max-h-[300px] overflow-y-auto">
              {recentSearches.map((search) => (
                <div
                  key={search}
                  className="flex justify-between items-center"
                  data-testid="history-item"
                >
                  <button
                    type="button"
                    onClick={() => handleRecentSearchClick(search)}
                    className="flex-1 text-left text-caption text-text-subtitle cursor-pointer"
                  >
                    {search}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteSearch(e, search)}
                    className="shrink-0 cursor-pointer ml-2"
                    aria-label="삭제"
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
                        stroke="#222222"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
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
              <div className="px-6 pt-[36px] pb-[36px] flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className="relative w-[100px]" ref={selectRef}>
                    <button
                      type="button"
                      onClick={() => setShowSelectDropdown(!showSelectDropdown)}
                      className="w-full h-[36px] border-0 border-b border-palette-gray rounded-none bg-transparent cursor-pointer flex items-center justify-between relative"
                      aria-label="검색 타겟 선택"
                      aria-expanded={showSelectDropdown}
                    >
                      <div className="pl-2 text-body2-bold text-text-primary">
                        {SEARCH_TARGET_LABELS[detailSearchTarget]}
                      </div>
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
                    </button>
                    {showSelectDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-palette-white border border-palette-gray rounded-lg shadow-lg z-50">
                        {(Object.keys(SEARCH_TARGET_LABELS) as SearchTarget[]).map((target) => {
                          if (target === detailSearchTarget) return null
                          return (
                            <button
                              key={target}
                              type="button"
                              onClick={() => {
                                setDetailSearchTarget(target)
                                setShowSelectDropdown(false)
                              }}
                              className="w-full px-4 py-2 hover:bg-palette-lightGray cursor-pointer transition-colors text-body2 text-text-subtitle text-left"
                            >
                              {SEARCH_TARGET_LABELS[target]}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="검색어 입력"
                      value={detailSearchQuery}
                      onChange={(e) => setDetailSearchQuery(e.target.value)}
                      onKeyDown={handleDetailSearchKeyDown}
                      className="w-full h-[36px] px-2 border-0 border-b border-palette-gray rounded-none text-caption transition-all duration-200 focus:outline-none focus:border-palette-primary focus:ring-0 placeholder:text-text-subtitle"
                    />
                    </div>
                </div>
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

