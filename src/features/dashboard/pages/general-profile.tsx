/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Share2,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
} from 'react'
import { initializeUserData } from '@/store/slices/userSlice'

const userData = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'Los Angeles, CA',
  joinDate: 'January 2022',
  role: 'Cinematographer',
  bio: 'Experienced cinematographer with a passion for creating visually stunning narratives. Specializing in commercial and independent film projects.',
  skills: ['Cinematography', 'Lighting', 'Color Grading', 'Camera Operation'],
  portfolio: [
    {
      id: 1,
      title: 'Summer Breeze',
      type: 'Short Film',
      image:
        'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net/placeholder.svg?height=150&width=250',
    },
    {
      id: 2,
      title: 'Urban Rhythms',
      type: 'Music Video',
      image:
        'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net/placeholder.svg?height=150&width=250',
    },
    {
      id: 3,
      title: 'Eco Warriors',
      type: 'Documentary',
      image:
        'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net/placeholder.svg?height=150&width=250',
    },
  ],
}

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const handleShare = () => {
    const profileUrl = `${window.location.origin}/profile/${userData.id}`
    navigator.clipboard.writeText(profileUrl)
    alert('Profile link copied to clipboard!')
  }
  useEffect(() => {
    dispatch(initializeUserData())
  }, [dispatch]) // Only run once on mount

  useEffect(() => {
    console.log(user) // Will log whenever user changes
  }, [user])
  return (
    <div className='min-h-screen bg-background'>
      <Card className='shadow-none'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage
                src={
                  (user as any)?.user?.profile?.profileImage?.url ||
                  '/placeholder.svg?height=80&width=80'
                }
                alt={`${(user as any)?.user?.fname} ${
                  (user as any)?.user?.lname
                }`}
              />
              <AvatarFallback>
                {(user as any)?.user?.fname?.charAt(0)}
                {(user as any)?.user?.lname?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className='text-2xl'>
                {(user as any)?.user?.fname} {(user as any)?.user?.lname}
              </CardTitle>
              <CardDescription>
                {(user as any)?.user?.bio
                  ? (user as any)?.user?.bio
                  : (user as any)?.user?.categories
                      .map((cat: { name: any }) => cat.name)
                      .join(', ')}
              </CardDescription>
            </div>
          </div>
          <Button variant='outline' size='sm' onClick={handleShare}>
            <Share2 className='mr-2 h-4 w-4' />
            Share Profile
          </Button>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold mb-2'>About</h3>
              <p className='text-muted-foreground mb-4'>
                {(user as any)?.user?.subCategories
                  .map((sub: { name: any }) => sub.name)
                  .join(', ')}
              </p>
              <div className='space-y-2'>
                <div className='flex items-center text-muted-foreground'>
                  <Mail className='mr-2 h-4 w-4' />
                  {(user as any)?.user?.email}
                </div>
                <div className='flex items-center text-muted-foreground'>
                  <Phone className='mr-2 h-4 w-4' />
                  {(user as any)?.user?.contact_number}
                </div>
                <div className='flex items-center text-muted-foreground'>
                  <MapPin className='mr-2 h-4 w-4' />
                  {(user as any)?.user?.city.join(', ')}{' '}
                  {(user as any)?.user?.country &&
                    `, ${(user as any)?.user?.country}`}
                </div>
                <div className='flex items-center text-muted-foreground'>
                  <Calendar className='mr-2 h-4 w-4' />
                  Member since{' '}
                  {new Date(
                    (user as any)?.user?.createdAt,
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Categories</h3>
              <div className='flex flex-wrap gap-2'>
                {(user as any)?.user?.categories.map((category: any) => (
                  <Badge key={category._id} variant='secondary'>
                    {category.name}
                  </Badge>
                ))}
              </div>

              <h3 className='text-lg font-semibold mb-2 mt-4'>
                Specializations
              </h3>
              <div className='flex flex-wrap gap-2'>
                {(user as any)?.user?.subCategories.map((subCategory: any) => (
                  <Badge key={subCategory._id} variant='outline'>
                    {subCategory.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <h3 className='text-lg font-semibold mb-4'>Portfolio</h3>
            {(user as any)?.user?.portfolio.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {(user as any)?.user?.portfolio.map((item: any) => (
                  <Card key={item._id}>
                    <img
                      src={item.url || '/placeholder.svg'}
                      alt={item.description}
                      className='w-full h-32 object-cover rounded-t-lg'
                    />
                    <CardContent className='p-4'>
                      <h4 className='font-semibold'>
                        {item.title || 'Untitled'}
                      </h4>
                      <p className='text-sm text-gray-500'>
                        {item.type || 'Project'}
                      </p>
                      <Button variant='link' size='sm' className='mt-2 p-0'>
                        View Project <ExternalLink className='ml-1 h-3 w-3' />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No portfolio items yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
