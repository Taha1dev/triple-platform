import { Users, Images, Globe } from 'lucide-react'
import Heading from '../Heading'

export default function MediaProvider() {
  const data = [
    {
      id: 1,
      image: '/showcase1.png',
      title: 'Expand Your Reach',
      description:
        'Gain visibility and connect with industry professionals seeking your services.',
      icon: <Users size={32} />,
    },
    {
      id: 2,
      image: '/showcase2.png',
      title: 'Showcase Your Work',
      description:
        'Display your portfolio and achievements to attract the right projects.',
      icon: <Images size={32} />,
    },
    {
      id: 3,
      image: '/showcase3.png',
      title: 'Join a Thriving Community',
      description:
        'Be part of a forward-thinking media ecosystem that values time, clarity, and efficiency.',
      icon: <Globe size={32} />,
    },
  ]
  return (
    <section id='media' className='relative flex'>
      {/* <div className='absolute top-10 right-0 bg-blur-pattern w-[2000px] h-[1000px] bg-cover'></div> */}
      <div className='absolute bottom-52 overflow-x-hidden left-12 bg-blur-pattern w-[2000px] h-[1000px] bg-cover'></div>
      <section className='container mx-auto py-8 px-4 md:px-8 lg:px-8 mb-4 flex-col-center gap-8 '>
        <Heading
          sub='Why Sign Up as a Media Service Provider'
          main='Showcase Your Expertise, Expand Your Opportunities'
        />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
          {data.map(item => {
            return (
              <div
                key={item.id}
                className='flex flex-col gap-11 border-2 border-white-70 rounded-2xl py-7 px-4 csard'
              >
                <img
                  src={item.image}
                  alt={`${item.title} Image`}
                  width={394}
                  height={260}
                  className='rounded-lg self-center'
                />
                <div className='flex flex-col gap-5'>
                  <div className='flex justify-between'>
                    <h3 className='font-semibold text-2xl'>{item.title}</h3>
                    <div>{item.icon}</div>
                  </div>
                  <p className='text-theme-secondary/90 text-xl font-light'>
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </section>
  )
}
