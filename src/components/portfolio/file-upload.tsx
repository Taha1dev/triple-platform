import {
  useState,
  useRef,
  type ChangeEvent,
  type DragEvent,
  FormEvent,
} from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { uploadPortfolioPicture } from '@/store/slices/updatePortfolioItemsSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'

interface FileUploadProps {
  onFileUploaded: (
    fileUrl: string,
    fileType: 'image' | 'video',
    file?: File,
  ) => void
  accept?: string
  maxSize?: number
}

export function FileUpload({
  onFileUploaded,
  accept = 'image/*',
  maxSize = 10,
}: FileUploadProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setError(null)

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed')
      return
    }

    setFileType('image')
    setFile(file)

    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFile(e.target.files[0])
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files?.length) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault()
    if (!file || !fileType) return

    const formData = new FormData()
    formData.append('image', file)
    formData.append('description', file.name)
    formData.append('alt', file.name)

    try {
      setIsUploading(true)
      const result = await dispatch(uploadPortfolioPicture(formData)).unwrap()
      const uploadedUrl = result?.url || file.name
      onFileUploaded(uploadedUrl, fileType, file)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setFileType(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <form onSubmit={handleUpload} className='space-y-4'>
      {!file && (
        <div
          className={cn(
            'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors',
            'border-muted-foreground/25 hover:border-primary',
          )}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <Upload className='h-6 w-6 text-muted-foreground mb-2' />
          <p className='text-sm font-medium'>Drag & drop or select image</p>
          <p className='text-xs text-muted-foreground'>Max size: {maxSize}MB</p>
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-3'
            onClick={() => fileInputRef.current?.click()}
          >
            Choose File
          </Button>
          <input
            ref={fileInputRef}
            type='file'
            accept={accept}
            className='hidden'
            onChange={handleFileChange}
          />
        </div>
      )}

      {file && preview && (
        <div className='space-y-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <ImageIcon className='h-5 w-5 text-muted-foreground' />
              <span className='text-sm font-medium'>{file.name}</span>
            </div>
            <Button variant='ghost' size='icon' onClick={reset}>
              <X className='h-4 w-4' />
            </Button>
          </div>

          <div className='aspect-video overflow-hidden rounded-md bg-muted'>
            <img src={preview || ''} alt='Preview' className='object-contain' />
          </div>

          <Button type='submit' className='w-full' disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>

          {error && (
            <div className='mt-2 text-sm text-destructive'>{error}</div>
          )}
        </div>
      )}
    </form>
  )
}
