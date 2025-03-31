/* eslint-disable @typescript-eslint/no-explicit-any */

import FilterDashboard from './filter-dashboard'

export default function Dashboard() {
  // const dispatch = useDispatch<AppDispatch>()
  // const { data, loading, error } = useSelector(
  //   (state: RootState) => state.onBoarding,
  // )
  // const { loading: logout_loading } = useSelector(
  //   (state: RootState) => state.logout,
  // )
  // useEffect(() => {
  //   dispatch(fetchOnBoarding())
  // }, [dispatch])

  return (
    <>
      <FilterDashboard />
    </>
  )
}
