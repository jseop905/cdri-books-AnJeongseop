// 카카오 도서 검색 API

const KAKAO_API_BASE_URL = 'https://dapi.kakao.com/v3/search/book'

export interface SearchBookParams {
  query: string // 검색어 (필수)
  sort?: 'accuracy' | 'latest' // 정렬 옵션
  page?: number // 결과 페이지 번호 (1~50)
  size?: number // 한 페이지에 보여질 문서 수 (1~50)
  target?: 'title' | 'isbn' | 'publisher' | 'person' // 검색 필드 제한
}

export interface Book {
  title: string // 도서 제목
  contents: string // 도서 소개
  url: string // 도서 상세 URL
  isbn: string // ISBN10(10자리) 또는 ISBN13(13자리) 형식의 국제 표준 도서번호
  datetime: string // 도서 출판날짜, ISO 8601 형식 [YYYY]-[MM]-[DD]T[hh]:[mm]:[ss].000+[tz]
  authors: string[] // 도서 저자 리스트
  publisher: string // 도서 출판사
  translators: string[] // 도서 번역자 리스트
  price: number // 도서 정가
  sale_price: number // 도서 판매가
  thumbnail: string // 도서 표지 미리보기 URL
  status: string // 도서 판매 상태 정보 (정상, 품절, 절판 등)
}

export interface SearchBookMeta {
  total_count: number // 검색된 문서 수
  pageable_count: number // 중복된 문서를 제외하고, 처음부터 요청 페이지까지의 노출 가능 문서 수
  is_end: boolean // 현재 페이지가 마지막 페이지인지 여부, 값이 false면 page를 증가시켜 다음 페이지를 요청할 수 있음
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
  // page는 pageParam으로 전달되거나 params.page로 전달됨
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

