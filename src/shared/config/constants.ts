/**
 * 애플리케이션 전역 상수
 */

// 페이지네이션
export const PAGE_SIZE = {
  BOOKS: 10, // 도서 목록 페이지당 표시 개수
  FAVORITES: 10, // 찜 목록 페이지당 표시 개수
} as const

// 최근 검색어
export const RECENT_SEARCHES = {
  MAX_COUNT: 8, // 최대 저장 개수
  COOKIE_EXPIRY_DAYS: 30, // 쿠키 만료일
} as const

// API/쿼리
export const API_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5분 (밀리초)
  RETRY_COUNT: 1, // 재시도 횟수
} as const

// Storage 키
export const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  RECENT_SEARCHES: 'recent_searches',
} as const

