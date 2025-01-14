/* eslint-disable @typescript-eslint/no-explicit-any */
export default function BannerAuthImage({ className = '' }: any) {
  return (
    <article className={`hidden lg:block relative ${className}`}>
      <img
        src='/banner.webp'
        alt='Register Visual'
        className='w-full h-full object-cover'
      />
      <footer className='absolute inset-0 text-theme-secondary flex items-end p-6'>
        <p className='text-sm'>
          © {new Date().getFullYear()} Triple Platform. All rights reserved.
          <span className='px-2 bg-black/70 rounded text-white'>
            Reserved to Triple P FZE
          </span>
        </p>
      </footer>
    </article>
  )
}
