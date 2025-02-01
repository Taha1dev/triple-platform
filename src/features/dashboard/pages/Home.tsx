/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from '@/components/custom/Spinner'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

import { fetchOnBoarding } from '@/store/slices/onBoardingDataSlice'
import { AppDispatch, RootState } from '@/store/store'
import { Activity } from 'lucide-react'
import { motion } from 'motion/react'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading } = useSelector((state: RootState) => state.onBoarding)

  useEffect(() => {
    dispatch(fetchOnBoarding())
  }, [dispatch])

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Categories</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {data?.map(item => {
          return (
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
          )
        })}
        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  )
}
