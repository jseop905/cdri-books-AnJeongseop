import { useInfiniteQuery } from '@tanstack/react-query'
import { searchBooks, type SearchBookParams, type SearchBookResponse, type Book } from '@shared/api'
import { PAGE_SIZE, API_CONFIG } from '@shared/config/constants'

export interface UseBookSearchOptions {
  query: string
  sort?: SearchBookParams['sort']
  size?: number
  target?: SearchBookParams['target']
  enabled?: boolean
}

export const useBookSearch = (options: UseBookSearchOptions) => {
  const { query, sort, size = PAGE_SIZE.BOOKS, target, enabled = true } = options

  return useInfiniteQuery<SearchBookResponse>({
    queryKey: ['bookSearch', query, sort, size, target],
    queryFn: ({ pageParam = 1 }) =>
      searchBooks({
        query,
        sort,
        page: pageParam as number,
        size,
        target,
      }),
    getNextPageParam: (lastPage, allPages) => {
      // is_end가 false이면 다음 페이지가 있음
      if (!lastPage.meta.is_end) {
        return allPages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
    enabled: enabled && query.trim().length > 0,
    staleTime: API_CONFIG.STALE_TIME,
  })
}

// 모든 페이지의 도서를 평탄화하는 헬퍼 함수
export const flattenBooks = (data: { pages: SearchBookResponse[] } | undefined): Book[] => {
  if (!data) return []
  return data.pages.flatMap((page) => page.documents)
}

