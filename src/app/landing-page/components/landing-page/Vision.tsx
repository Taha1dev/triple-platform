import Heading from '../Heading'

export default function Vision() {
  return (
    <section
      id='vision'
      className='container mx-auto py-8 px-4 md:px-8 lg:px-8 mb-4 flex-col-center lg:gap-8 md:gap-6 sm:gap-4'
    >
      <Heading main='Shaping the Future of Media Production' sub='Our Vision' />
      <main className='flex flex-col md:flex-row items-center  justify-between gap-8 mt-16'>
        {/* CEO Avatar and Details */}
        <div className='flex flex-col items-center text-center md:text-left'>
          <img
            src='/avatar.png'
            className='w-auto max-w-[185px]'
            width={185}
            height={185}
            alt='CEO avatar'
          />
          <h4 className='font-medium text-xl md:text-2xl mt-4'>
            Shadi Musharraaf
          </h4>
          <p className='text-theme-secondary/50 text-sm md:text-base'>
            Triple P Founder & Director - Innovator - Producer
          </p>
        </div>

        {/* Vision Statement */}
        <div className='flex-1'>
          <p className='italic font-medium text-lg md:text-2xl leading-relaxed'>
            We must envision the future and embrace the power of giving to
            uncover macro gains within every micro detail. This is the new world
            we’re building—a world where media production is seamless,
            efficient, and accessible to all. Triple Platform simplifies
            resource discovery, accelerates decision-making, and ensures a
            stress-free production process, empowering you to shape the future
            of media.
          </p>
        </div>
      </main>
    </section>
  )
}
