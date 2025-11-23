import { BookList } from '@widgets/book-list'
import { useFavoritesList } from '@features/favorites-list'

export const FavoritesSection = () => {
  const {
    displayedBooks,
    hasNextPage,
    resultCount,
    onLoadMore,
    onFavoriteChange,
  } = useFavoritesList()

  return (
    <div className="mt-[72px] flex flex-col gap-8">
      {/* 타이틀 및 결과 카운트 */}
      <div className="flex flex-col gap-4">
        <div className="text-title2 text-text-primary">
          내가 찜한 책
        </div>
        <div className="text-caption text-text-primary leading-6">
          찜한 책 총 <span className="text-palette-primary">{resultCount}</span>건
        </div>
      </div>

      {/* 책 리스트 */}
      <BookList 
        books={displayedBooks}
        hasSearched={true}
        isLoading={false}
        isError={false}
        hasNextPage={hasNextPage}
        onLoadMore={onLoadMore}
        onFavoriteChange={onFavoriteChange}
      />
    </div>
  )
}

