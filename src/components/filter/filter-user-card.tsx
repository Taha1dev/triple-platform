/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { CircleDot, Drama, ZapIcon } from 'lucide-react'

export default function FilterUserCard({ user }: any) {
  return (
    <Card className='overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
      <CardContent className='p-0'>
        {/* Header Section */}
        <div className='flex items-center p-6 pb-4'>
          <Avatar className='size-14 mr-4 rounded-full border-2 border-primary'>
            <AvatarImage
              className='rounded-full size-14 p-1 object-cover'
              src={user?.profile?.profileImage?.url}
              alt={`${user.fname} ${user.lname}`}
            />
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <h3 className='font-semibold text-lg'>
              {user.fname} {user.lname}
            </h3>
            {user?.categories[0]?.name && (
              <p className='text-sm text-muted-foreground mt-1'>
                <span className='font-medium text-foreground'>
                  {user?.categories[0]?.name}
                </span>
                {user?.subCategories[0]?.name && (
                  <span> • {user?.subCategories[0]?.name}</span>
                )}
              </p>
            )}
          </div>
        </div>

        <Separator className='mx-4 w-auto' />

        {/* Details Section */}
        <div className='p-6 pt-4 grid grid-cols-2 gap-4 text-sm'>
          {/* Row 1 */}
          <div className='space-y-1'>
            <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
              Ethnicity
            </p>
            <p>{user.profile.ethnicity || 'Not specified'}</p>
          </div>

          <div className='space-y-1'>
            <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
              Hair
            </p>
            <p>
              {[user.profile.hairColor, user.profile.hairTexture]
                .filter(Boolean)
                .join(', ') || 'Not specified'}
            </p>
          </div>

          {/* Row 2 */}
          <div className='space-y-1'>
            <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
              Eyes
            </p>
            <p>{user.profile.eyeColor || 'Not specified'}</p>
          </div>

          <div className='space-y-1'>
            <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
              Skin
            </p>
            <p>{user.profile.skinTone || 'Not specified'}</p>
          </div>

          {/* Full width rows */}
          <div className='col-span-2 space-y-1'>
            <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
              Distinctive Features
            </p>
            <p>
              {user.profile.facialFeatures?.length > 0
                ? user.profile.facialFeatures.join(', ')
                : 'None specified'}
            </p>
          </div>

          <div className='col-span-2 space-y-1'>
            <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
              Location
            </p>
            <p>{user.city?.join(', ') || 'Not specified'}</p>
          </div>

          {/* Badges */}
          <div className='col-span-2 flex flex-wrap gap-2 mt-2'>
            {user.profile.tattoo?.length > 0 && (
              <Badge variant='secondary' className='px-3 py-1'>
                <Drama className='h-3 w-3 mr-1' /> Tattoos
              </Badge>
            )}
            {user.profile.piercing?.length > 0 && (
              <Badge variant='secondary' className='px-3 py-1'>
                <CircleDot className='h-3 w-3 mr-1' /> Piercings
              </Badge>
            )}
            {user.profile.scars?.length > 0 && (
              <Badge variant='secondary' className='px-3 py-1'>
                <ZapIcon className='h-3 w-3 mr-1' /> Scars
              </Badge>
            )}
            {![
              user.profile.tattoo,
              user.profile.piercing,
              user.profile.scars,
            ].some(arr => arr?.length > 0) && (
              <Badge variant='outline' className='px-3 py-1'>
                No distinctive marks
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
