import { Helmet } from 'react-helmet'

const TermsAndConditions: React.FC = () => {
  return (
    <div className='min-h-screen'>
      <Helmet>
        <title>Terms and Conditions</title>
        <meta name='description' content='Read our Terms and Conditions.' />
      </Helmet>
      <header className='py-6 shadow-md'>
        <h1 className='text-2xl font-bold text-center'>Terms and Conditions</h1>
      </header>
      <main className='px-4 py-8 max-w-4xl mx-auto space-y-6'>
        <section>
          <h2 className='text-xl font-semibold'>Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam.
          </p>
        </section>
        <section>
          <h2 className='text-xl font-semibold'>User Responsibilities</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
            nisi vel sapien ultricies interdum.
          </p>
        </section>
        <section>
          <h2 className='text-xl font-semibold'>Limitations of Liability</h2>
          <p>
            Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at.
          </p>
        </section>
      </main>
    </div>
  )
}

export default TermsAndConditions
