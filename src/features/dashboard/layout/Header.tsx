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

import { initializeAuthState } from '@/store/slices/loginSlice'
import { AppDispatch, RootState } from '@/store/store'
import { getCurrentDate } from '@/utils/utils'
import { Search, Bell, User, Settings, LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/slices/logoutSlice'
import Spinner from '@/components/custom/Spinner'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.login)
  const { loading } = useSelector((state: RootState) => state.logout)

  useEffect(() => {
    if (user) {
      console.log(user)
    }
    dispatch(initializeAuthState())
  }, [])

  if (!user) {
    return <h1 className='text-8xl font-extrabold'>Loading...</h1>
  }
  const handleLogout = async () => {
    await dispatch(logoutUser(user.id))
    navigate('/login')
  }
  return (
    <>
      <header className='my-4 container mx-auto p-4 border-b border-border'>
        <div className='flex justify-between items-center'>
          {/* Search Input */}
          <div className='relative'>
            <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search users, producers, etc...'
              className='pl-10 w-[200px] md:w-[300px] rounded-lg bg-background focus:ring-2 focus:ring-primary transition-all'
            />
          </div>

          <div className='flex gap-3 items-center'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-accent/50 rounded-xl'
            >
              <Bell className='w-5 h-5' />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex gap-3 items-center cursor-pointer'>
                  <Avatar className='border-2 border-foreground size-12 hover:border-primary transition-all'>
                    <AvatarImage
                      className='size-24 object-cover -mt-2'
                      src={
                        user?.image &&
                        `https://api.tripleplatform.app/${user.image}`
                      }
                      alt='User Avatar'
                    />
                    <AvatarFallback>
                      <Skeleton className='w-10 h-10 rounded-full' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='hidden md:flex flex-col'>
                    <h4 className='font-semibold text-sm'>
                      Welcome, {user.fname}!
                    </h4>
                    <p className='text-xs text-muted-foreground'>
                      {getCurrentDate()}
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className='w-56 mt-2'>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => navigate('profile')}
                >
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                  <Settings className='mr-2 h-4 w-4' /> <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className='cursor-pointer text-red-600 focus:text-red-600'
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Spinner />
          </div>
        )}
      </header>
    </>
  )
}
