/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

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
import { Bell, User, Settings, LogOut, MessageSquare } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/slices/logoutSlice'
import { useNavigate } from 'react-router-dom'
import { initializeUserData } from '@/store/slices/userSlice'
import { useEffect } from 'react'

import { ModeToggle } from '@/mode-toggle'
export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { user, initialized, loading } = useSelector(
    (state: RootState) => state.user,
  )

  useEffect(() => {
    dispatch(initializeUserData())
  }, [dispatch])

  useEffect(() => {
    if (initialized && !loading) {
      console.log('User from store:', user)
      console.log('User fname', user?.fname)
    }
  }, [user, initialized, loading])

  const handleLogout = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    await dispatch(logoutUser(user._id))
    navigate('/login')
  }

  return (
    <header className='bg-background border-b border-border p-4'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        <div className={`w-full flex items-center space-x-4`}>
          <div className='flex-1'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center gap-3 cursor-pointer'>
                  <Avatar className='border-2 border-foreground rounded-full hover:border-primary transition-all'>
                    <AvatarImage
                      src={(user as any)?.user?.profile?.profileImage?.url}
                      alt='User Avatar'
                      className='w-10 h-10 object-cover'
                    />
                    <AvatarFallback>
                      <Skeleton className='w-10 h-10 rounded-full' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <h4 className='font-semibold text-sm'>
                      Welcome, {(user as any)?.user?.fname}!
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
          <Button variant='ghost' size='icon'>
            <Bell className='h-5 w-5' />
          </Button>
          <ModeToggle />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              navigate('/home/chat')
            }}
          >
            <MessageSquare className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </header>
  )
}
