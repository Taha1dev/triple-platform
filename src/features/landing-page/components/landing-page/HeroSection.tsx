import PrimaryButton from '../buttons/PrimaryButton'

export default function HeroSection() {
  return (
    <section className='flex items-center bg-hero-pattern bg-cover h-[543px] w-full rounded md:py-11 py-8 px-5'>
      <div className='flex flex-col gap-4 px-6 md:px-9 py-6 md:py-11 rounded-md max-w-xl md:max-w-3xl ml-auto md:ml-5 text-background dark:text-foreground'>
        <h1 className='text-3xl md:text-6xl font-paytone leading-tight text-wrap'>
          Streamline Your Media Production Journey.
        </h1>
        <h3 className='text-lg md:text-2xl font-medium text-wrap'>
          Find the right resources, make faster decisions, and achieve a
          stress-free pre-production process.
        </h3>
        <PrimaryButton children='Learn More' />
      </div>
    </section>
  )
}
