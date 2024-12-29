import { ArrowRight } from 'lucide-react'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import {
  CTABTN1TITLE,
  CTABTN2TITLE,
  CTADESCRIPTION,
  CTATITLE,
} from '@/app/landing-page/constants'

export default function CTASection() {
  return (
    <div className='container mx-auto bg-variant rounded-2xl flex flex-col gap-6 md:gap-8 items-center justify-center py-6 md:py-8 px-4'>
      <h1 className='text-center font-paytone text-3xl md:text-5xl'>
        {CTATITLE}
      </h1>
      <p className='font-medium text-lg md:text-2xl text-secondary/80 text-center max-w-3xl'>
        {CTADESCRIPTION}
      </p>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-9'>
        <PrimaryButton>
          {CTABTN1TITLE} <ArrowRight />
        </PrimaryButton>
        <SecondaryButton text={CTABTN2TITLE} />
      </div>
    </div>
  )
}
