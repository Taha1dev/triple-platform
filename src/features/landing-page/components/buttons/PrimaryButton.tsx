import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
export default function PrimaryButton({
  children,
  href,
}: {
  children: React.ReactNode
  href?: string
}) {
  return (
    <Button className='font-semibold text-xl rounded-md w-fit'>
      <Link
        className='px-4 py-2 flex items-center justify-center gap-2'
        to={href || ''}
      >
        {children}
      </Link>
    </Button>
  )
}
