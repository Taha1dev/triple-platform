import ScrollToTop from '@/components/custom/utility/ScrollToTop'
import { Footer, NavBar } from '@/features/landing-page/components.barel'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar showLinks={false} />
      <ScrollToTop />
      <main className='container mx-auto flex-grow  px-4 py-8'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
