import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const HomePage = () => {
  // Dummy user data
  const user = {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    role: 'Service Provider',
  }

  // Dummy top-rated users
  const topRatedUsers = [
    {
      name: 'Alice',
      avatar: 'https://example.com/alice.jpg',
      rating: 4.9,
      role: 'Pro-Crew',
    },
    {
      name: 'Bob',
      avatar: 'https://example.com/bob.jpg',
      rating: 4.8,
      role: 'Talent',
    },
    {
      name: 'Charlie',
      avatar: 'https://example.com/charlie.jpg',
      rating: 4.7,
      role: 'Operator',
    },
    {
      name: 'Diana',
      avatar: 'https://example.com/diana.jpg',
      rating: 4.6,
      role: 'Location Host',
    },
  ]

  // Dummy quick access cards
  const quickAccessCards = [
    {
      title: 'Pro-Crew',
      icon: '👥',
      description: 'Find professional crew members for your projects.',
    },
    {
      title: 'Talents',
      icon: '🌟',
      description: 'Discover talented individuals for your events.',
    },
    {
      title: 'Locations',
      icon: '📍',
      description: 'Rent unique locations for your shoots.',
    },
    {
      title: 'Operators',
      icon: '🎥',
      description: 'Hire skilled operators for your productions.',
    },
  ]

  // Dummy recent activity
  const recentActivity = [
    {
      user: 'Alice',
      action: 'requested a location rental',
      time: '2 hours ago',
    },
    { user: 'Bob', action: 'hired a Pro-Crew member', time: '5 hours ago' },
    {
      user: 'Charlie',
      action: 'posted a new talent profile',
      time: '1 day ago',
    },
  ]

  return (
    <div className='min-h-screen bg-gray-50 text-black'>
      {/* Navigation Bar */}
      <nav className='bg-white border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16 items-center'>
            <span className='text-xl font-bold text-blue-600'>
              Triple Platform
            </span>
            <div className='flex items-center space-x-4'>
              <Input
                placeholder='Search for services...'
                className='max-w-md'
              />
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Left Sidebar - Top Rated Users */}
        <div className='lg:col-span-1'>
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                Top Rated Users
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {topRatedUsers.map((user, index) => (
                <div key={index} className='flex items-center space-x-4'>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{user.name}</p>
                    <p className='text-sm text-gray-500'>{user.role}</p>
                    <div className='flex items-center space-x-1'>
                      <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                      <span className='text-sm text-gray-700'>
                        {user.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className='lg:col-span-3 space-y-8'>
          {/* Welcome Section */}
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Welcome back, {user.name}!
            </h1>
            <p className='text-gray-600'>What are you looking for today?</p>
          </div>

          {/* Quick Access Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {quickAccessCards.map((card, index) => (
              <Card key={index} className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <span className='text-2xl'>{card.icon}</span>
                    <span>{card.title}</span>
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant='outline' className='w-full'>
                    Explore {card.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity Section */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {recentActivity.map((activity, index) => (
                <div key={index} className='flex items-center space-x-4'>
                  <Avatar>
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-gray-900'>
                      <span className='font-semibold'>{activity.user}</span>{' '}
                      {activity.action}
                    </p>
                    <p className='text-sm text-gray-500'>{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-white border-t border-border mt-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600'>
          <p>&copy; 2023 Triple Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
