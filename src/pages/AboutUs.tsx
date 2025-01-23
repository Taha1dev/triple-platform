import { Helmet } from 'react-helmet'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const AboutUs = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Helmet>
        <title>About Us - Triple Platform</title>
        <meta
          name='description'
          content='Learn more about Triple Platform, our mission, team, and values.'
        />
      </Helmet>

      <h1 className='text-4xl font-bold mb-8'>About Us</h1>

      {/* Mission Section */}
      <section className='mb-12'>
        <h2 className='text-3xl font-bold mb-4'>Our Mission</h2>
        <p className='text-lg mb-6'>
          At Triple Platform, our mission is to revolutionize the way media
          resources, locations, and services are discovered and accessed. We aim
          to provide a seamless, user-friendly platform that empowers users to
          make informed decisions and connect with the best services available.
        </p>
      </section>

      <section className='mb-12'>
        <h2 className='text-3xl font-bold mb-8'>Meet Our Team</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>CEO & Founder</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-lg'>
                John is the visionary behind Triple Platform, with over 10 years
                of experience in the media and tech industries.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jane Smith</CardTitle>
              <CardDescription>Chief Operating Officer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-lg'>
                Jane oversees daily operations and ensures the platform runs
                smoothly for all users.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Michael Brown</CardTitle>
              <CardDescription>Lead Developer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-lg'>
                Michael leads the development team, ensuring the platform is
                robust, scalable, and user-friendly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='mb-12'>
        <h2 className='text-3xl font-bold mb-8'>Our Values</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-lg'>
                We constantly strive to innovate and improve our platform to
                meet the evolving needs of our users.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-lg'>
                We are committed to maintaining the highest standards of
                integrity in everything we do.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User-Centric</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-lg'>
                Our users are at the heart of everything we do. We prioritize
                their needs and experiences above all else.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='text-center py-12 bg-secondary rounded-lg'>
        <h2 className='text-3xl font-bold mb-4'>Join Us on Our Journey</h2>
        <p className='text-lg mb-6'>
          Whether you're a user or a partner, we invite you to join us in
          transforming the way media resources are discovered and accessed.
        </p>
        <Button>Get Started</Button>
      </section>
    </div>
  )
}

export default AboutUs
