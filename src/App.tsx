import { lazy, Suspense } from 'react'

const NavBar = lazy(() =>
  import('@/features/landing-page/components.barel').then(module => ({
    default: module.NavBar,
  })),
)
const HeroSection = lazy(() =>
  import('@/features/landing-page/components.barel').then(module => ({
    default: module.HeroSection,
  })),
)
const ServicesSection = lazy(() =>
  import('@/features/landing-page/components.barel').then(module => ({
    default: module.ServicesSection,
  })),
)
const HowItWorks = lazy(() =>
  import('@/features/landing-page/components.barel').then(module => ({
    default: module.HowItWorks,
  })),
)
const MediaProvider = lazy(() =>
  import('@/features/landing-page/components.barel').then(module => ({
    default: module.MediaProvider,
  })),
)
const CTASection = lazy(() =>
  import('@/features/landing-page/components.barel').then(module => ({
    default: module.CTASection,
  })),
)
const Vision = lazy(() =>
  import('@/features/landing-page/components.barel').then(module => ({
    default: module.Vision,
  })),
)
const Footer = lazy(() =>
  import('@/features/landing-page/components.barel').then(module => ({
    default: module.Footer,
  })),
)

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  )
}

export default App
