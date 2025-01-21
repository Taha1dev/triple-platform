import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
  ArrowRightCircle,
  Globe,
  ShoppingCart,
  Activity,
  Users,
  Star,
} from 'lucide-react'

export default function Dashboard() {
  const categories = [
    {
      title: 'Category 1',
      description: 'Description for Category 1',
      icon: Globe,
    },
    {
      title: 'Category 2',
      description: 'Description for Category 2',
      icon: ShoppingCart,
    },
    {
      title: 'Category 3',
      description: 'Description for Category 3',
      icon: Activity,
    },
    {
      title: 'Category 4',
      description: 'Description for Category 4',
      icon: Users,
    },
    {
      title: 'Category 5',
      description: 'Description for Category 5',
      icon: Star,
    },
    {
      title: 'Category 6',
      description: 'Description for Category 6',
      icon: ArrowRightCircle,
    },
  ]

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Categories</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {categories.map((category, index) => {
          const Icon = category.icon

          return (
            <motion.div
              key={index}
              className='hover:shadow-lg transition-shadow'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className='group'>
                <CardHeader className='flex flex-col items-center text-center'>
                  <div className='w-12 h-12 mb-4 text-primary group-hover:text-primary/80'>
                    <Icon size={48} />
                  </div>
                  <CardTitle className='text-lg font-medium'>
                    {category.title}
                  </CardTitle>
                  <CardDescription className='text-sm text-muted-foreground'>
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
