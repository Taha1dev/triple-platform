/* eslint-disable @typescript-eslint/no-unused-vars */
import { Users, Images, Globe } from 'lucide-react'
import Heading from '../Heading'
import img1 from '/showcase1.png'
import img2 from '/showcase2.png'
import img3 from '/showcase3.png'
export default function MediaProvider() {
  const data = [
    {
      id: 1,
      image: img1,
      title: 'Expand Your Reach',
      description:
        'Gain visibility and connect with industry professionals seeking your services.',
      icon: <Users size={32} />,
    },
    {
      id: 2,
      image: img2,
      title: 'Showcase Your Work',
      description:
        'Display your portfolio and achievements to attract the right projects.',
      icon: <Images size={32} />,
    },
    {
      id: 3,
      image: img3,
      title: 'Join a Thriving Community',
      description:
        'Be part of a forward-thinking media ecosystem that values time, clarity, and efficiency.',
      icon: <Globe size={32} />,
    },
  ]
  return (
    <main id='media' className='relative flex'>
      <section className='container mx-auto py-12 px-6 md:px-8 lg:px-12 flex flex-col items-center gap-12'>
        <Heading
          sub='Why Sign Up as a Media Service Provider'
          main='Showcase Your Expertise, Expand Your Opportunities'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {data.map(item => (
            <div
              key={item.id}
              className='flex flex-col gap-6 border border-muted rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
            >
              <img
                src={item.image}
                alt={`${item.title} Image`}
                className='rounded-md w-full aspect-video object-cover'
              />
              <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-semibold text-primary'>
                    {item.title}
                  </h3>
                  <div className='text-muted-foreground'>{item.icon}</div>
                </div>
                <p className='text-base text-muted-foreground'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
