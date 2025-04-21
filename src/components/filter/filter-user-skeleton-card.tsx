import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function FilterUserSkeletonCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <Skeleton className="h-10 w-10 rounded-full mr-4" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
        </div>
        <Separator />
        <div className="p-4 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <Skeleton className="h-3 w-[60px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-[40px]" />
            <Skeleton className="h-3 w-[120px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-[40px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-[40px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-3 w-[60px]" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[80%]" />
          </div>
          <div className="col-span-2 flex gap-2 mt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
