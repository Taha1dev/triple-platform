import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()
  return (
    <main className='flex m-2 items-center'>
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
          className='flex flex-col gap-4 p-6 md:p-10 rounded-[20px] max-w-xl md:max-w-3xl mr-auto text-foreground text-theme-secondary'
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            className='text-[2.20rem] md:text-5xl leading-tight  font-paytone'
          >
            Media Pre-Production made easy
          </motion.h1>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
            className='text-lg md:text-xl font-medium text-theme-secondary'
          >
            Triple Platform makes it easy to find resources, make decisions
            faster, and help you seamlessly manage your Media Project
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
            className='flex gap-2'
          >
            <ShimmerButton
              onClick={() => navigate('/home')}
              className='shadow-2xl'
            >
              <span className='whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg'>
                Explore Now
              </span>
            </ShimmerButton>
            <Button className='lg:hidden sblock w-fit text-lg !bg-theme-variant !text-white'>
              <Link to='/register'>Sign Up</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  )
}
