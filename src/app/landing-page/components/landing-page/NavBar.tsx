import { X, Menu } from 'lucide-react'
import { useState } from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { id: 1, name: 'Why Triple Platform', href: '#services' },
    { id: 2, name: 'How It Works', href: '#how-it-works' },
    { id: 3, name: 'Vision', href: '#vision' },
    { id: 4, name: 'Media Providers', href: '#media' },
  ]
  return (
    <nav className='container mx-auto flex justify-between items-center p-4 md:p-0'>
      <img src='/triple-logo.png' alt='triple-logo' width={200} height={90} />
      <button
        className='block md:hidden z-50'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label='Toggle menu'
      >
        {isMenuOpen ? <X size={34} /> : <Menu size={34} />}
      </button>

      <div
        className={`absolute md:static top-4 left-0 w-full md:w-auto bg-primary md:bg-transparent z-40 p-4 md:p-0 transition-transform ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'
        }`}
      >
        <div className='flex flex-col md:flex-row gap-6 md:gap-14 items-center'>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className='font-medium text-lg md:text-xl'
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className='flex justify-center md:hidden gap-4 mt-4'>
          <SecondaryButton text='Login' />
          <PrimaryButton children='Signup' />
        </div>
      </div>

      <div className='hidden md:flex gap-4'>
        <SecondaryButton text='Login' />
        <PrimaryButton children='Signup' />
      </div>
    </nav>
  )
}
