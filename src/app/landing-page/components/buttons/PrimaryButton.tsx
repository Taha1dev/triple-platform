export default function PrimaryButton({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button className='bg-secondary text-pretty border-2 border-secondary font-semibold text-xl text-primary rounded-md px-4 py-2 w-fit flex items-center justify-center gap-2'>
      {children}
    </button>
  )
}
