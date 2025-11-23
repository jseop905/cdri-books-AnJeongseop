import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from '@pages/main-page'
import { FavoritesPage } from '@pages/favorites-page'
import { MainLayout } from './layouts'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

