import Heading from '../Heading'

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
    <section id='how-it-works' className='container mx-auto py-8 px-4 md:px-8 lg:px-8 mb-4'>
      <Heading
        sub='How It Works'
        main='Your Path to stress-free Pre-production'
      />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
        {data.map(item => {
          return (
            <div key={item.id} className='flex flex-col items-center gap-11'>
              <p className='bg-variant text-white font-bold text-xl px-4 py-2 rounded-full text-center w-fit'>
                {item.id}
              </p>
              <div className='flex flex-col gap-7 *:text-center'>
                <h2 className='text-2xl font-extrabold'>{item.name}</h2>
                <p className='w-[250px] text-xl text'>{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
