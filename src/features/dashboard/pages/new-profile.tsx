import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import PersonalDetailsForm from '@/components/profile/personal-details-form'
import AppearanceDetailsForm from '@/components/profile/appearance-details-form'
import DepartmentPlaceholder from '@/components/profile/department-placeholder'
import ProfilePage from './general-profile'

export default function NewProfile() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className='container py-10'>
      <h1 className='text-3xl font-bold mb-6'>Profile Settings</h1>
      <Tabs
        defaultValue='profile'
        value={activeTab}
        onValueChange={setActiveTab}
        className='w-full'
      >
        <TabsList className='grid w-full lg:grid-cols-4 grid-cols-2'>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='personal'>Personal Details</TabsTrigger>
          <TabsTrigger value='appearance'>Appearance</TabsTrigger>
          <TabsTrigger value='department'>Department</TabsTrigger>
        </TabsList>

        <TabsContent value='profile' className='mt-6'>
          <ProfilePage />
        </TabsContent>
        <TabsContent value='personal' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalDetailsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='appearance' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Appearance Details</CardTitle>
              <CardDescription>
                Update your physical characteristics and appearance information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppearanceDetailsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='department' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Department Settings</CardTitle>
              <CardDescription>
                Manage your department information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DepartmentPlaceholder />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
