export const PAGE_SIZE = {
  BOOKS: 10,
  FAVORITES: 10,
} as const

export const RECENT_SEARCHES = {
  MAX_COUNT: 8,
} as const

export const API_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
  RETRY_COUNT: 1,
} as const

export const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  RECENT_SEARCHES: 'recent_searches',
} as const

