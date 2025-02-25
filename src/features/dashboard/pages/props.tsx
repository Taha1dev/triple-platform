import { Camera, Star } from 'lucide-react'
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
const featuredProps = [
  {
    id: 1,
    name: 'Vintage Camera Collection',
    category: 'Photography',
    availability: 'In Stock',
    rating: 4.9,
    image: ` ${imagePlaceholder}/placeholder.svg?height=200&width=300`,
  },
  {
    id: 2,
    name: 'Sci-Fi Weapon Props',
    category: 'Weapons',
    availability: 'Available',
    rating: 4.7,
    image: ` ${imagePlaceholder}/placeholder.svg?height=200&width=300`,
  },
  {
    id: 3,
    name: '1950s Diner Set',
    category: 'Set Dressing',
    availability: 'In Stock',
    rating: 4.8,
    image: ` ${imagePlaceholder}/placeholder.svg?height=200&width=300`,
  },
]

const propsList = [
  {
    id: 4,
    name: 'Medieval Armor Set',
    category: 'Costumes',
    availability: 'Available',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Futuristic Computer Consoles',
    category: 'Set Dressing',
    availability: 'In Stock',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Antique Book Collection',
    category: 'Set Dressing',
    availability: 'Limited',
    rating: 4.8,
  },
  {
    id: 7,
    name: 'Steampunk Gadgets',
    category: 'Accessories',
    availability: 'Available',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Retro TV Sets',
    category: 'Electronics',
    availability: 'In Stock',
    rating: 4.4,
  },
]

export default function PropsPage() {
  const featuredItems = featuredProps.map(prop => (
    <Card key={prop.id}>
      <CardHeader className='p-0'>
        <img
          src={prop.image || '/placeholder.svg'}
          alt={prop.name}
          className='w-full h-40 object-cover rounded-t-lg'
        />
      </CardHeader>
      <CardContent className='p-4'>
        <CardTitle>{prop.name}</CardTitle>
        <CardDescription>{prop.category}</CardDescription>
        <div className='flex justify-between items-center mt-2'>
          <span>{prop.availability}</span>
          <div className='flex items-center'>
            <Star className='h-4 w-4 text-yellow-400 mr-1' />
            <span>{prop.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  const listItems = propsList.map(prop => (
    <Card key={prop.id} className='mb-4'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>{prop.name}</CardTitle>
          <Badge>{prop.category}</Badge>
        </div>
        <CardDescription>{prop.availability}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center'>
          <span>Ready for rental</span>
          <div className='flex items-center'>
            <Star className='h-4 w-4 text-yellow-400 mr-1' />
            <span>{prop.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  return (
    <CategoryPageLayout
      categoryName='Props'
      categoryIcon={Camera}
      featuredItems={featuredItems}
      listItems={listItems}
      addNewText='Add New Prop'
    />
  )
}
