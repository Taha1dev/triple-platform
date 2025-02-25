import {
  Search,
  Bell,
  MessageSquare,
  User,
  Home,
  Users,
  Briefcase,
  Map,
  Camera,
  Package,
  Building,
  Menu,
  Plus,
  Star,
  MapPin,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

const categories = [
  { name: 'Home', icon: Home },
  { name: 'Pro-Crew', icon: Users },
  { name: 'Talents', icon: User },
  { name: 'Operators', icon: Briefcase },
  { name: 'Logistics', icon: Package },
  { name: 'Props', icon: Camera },
  { name: 'Locations', icon: Map },
  { name: 'Agencies', icon: Building },
]
import { imagePlaceholder } from '@/features/landing-page/constants'
const featuredLocations = [
  {
    id: 1,
    name: 'Sunset Beach Studio',
    type: 'Beach',
    price: 1000,
    rating: 4.8,
    image: ` ${imagePlaceholder}/placeholder.svg?height=200&width=300`,
  },
  {
    id: 2,
    name: 'Downtown Loft',
    type: 'Urban',
    price: 800,
    rating: 4.6,
    image: ` ${imagePlaceholder}/placeholder.svg?height=200&width=300`,
  },
  {
    id: 3,
    name: 'Mountain Retreat',
    type: 'Rural',
    price: 1200,
    rating: 4.9,
    image: ` ${imagePlaceholder}/placeholder.svg?height=200&width=300`,
  },
]

const locationsList = [
  {
    id: 4,
    name: 'Rustic Barn',
    type: 'Rural',
    price: 600,
    rating: 4.5,
    address: '123 Countryside Lane',
  },
  {
    id: 5,
    name: 'Modern Office Space',
    type: 'Urban',
    price: 1500,
    rating: 4.7,
    address: '456 Business Ave',
  },
  {
    id: 6,
    name: 'Cozy Cafe',
    type: 'Urban',
    price: 400,
    rating: 4.4,
    address: '789 Main Street',
  },
  {
    id: 7,
    name: 'Abandoned Warehouse',
    type: 'Industrial',
    price: 700,
    rating: 4.2,
    address: '101 Factory Road',
  },
  {
    id: 8,
    name: 'Luxury Penthouse',
    type: 'Urban',
    price: 2000,
    rating: 4.9,
    address: '1 Skyline Drive',
  },
]

export default function HomePage2() {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-white p-4 shadow-md'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-blue-600'>Triple Platform</h1>
          <Button variant='ghost' size='icon'>
            <Menu className='h-6 w-6' />
          </Button>
        </div>
        <nav>
          <ul className='space-y-2'>
            {categories.map(category => (
              <li key={category.name}>
                <Button
                  variant='ghost'
                  className={`w-full justify-start ${category.name === 'Locations'
                      ? 'bg-blue-100 text-blue-600'
                      : ''
                    }`}
                >
                  <category.icon className='mr-2 h-4 w-4' />
                  {category.name}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <header className='bg-white border-b border-border p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center flex-1'>
              <Input
                type='search'
                placeholder='Search for locations...'
                className='max-w-md'
              />
              <Button variant='ghost' size='icon' className='ml-2'>
                <Search className='h-4 w-4' />
              </Button>
            </div>
            <div className='flex items-center space-x-4'>
              <Button variant='ghost' size='icon'>
                <Bell className='h-5 w-5' />
              </Button>
              <Button variant='ghost' size='icon'>
                <MessageSquare className='h-5 w-5' />
              </Button>
              <Avatar>
                <AvatarImage
                  src='https://kzmpy8clbtdaewum16jc.lite.vusercontent.net/placeholder.svg?height=32&width=32'
                  alt='User'
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className='flex-1 overflow-y-auto p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-semibold'>Locations</h2>
            <Button>
              <Plus className='mr-2 h-4 w-4' /> Add New Location
            </Button>
          </div>

          {/* Featured Locations */}
          <section className='mb-8'>
            <h3 className='text-xl font-semibold mb-4'>Featured Locations</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {featuredLocations.map(location => (
                <Card key={location.id}>
                  <CardHeader className='p-0'>
                    <img
                      src={location.image || '/placeholder.svg'}
                      alt={location.name}
                      className='w-full h-40 object-cover rounded-t-lg'
                    />
                  </CardHeader>
                  <CardContent className='p-4'>
                    <CardTitle>{location.name}</CardTitle>
                    <CardDescription>{location.type}</CardDescription>
                    <div className='flex justify-between items-center mt-2'>
                      <span className='font-bold'>${location.price}/day</span>
                      <div className='flex items-center'>
                        <Star className='h-4 w-4 text-yellow-400 mr-1' />
                        <span>{location.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* All Locations */}
          <section>
            <h3 className='text-xl font-semibold mb-4'>All Locations</h3>
            <Tabs defaultValue='list' className='w-full'>
              <TabsList>
                <TabsTrigger value='list'>List View</TabsTrigger>
                <TabsTrigger value='map'>Map View</TabsTrigger>
              </TabsList>
              <TabsContent value='list'>
                <ScrollArea className='h-[400px] w-full rounded-md border'>
                  {locationsList.map(location => (
                    <Card key={location.id} className='mb-4'>
                      <CardHeader>
                        <div className='flex justify-between'>
                          <CardTitle>{location.name}</CardTitle>
                          <Badge>{location.type}</Badge>
                        </div>
                        <CardDescription>{location.address}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='flex justify-between items-center'>
                          <span className='font-bold'>
                            ${location.price}/day
                          </span>
                          <div className='flex items-center'>
                            <Star className='h-4 w-4 text-yellow-400 mr-1' />
                            <span>{location.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </TabsContent>
              <TabsContent value='map'>
                <div className='h-[400px] w-full rounded-md border flex items-center justify-center bg-gray-100'>
                  <MapPin className='h-8 w-8 text-gray-400 mr-2' />
                  <span className='text-gray-500'>Map view coming soon</span>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </div>
  )
}
