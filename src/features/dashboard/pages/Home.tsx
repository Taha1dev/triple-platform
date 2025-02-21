/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from '@/components/custom/Spinner'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { fetchOnBoarding } from '@/store/slices/onBoardingDataSlice'
import { AppDispatch, RootState } from '@/store/store'
import { Activity } from 'lucide-react'
import { motion } from 'motion/react'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector(
    (state: RootState) => state.onBoarding,
  )
  const { loading: logout_loading } = useSelector(
    (state: RootState) => state.logout,
  )
  useEffect(() => {
    dispatch(fetchOnBoarding())
  }, [dispatch])

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Categories</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className='hover:shadow-lg transition-shadow'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card>
                  <CardHeader>
                    <Skeleton className='w-full h-24 rounded-lg' />
                  </CardHeader>
                  <CardFooter className=' flex items-center gap-4'>
                    <Skeleton className='size-8 aspect-square rounded-full' />
                    <Skeleton className='h-8 w-full rounded-lg' />
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          : data?.map(item => (
              <motion.div
                key={item._id}
                className='hover:shadow-lg transition-shadow'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className='group'>
                  <CardHeader className='flex flex-col items-center text-center'>
                    <div className='w-12 h-12 mb-4 text-primary group-hover:text-primary/80'>
                      <Activity size={48} />
                    </div>
                    <CardTitle className='text-lg font-medium'>
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}

        {error && (
          <div className='col-span-full text-foreground flex flex-col items-center justify-center gap-4 p-6 bg-background rounded-lg border border-destructive'>
            <p className='font-medium text-lg'>
              An error occurred while fetching data.
            </p>
            <Button
              type='button'
              variant='destructive'
              onClick={() => dispatch(fetchOnBoarding())}
            >
              Retry
            </Button>
          </div>
        )}
      </div>
      {logout_loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Spinner />
        </div>
      )}
    </div>
  )
}
