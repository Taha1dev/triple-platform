import {
  NavBar,
  CTASection,
  Footer,
  HeroSection,
  HowItWorks,
  MediaProvider,
  ServicesSection,
  Vision,
} from '@/app/landing-page/components.barel'
function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <div className='my-16'></div>
      <ServicesSection />
      <div className='my-16'></div>
      <HowItWorks />
      <div className='my-16'></div>
      <MediaProvider />
      <div className='my-16'></div>
      <CTASection />
      <div className='my-16'></div>
      <Vision />
      <div className='my-16'></div>
      <Footer />
    </>
  )
}

export default App
