/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@/components/theme-provider'
import { ModeToggle } from '@/mode-toggle'
import { Instagram, Linkedin } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fullYear } from '../constants'
const Footer = () => {
  const { theme } = useTheme()
  const [logo, setLogo] = useState<string>('/triple-platform-logo.png')
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
      setLogo('/triple-platform-logo.png')
    } else {
      setLogo('/triple-platform-light-logo.png')
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
  return (
    <footer className='bg-background py-12 border-t z-20'>
      <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left'>
        {/* Logo and Tagline */}
        <div className='flex flex-col items-center md:items-start'>
          <div className='flex flex-col items-center'>
            <Link to={'/'}>
              <img
                src={logo}
                alt='Triple Platform Logo'
                width={250}
                height={75}
              />
            </Link>
            <p className='text-lg text-muted-foreground italic -mt-1'>
              Height the odds
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-2'>
            <li>
              <Link
                to='/about'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to='faq'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Legal</h3>
          <ul className='space-y-2'>
            <li>
              <Link
                to='privacy-policy'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to='terms'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links and Theme Toggle */}
        <div className='flex flex-col items-center md:items-start space-y-4'>
          <h3 className='text-lg font-semibold'>Follow Us</h3>
          <div className='flex items-center space-x-4'>
            <Link
              to='https://www.instagram.com/triplep.odds/'
              aria-label='Instagram'
              target='_blank'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Instagram size={24} />
            </Link>
            <Link
              to='https://linkedin.com/company/3xpstudio/?viewAsMember=true'
              target='_blank'
              aria-label='LinkedIn'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Linkedin size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='container mx-auto px-4 mt-8 border-t pt-8 text-center text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0'>
        <p>© {fullYear} Triple Platform. All Rights Reserved.</p>
        <ModeToggle />
      </div>
    </footer>
  )
}

export default Footer
