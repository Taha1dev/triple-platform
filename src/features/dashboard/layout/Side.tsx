/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Users,
  ChevronLeft,
  ChevronRight,
  Images,
  Settings2,
  LogOut,
} from 'lucide-react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { footerLogo, useTheme } from '@/components/theme-provider'
import { logoutUser } from '@/store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'

const categories = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'General', icon: Users, path: '/home/profile-settings' },
  { name: 'Portfolio', icon: Images, path: '/home/potfolio' },
  { name: 'Settings', icon: Settings2, path: '/home/settings' },
]

export default function Sidebar() {
  const { theme } = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isSmallScreen = useMediaQuery('(max-width: 1000px)')
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }
  return (
    <>
      {!isSmallScreen && (
        <aside
          className={`bg-background border border-border transition-all duration-300 ${
            sidebarOpen ? 'w-72' : 'w-20'
          }`}
        >
          <div className='p-4 border-b border-border flex items-center gap-4 max-h-[72px]'>
            {sidebarOpen && (
              <Link
                to='/home'
                className={`transition-all duration-300 ease-in-out ${
                  sidebarOpen ? 'w-56 opacity-100' : 'w-0 opacity-0'
                }`}
              >
                <img className='' src={footerLogo(theme)} alt='Triple Logo' />
              </Link>
            )}

            <Button
              variant='ghost'
              size='icon'
              className='ml-auto transition-all duration-300 ease-in-out'
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <ChevronLeft className='h-6 w-6' />
              ) : (
                <ChevronRight className='h-6 w-6' />
              )}
            </Button>
          </div>

          <nav>
            <ul className='space-y-2 p-4'>
              {categories.map(category => (
                <li key={category.name}>
                  <Link to={category.path}>
                    <Button variant='ghost' className={`w-full justify-start`}>
                      <category.icon className='h-5 w-5' />
                      {sidebarOpen && (
                        <span className='ml-2'>{category.name}</span>
                      )}
                    </Button>
                  </Link>
                </li>
              ))}
              <Button
                onClick={handleLogout}
                variant={'link'}
                className='cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600'
              >
                <LogOut className='h-4 w-4' />
                Logout
              </Button>
            </ul>
          </nav>
        </aside>
      )}

      {isSmallScreen && (
        <nav className='bg-background border-t border-border fixed bottom-0 left-0 right-0 z-[50]'>
          <ul className='flex justify-around p-2'>
            {categories.map(category => (
              <li key={category.name}>
                <Link to={category.path}>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`flex flex-col items-center`}
                  >
                    <category.icon className='h-5 w-5' />
                    <span className='text-xs mt-1'>{category.name}</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}
