import { Helmet } from 'react-helmet'

const Terms = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Helmet>
        <title>Terms and Conditions - Triple Platform</title>
        <meta
          name='description'
          content='Terms and Conditions for Triple Platform. Learn about the rules and guidelines for using our platform.'
        />
      </Helmet>

      <h1 className='text-4xl text-center font-bold mb-8'>
        Terms and Conditions for Triple Platform
      </h1>

      <p className='text-lg mb-6'>
        <strong>Effective Date:</strong> [Insert Date]
      </p>

      <p className='text-lg mb-8'>
        Welcome to Triple Platform. By accessing or using our platform, you
        agree to these Terms and Conditions. Please read them carefully before
        proceeding.
      </p>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>1. Acceptance of Terms</h2>
        <p className='text-lg mb-4'>
          By creating an account or using Triple Platform, you confirm your
          acceptance of these Terms and Conditions. If you do not agree, please
          refrain from using the platform.
        </p>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>2. Use of the Platform</h2>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            <strong>Eligibility:</strong> You must be at least 18 years old to
            use Triple Platform.
          </li>
          <li className='text-lg mb-2'>
            <strong>User Account:</strong> You are responsible for maintaining
            the confidentiality of your account credentials. Ensure all
            information provided is accurate and up-to-date.
          </li>
          <li className='text-lg mb-2'>
            <strong>Prohibited Activities:</strong> Misusing the platform,
            including unauthorized access, data scraping, or transmitting
            harmful content. Violating any applicable laws or third-party
            rights.
          </li>
        </ul>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>3. Services Offered</h2>
        <p className='text-lg mb-4'>
          Triple Platform connects media service providers with users seeking
          media resources, locations, and services. We provide tools for
          seamless discovery and decision-making but do not directly participate
          in the transactions or agreements between users.
        </p>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>4. Payment and Fees</h2>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            <strong>Future Features:</strong> Payment processing may be
            introduced in future updates. Fees for services will be detailed at
            that time.
          </li>
          <li className='text-lg mb-2'>
            <strong>Third-Party Payment Processors:</strong> Payment details
            will be securely handled by third-party providers. Triple Platform
            will not store payment information.
          </li>
        </ul>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>5. User Responsibilities</h2>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            <strong>Accuracy of Information:</strong> Users are responsible for
            ensuring the accuracy and completeness of their profiles and
            listings.
          </li>
          <li className='text-lg mb-2'>
            <strong>Compliance:</strong> Users must comply with all applicable
            local and international laws while using the platform.
          </li>
          <li className='text-lg mb-2'>
            <strong>Interactions:</strong> All interactions between users are at
            their own risk. Triple Platform is not responsible for disputes or
            issues arising from user transactions.
          </li>
        </ul>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>6. Intellectual Property</h2>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            <strong>Ownership:</strong> All content, trademarks, and materials
            on Triple Platform are the property of Triple Platform or its
            licensors.
          </li>
          <li className='text-lg mb-2'>
            <strong>User Content:</strong> By posting content on the platform,
            you grant Triple Platform a non-exclusive, royalty-free license to
            use, reproduce, and distribute your content for platform-related
            purposes.
          </li>
        </ul>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>7. Limitation of Liability</h2>
        <p className='text-lg mb-4'>
          Triple Platform is provided "as is" without warranties of any kind. We
          are not liable for any:
        </p>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            Losses, damages, or disputes arising from the use of the platform.
          </li>
          <li className='text-lg mb-2'>
            Failures, errors, or interruptions in service.
          </li>
        </ul>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>8. Termination of Use</h2>
        <p className='text-lg mb-4'>
          Triple Platform reserves the right to terminate or suspend your
          account without notice if you violate these Terms and Conditions.
        </p>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>9. Jurisdiction</h2>
        <p className='text-lg mb-4'>
          These Terms and Conditions are governed by the laws of the United Arab
          Emirates (UAE). Any disputes will be resolved under UAE jurisdiction.
        </p>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>10. Updates to Terms</h2>
        <p className='text-lg mb-4'>
          We may revise these Terms and Conditions from time to time. Changes
          will be effective upon posting. Continued use of the platform
          signifies acceptance of updated terms.
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
        <p className='text-lg mb-4'>
          For any questions about these Terms and Conditions, please contact us
          at:
        </p>
        <p className='text-lg mb-4'>
          <strong>Temp Email:</strong> Mouchrefc@gmail.com
        </p>
        <p className='text-lg'>
          By using Triple Platform, you agree to these Terms and Conditions and
          acknowledge your understanding of them.
        </p>
      </section>
    </div>
  )
}

export default Terms
