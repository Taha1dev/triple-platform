import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
export default function SecondaryButton({
  children,
  href,
}: {
  children: ReactNode
  href?: string
}) {
  return (
    <button className='
    bg-gradient-to-r from-[#1a1a1b] to-[#191919] border-2 border-theme-secondary font-semibold text-xl text-theme-secondary/85 rounded-md w-fit '>
      <Link className='px-4 py-2 w-fit flex items-center justify-center gap-2' to={href || ''}>{children}</Link>
    </button>
  )
}
