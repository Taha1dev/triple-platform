import { Search, Eye, CheckCircle, Clock } from 'lucide-react'
import Heading from './Heading'
import CardWithAnimation from './AnimatedCard'

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: 'Effortlessly find media resources with our detailed search',
      description:
        'Discover media service providers, filming locations, and production essentials effortlessly.',
      icon: <Search size={48} className='text-theme-variant' />,
    },
    {
      id: 2,
      title: 'Visual Insights at a Glance',
      description:
        'Gain visual access to profiles and information to make informed decisions quickly.',
      icon: <Eye size={42} className='text-theme-variant' />,
    },
    {
      id: 3,
      title: 'Streamlined Pre-Production',
      description:
        'Enjoy the experience of a streamlined, efficient, and stress-free Pre-production process.',
      icon: <CheckCircle size={42} className='text-theme-variant' />,
    },
    {
      id: 4,
      title: 'Get more access and save time',
      description:
        'Save time with a Pre-Production platform designed to support you from start to finish.',
      icon: <Clock size={42} className='text-theme-variant' />,
    },
  ]
  return (
    <main
      id='services'
      className='container mx-auto flex flex-col gap-8 items-center justify-center px-4'
    >
      <Heading
        sub='Why Triple Platform'
        main='Simplifying Media Production for You'
      />

      <section className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl'>
        {services.map(service => (
          <CardWithAnimation
            key={service.id}
            title={service.title}
            icon={service.icon}
          />
        ))}
      </section>
    </main>
  )
}
