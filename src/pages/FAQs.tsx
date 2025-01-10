import { FC } from 'react'
import { Helmet } from 'react-helmet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQ: FC = () => {
  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'You can return items within 30 days of purchase.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Use the tracking link sent to your email after purchase.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'Reach us at support@yourcompany.com.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa, MasterCard, and PayPal.',
    },
  ]

  return (
    <div className='min-h-screen '>
      <Helmet>
        <title>FAQ</title>
        <meta name='description' content='Frequently Asked Questions.' />
      </Helmet>
      <header className='py-6 shadow-md'>
        <h1 className='text-2xl font-bold text-center'>FAQ</h1>
      </header>
      <main className='px-4 py-8 max-w-4xl mx-auto space-y-6'>
        <Accordion type='single' collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className='text-lg font-medium'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  )
}
export default FAQ
