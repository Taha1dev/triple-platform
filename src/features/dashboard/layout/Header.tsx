/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

import { AppDispatch, RootState } from '@/store/store'
import { getCurrentDate } from '@/utils/utils'
import { Search, Bell, User, Settings, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/slices/logoutSlice'
import Spinner from '@/components/custom/Spinner'
import { useNavigate } from 'react-router-dom'
import { initializeUserData } from '@/store/slices/userSlice'
import { useEffect } from 'react'
import { ModeToggle } from '@/mode-toggle'

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user)
  const { loading: Loading } = useSelector(
    (state: RootState) => state.updateProfile,
  )
  const { loading } = useSelector((state: RootState) => state.logout)

  useEffect(() => {
    dispatch(initializeUserData())
  }, [])
  const handleLogout = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    await dispatch(logoutUser(user.id))
    navigate('/login')
  }
  return (
    <>
      <header className='my-4 container mx-auto p-4 border-b border-border'>
        <div className='flex flex-wrap justify-between items-center gap-4'>
          {/* Search Input */}
          <div className='relative w-full sm:w-auto'>
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
              aria-hidden='true'
            />
            <Input
              type='search'
              placeholder='Search users, producers, etc...'
              aria-label='Search'
              className='pl-10 w-full sm:w-[200px] md:w-[300px] rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all'
            />
          </div>

          {/* Right Section */}
          <div className='flex justify-items-end gap-4'>
            {/* Notification Button */}
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-accent/50 rounded-full border border-border transition-all'
              aria-label='Notifications'
            >
              <Bell className='w-5 h-5' />
            </Button>

            {/* Mode Toggle */}
            <ModeToggle />

            {/* User Avatar and Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center gap-3 cursor-pointer'>
                  <Avatar className='border-2 border-foreground rounded-full hover:border-primary transition-all'>
                    <AvatarImage
                      src={
                        user?.image &&
                        `https://api.tripleplatform.app/${user.image}`
                      }
                      alt='User Avatar'
                      className='w-10 h-10 object-cover'
                    />
                    <AvatarFallback>
                      <Skeleton className='w-10 h-10 rounded-full' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='hidden md:flex flex-col'>
                    <h4 className='font-semibold text-sm'>
                      Welcome, {user?.fname}!
                    </h4>
                    <p className='text-xs text-muted-foreground'>
                      {getCurrentDate()}
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className='w-56 mt-2 shadow-lg rounded-lg'>
                <DropdownMenuItem
                  className='cursor-pointer flex items-center gap-2'
                  onClick={() => navigate('profile')}
                >
                  <User className='h-4 w-4' />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer flex items-center gap-2'>
                  <Settings className='h-4 w-4' />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className='cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600'
                >
                  <LogOut className='h-4 w-4' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading ||
          (Loading && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <Spinner />
            </div>
          ))}
      </header>
    </>
  )
}
