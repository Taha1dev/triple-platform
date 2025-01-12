import { Search, Eye, CheckCircle, Clock } from 'lucide-react'
import Heading from '../Heading'
// import { useTheme } from '@/components/theme-provider'
import CardWithAnimation from '../AnimatedCard'

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
  // const { theme } = useTheme()
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
          <CardWithAnimation title={service.title} icon={service.icon} />
          // <MagicCard
          //   gradientColor={theme === 'dark' ? '#262626' : '#D9D9D955'}
          //   key={service.id}
          // >
          //   <div className=' px-6 py-8 md:py-10 min-h-[300px] flex flex-col gap-8 '>
          //     <div className='!self-end  p-4 rounded-full shadow-[0px_0px_20px_0px_rgba(0,123,255,0.55)] w-fit'>
          //       {service.icon}
          //     </div>
          //     <div className='flex flex-col gap-3'>
          //       <h3 className='text-xl md:text-2xl font-bold '>
          //         {service.title}
          //       </h3>
          //       <p className='/80 font-medium text-base md:text-xl'>
          //         {service.description}
          //       </p>
          //     </div>
          //   </div>
          // </MagicCard>
        ))}
      </section>
    </main>
  )
}
