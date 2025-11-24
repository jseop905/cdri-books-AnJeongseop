# CDRI 사전과제
카카오 도서 검색 API를 활용한 도서 검색 및 찜 관리 웹 애플리케이션입니다.

본 프로젝트는 사전과제용으로 작성되었습니다.

## 프로젝트 개요
카카오 도서 검색 API를 활용하여 도서를 검색하고, 관심 있는 도서를 찜 목록에 저장하여 관리할 수 있는 SPA(Single Page Application)입니다.

**주요 기능:**
- 도서 검색 (제목/저자명/출판사 필드별 검색)
- 무한 스크롤을 통한 페이지네이션
- 찜 목록 관리 (localStorage 기반)
- 최근 검색어 저장 및 조회

## 실행 방법 및 환경 설정
### 필수 요구사항
- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행
1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정**
   
   프로젝트 루트에 `.env` 파일을 생성하고 필요한 값을 설정합니다.
   
   > .env 파일은 별도로 전달합니다.

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **빌드** (필요 시)
   ```bash
   npm run build
   ```

## 📁 폴더 구조 및 주요 코드 설명
본 프로젝트는 **FSD (Feature-Sliced Design)** 아키텍처를 따릅니다.

```
src/
├── app/                   # 애플리케이션 초기화
│   ├── app.tsx            # 라우팅 설정
│   └── providers/         # 전역 프로바이더 (React Query 등)
│
├── pages/                 # 페이지 컴포넌트
│   ├── main-page/         # 메인 페이지 (도서 검색)
│   └── favorites-page/    # 찜 목록 페이지
│
├── widgets/               # 복합 UI 블록
│   ├── book-search/       # 검색 UI (검색창, 상세검색, 최근검색어)
│   ├── book-list/         # 도서 목록 (리스트, 카드/상세 뷰, 무한스크롤)
│   └── header/            # 헤더 네비게이션
│
├── features/              # 비즈니스 기능
│   ├── book-search/       # 도서 검색 훅 (React Query infinite query)
│   └── favorites-list/    # 찜 목록 훅 (localStorage 기반 페이지네이션)
│
└── shared/                # 공유 코드
    ├── api/               # API 클라이언트 (카카오 도서 검색 API)
    ├── lib/               # 유틸리티 함수
    │   ├── favorites.ts   # 찜 기능 (localStorage)
    │   ├── recent-searches.ts # 최근 검색어 (localStorage)
    │   └── cn.ts          # className 유틸리티
    ├── ui/                # 공통 UI 컴포넌트
    │   ├── button/        # Button 컴포넌트
    │   ├── input/         # Input 컴포넌트
    │   └── tooltip/       # Tooltip 컴포넌트
    └── config/            # 설정 (상수, 색상)
```

### 주요 코드 설명
- **도서 검색**: React Query의 `useInfiniteQuery`로 페이지네이션된 검색 결과 관리 및 캐싱
- **로컬 저장소**: localStorage를 활용한 찜 목록 및 최근 검색어 관리 (브라우저 종료 후에도 유지)
- **무한 스크롤**: Intersection Observer API로 스크롤 하단 도달 시 자동 다음 페이지 로드

## 🛠 라이브러리 선택 이유

**Tailwind CSS**
- 유틸리티 클래스 기반으로 빠른 스타일링
- 빌드 시 사용하지 않는 CSS 자동 제거로 번들 크기 최적화
- 일관된 디자인 시스템 구축 용이

**Vite**
- 빠른 개발 서버 시작 및 HMR(Hot Module Replacement)
- ES 모듈 기반 빌드로 프로덕션 빌드 속도 향상

**React Router**
- SPA에서 클라이언트 사이드 라우팅 제공
- 선언적 라우팅과 중첩 라우트 지원
- React 생태계에서 표준 라우팅 라이브러리

**clsx & tailwind-merge**
- 동적 클래스명 조합을 위한 유틸리티
- `tailwind-merge`는 Tailwind 클래스 충돌 자동 해결
- 조건부 스타일링을 간결하게 처리

## ✨ 강조하고 싶은 기능

### 1. 성능 최적화
- **React.memo & useCallback**: 리스트 아이템 불필요한 리렌더링 방지
- **React Query 캐싱**: 동일한 검색어 재요청 시 캐시 활용 (5분 staleTime)
- **Intersection Observer**: 효율적인 무한 스크롤 구현

### 2. 사용자 경험 (UX)
- **최근 검색어**: localStorage 기반 저장 (최대 8개, 브라우저 종료 후에도 유지)
- **상세 검색**: 제목/저자명/출판사 필드별 검색 지원
- **로딩/에러/빈 상태**: 각 상태별 적절한 UI 제공

### 3. 상태 관리
- **서버 상태**: React Query로 관리 (검색 결과, 페이지네이션)
- **클라이언트 상태**: React useState로 관리 (UI 상태)
- **로컬 저장소**: localStorage를 활용한 데이터 저장 (찜 목록, 최근 검색어)

### 4. 타입 안정성 및 코드 품질
- TypeScript로 모든 API 응답 및 함수 시그니처 타입 정의
- Path Aliases (`@shared`, `@widgets`)로 import 경로 단순화
- 중앙화된 설정 파일로 매직 넘버/문자열 제거
- ESLint를 통한 코드 품질 및 일관성 유지
