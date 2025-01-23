import React from 'react'
import { Helmet } from 'react-helmet'
import { Input } from '@/components/ui/input' // Shadcn Input component
import { Textarea } from '@/components/ui/textarea' // Shadcn Textarea component
import { Button } from '@/components/ui/button' // Shadcn Button component

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    alert('Thank you for contacting us! We will get back to you soon.')
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Helmet>
        <title>Contact Us - Triple Platform</title>
        <meta
          name='description'
          content="Contact Triple Platform for any inquiries or support. We're here to help!"
        />
      </Helmet>

      <h1 className='text-4xl font-bold mb-8'>Contact Us</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='bg-zinc-900 p-6 rounded-lg'>
          <h2 className='text-3xl font-bold mb-4'>Other Ways to Reach Us</h2>
          <p className='text-lg mb-4'>
            <strong>Email:</strong> Mouchrefc@gmail.com
          </p>
          <p className='text-lg'>
            We value your feedback and are here to assist you with any questions
            or concerns.
          </p>
        </div>
        <div>
          <p className='text-lg mb-8'>
            Have questions or need support? Reach out to us using the form
            below, and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor='name' className='block text-lg font-medium mb-2'>
                Name
              </label>
              <Input
                type='text'
                id='name'
                placeholder='Enter your name'
                className='w-full'
                required
              />
            </div>

            <div className='mb-6'>
              <label htmlFor='email' className='block text-lg font-medium mb-2'>
                Email
              </label>
              <Input
                type='email'
                id='email'
                placeholder='Enter your email'
                className='w-full'
                required
              />
            </div>

            <div className='mb-6'>
              <label
                htmlFor='subject'
                className='block text-lg font-medium mb-2'
              >
                Subject
              </label>
              <Input
                type='text'
                id='subject'
                placeholder='Enter the subject'
                className='w-full'
                required
              />
            </div>

            <div className='mb-6'>
              <label
                htmlFor='message'
                className='block text-lg font-medium mb-2'
              >
                Message
              </label>
              <Textarea
                id='message'
                placeholder='Enter your message'
                rows={5}
                className='w-full'
                required
              />
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
