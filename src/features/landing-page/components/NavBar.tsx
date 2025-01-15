/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { navLogo, useTheme } from '@/components/theme-provider'
import Menu from './Menu'
const NavBar = ({ showLinks = true }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navLinks = [
    { id: 1, name: 'Why Triple Platform', href: '#services' },
    { id: 2, name: 'How It Works', href: '#how-it-works' },
    { id: 3, name: 'Vision', href: '#vision' },
    { id: 4, name: 'Media Providers', href: '#media' },
  ]

  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  // Simulate scroll behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <>
      {/* Desktop Navbar */}
      <Card
        className={`hidden md:flex container z-50 mx-auto items-center justify-between gap-6 px-4 py-1 mt-2 rounded-2xl bg-background/75 backdrop-blur-md w-full max-w-4xl transition-all duration-500 ${
          isScrolled ? 'sticky inset-0 top-2 shadow-lg' : ''
        } ${!showLinks && 'max-w-6xl'}`}
      >
        {/* Logo */}
        <Link to='/' className='flex-shrink-0'>
          <img
            src={navLogo(theme)}
            alt='triple-logo'
            className='w-fit h-[55px]'
          />
        </Link>

        {/* Nav Links */}
        <div className='flex items-center gap-6'>
          {showLinks &&
            navLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                className='font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 whitespace-nowrap'
              >
                {link.name}
              </a>
            ))}
        </div>

        {/* Auth Buttons */}
        <div className='flex gap-3'>
          <Button asChild variant='default' className='rounded-lg'>
            <Link to='/login'>Login</Link>
          </Button>
          <Button asChild variant='outline' className='rounded-lg'>
            <Link to='/register'>Register</Link>
          </Button>
        </div>
      </Card>

      {/* Mobile Navbar */}
      <Card
        className={`md:hidden container z-50 mx-auto grid grid-cols-2 gap-4 px-4 py-1 mt-2 rounded-2xl bg-background/75 backdrop-blur-md w-full max-w-7xl transition-all duration-500 ${
          isScrolled ? 'sticky inset-0 top-2 shadow-lg' : ''
        }`}
      >
        {/* Logo */}
        <Link to='/' className='flex-shrink-0'>
          <img
            src={navLogo(theme)}
            alt='triple-logo'
            className='w-fit h-[55px]'
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className='block md:hidden px-3 rounded-lg hover:bg-muted transition-colors justify-self-end'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={28} /> : <Menu className='size-7' />}
        </button>

        {/* Nav Links and Auth Buttons (Second Row) */}
        {isMenuOpen && (
          <div className='col-span-2 flex flex-col gap-4 mt-4'>
            {/* Nav Links */}
            <div className='flex flex-col gap-3'>
              {showLinks &&
                navLinks.map(link => (
                  <a
                    key={link.id}
                    href={link.href}
                    className='font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-2'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
            </div>

            {/* Auth Buttons */}
            <div className='flex flex-col gap-3'>
              <Button asChild variant='default' className='w-full rounded-lg'>
                <Link to='/login'>Login</Link>
              </Button>
              <Button asChild variant='outline' className='w-full rounded-lg'>
                <Link to='/register'>Register</Link>
              </Button>
            </div>
          </div>
        )}
      </Card>
    </>
  )
}

export default NavBar
