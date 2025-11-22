import { memo } from 'react'

interface PriceDisplayProps {
  price: number
  salePrice: number
}

/**
 * 가격 표시 컴포넌트
 * 할인가가 있으면 원가와 할인가를 모두 표시하고, 없으면 원가만 표시합니다.
 * 
 * FSD 구조: widgets/book-list/ui
 * - 도메인 특화 컴포넌트이므로 widgets 내부에 위치
 * - 재사용 가능하지만 도서 도메인에 특화되어 있어 shared/ui가 아닌 widgets 내부에 배치
 * 
 * 메모이제이션: React.memo로 감싸서 price와 salePrice가 변경되지 않으면 리렌더링 방지
 * - 가격 정보는 자주 변경되지 않으므로 메모이제이션 효과가 큼
 * - BookDetail에서 사용되며, 다른 props가 변경되어도 가격이 같으면 리렌더링 방지
 */
export const PriceDisplay = memo(({ price, salePrice }: PriceDisplayProps) => {
  const hasDiscount = salePrice > 0 && salePrice < price

  if (hasDiscount) {
    return (
      <>
        {/* 원가 */}
        <div className="flex items-center gap-2">
          <div className="text-small text-text-subtitle leading-[22px]">
            원가
          </div>
          <div className="line-through text-[18px] leading-[26px] font-light text-text-primary">
            {price.toLocaleString()}원
          </div>
        </div>
        {/* 할인가 */}
        <div className="flex items-center gap-2">
          <div className="text-small text-text-subtitle leading-[22px]">
            할인가
          </div>
          <div className="text-[18px] leading-[26px] font-bold text-text-primary">
            {salePrice.toLocaleString()}원
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="text-small text-text-subtitle leading-[22px]">
        원가
      </div>
      <div className="text-[18px] leading-[26px] font-light text-text-primary">
        {price.toLocaleString()}원
      </div>
    </div>
  )
})

