/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Search, Eye, CheckCircle, Clock } from 'lucide-react'
import Heading from './Heading'
import CardWithAnimation from './AnimatedCard'
import { useTheme } from '@/components/theme-provider'

export default function ServicesSection() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const services = [
    {
      id: 1,
      title: 'Effortlessly find media resources with our detailed search',
      description:
        'Discover media service providers, filming locations, and production essentials effortlessly.',
      icon: [
        {
          name: 'Media Service Provider',
          fileName: 'vidcam.svg',
          alt: 'cast image',
        },
        { name: 'Filming Locations', fileName: 'trees.svg', alt: 'tree image' },
        {
          name: 'All Production Essentials',
          fileName: 'filming.svg',
          alt: 'filming image',
        },
      ],
    },
    {
      id: 2,
      title: 'Visual Insights at a Glance',
      description:
        'Gain visual access to profiles and information to make informed decisions quickly.',
      icon: [
        { name: 'Profile', fileName: 'id.svg', alt: 'mask image' },
        { name: 'Rating', fileName: 'starr.svg', alt: 'dancing image' },
        {
          name: 'Information',
          fileName: 'popcornn.svg',
          alt: 'watching image',
        },
      ],
    },
    {
      id: 3,
      title: 'Streamlined Pre-Production',
      description:
        'Enjoy the experience of a streamlined, efficient, and stress-free Pre-production process.',
      icon: [
        { name: 'Remote', fileName: 'joystick.svg', alt: 'jump image' },
        { name: 'Efficient', fileName: 'octo.svg', alt: 'sing image' },
        { name: 'Easy', fileName: 'personsit.svg', alt: 'cast image' },
      ],
    },
    {
      id: 4,
      title: 'Get more access and save time',
      description:
        'Save time with a Pre-Production platform designed to support you from start to finish.',
      icon: [
        { name: 'Time Saving', fileName: 'clock.svg', alt: 'clock image' },
        { name: 'Directs access', fileName: 'eye.svg', alt: 'eye image' },
        {
          name: 'Save profils For later',
          fileName: 'file.svg',
          alt: 'file image',
        },
      ],
    },
  ]
  const getIconPath = (fileName: any) => {
    return isDarkMode ? `/svg/dark/${fileName}` : `/svg/light/${fileName}`
  }

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
            icon={service.icon.map(icon => ({
              ...icon,
              src: getIconPath(icon.fileName),
            }))}
          />
        ))}
      </section>
    </main>
  )
}
