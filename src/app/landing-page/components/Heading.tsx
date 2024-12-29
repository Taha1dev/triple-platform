interface HeadingProps {
  sub: string
  main: string
}
export default function Heading({ sub, main }: HeadingProps) {
  return (
    <div className='flex flex-col gap-5 items-center justify-center *:capitalize'>
      <p className='font-monoScape text-variant text-lg font-medium text-center'>{sub}</p>
      <h2 className='text-4xl font-bold text-center text-wrap max-w-[385px]  tracking-[3px]'>
        {main}
      </h2>
    </div>
  )
}
