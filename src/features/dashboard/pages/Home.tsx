/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchOnBoarding } from '@/store/slices/onBoardingDataSlice'
import { AppDispatch } from '@/store/store'


import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import HomePage from './home-page'

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  // const { data, loading, error } = useSelector(
  //   (state: RootState) => state.onBoarding,
  // )
  // const { loading: logout_loading } = useSelector(
  //   (state: RootState) => state.logout,
  // )
  useEffect(() => {
    dispatch(fetchOnBoarding())
  }, [dispatch])

  return (
    <>
    <HomePage/>
    </>
  )
}
