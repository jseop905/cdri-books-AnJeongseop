const KAKAO_API_BASE_URL = 'https://dapi.kakao.com/v3/search/book'

export interface SearchBookParams {
  query: string
  sort?: 'accuracy' | 'latest'
  page?: number
  size?: number
  target?: 'title' | 'isbn' | 'publisher' | 'person'
}

export interface Book {
  title: string
  contents: string
  url: string
  isbn: string
  datetime: string
  authors: string[]
  publisher: string
  translators: string[]
  price: number
  sale_price: number
  thumbnail: string
  status: string
}

export interface SearchBookMeta {
  total_count: number
  pageable_count: number
  is_end: boolean
}

export interface SearchBookResponse {
  meta: SearchBookMeta
  documents: Book[]
}

export const searchBooks = async (
  params: SearchBookParams & { page?: number }
): Promise<SearchBookResponse> => {
  const restApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY

  if (!restApiKey) {
    throw new Error('Kakao REST API Key is not configured')
  }

  const searchParams = new URLSearchParams()
  searchParams.append('query', params.query)

  if (params.sort) {
    searchParams.append('sort', params.sort)
  }
  
  const page = params.page ?? 1
  searchParams.append('page', page.toString())
  
  if (params.size) {
    searchParams.append('size', params.size.toString())
  }
  if (params.target) {
    searchParams.append('target', params.target)
  }

  const response = await fetch(`${KAKAO_API_BASE_URL}?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${restApiKey}`,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

