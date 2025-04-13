/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom'
import Sidebar from './Side'
import Header from './Header'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { showHeader } from '@/store/slices/DOMSlice'

export default function PanelLayout() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(showHeader())
  }, [])
  return (
    <div className='flex h-screen'>
      <Sidebar />

      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />

        <main className=' overflow-y-auto p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
