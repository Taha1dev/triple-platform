import {
  CTABTN1TITLE,
  CTABTN2TITLE,
  CTADESCRIPTION,
  CTATITLE,
} from '@/features/landing-page/constants'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function CTASection() {
  return (
    <Card className='container mx-auto bg-background cursor-pointer !text-foreground dark:hover:bg-muted/20 hover:bg-muted rounded-[20px] flex flex-col gap-6 md:gap-8 items-center justify-center py-6 md:py-8 px-4 transition-all'>
      <h1 className='text-center font-paytone text-3xl md:text-5xl'>
        {CTATITLE}
      </h1>
      <p className='font-medium text-lg md:text-2xl /80 text-center max-w-3xl '>
        {CTADESCRIPTION}
      </p>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-9'>
        <Button className='text-lg'>{CTABTN1TITLE}</Button>
        <Button className='!bg-theme-variant !text-theme-secondary text-lg'>
          {CTABTN2TITLE}
        </Button>
      </div>
    </Card>
  )
}
