/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@/components/theme-provider'
import { ModeToggle } from '@/mode-toggle'
import { Instagram, Linkedin } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

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
    <footer className='py-8 container mx-auto'>
      <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-8'>
        {/* Logo and Tagline */}
        <div className='flex flex-col justify-center items-center text-center '>
          <img src={logo} alt='Triple Platform Logo' width={458} height={124} />
          <p className='text-xl text-center -mt-2 /50 italic'>
            Height the odds
          </p>
        </div>

        {/* Quick Links and Legal */}
        <div className='w-full md:w-auto flex flex-col md:flex-row gap-12 lg:items-start :items-center'>
          {/* Quick Links */}
          <div>
            <h3 className='font-semibold mb-2 text-xl'>Quick Links</h3>
            <ul className='space-y-1 '>
              <li>
                <a href='#about' className=' transition text-lg'>
                  About
                </a>
              </li>
              <li>
                <a href='#faq' className=' transition text-lg'>
                  FAQ
                </a>
              </li>
              <li>
                <a href='#contact' className=' transition text-lg'>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className='font-semibold mb-2 text-xl'>Legal</h3>
            <ul className='space-y-1 '>
              <li>
                <a href='#privacy' className=' transition text-lg'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#terms' className=' transition text-lg'>
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright and Social Icons */}
      <div className='mt-8 border-t border-theme-secondary-40 pt-4 flex flex-col md:flex-row justify-between items-center gap-4'>
        <p className='text-xl  text-center'>
          © {new Date().getFullYear()} Tripple Platform. All Rights Reserved.
        </p>
        <div className='flex items-center gap-4'>
          <ModeToggle />
          <a href='#' aria-label='Instagram'>
            <Instagram size={32} />
          </a>
          <a href='#' aria-label='LinkedIn'>
            <Linkedin size={32} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
