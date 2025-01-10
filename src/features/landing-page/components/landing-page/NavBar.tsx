/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { X, Menu } from 'lucide-react'
// import { useCallback, useEffect, useState } from 'react'
// import { useTheme } from '@/components/theme-provider'
// import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'

// export default function NavBar({ showLinks = true }: any) {
// const [isMenuOpen, setIsMenuOpen] = useState(false)
// const [isScrolled, setIsScrolled] = useState<boolean>(false)
// const [logo, setLogo] = useState<string>('/triple-platform-logo.png')

// const navLinks = [
//   { id: 1, name: 'Why Triple Platform', href: '#services' },
//   { id: 2, name: 'How It Works', href: '#how-it-works' },
//   { id: 3, name: 'Vision', href: '#vision' },
//   { id: 4, name: 'Media Providers', href: '#media' },
// ]

// const { theme } = useTheme()
// const getSystemTheme = () => {
//   return window.matchMedia('(prefers-color-scheme: dark)').matches
//     ? 'dark'
//     : 'light'
// }

// const getEffectiveTheme = useCallback(() => {
//   return theme === 'system' ? getSystemTheme() : theme
// }, [theme])

// useEffect(() => {
//   const effectiveTheme = getEffectiveTheme()
//   if (effectiveTheme === 'dark') {
//     setLogo('/triple-logo.webp')
//   } else {
//     setLogo('/triple-logo-light.png')
//   }
// }, [getEffectiveTheme, theme])

// useEffect(() => {
//   if (theme === 'system') {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
//     const handleSystemThemeChange = (e: any) => {
//       const newTheme = e.matches ? 'dark' : 'light'
//       setLogo(
//         newTheme === 'dark'
//           ? '/triple-platform-light-logo.png'
//           : '/triple-platform-logo.png',
//       )
//     }

//     mediaQuery.addEventListener('change', handleSystemThemeChange)
//     return () =>
//       mediaQuery.removeEventListener('change', handleSystemThemeChange)
//   }
// }, [theme])
// useEffect(() => {
//   const handleScroll = () => {
//     setIsScrolled(window.scrollY > 10) // Set threshold for "sticky" effect
//   }

//   window.addEventListener('scroll', handleScroll)
//   return () => {
//     window.removeEventListener('scroll', handleScroll)
//   }
// }, [])
//   return (
//     <Card
//       className={`container z-50 mx-auto flex items-center justify-between gap-6 p-4 mt-2 rounded-2xl bg-background/75 backdrop-blur-sm w-full max-w-7xl transition-all duration-500 ${
//         isScrolled ? 'sticky inset-0 top-2 transition-all duration-500' : ''
//       }`}
//     >
//       {/* Logo */}
//       <Link to='/' className='flex-shrink-0'>
//         <img src={logo} alt='triple-logo' className='w-full h-[55px] ' />
//       </Link>

//       {/* Mobile Menu Toggle */}

//       {/* Nav Links */}
//       <div
//         className={`${
//           isMenuOpen ? 'block' : 'hidden'
//         } md:flex md:items-center md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-background md:bg-transparent p-4 md:p-0 rounded-lg shadow-md md:shadow-none`}
//       >
//         {showLinks &&
//           navLinks.map(link => (
//             <Link
//               key={link.id}
//               to={link.href}
//               className='block md:inline-block font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 md:py-0'
//             >
//               {link.name}
//             </Link>
//           ))}
//       </div>

//       {/* Auth Buttons */}
//       <div className='hidden md:flex gap-3'>
//         <Button asChild variant='default' className='rounded-lg'>
//           <Link to='/login'>Login</Link>
//         </Button>
//         <Button asChild variant='outline' className='rounded-lg'>
//           <Link to='/register'>Register</Link>
//         </Button>
//       </div>

//       {/* Mobile Auth Buttons */}
//       <div className='flex md:hidden gap-3'>
//         <Button asChild variant='default' size='sm' className='rounded-lg'>
//           <Link to='/login'>Login</Link>
//         </Button>
//         <Button asChild variant='outline' size='sm' className='rounded-lg'>
//           <Link to='/register'>Register</Link>
//         </Button>
//       </div>
//       <button
//         className='block md:hidden rounded-lg hover:bg-muted transition-colors'
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         aria-label='Toggle menu'
//       >
//         {isMenuOpen ? <X size={28} /> : <Menu className='size-7' />}
//       </button>
//       <div className='flex flex-col items-center justify-center'>
//         {navLinks.map(link => (
//           <Link
//             key={link.id}
//             to={link.href}
//             className='block md:inline-block font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 md:py-0'
//           >
//             {link.name}
//           </Link>
//         ))}
//       </div>
//     </Card>
//   )
// }
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card' // Assuming shadcn Card component
import { Button } from '@/components/ui/button' // Assuming shadcn Button component
import { Menu, X } from 'lucide-react' // Assuming you're using Lucide icons
import { useTheme } from '@/components/theme-provider'

const NavBar = ({ showLinks = true }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [logo, setLogo] = useState<string>('/triple-platform-logo.png')

  const navLinks = [
    { id: 1, name: 'Why Triple Platform', href: '#services' },
    { id: 2, name: 'How It Works', href: '#how-it-works' },
    { id: 3, name: 'Vision', href: '#vision' },
    { id: 4, name: 'Media Providers', href: '#media' },
  ]

  const { theme } = useTheme()
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const getEffectiveTheme = useCallback(() => {
    return theme === 'system' ? getSystemTheme() : theme
  }, [theme])

  useEffect(() => {
    const effectiveTheme = getEffectiveTheme()
    if (effectiveTheme === 'dark') {
      setLogo('/triple-logo.webp')
    } else {
      setLogo('/triple-logo-light.png')
    }
  }, [getEffectiveTheme, theme])

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = (e: any) => {
        const newTheme = e.matches ? 'dark' : 'light'
        setLogo(
          newTheme === 'dark'
            ? '/triple-platform-light-logo.png'
            : '/triple-platform-logo.png',
        )
      }

      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () =>
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme])
  useEffect(() => {
    const handleScroll = () => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Desktop Navbar */}
      <Card
        className={`container mx-auto flex items-center gap-12 md:gap-4 px-6 mt-2 rounded-2xl !bg-background/75 !backdrop-blur-sm w-fit
    ${isScrolled && 'sticky inset-0 top-2 z-50 transition-all duration-500'}`}
      >
        <Link to={'/'}>
          <img src={logo} alt='triple-logo' className='w-fit h-[55px]' />
        </Link>
        {/* <button
        className='block md:hidden z-50'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label='Toggle menu'
      >
        {isMenuOpen ? <X size={34} /> : <Menu size={34} />}
      </button> */}

        {showLinks &&
          navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className='font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 whitespace-nowrap'
            >
              {link.name}
            </a>
          ))}
        <div className=' md:hidden '>
          <Button>
            <Link className='px-4 py-2 font-medium text-lg' to={'/login'}>
              Login
            </Link>
          </Button>
          <Button variant={'outline'}>
            <Link className='px-4 py-2 font-medium text-lg' to={'/register'}>
              Register
            </Link>
          </Button>
        </div>

        <div className='hidden md:flex gap-4'>
          <Button className='rounded-xl'>
            <Link to={'/login'}>Login</Link>
          </Button>
          <Button className='rounded-xl' variant={'outline'}>
            <Link to={'/register'}>Register</Link>
          </Button>
        </div>
      </Card>

      {/* Mobile Navbar */}
      <Card
        className={`md:hidden container z-50 mx-auto grid grid-cols-2 gap-4 p-4 mt-2 rounded-2xl bg-background/75 backdrop-blur-sm w-full max-w-7xl transition-all *:transition-all duration-500 ${
          isScrolled ? 'sticky inset-0 top-2 shadow-lg' : ''
        }`}
      >
        {/* Logo */}
        <Link to='/' className='flex-shrink-0'>
          <img src={logo} alt='triple-logo' className='w-fit h-[55px]' />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className='block px-3 md:hidden rounded-xl hover:bg-muted transition-colors justify-self-end'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav Links and Auth Buttons (Second Row) */}
        {isMenuOpen && (
          <div className='col-span-2 flex flex-col gap-4 mt-4 transition-all'>
            {/* Nav Links */}
            <div className='flex flex-col gap-3'>
              {navLinks.map(link => (
                <Link
                  key={link.id}
                  to={link.href}
                  className='font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-2'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
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
      {/* Mobile Menu (Separate Card) */}
    </>
  )
}

export default NavBar
