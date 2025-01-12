import { motion } from 'framer-motion' // For animations
import Heading from '../Heading'

export default function Vision() {
  return (
    <section
      id='vision'
      className='container mx-auto py-12 px-4 md:px-8 lg:px-16 mb-8'
    >
      {/* Heading Section */}
      <Heading main='Shaping the Future of Media Production' sub='Our Vision' />

      {/* Content Section */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='flex flex-col md:flex-row items-center justify-between gap-12'
      >
        {/* Avatar Section */}
        <div className='flex flex-col items-center text-center md:text-left'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src='/avatar.webp'
              className='w-48 h-48 md:w-56 md:h-56 border-4 border-theme-variant rounded-full object-cover shadow-lg'
              alt='CEO avatar'
            />
          </motion.div>
          <h4 className='font-semibold text-foreground text-2xl mt-6'>
            Shadi Musharraaf
          </h4>
          <p className='text-muted-foreground text-lg'>
            Triple P Founder & Director - Innovator - Producer
          </p>
        </div>

        {/* Vision Statement */}
        <div className='flex-1 max-w-2xl'>
          <motion.blockquote
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='italic font-medium text-xl md:text-2xl leading-relaxed text-foreground/90 bg-gradient-to-r from-theme-variant/10 to-transparent p-6 rounded-lg border-l-4 border-theme-variant'
          >
            <blockquote className='text-lg md:text-xl italic font-medium text-muted-foreground leading-relaxed pl-4'>
              "We must envision the future and embrace the power of giving to
              uncover macro gains within every micro detail. This is the new
              world we’re building—a world where media production is seamless,
              efficient, and accessible to all."
            </blockquote>
          </motion.blockquote>
        </div>
      </motion.main>
    </section>
  )
}
