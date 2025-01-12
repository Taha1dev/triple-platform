import { Card } from '@/components/ui/card'
import Heading from '../Heading'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Link } from 'react-router-dom'

export default function HowItWorks() {
  const data = [
    {
      id: 1,
      name: 'Filter Search',
      desc: 'Easily browse through media service providers, locations, and resources with the help of our advanced filter search.',
    },
    {
      id: 2,
      name: 'Compare',
      desc: 'View profiles and essential details in one place for easy decision-making.',
    },
    {
      id: 3,
      name: 'Connect',
      desc: 'Chat and collaborate seamlessly, all though one platform ',
    },
  ]
  return (
    <section
      id='how-it-works'
      className='container mx-auto py-12 px-6 md:px-8 lg:px-12 flex-col-center'
    >
      <Heading
        sub='How It Works'
        main='Your Path to Stress-Free Pre-production'
      />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative'>
        {data.map(item => (
          <Card
            key={item.id}
            className='flex flex-col items-center gap-8 text-center 
            rounded-3xl p-6 transition-transform duration-300 hover:scale-105 !bg-background/50 !backdrop-blur-md '
          >
            <span className='bg-theme-variant text-theme-secondary font-bold text-lg px-4 py-2 rounded-full'>
              {item.id}
            </span>
            <div className='flex flex-col gap-4'>
              <h2 className='text-xl font-semibold text-foreground'>
                {item.name}
              </h2>
              <p className='text-base text-muted-foreground max-w-xs mx-auto'>
                {item.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <RainbowButton className='mt-4'>
        <Link to={'/register'}>
        Join Us Now 👋
        </Link>
        </RainbowButton>
    </section>
  )
}
