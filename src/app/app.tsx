import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from '@pages/main-page'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/favorites" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

