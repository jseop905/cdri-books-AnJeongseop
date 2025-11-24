import { useState } from 'react'
import { BookSearch } from '@widgets/book-search'
import { BookList } from '@widgets/book-list'
import { useBookSearch, flattenBooks } from '@features/book-search'
import { addRecentSearch } from '@shared/lib/recent-searches'
import { PAGE_SIZE } from '@shared/config/constants'
import type { Book } from '@shared/api'

export const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTarget, setSearchTarget] = useState<'title' | 'isbn' | 'publisher' | 'person' | undefined>(undefined)
  const [hasSearched, setHasSearched] = useState(false)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBookSearch({
    query: searchQuery,
    target: searchTarget,
    enabled: hasSearched && searchQuery.trim().length > 0,
    size: PAGE_SIZE.BOOKS,
  })

  const books: Book[] = flattenBooks(data)
  const resultCount = data?.pages[0]?.meta.total_count ?? 0

  const handleSearch = (query: string, target?: 'title' | 'isbn' | 'publisher' | 'person') => {
    const trimmedQuery = query.trim()
    if (trimmedQuery.length > 0) {
      setSearchQuery(trimmedQuery)
      setSearchTarget(target)
      setHasSearched(true)
      addRecentSearch(trimmedQuery)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="mt-[72px]">
        <BookSearch 
          onSearch={handleSearch}
          resultCount={resultCount}
        />
      </div>
      <BookList 
        books={books}
        hasSearched={hasSearched}
        isLoading={isLoading}
        isError={isError}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </div>
  )
}

