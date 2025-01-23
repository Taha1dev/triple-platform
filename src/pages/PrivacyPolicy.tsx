import { Helmet } from 'react-helmet'

const PrivacyPolicy = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Helmet>
        <title>Privacy Policy - Triple Platform</title>
        <meta
          name='description'
          content='Privacy Policy for Triple Platform. Learn how we collect, use, and protect your information.'
        />
      </Helmet>

      <h1 className='text-4xl font-bold mb-8 text-center'>
        Privacy Policy for Triple Platform
      </h1>

      <p className='text-lg mb-6'>
        <strong>Effective Date:</strong> [Insert Date]
      </p>

      <p className='text-lg mb-8'>
        Welcome to Triple Platform. Your privacy is our priority. This Privacy
        Policy explains how we collect, use, and protect your information when
        you use our platform. By accessing or using Triple Platform, you agree
        to the terms outlined here.
      </p>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>1. Information We Collect</h2>
        <p className='text-lg mb-4'>
          We collect the following types of information:
        </p>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            <strong>Personal Information:</strong> Name, email address, phone
            number, and other contact details provided during registration or
            usage.
          </li>
          <li className='text-lg mb-2'>
            <strong>Usage Data:</strong> Information about how you interact with
            the platform, including search queries, preferences, and browsing
            activity.
          </li>
          <li className='text-lg mb-2'>
            <strong>Payment Information:</strong> For future features, payment
            details will be processed through third-party payment processors. We
            do not store payment information on our servers.
          </li>
          <li className='text-lg mb-2'>
            <strong>Marketing Preferences:</strong> Information related to your
            preferences for receiving marketing communications.
          </li>
        </ul>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>
          2. How We Use Your Information
        </h2>
        <p className='text-lg mb-4'>We use the collected information to:</p>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            Provide seamless access to media resources, locations, and services.
          </li>
          <li className='text-lg mb-2'>
            Enhance user experience by customizing content and features based on
            your preferences.
          </li>
          <li className='text-lg mb-2'>
            Communicate updates, offers, and promotional content (only if you’ve
            opted in).
          </li>
          <li className='text-lg mb-2'>
            Maintain platform security and prevent fraudulent activities.
          </li>
          <li className='text-lg mb-2'>
            Develop future features, such as payment processing and enhanced
            functionalities.
          </li>
        </ul>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>3. Sharing Your Information</h2>
        <p className='text-lg mb-4'>
          We may share your information under the following circumstances:
        </p>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            <strong>With Service Providers:</strong> To facilitate platform
            operations, such as hosting, analytics, and customer support.
          </li>
          <li className='text-lg mb-2'>
            <strong>For Marketing:</strong> With partners and affiliates to
            deliver relevant advertisements or promotional content (if opted
            in).
          </li>
          <li className='text-lg mb-2'>
            <strong>To Comply with Legal Obligations:</strong> When required by
            law, court order, or other legal processes. We will never sell your
            personal information to third parties.
          </li>
        </ul>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>
          4. Data Storage and Security
        </h2>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            <strong>Storage Locations:</strong> All user data is securely stored
            in cloud servers located within the United Arab Emirates (UAE).
          </li>
          <li className='text-lg mb-2'>
            <strong>Security Measures:</strong> We employ industry-standard
            encryption, access controls, and secure protocols to protect your
            data.
          </li>
        </ul>
        <p className='text-lg mb-4'>
          While we strive to protect your data, no method of transmission over
          the internet is 100% secure. We encourage users to exercise caution.
        </p>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>5. User Rights</h2>
        <p className='text-lg mb-4'>As a user, you have the right to:</p>
        <ul className='list-disc pl-8 mb-4'>
          <li className='text-lg mb-2'>
            <strong>Access Your Data:</strong> Request a copy of your personal
            data stored on our platform.
          </li>
          <li className='text-lg mb-2'>
            <strong>Update or Delete Information:</strong> Edit or delete your
            profile information through your account settings.
          </li>
          <li className='text-lg mb-2'>
            <strong>Opt-Out:</strong> Unsubscribe from marketing communications
            at any time by updating your preferences.
          </li>
        </ul>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>6. Children’s Use</h2>
        <p className='text-lg mb-4'>
          Triple Platform is designed for users aged 18 and above. We do not
          knowingly collect data from children under 18. If we discover that
          data of a minor has been inadvertently collected, it will be deleted
          promptly.
        </p>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>7. Jurisdiction</h2>
        <p className='text-lg mb-4'>
          This Privacy Policy is governed by the laws of the United Arab
          Emirates (UAE). Any disputes will be resolved under UAE jurisdiction.
        </p>
      </section>

      <section className='mb-8 border-b border-border'>
        <h2 className='text-3xl font-bold mb-4'>8. Updates to This Policy</h2>
        <p className='text-lg mb-4'>
          We may revise this Privacy Policy from time to time. Any changes will
          be posted on this page, and the effective date will be updated
          accordingly. We encourage users to review this policy regularly.
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
        <p className='text-lg mb-4'>
          If you have any questions about this Privacy Policy or how we handle
          your information, please contact us at:
        </p>
        <p className='text-lg mb-4'>
          <strong>Temp Email:</strong> Mouchrefc@gmail.com
        </p>
        <p className='text-lg'>
          By using Triple Platform, you acknowledge that you have read and
          understood this Privacy Policy.
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicy
