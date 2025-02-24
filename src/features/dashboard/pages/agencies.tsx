import { Building, Star } from 'lucide-react'
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

const featuredAgencies = [
  {
    id: 1,
    name: 'Creative Minds Agency',
    specialty: 'Talent Management',
    experience: '20 years',
    rating: 4.9,
    image: imagePlaceholder,
  },
  {
    id: 2,
    name: 'Production Pro Solutions',
    specialty: 'Production Services',
    experience: '15 years',
    rating: 4.8,
    image: imagePlaceholder,
  },
  {
    id: 3,
    name: 'Casting Stars',
    specialty: 'Casting Agency',
    experience: '25 years',
    rating: 4.7,
    image: imagePlaceholder,
  },
]

const agenciesList = [
  {
    id: 4,
    name: 'Location Scouts Inc.',
    specialty: 'Location Services',
    experience: '10 years',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Crew Connect',
    specialty: 'Crew Staffing',
    experience: '8 years',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Visual FX Masters',
    specialty: 'VFX Services',
    experience: '12 years',
    rating: 4.8,
  },
  {
    id: 7,
    name: 'Sound Design Pro',
    specialty: 'Audio Post-Production',
    experience: '18 years',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Marketing Mavens',
    specialty: 'Film Marketing',
    experience: '14 years',
    rating: 4.4,
  },
]

export default function AgenciesPage() {
  const featuredItems = featuredAgencies.map(agency => (
    <Card key={agency.id}>
      <CardHeader className='p-0'>
        <img
          src={agency.image || '/placeholder.svg'}
          alt={agency.name}
          className='w-full h-40 object-cover rounded-t-lg'
        />
      </CardHeader>
      <CardContent className='p-4'>
        <CardTitle>{agency.name}</CardTitle>
        <CardDescription>{agency.specialty}</CardDescription>
        <div className='flex justify-between items-center mt-2'>
          <span>{agency.experience}</span>
          <div className='flex items-center'>
            <Star className='h-4 w-4 text-yellow-400 mr-1' />
            <span>{agency.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  const listItems = agenciesList.map(agency => (
    <Card key={agency.id} className='mb-4'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>{agency.name}</CardTitle>
          <Badge>{agency.specialty}</Badge>
        </div>
        <CardDescription>{agency.experience}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center'>
          <span>Available for projects</span>
          <div className='flex items-center'>
            <Star className='h-4 w-4 text-yellow-400 mr-1' />
            <span>{agency.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  return (
    <CategoryPageLayout
      categoryName='Agencies'
      categoryIcon={Building}
      featuredItems={featuredItems}
      listItems={listItems}
      addNewText='Add New Agency'
    />
  )
}
