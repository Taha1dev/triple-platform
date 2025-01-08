export default function BannerAuthImage() {
  return (
    <article className='hidden lg:block relative'>
      <img
        src='/banner.webp'
        alt='Register Visual'
        className='w-full h-full object-cover'
      />
      <footer className='absolute inset-0 bg-opacity-40 flex items-end p-6'>
        <p className='text-sm'>
          © {new Date().getFullYear()} Triple Platform. All rights reserved.
          Crafted with 🖤
        </p>
      </footer>
    </article>
  )
}
