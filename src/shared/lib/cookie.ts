// Cookie 유틸리티 함수
import { RECENT_SEARCHES } from '@shared/config/constants'

/**
 * Cookie에 값을 저장합니다.
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param days 만료일 (기본값: 30일)
 * @returns 저장 성공 여부
 */
export const setCookie = (name: string, value: string, days: number = RECENT_SEARCHES.COOKIE_EXPIRY_DAYS): boolean => {
  try {
    // 쿠키 크기 제한 체크 (약 4KB, 안전하게 3.5KB로 제한)
    const encodedValue = encodeURIComponent(value)
    if (encodedValue.length > 3500) {
      console.warn(`Cookie "${name}" is too large (${encodedValue.length} bytes). Max size is ~4KB.`)
      return false
    }

    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/`
    
    // 저장 확인
    const saved = getCookie(name)
    if (saved !== value) {
      console.warn(`Cookie "${name}" may not have been saved correctly.`)
      return false
    }
    
    return true
  } catch (error) {
    console.error(`Failed to set cookie "${name}":`, error)
    return false
  }
}

/**
 * Cookie에서 값을 가져옵니다.
 * @param name 쿠키 이름
 * @returns 쿠키 값 또는 null
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`
  const cookies = document.cookie.split(';')
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length))
    }
  }
  return null
}

/**
 * Cookie를 삭제합니다.
 * @param name 쿠키 이름
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
}

