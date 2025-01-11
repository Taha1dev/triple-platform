import { Button } from '@/components/ui/button'
import { motion, AbsoluteKeyframe } from 'motion/react'
export default function HeroSection() {
  return (
    <main className='flex m-2 items-center bg-background/70 backdrop-blur-sm'>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='flex items-center bg-hero-pattern bg-cover h-[543px] w-full rounded-2xl self-center px-6 py-8 md:py-12'
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          className='flex flex-col gap-6 p-6 md:p-10 rounded-[20px] max-w-xl md:max-w-3xl bg-background/20 backdrop-blur-md shadow-2xl mr-auto text-foreground'
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            className='text-[2.20rem] md:text-5xl leading-tight text-foreground font-paytone'
          >
            Media Pre-Production made easy
          </motion.h1>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
            className='text-lg md:text-xl font-medium text-foreground/80'
          >
            Triple Platform makes it easy to find resources, make decisions
            faster, and help you seamlessly manage your Media Project
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
          >
            <Button className='w-fit text-lg'>
              <a href='#how-it-works'>Learn More</a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  )
}
