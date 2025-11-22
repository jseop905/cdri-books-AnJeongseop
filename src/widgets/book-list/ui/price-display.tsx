import { memo } from 'react'

interface PriceDisplayProps {
  price: number
  salePrice: number
}

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

