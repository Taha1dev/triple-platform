/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateProfile } from '@/store/slices/updateUserSlice'
import { useEffect, useState } from 'react'
import { initializeUserData } from '@/store/slices/userSlice'

export default function UpdateProfile() {
  const { user } = useSelector((state: RootState) => state.user)
  const [formData, setFormData] = useState({
    fname: user?.fname || '',
    lname: user?.lname || '',
    contact_number: user?.contact_number || '',
    bio: user?.bio || '',
  })
  const [avatar, setAvatar] = useState<string | undefined>(user?.image || '')
  const dispatch = useDispatch<AppDispatch>()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    const fileFormData = new FormData()
    fileFormData.append('image', file)
    try {
      await dispatch(updateProfile(fileFormData)).unwrap()
      dispatch(initializeUserData())
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(updateProfile(formData)).unwrap()
      dispatch(initializeUserData())
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  useEffect(() => {
    setFormData({
      fname: user?.fname || '',
      lname: user?.lname || '',
      contact_number: user?.contact_number || '',
      bio: user?.bio || '',
    })
    setAvatar(user?.image)
  }, [user])

  return (
    <div className='container mx-auto px-2 flex flex-col items-center'>
      <Card className='flex flex-col gap-6 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow w-full'>
        <div className='relative group w-fit'>
          <div className='border-2 border-primary w-44 h-44 hover:border-theme-variant hover:scale-105 transition-transform rounded-full overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={`https://api.tripleplatform.app/${avatar}?t=${Date.now()}`}
              alt='User Avatar'
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer'>
            <label htmlFor='file-upload' className='cursor-pointer'>
              <Camera className='w-10 h-10 text-white' />
            </label>
          </div>
          <input
            id='file-upload'
            type='file'
            className='hidden'
            accept='image/*'
            onChange={handleFileChange}
          />
        </div>
        <form className='space-y-6 flex-1' onSubmit={handleSubmit}>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <Label htmlFor='fname'>First Name</Label>
              <Input
                id='fname'
                name='fname'
                value={formData.fname}
                onChange={handleInputChange}
                placeholder='Enter your first name'
              />
            </div>
            <div>
              <Label htmlFor='lname'>Last Name</Label>
              <Input
                id='lname'
                name='lname'
                value={formData.lname}
                onChange={handleInputChange}
                placeholder='Enter your last name'
              />
            </div>
          </div>
          <div>
            <Label htmlFor='contact_number'>Phone Number</Label>
            <Input
              id='contact_number'
              name='contact_number'
              value={formData.contact_number}
              onChange={handleInputChange}
              placeholder='Enter your phone number'
            />
          </div>
          <div>
            <Label htmlFor='bio'>Bio</Label>
            <Textarea
              id='bio'
              name='bio'
              value={formData.bio}
              onChange={handleInputChange}
              placeholder='Write a short bio about yourself'
            />
          </div>
          <Button type='submit' className='w-full'>
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  )
}
