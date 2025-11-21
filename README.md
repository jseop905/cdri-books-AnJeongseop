# CDRI Books

React.js + TypeScript + React Query 프로젝트 (FSD 구조)

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **React Query (@tanstack/react-query)** - 서버 상태 관리
- **Vite** - 빌드 도구
- **FSD (Feature-Sliced Design)** - 아키텍처 구조

## 프로젝트 구조 (FSD)

```
src/
├── app/          # 앱 초기화, 프로바이더, 라우팅
├── processes/    # 비즈니스 프로세스 (예: 인증 플로우)
├── pages/        # 페이지 컴포넌트
├── widgets/      # 복합 UI 블록
├── features/     # 비즈니스 기능
├── entities/     # 비즈니스 엔티티
└── shared/       # 공유 코드 (UI, 유틸, API, 설정)
```

## Path Aliases

프로젝트에서 다음 alias를 사용할 수 있습니다:

- `@app/*` - app 레이어
- `@processes/*` - processes 레이어
- `@pages/*` - pages 레이어
- `@widgets/*` - widgets 레이어
- `@features/*` - features 레이어
- `@entities/*` - entities 레이어
- `@shared/*` - shared 레이어

## 예시 사용법

```typescript
// shared에서 UI 컴포넌트 import
import { Button } from '@shared/ui/button'

// features에서 기능 import
import { BookList } from '@features/book-list'

// entities에서 엔티티 import
import { Book } from '@entities/book'
```

