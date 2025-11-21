import { Header } from '@widgets/header'
import { BookSearch } from '@widgets/book-search'
import { BookList } from '@widgets/book-list'

export const MainPage = () => {
  return (
    <div className="min-h-screen bg-palette-lightGray">
      <Header />
      <main className="max-w-[960px] mx-auto pb-16 flex flex-col gap-8">
        <div className="mt-[72px]">
          <BookSearch />
        </div>
        <BookList />
      </main>
    </div>
  )
}

