import { Header } from '@widgets/header'
import { BookSearchSection } from '@widgets/book-search-section'

export const MainPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[960px] mx-auto pb-16">
        <BookSearchSection />
      </main>
    </div>
  )
}

