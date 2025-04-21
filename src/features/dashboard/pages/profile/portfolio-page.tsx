import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  ImageIcon,
  Video,
  ExternalLink,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUpload } from '@/components/portfolio/file-upload'

type PortfolioItem = {
  id: string
  type: 'image' | 'video'
  url: string
  alt: string
  description: string
  thumbnail?: string
}

const initialItems: PortfolioItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net?height=400&width=600',
    alt: 'Website redesign project',
    description:
      'A complete redesign of an e-commerce website focusing on user experience and conversion optimization.',
  },
  {
    id: '2',
    type: 'image',
    url: 'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net?height=400&width=600',
    alt: 'Mobile app UI design',
    description:
      'UI/UX design for a fitness tracking mobile application with custom illustrations and animations.',
  },
  {
    id: '3',
    type: 'video',
    url: 'https://example.com/video.mp4',
    thumbnail:
      'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net?height=400&width=600',
    alt: 'Product animation',
    description:
      '3D animation showcasing the features of a new smart home product.',
  },
  {
    id: '4',
    type: 'image',
    url: 'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net?height=400&width=600',
    alt: 'Brand identity project',
    description:
      'Complete brand identity package including logo, color palette, typography, and brand guidelines.',
  },
  {
    id: '5',
    type: 'image',
    url: 'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net?height=400&width=600',
    alt: 'Social media campaign',
    description:
      'Series of social media graphics designed for a marketing campaign for a fashion brand.',
  },
  {
    id: '6',
    type: 'video',
    url: 'https://example.com/video2.mp4',
    thumbnail:
      'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net?height=400&width=600',
    alt: 'Motion graphics reel',
    description:
      'A compilation of motion graphics work created for various clients and projects.',
  },
]

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] =
    useState<PortfolioItem[]>(initialItems)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null)
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    type: 'image',
    alt: '',
    description: '',
  })
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleFileUploaded = (
    fileUrl: string,
    fileType: 'image' | 'video',
    file?: File,
  ) => {
    console.log('file from parent', file)
    setNewItem({
      ...newItem,
      type: fileType,
      url: fileUrl,
    })
    setFileUploaded(true)
  }

  const handleAddItem = () => {
    if (!newItem.url || !newItem.alt) return
    console.log(newItem)
    const item: PortfolioItem = {
      id: Date.now().toString(),
      type: newItem.type as 'image' | 'video',
      url: newItem.url,
      alt: newItem.alt,
      description: newItem.description || '',
      thumbnail: newItem.type === 'video' ? newItem.thumbnail : undefined,
    }

    // const formData = new FormData()
    // formData.append('image', file)
    // formData.append('description', 'A nice shot of the project')
    // formData.append('alt', 'Project screenshot')
    // dispatch(uploadPortfolioPicture(formData))

    setPortfolioItems([item, ...portfolioItems])
    setNewItem({
      type: 'image',
      alt: '',
      description: '',
    })
    setFileUploaded(false)
    setIsAddDialogOpen(false)
  }

  const handleDeleteItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id))
    if (currentItem?.id === id) {
      setIsViewDialogOpen(false)
    }
  }

  const viewItem = (item: PortfolioItem) => {
    setCurrentItem(item)
    setIsViewDialogOpen(true)
  }

  const resetNewItem = () => {
    setNewItem({
      type: 'image',
      alt: '',
      description: '',
    })
    setFileUploaded(false)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Portfolio</h1>
          <p className='text-muted-foreground'>
            Manage your portfolio media items
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New Item
        </Button>
      </div>

      <Tabs defaultValue='grid' className='w-full'>
        <div className='flex items-center justify-between'>
          <TabsList className='lg:block hidden'>
            <TabsTrigger value='grid'>Grid View</TabsTrigger>
            <TabsTrigger value='list'>List View</TabsTrigger>
          </TabsList>
          <div className='flex items-center gap-2'>
            <Select defaultValue='all'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Items</SelectItem>
                <SelectItem value='image'>Images Only</SelectItem>
                <SelectItem value='video'>Videos Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value='grid' className='mt-6'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {portfolioItems.map(item => (
              <Card key={item.id} className='overflow-hidden'>
                <div className='relative aspect-video'>
                  <img
                    src={
                      item.type === 'image'
                        ? item.url
                        : item.thumbnail ||
                          'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net?height=400&width=600'
                    }
                    alt={item.alt}
                    className='object-cover'
                  />
                  <div className='absolute top-2 right-2 flex gap-2'>
                    <Button
                      variant='secondary'
                      size='icon'
                      className='h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm'
                      onClick={() => viewItem(item)}
                    >
                      {item.type === 'image' ? (
                        <ImageIcon className='h-4 w-4' />
                      ) : (
                        <Video className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>
                <CardContent className='p-4'>
                  <div className='space-y-2'>
                    <div className='font-medium line-clamp-1'>{item.alt}</div>
                    <p className='text-sm text-muted-foreground line-clamp-2'>
                      {item.description}
                    </p>
                    <div className='flex gap-2 pt-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full'
                        onClick={() => viewItem(item)}
                      >
                        View
                      </Button>
                      <Button
                        variant='destructive'
                        size='sm'
                        className='w-full'
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value='list' className='mt-6'>
          <div className='rounded-md border'>
            <div className='grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium'>
              <div className='col-span-1'>Type</div>
              <div className='col-span-2'>Preview</div>
              <div className='col-span-3'>Alt Text</div>
              <div className='col-span-4'>Description</div>
              <div className='col-span-2'>Actions</div>
            </div>
            {portfolioItems.map(item => (
              <div
                key={item.id}
                className='grid grid-cols-12 items-center border-b px-4 py-3 text-sm'
              >
                <div className='col-span-1'>
                  {item.type === 'image' ? (
                    <ImageIcon className='h-5 w-5 text-muted-foreground' />
                  ) : (
                    <Video className='h-5 w-5 text-muted-foreground' />
                  )}
                </div>
                <div className='col-span-2'>
                  <div className='relative h-16 w-24 overflow-hidden rounded-md'>
                    <img
                      src={
                        item.type === 'image'
                          ? item.url
                          : item.thumbnail ||
                            'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net?height=400&width=600'
                      }
                      alt={item.alt}
                      className='object-cover'
                    />
                  </div>
                </div>
                <div className='col-span-3 truncate'>{item.alt}</div>
                <div className='col-span-4 truncate'>{item.description}</div>
                <div className='col-span-2 flex gap-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => viewItem(item)}
                  >
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add New Item Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onOpenChange={open => {
          setIsAddDialogOpen(open)
          if (!open) resetNewItem()
        }}
      >
        <DialogContent className='sm:max-w-[650px]'>
          <DialogHeader>
            <DialogTitle>Add New Portfolio Item</DialogTitle>
            <DialogDescription>
              Upload a new image or video to your portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-6 py-4'>
            {!fileUploaded ? (
              <FileUpload onFileUploaded={handleFileUploaded} />
            ) : (
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='font-medium'>File uploaded successfully</div>
                  <Button variant='ghost' size='sm' onClick={resetNewItem}>
                    Upload Different File
                  </Button>
                </div>
                <div className='grid gap-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='alt'>Alt Text</Label>
                    <Input
                      id='alt'
                      placeholder='Descriptive alt text'
                      value={newItem.alt || ''}
                      onChange={e =>
                        setNewItem({ ...newItem, alt: e.target.value })
                      }
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                      id='description'
                      placeholder='Detailed description of the item'
                      value={newItem.description || ''}
                      onChange={e =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => {
                setIsAddDialogOpen(false)
                resetNewItem()
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddItem}
              disabled={!fileUploaded || !newItem.alt}
            >
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View/Edit Item Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        {currentItem && (
          <DialogContent className='sm:max-w-[650px] lg:h-full h-[500px] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Portfolio Item Details</DialogTitle>
            </DialogHeader>
            <div className='grid gap-6'>
              <div className='relative aspect-video w-full overflow-hidden rounded-lg'>
                {currentItem.type === 'image' ? (
                  <img
                    src={
                      currentItem.url ||
                      'https://kzmpy8clbtdaewum16jc.lite.vusercontent.net?height=400&width=600'
                    }
                    alt={currentItem.alt}
                    className='object-contain'
                  />
                ) : (
                  <div className='flex h-full items-center justify-center bg-muted'>
                    <Video className='h-16 w-16 text-muted-foreground' />
                    <span className='ml-2'>Video Preview</span>
                  </div>
                )}
              </div>
              <div className='grid gap-4'>
                <div>
                  <Label className='text-xs text-muted-foreground'>Type</Label>
                  <div className='flex items-center gap-2 font-medium'>
                    {currentItem.type === 'image' ? (
                      <>
                        <ImageIcon className='h-4 w-4' />
                        <span>Image</span>
                      </>
                    ) : (
                      <>
                        <Video className='h-4 w-4' />
                        <span>Video</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <Label className='text-xs text-muted-foreground'>
                    Alt Text
                  </Label>
                  <div className='font-medium'>{currentItem.alt}</div>
                </div>
                <div>
                  <Label className='text-xs text-muted-foreground'>
                    Description
                  </Label>
                  <div>{currentItem.description}</div>
                </div>
                <div>
                  <Label className='text-xs text-muted-foreground'>URL</Label>
                  <div className='flex items-center gap-2 font-medium text-sm text-muted-foreground'>
                    <a
                      href={currentItem.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-1 text-primary hover:underline'
                    >
                      {currentItem.url.substring(0, 50)}
                      {currentItem.url.length > 50 ? '...' : ''}
                      <ExternalLink className='h-3 w-3' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant='destructive'
                onClick={() => handleDeleteItem(currentItem.id)}
              >
                Delete
              </Button>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
