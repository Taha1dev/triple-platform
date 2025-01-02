import { Link } from 'react-router-dom'
export default function PrimaryButton({
  children,
  href,
}: {
  children: React.ReactNode
  href?: string
}) {
  return (
    <button className='bg-theme-secondary border-2 border-theme-secondary font-semibold text-xl text-theme-primary rounded-md w-fit'>
      <Link
        className='px-4 py-2 flex items-center justify-center gap-2'
        to={href || ''}
      >
        {children}
      </Link>
    </button>
  )
}
