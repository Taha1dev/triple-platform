import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.login)
  return (
    <div className='container mx-auto px-2 flex flex-col'>
      <Card className='flex items-center gap-4 rounded-[20px] p-8'>
        <Avatar className='border-2 border-primary size-44 hover:border-theme-variant hover:scale-105 transition-all'>
          <AvatarImage
            className='size-44 object-cover mt-2'
            src={user?.image && `https://api.tripleplatform.app/${user.image}`}
            alt='User Avatar'
          />
          <AvatarFallback>
            <Skeleton className='w-10 h-10 rounded-full' />
          </AvatarFallback>
        </Avatar>
        <div className='space-y-2'>
          <h4 className='font-bold text-xl text-foreground'>
            {user?.fname + ' ' + user?.lname}
          </h4>
          <p className='text-muted-foreground text-sm'>{user?.email}</p>
        </div>
      </Card>
    </div>
  )
}
