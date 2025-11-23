import { Outlet } from 'react-router-dom'
import { Header } from '@widgets/header'

export const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[960px] mx-auto pb-16">
        <Outlet />
      </main>
    </div>
  )
}

