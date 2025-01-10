import { Button } from '@/components/ui/button'
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
    <Button
      variant={'outline'}
      className='font-semibold text-xl rounded-md w-fit '
    >
      <Link
        className='px-4 py-2 w-fit flex items-center justify-center gap-2'
        to={href || ''}
      >
        {children}
      </Link>
    </Button>
  )
}
