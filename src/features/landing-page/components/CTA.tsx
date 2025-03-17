import {
  CTABTN1TITLE,
  CTABTN2TITLE,
  CTADESCRIPTION,
  CTATITLE,
} from '@/features/landing-page/constants'
import { Button } from '@/components/ui/button'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { useNavigate } from 'react-router-dom'

export default function CTASection() {
  const navigate = useNavigate()
  return (
    <div className='container mx-auto'>
      <NeonGradientCard className=''>
        <div className='container overflow-hidden relative mx-auto cursor-pointer rounded-[20px] flex flex-col gap-6 md:gap-8 items-center justify-center py-6 md:py-8 px-4 transition-all'>
          <h1 className='text-center !font-paytone text-3xl md:text-5xl'>
            {CTATITLE}
          </h1>
          <p className='font-medium text-lg md:text-2xl /80 text-center max-w-3xl '>
            {CTADESCRIPTION}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-9 !z-30'>
            <Button className='text-lg'>{CTABTN1TITLE}</Button>
            <Button
              onClick={() => {
                navigate('/home')
              }}
              className='!bg-theme-variant !text-theme-secondary text-lg'
            >
              {CTABTN2TITLE}
            </Button>
          </div>
        </div>
      </NeonGradientCard>
    </div>
  )
}
