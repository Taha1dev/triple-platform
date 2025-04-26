/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom'
import Sidebar from './Side'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useEffect } from 'react'
import { showHeader } from '@/store/slices/DOMSlice'
import Spinner from '@/components/custom/Spinner'

export default function PanelLayout() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(showHeader())
  }, [])
  const { loading } = useSelector((state: RootState) => state.auth)
  return (
    <div className='flex h-screen relative'>
      <Sidebar />

      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />

        <main className=' overflow-y-auto p-6'>
          <Outlet />
        </main>
      </div>
      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Spinner />
        </div>
      )}
    </div>
  )
}
