import { Outlet } from 'react-router-dom'
import Sidebar from './Side'
import Header from './Header'

export default function PanelLayout() {
  return (
    <div className='flex h-screen'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Header />

        <main className='flex-1 overflow-y-auto p-4'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
