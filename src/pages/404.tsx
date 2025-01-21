import { useTheme } from '../components/theme-provider'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Footer, NavBar } from '../features/landing-page/components.barel'

export default function NotFound() {
  const { theme } = useTheme()
  const navigate = useNavigate()

  return (
    <>
      <NavBar />
      <div className='flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4'>
        <img
          src={theme === 'light' ? '/not-found-dark.svg' : '/not-found.svg'}
          alt='Not Found'
          className='w-96 h-full max-w-md mb-8 lg:p-0 p-10'
        />
        <h1 className='text-6xl font-bold tracking-widest mb-4'>404</h1>
        <p className='text-lg text-muted-foreground mb-8 text-center'>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate('/')}>Go Back Home</Button>
      </div>
      <Footer />
    </>
  )
}
