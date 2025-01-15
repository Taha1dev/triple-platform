/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from 'react-router-dom'

import { Activity, HomeIcon, LayoutGridIcon, Users } from 'lucide-react'
import { ModeToggle } from '@/mode-toggle'
import { footerLogo, useTheme } from '@/components/theme-provider'

export default function Component() {
  const { theme } = useTheme()
  return (
    <aside className='flex h-screen'>
      <div className='hidden lg:block lg:w-52 lg:shrink-0 lg:border-r'>
        <div className='flex h-full flex-col justify-between py-6 px-4'>
          <div className='space-y-8'>
            <Link to='/home' className='flex-shrink-0'>
              <img
                src={footerLogo(theme)}
                alt='triple-logo'
                className='w-fit h-fit object-cover'
              />
            </Link>
            <nav className='space-y-1'>
              <Link
                to='#'
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground'
              >
                <HomeIcon className='h-5 w-5' />
                Home
              </Link>
              <Link
                to='#'
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground'
              >
                <LayoutGridIcon className='h-5 w-5' />
                Products
              </Link>
              <Link
                to='#'
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground'
              >
                <Users className='h-5 w-5' />
                Customers
              </Link>
              <Link
                to='#'
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground'
              >
                <Activity className='h-5 w-5' />
                Analytics
              </Link>
            </nav>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </aside>
  )
}
