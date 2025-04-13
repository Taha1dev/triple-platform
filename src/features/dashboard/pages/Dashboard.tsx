/* eslint-disable @typescript-eslint/no-explicit-any */

import { RootState } from '@/store/store'
import FilterDashboard from './filter-dashboard'
import { useSelector } from 'react-redux'
import Spinner from '@/components/custom/Spinner'

export default function Dashboard() {
  // const dispatch = useDispatch<AppDispatch>()
  // const { data, loading, error } = useSelector(
  //   (state: RootState) => state.onBoarding,
  // )
  const { loading: logout_loading } = useSelector(
    (state: RootState) => state.logout,
  )
  // useEffect(() => {
  //   dispatch(fetchOnBoarding())
  // }, [dispatch])

  return (
    <>
      <FilterDashboard />
      {logout_loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Spinner />
        </div>
      )}
    </>
  )
}
