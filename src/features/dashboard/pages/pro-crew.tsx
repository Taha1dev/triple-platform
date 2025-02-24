import { Users, Star } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CategoryPageLayout from './category-page-layout'
import { imagePlaceholder } from '@/features/landing-page/constants'
const featuredCrew = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Director of Photography',
    experience: '15 years',
    rating: 4.9,
    image: imagePlaceholder,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Sound Engineer',
    experience: '10 years',
    rating: 4.7,
    image: imagePlaceholder,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Gaffer',
    experience: '8 years',
    rating: 4.8,
    image: imagePlaceholder,
  },
]

const crewList = [
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'Production Designer',
    experience: '12 years',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Tom Brown',
    role: 'Camera Operator',
    experience: '7 years',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Emily Davis',
    role: 'Makeup Artist',
    experience: '9 years',
    rating: 4.8,
  },
  {
    id: 7,
    name: 'Chris Lee',
    role: 'Grip',
    experience: '6 years',
    rating: 4.4,
  },
  {
    id: 8,
    name: 'Alex Turner',
    role: 'Production Assistant',
    experience: '3 years',
    rating: 4.2,
  },
]

export default function ProCrewPage() {
  const featuredItems = featuredCrew.map(crew => (
    <Card key={crew.id}>
      <CardHeader className='p-0'>
        <img
          src={crew.image || '/placeholder.svg'}
          alt={crew.name}
          className='w-full h-40 object-cover rounded-t-lg'
        />
      </CardHeader>
      <CardContent className='p-4'>
        <CardTitle>{crew.name}</CardTitle>
        <CardDescription>{crew.role}</CardDescription>
        <div className='flex justify-between items-center mt-2'>
          <span>{crew.experience}</span>
          <div className='flex items-center'>
            <Star className='h-4 w-4 text-yellow-400 mr-1' />
            <span>{crew.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  const listItems = crewList.map(crew => (
    <Card key={crew.id} className='mb-4'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>{crew.name}</CardTitle>
          <Badge>{crew.role}</Badge>
        </div>
        <CardDescription>{crew.experience}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center'>
          <span>Available for hire</span>
          <div className='flex items-center'>
            <Star className='h-4 w-4 text-yellow-400 mr-1' />
            <span>{crew.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  return (
    <CategoryPageLayout
      categoryName='Pro-Crew'
      categoryIcon={Users}
      featuredItems={featuredItems}
      listItems={listItems}
      addNewText='Add New Crew Member'
    />
  )
}
