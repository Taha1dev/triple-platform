import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import {
  CTABTN1TITLE,
  CTABTN2TITLE,
  CTADESCRIPTION,
  CTATITLE,
} from '@/features/landing-page/constants'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='container mx-auto bg-theme-variant rounded-[20px] flex flex-col gap-6 md:gap-8 items-center justify-center py-6 md:py-8 px-4 '
    >
      <h1 className='text-center font-paytone text-3xl md:text-5xl text-background dark:text-foreground'>
        {CTATITLE}
      </h1>
      <p className='font-medium text-lg md:text-2xl /80 text-center max-w-3xl text-background dark:text-foreground'>
        {CTADESCRIPTION}
      </p>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-9'>
        <Button>
          {CTABTN1TITLE} <ArrowRight />
        </Button>
        <Button variant={'outline'}>
          {CTABTN2TITLE} <ArrowRight />
        </Button>
      </div>
    </motion.section>
  )
}
