import { Link } from 'react-router-dom'

export default function PrimaryButton({
  children,
  href,
}: {
  children: React.ReactNode
  href?: string
}) {
  return (
    <button className='bg-theme-secondary text-pretty border-2 border-theme-secondary font-semibold text-xl text-theme-primary rounded-md px-4 py-2 w-fit flex items-center justify-center gap-2'>
      <Link to={href || ''}>{children}</Link>
    </button>
  )
}
