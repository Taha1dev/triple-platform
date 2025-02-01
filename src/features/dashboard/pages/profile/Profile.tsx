/* eslint-disable react-hooks/exhaustive-deps */
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
  const [avatar, setAvatar] = useState<string | undefined>(user?.image || '')

  useEffect(() => {
    setAvatar(user?.image)
  }, [user])

  const shareProfile = () => {
    toast.success('Profile Link Copied Successfully!')
  }

  return (
    <div className='container mx-auto px-4 py-8 flex flex-col items-center w-full'>
      <Card className='flex flex-col gap-8 rounded-2xl p-8 shadow-md transition-shadow w-full max-w-5xl'>
        <div className='flex flex-col sm:flex-row justify-between items-center pb-8 border-b border-border gap-6'>
          <div className='flex flex-col sm:flex-row gap-6 items-center'>
            <div className='w-32 h-32 sm:w-40 sm:h-40 border border-border hover:scale-105 transition-transform rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src={`http://44.201.100.137/${avatar}?t=${Date.now()}`}
                alt='User Avatar'
              />
            </div>
            <div className='text-center sm:text-left'>
              <h3 className='font-bold text-2xl text-foreground'>{`${user?.fname} ${user?.lname}`}</h3>
              <p className='text-md tracking-wide text-muted-foreground'>
                {user?.email}
              </p>
              <p className='text-md tracking-wide text-muted-foreground'>
                {user?.contact_number}
              </p>
            </div>
          </div>
          <div className='flex gap-3 mt-4 sm:mt-0'>
            <Button
              onClick={() => {
                navigate('/home/update-profile')
              }}
              className='rounded-full px-6 py-2'
            >
              Update Profile
            </Button>
            <Button
              onClick={shareProfile}
              variant='ghost'
              className='rounded-full hover:text-theme-variant px-3 py-2'
            >
              <Share2 />
            </Button>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[
            { label: 'First Name', value: user?.fname },
            { label: 'Last Name', value: user?.lname },
            { label: 'Email', value: user?.email },
            { label: 'Contact Number', value: user?.contact_number },
            { label: 'Location', value: user?.city },
            { label: 'Bio', value: user?.bio },
          ].map((field, index) => (
            <div key={index}>
              <h3 className='capitalize font-semibold text-lg'>
                {field.label}
              </h3>
              <p className='text-muted-foreground'>{field.value || 'N/A'}</p>
            </div>
          ))}
        </div>

        {/* Portfolio Section */}
        {user?.portfolio && (
          <div className='mt-8'>
            <h3 className='font-bold text-2xl text-foreground mb-6'>
              Portfolio
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {user?.portfolio.map((item, index) => (
                <div
                  key={index}
                  className='relative overflow-hidden rounded-lg hover:scale-105 transition-transform shadow-md'
                >
                  <img
                    src={`http://44.201.100.137/${item}`}
                    alt={`Portfolio Image ${index + 1}`}
                    className='w-full h-40 object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default UserProfile
