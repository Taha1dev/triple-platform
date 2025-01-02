import { ModeToggle } from '@/mode-toggle'
import { Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='text-white py-8 container mx-auto'>
      <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-8'>
        {/* Logo and Tagline */}
        <div className='flex flex-col justify-center items-center text-center '>
          <img
            src='/triple-platform-logo.png'
            alt='Triple Platform Logo'
            width={458}
            height={124}
          />
          <p className='text-xl text-center -mt-2 text-theme-secondary/50 italic'>
            Height the odds
          </p>
        </div>

        {/* Quick Links and Legal */}
        <div className='w-full md:w-auto flex flex-col md:flex-row gap-12 lg:items-start :items-center'>
          {/* Quick Links */}
          <div>
            <h3 className='font-semibold mb-2 text-xl'>Quick Links</h3>
            <ul className='space-y-1 text-gray-400'>
              <li>
                <a
                  href='#about'
                  className='hover:text-white transition text-lg'
                >
                  About
                </a>
              </li>
              <li>
                <a href='#faq' className='hover:text-white transition text-lg'>
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href='#contact'
                  className='hover:text-white transition text-lg'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className='font-semibold mb-2 text-xl'>Legal</h3>
            <ul className='space-y-1 text-gray-400'>
              <li>
                <a
                  href='#privacy'
                  className='hover:text-white transition text-lg'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='#terms'
                  className='hover:text-white transition text-lg'
                >
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright and Social Icons */}
      <div className='mt-8 border-t border-theme-secondary-40 pt-4 flex flex-col md:flex-row justify-between items-center gap-4'>
        <p className='text-xl text-theme-secondary text-center'>
          © {new Date().getFullYear()} Tripple Platform. All Rights Reserved.
        </p>
        <div className='flex gap-4'>
          <a href='#' aria-label='Instagram'>
            <Instagram size={32} />
          </a>
          <a href='#' aria-label='LinkedIn'>
            <Linkedin size={32} />
          </a>
          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}

export default Footer
