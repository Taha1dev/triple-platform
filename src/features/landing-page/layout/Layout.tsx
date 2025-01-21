import ScrollToTop from '@/components/custom/utility/ScrollToTop'
import { Footer, NavBar } from '@/features/landing-page/components.barel'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar showLinks={false} />
      <ScrollToTop />
      <main className='container mx-auto flex-grow lg:px-4 lg:py-8 px-2 py-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
