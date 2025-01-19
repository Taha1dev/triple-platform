import { Input } from './components/ui/input'
import { Bell, LogOut, Search, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Skeleton } from './components/ui/skeleton'
import { getCurrentDate } from './utils/utils'
import { Button } from './components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
export default function Test() {
  const { user } = useSelector((state: RootState) => state.user)

  if (!user) {
    return <h1 className='text-8xl font-extrabold'>Loading...</h1>
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

          <div className='flex gap-6 items-center'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-accent/50 rounded-full'
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
                  <div className='flex flex-col'>
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
                <DropdownMenuItem className='cursor-pointer'>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                  <Settings className='mr-2 h-4 w-4' /> <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer text-red-600 focus:text-red-600'>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}
