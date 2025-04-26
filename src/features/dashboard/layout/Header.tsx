/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { RootState } from '@/store/store'
import { getCurrentDate } from '@/utils/utils'
import { Bell, MessageSquare } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ModeToggle } from '@/mode-toggle'
export default function Header() {
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.user)

  return (
    <header className='bg-background border-b border-border p-4'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        <div className={`w-full flex items-center space-x-4`}>
          <div className='flex-1'>
            <div className='flex items-center gap-3'>
              <Avatar className='border-2 border-foreground rounded-full hover:border-primary transition-all'>
                <AvatarImage
                  src={user?.profile?.profileImage?.url}
                  alt='User Avatar'
                  className='w-10 h-10 object-cover'
                />
                <AvatarFallback>
                  <Skeleton className='w-10 h-10 rounded-full' />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <h4 className='font-semibold text-sm'>
                  Welcome, {user?.fname}!
                </h4>
                <p className='text-xs text-muted-foreground'>
                  {getCurrentDate()}
                </p>
              </div>
            </div>
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
