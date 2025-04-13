/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Home,
  Users,
  Briefcase,
  Map,
  Camera,
  Package,
  Building,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { footerLogo, useTheme } from '@/components/theme-provider'

const categories = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'Profile', icon: Users, path: '/home/profile-settings' },
  { name: 'Operators', icon: Briefcase, path: 'operators' },
  { name: 'Logistics', icon: Package, path: 'logistics' },
  { name: 'Props', icon: Camera, path: 'props' },
  { name: 'Locations', icon: Map, path: 'locations' },
  { name: 'Agencies', icon: Building, path: 'agencies' },
]
export default function Sidebar() {
  const { theme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isSmallScreen = useMediaQuery('(max-width: 1000px)')
  const router: any = useNavigate()
  return (
    <>
      {!isSmallScreen && (
        <aside
          className={`bg-background border border-border transition-all duration-300 ${
            sidebarOpen ? 'w-72' : 'w-20'
          }`}
        >
          <div className='p-4 border-b border-border flex items-center gap-4 max-h-[72px]'>
            {/* Logo */}
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

            {/* Toggle Button */}
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
                    <Button
                      variant='ghost'
                      className={`w-full justify-start ${
                        router.pathname === category.path
                          ? 'bg-blue-100 text-blue-600'
                          : ''
                      }`}
                    >
                      <category.icon className='h-5 w-5' />
                      {sidebarOpen && (
                        <span className='ml-2'>{category.name}</span>
                      )}
                    </Button>
                  </Link>
                </li>
              ))}
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
                    className={`flex flex-col items-center ${
                      router.pathname === category.path ? 'text-blue-600' : ''
                    }`}
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
