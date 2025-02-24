/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CategoryPageLayoutProps {
  categoryName: string
  categoryIcon: React.ElementType
  featuredItems: React.ReactNode
  listItems: React.ReactNode
  addNewText: string
}

export default function CategoryPageLayout({
  categoryName,
  featuredItems,
  listItems,
  addNewText,
}: CategoryPageLayoutProps) {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>{categoryName}</h2>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> {addNewText}
        </Button>
      </div>

      <section className='mb-8'>
        <h3 className='text-xl font-semibold mb-4'>Featured {categoryName}</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {featuredItems}
        </div>
      </section>

      <section>
        <h3 className='text-xl font-semibold mb-4'>All {categoryName}</h3>
        <Tabs defaultValue='list' className='w-full'>
          <TabsList>
            <TabsTrigger value='list'>List View</TabsTrigger>
            <TabsTrigger value='grid'>Grid View</TabsTrigger>
          </TabsList>
          <TabsContent value='list'>
            <ScrollArea className='h-[400px] w-full rounded-md border'>
              {listItems}
            </ScrollArea>
          </TabsContent>
          <TabsContent value='grid'>
            <ScrollArea className='h-[400px] w-full rounded-md border'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {listItems}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
