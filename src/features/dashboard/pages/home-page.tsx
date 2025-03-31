import {
  User,
  Users,
  Briefcase,
  Map,
  Camera,
  Package,
  Building,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const categories = [
  { name: 'Pro-Crew', icon: Users },
  { name: 'Talents', icon: User },
  { name: 'Operators', icon: Briefcase },
  { name: 'Logistics', icon: Package },
  { name: 'Props', icon: Camera },
  { name: 'Locations', icon: Map },
  { name: 'Agencies', icon: Building },
]

const topRatedUsers = [
  {
    name: 'Alice Cooper',
    role: 'Cinematographer',
    rating: 4.9,
    avatar:
      'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net/placeholder.svg?height=40&width=40',
  },
  {
    name: 'Bob Dylan',
    role: 'Location Scout',
    rating: 4.8,
    avatar:
      'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net/placeholder.svg?height=40&width=40',
  },
  {
    name: 'Charlie Chaplin',
    role: 'Talent',
    rating: 4.7,
    avatar:
      'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net/placeholder.svg?height=40&width=40',
  },
]

export default function HomePage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <h2 className='text-2xl font-semibold mb-6'>Welcome back, User!</h2>

      <section className='mb-8'>
        <h3 className='text-xl font-semibold mb-4'>Top Rated Professionals</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {topRatedUsers.map(user => (
            <Card key={user.name}>
              <CardHeader className='flex flex-row items-center gap-4'>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className='flex items-center'>
                  <span className='text-yellow-500 mr-1'>★</span>
                  <span>{user.rating}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className='text-xl font-semibold mb-4'>Explore Categories</h3>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {categories.map(category => (
            <Button
              key={category.name}
              variant='outline'
              className='h-24 flex flex-col items-center justify-center'
            >
              <category.icon className='h-8 w-8 mb-2' />
              {category.name}
            </Button>
          ))}
        </div>
      </section>
    </main>
  )
}
