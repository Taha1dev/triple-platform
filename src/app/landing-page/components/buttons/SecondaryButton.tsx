interface SecondaryButtonProps {
  text: string
}
export default function SecondaryButton({ text }: SecondaryButtonProps) {
  return (
    <button className='bg-gradient-to-r from-[#1a1a1b] to-[#191919] border-2 border-secondary font-semibold text-xl text-secondary/85 rounded-md w-fit px-4 py-2'>
      {text}
    </button>
  )
}
