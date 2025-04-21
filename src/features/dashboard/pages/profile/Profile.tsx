/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  const [avatar, setAvatar] = useState<string>(
    (user as any)?.user?.profile?.profileImage?.url || '',
  )

  useEffect(() => {
    console.log('profileUser', user)
    if ((user as any)?.user?.profile?.profileImage?.url) {
      setAvatar((user as any)?.user?.profile.profileImage.url)
    }
    console.log('user-profile', user)
  }, [user])

  const shareProfile = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Profile Link Copied Successfully!')
  }

  const getLocation = () => {
    return (user as any)?.user?.city?.length
      ? (user as any)?.user?.city.join(', ')
      : 'N/A'
  }

  const profileFields = [
    { label: 'First Name', value: (user as any)?.user?.fname },
    { label: 'Last Name', value: (user as any)?.user?.lname },
    { label: 'Email', value: (user as any)?.user?.email },
    {
      label: 'Contact Number',
      value: (user as any)?.user?.contact_number || 'N/A',
    },
    { label: 'Location', value: getLocation() },
    { label: 'Date of Birth', value: (user as any)?.user?.dob || 'N/A' },
    {
      label: 'Rating',
      value: (user as any)?.user?.rating
        ? `${(user as any)?.user?.rating}/5`
        : 'N/A',
    },
    { label: 'Country', value: (user as any)?.user?.country || 'N/A' },
  ]

  return (
    <div className='container mx-auto px-4 py-8 flex flex-col items-center w-full'>
      <Card className='flex flex-col gap-8 rounded-2xl p-8 shadow-md transition-shadow w-full max-w-5xl'>
        {/* Profile Header */}
        <div className='flex flex-col sm:flex-row justify-between items-center pb-8 border-b border-border gap-6'>
          <div className='flex flex-col sm:flex-row gap-6 items-center'>
            <div className='w-32 h-32 sm:w-40 sm:h-40 border border-border hover:scale-105 transition-transform rounded-full overflow-hidden'>
              {avatar ? (
                <img
                  className='w-full h-full object-cover'
                  src={avatar}
                  alt={
                    (user as any)?.user?.profile?.profileImage?.alt ||
                    'User Avatar'
                  }
                  onError={() => setAvatar('/default-avatar.png')}
                />
              ) : (
                <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-lg'>No Image</span>
                </div>
              )}
            </div>
            <div className='text-center sm:text-left'>
              <h3 className='font-bold text-2xl text-foreground'>
                {(user as any)?.user?.fname} {(user as any)?.user?.lname}
              </h3>
              <p className='text-md tracking-wide text-muted-foreground'>
                {(user as any)?.user?.email}
              </p>
              {(user as any)?.user?.contact_number && (
                <p className='text-md tracking-wide text-muted-foreground'>
                  {(user as any)?.user?.contact_number}
                </p>
              )}
            </div>
          </div>
          <div className='flex gap-3 mt-4 sm:mt-0'>
            <Button
              onClick={() => navigate('/home/profile-settings')}
              className='rounded-full px-6 py-2'
            >
              Update Profile
            </Button>
            <Button
              onClick={shareProfile}
              variant='ghost'
              className='rounded-full hover:text-theme-variant px-3 py-2'
              aria-label='Share profile'
            >
              <Share2 />
            </Button>
          </div>
        </div>
        {/* Profile Fields */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {profileFields.map((field, index) => (
            <div key={index}>
              <h3 className='capitalize font-semibold text-lg'>
                {field.label}
              </h3>
              <p className='text-muted-foreground'>{field.value}</p>
            </div>
          ))}
        </div>
        user.profile.portfolioMedia
        {/* Portfolio Section */}
        {(user as any)?.user?.profile.portfolioMedia && (
          <div className='mt-8'>
            <h3 className='font-bold text-2xl text-foreground mb-6'>
              Portfolio
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {(user as any)?.user?.profile.portfolioMedia.map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className='relative overflow-hidden rounded-lg hover:scale-105 transition-transform shadow-md'
                  >
                    <img
                      src={item.url}
                      alt={item.alt}
                      className='w-full h-40 object-cover'
                      onError={e => {
                        const target = e.target as HTMLImageElement
                        target.src = '/image-placeholder.png'
                      }}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default UserProfile
