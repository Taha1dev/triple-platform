import React from 'react'
import { Helmet } from 'react-helmet'

const PrivacyPolicy: React.FC = () => {
  return (
    <div className='min-h-screen'>
      <Helmet>
        <title>Privacy Policy</title>
        <meta name='description' content='Learn about our Privacy Policy.' />
      </Helmet>
      <header className='py-6 '>
        <h1 className='text-2xl font-bold text-center'>Privacy Policy</h1>
      </header>
      <main className='px-4 py-8 max-w-4xl mx-auto space-y-6'>
        <section>
          <h2 className='text-xl font-semibold'>Data Collection</h2>
          <p>We collect personal information to improve our services.</p>
        </section>
        <section>
          <h2 className='text-xl font-semibold'>Data Usage</h2>
          <p>
            Your data is used for analytics, customer support, and service
            improvement.
          </p>
        </section>
        <section>
          <h2 className='text-xl font-semibold'>Your Rights</h2>
          <p>
            You have the right to request, modify, or delete your personal data
            at any time.
          </p>
        </section>
      </main>
    </div>
  )
}

export default PrivacyPolicy
