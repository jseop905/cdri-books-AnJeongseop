
// 임시 더미 데이터
const dummyBooks = [
  {
    id: 1,
    title: 'React 완벽 가이드',
    author: '김리액트',
    cover: 'https://via.placeholder.com/150x200?text=Book+1',
  },
  {
    id: 2,
    title: 'TypeScript 마스터',
    author: '박타입',
    cover: 'https://via.placeholder.com/150x200?text=Book+2',
  },
  {
    id: 3,
    title: '프론트엔드 아키텍처',
    author: '이아키',
    cover: 'https://via.placeholder.com/150x200?text=Book+3',
  },
  {
    id: 4,
    title: '모던 웹 개발',
    author: '최모던',
    cover: 'https://via.placeholder.com/150x200?text=Book+4',
  },
]

export const BookList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
        {dummyBooks.map((book) => (
          <div 
            key={book.id} 
            className="flex flex-col bg-palette-white rounded-xl overflow-hidden shadow-sm transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="w-full aspect-[3/4] bg-palette-lightGray overflow-hidden">
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="text-body2-bold text-text-primary m-0 line-clamp-2">
                {book.title}
              </div>
              <div className="text-small text-text-secondary m-0">
                {book.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

