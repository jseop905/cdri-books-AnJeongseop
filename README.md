# CDRI 사전과제
카카오 도서 검색 API를 활용한 도서 검색 및 찜 관리 웹 애플리케이션입니다.

## 📋 프로젝트 개요
카카오 도서 검색 API를 활용하여 도서를 검색하고, 관심 있는 도서를 찜 목록에 저장하여 관리할 수 있는 SPA(Single Page Application)입니다.

### 주요 기능
- **도서 검색**: 제목, 저자명, 출판사로 도서 검색
- **무한 스크롤**: Intersection Observer를 활용한 페이지네이션
- **찜 기능**: 관심 있는 도서를 localStorage에 저장하여 관리
- **최근 검색어**: Cookie를 활용한 최근 검색어 저장 및 관리
- **반응형 UI**: Tailwind CSS를 활용한 모던한 디자인

## 🚀 실행 방법 및 환경 설정
### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정**
   
   프로젝트 루트에 `.env` 파일을 생성하고 카카오 REST API 키를 설정합니다.
   ```env
   VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key_here
   ```
   
   > 카카오 REST API 키는 [카카오 개발자 콘솔](https://developers.kakao.com/)에서 발급받을 수 있습니다.

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   
   브라우저에서 `http://localhost:5173` (또는 표시된 포트)로 접속합니다.

4. **빌드**
   ```bash
   npm run build
   ```

5. **프로덕션 미리보기**
   ```bash
   npm run preview
   ```

## 📁 폴더 구조 및 주요 코드 설명

본 프로젝트는 **FSD (Feature-Sliced Design)** 아키텍처를 따릅니다.

```
src/
├── app/                    # 애플리케이션 초기화
│   ├── app.tsx            # 라우팅 설정
│   └── providers/         # 전역 프로바이더 (React Query 등)
│
├── pages/                  # 페이지 컴포넌트
│   ├── main-page/         # 메인 페이지 (도서 검색)
│   └── favorites-page/    # 찜 목록 페이지
│
├── widgets/                # 복합 UI 블록
│   ├── book-search/       # 검색 UI (검색창, 상세검색, 최근검색어)
│   ├── book-list/         # 도서 목록 (카드/상세 뷰, 무한스크롤)
│   ├── book-search-section/ # 검색 섹션 통합
│   └── header/            # 헤더 네비게이션
│
├── features/               # 비즈니스 기능
│   └── book-search/       # 도서 검색 훅 (React Query infinite query)
│
├── entities/               # 비즈니스 엔티티 (현재 미사용)
│
└── shared/                 # 공유 코드
    ├── api/               # API 클라이언트 (카카오 도서 검색 API)
    ├── lib/               # 유틸리티 함수
    │   ├── favorites.ts   # 찜 기능 (localStorage)
    │   ├── recent-searches.ts # 최근 검색어 (Cookie)
    │   └── cookie.ts      # Cookie 유틸리티
    ├── ui/                # 공통 UI 컴포넌트
    │   ├── button/        # Button 컴포넌트
    │   ├── input/         # Input 컴포넌트
    │   └── tooltip/       # Tooltip 컴포넌트
    └── config/            # 설정 (상수, 색상, 타이포그래피)
```

### 주요 코드 설명

#### 1. 도서 검색 기능 (`features/book-search/use-book-search.ts`)

React Query의 `useInfiniteQuery`를 활용하여 무한 스크롤을 구현합니다.

```typescript
export const useBookSearch = (options: UseBookSearchOptions) => {
  return useInfiniteQuery<SearchBookResponse>({
    queryKey: ['bookSearch', query, sort, size, target],
    queryFn: ({ pageParam = 1 }) => searchBooks({ ... }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.is_end) {
        return allPages.length + 1
      }
      return undefined
    },
    staleTime: API_CONFIG.STALE_TIME, // 5분 캐싱
  })
}
```

#### 2. 찜 기능 (`shared/lib/favorites.ts`)

localStorage를 활용하여 찜 목록을 관리하며, 같은 탭과 다른 탭 간 동기화를 지원합니다.

```typescript
export const toggleFavorite = (book: Book): boolean => {
  if (isFavorite(book.isbn)) {
    removeFavorite(book.isbn)
    return false
  } else {
    return addFavorite(book)
  }
}
```

#### 3. 무한 스크롤 (`widgets/book-list/book-list.tsx`)

Intersection Observer API를 활용하여 스크롤 하단 도달 시 자동으로 다음 페이지를 로드합니다.

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        onLoadMore()
      }
    },
    { threshold: 0.1, rootMargin: '50px' }
  )
  // ...
}, [hasNextPage, onLoadMore, isLoading, isFetchingNextPage])
```

## 🛠 기술 스택 및 라이브러리 선택 이유

### 핵심 기술 스택

| 기술 | 버전 | 선택 이유 |
|------|------|----------|
| **React** | 18.3 | 컴포넌트 기반 UI 라이브러리, 널리 사용되는 생태계 |
| **TypeScript** | 5.5 | 타입 안정성으로 런타임 에러 방지 및 개발 생산성 향상 |
| **Vite** | 5.4 | 빠른 개발 서버 및 빌드 속도, HMR 지원 |
| **React Router** | 6.26 | 클라이언트 사이드 라우팅, 간단한 API |
| **Tailwind CSS** | 3.4 | 유틸리티 기반 CSS, 빠른 스타일링 및 일관성 유지 |

### 주요 라이브러리

#### @tanstack/react-query (v5.56)

**선택 이유:**
- 서버 상태 관리에 최적화된 라이브러리
- 자동 캐싱, 리페칭, 에러 핸들링 등 내장 기능
- `useInfiniteQuery`로 무한 스크롤 구현이 간단함
- staleTime 설정으로 불필요한 API 호출 방지

**활용:**
- 도서 검색 결과 캐싱 (5분)
- 무한 스크롤 페이지네이션
- 로딩 및 에러 상태 관리

#### clsx & tailwind-merge

**선택 이유:**
- 조건부 클래스명 병합을 위한 유틸리티
- Tailwind CSS 클래스 충돌 방지
- 컴포넌트 스타일링 유연성 확보

### 아키텍처: FSD (Feature-Sliced Design)

**선택 이유:**
- 확장 가능하고 유지보수하기 쉬운 구조
- 레이어별 명확한 책임 분리
- 팀 협업 시 코드 충돌 최소화
- 재사용 가능한 컴포넌트 구조

**레이어 구조:**
- `app`: 애플리케이션 초기화 및 전역 설정
- `pages`: 라우트별 페이지 컴포넌트
- `widgets`: 복합 UI 블록 (도메인 특화)
- `features`: 비즈니스 기능 (훅, 로직)
- `shared`: 공유 리소스 (UI, 유틸, API)

## ✨ 강조하고 싶은 기능

### 1. 성능 최적화

- **React.memo**: 리스트 아이템 불필요한 리렌더링 방지
- **useCallback**: 함수 참조 안정화로 자식 컴포넌트 최적화
- **React Query 캐싱**: 동일한 검색어 재요청 시 캐시 활용
- **Intersection Observer**: 효율적인 무한 스크롤 구현

```typescript
// BookCard 컴포넌트 메모이제이션
export const BookCard = memo(({ book, isFavorite, ... }: BookCardProps) => {
  // ...
})
```

### 2. 사용자 경험 (UX)

- **최근 검색어**: Cookie 기반 최근 검색어 저장 (최대 8개, 30일 유지)
- **상세 검색**: 제목/저자명/출판사 필드별 검색 지원
- **로딩 상태**: 검색 중 및 추가 로드 중 상태 표시
- **에러 처리**: API 오류 시 사용자 친화적 메시지 표시
- **빈 상태 처리**: 검색 전/결과 없음 상태별 UI 제공

### 3. 상태 관리

- **서버 상태**: React Query로 관리 (검색 결과, 페이지네이션)
- **클라이언트 상태**: React useState로 관리 (UI 상태)
- **영구 저장**: localStorage (찜 목록), Cookie (최근 검색어)
- **탭 간 동기화**: Custom Event와 Storage Event 활용

### 4. 타입 안정성

- TypeScript로 모든 API 응답 및 함수 시그니처 타입 정의
- 인터페이스 기반 컴포넌트 Props 타입 지정
- 타입 가드로 런타임 에러 방지

### 5. 코드 품질

- **ESLint**: 코드 품질 및 일관성 유지
- **Path Aliases**: `@shared`, `@widgets` 등으로 import 경로 단순화
- **상수 관리**: 중앙화된 설정 파일로 매직 넘버/문자열 제거
- **에러 핸들링**: try-catch 및 에러 로깅으로 안정성 확보

## 📝 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 린트 검사
npm run lint
```

## 🔧 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `VITE_KAKAO_REST_API_KEY` | 카카오 REST API 키 | ✅ |

## 📄 라이선스

본 프로젝트는 사전과제용으로 작성되었습니다.
