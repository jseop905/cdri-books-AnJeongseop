# 디자인 시스템 사용 가이드

## 색상 (Color)

### Palette 색상
배경, 테두리, 강조 등에 사용하는 기본 색상입니다.

**사용 방법:**
```tsx
// Tailwind 클래스
<div className="bg-palette-primary">  // #4880EE
<div className="bg-palette-red">      // #E84118
<div className="bg-palette-gray">     // #DADADA
<div className="bg-palette-lightGray"> // #F2F4F6
<div className="bg-palette-white">    // #FFFFFF
<div className="bg-palette-black">    // #222222

// TypeScript
import { palette } from '@shared/config'
const color = palette.primary
```

**사용 규칙:**
- ✅ `bg-palette-*`, `text-palette-*`, `border-palette-*` 사용
- ❌ 하드코딩된 색상 값 사용 금지 (`#4880EE`, `bg-blue-600` 등)
- ❌ Tailwind 기본 색상 사용 금지 (`bg-gray-500`, `text-blue-600` 등)

### Text 색상
텍스트에만 사용하는 색상입니다.

**사용 방법:**
```tsx
// Tailwind 클래스
<p className="text-text-primary">     // #353C49
<p className="text-text-secondary">   // #6D7582
<p className="text-text-subtitle">    // #8D94A0

// TypeScript
import { textColors } from '@shared/config'
const textColor = textColors.primary
```

**사용 규칙:**
- ✅ 텍스트에는 `text-text-*` 사용
- ✅ 배경/테두리에는 `palette-*` 사용
- ❌ 텍스트에 `text-palette-*` 사용 금지

## 타이포그래피 (Typography)

### 사용 방법

**Typography 컴포넌트 사용 (권장):**
```tsx
import { Typography } from '@shared/ui'

<Typography variant="title1">제목 1</Typography>
<Typography variant="title2">제목 2</Typography>
<Typography variant="title3">제목 3</Typography>
<Typography variant="body1">본문 1</Typography>
<Typography variant="body2">본문 2</Typography>
<Typography variant="body2Bold">본문 2 Bold</Typography>
<Typography variant="caption">캡션</Typography>
<Typography variant="small">작은 텍스트</Typography>

// HTML 태그 지정
<Typography variant="title1" as="h2">제목</Typography>
```

**Tailwind 클래스 직접 사용:**
```tsx
<h1 className="text-title1">제목 1</h1>
<p className="text-body1">본문 1</p>
<span className="text-body2-bold">본문 2 Bold</span>
```

**사용 규칙:**
- ✅ `Typography` 컴포넌트 또는 `text-*` 클래스 사용
- ❌ 하드코딩된 폰트 크기/두께 사용 금지 (`text-2xl`, `font-bold` 등)
- ❌ `font-size`, `font-weight` 직접 지정 금지

## 예시

### ✅ 올바른 사용
```tsx
import { Typography } from '@shared/ui'

<div className="bg-palette-lightGray">
  <Typography variant="title1" className="text-text-primary">
    제목
  </Typography>
  <Typography variant="body1" className="text-text-secondary">
    본문
  </Typography>
</div>
```

### ❌ 잘못된 사용
```tsx
// 하드코딩된 색상
<div className="bg-blue-600 text-gray-900">

// 하드코딩된 타이포그래피
<h1 className="text-2xl font-bold">제목</h1>

// 텍스트에 palette 색상 사용
<p className="text-palette-primary">텍스트</p>
```

