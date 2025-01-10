import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store/store'
import { initializeAuthState } from './store/slices/loginSlice'
import { useEffect } from 'react'

export default function Test() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { token, user } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    dispatch(initializeAuthState())
    if (!token) {
      navigate('/login')
    }
  }, [dispatch, navigate, token])

  if (!user) {
    return <h1 className='text-8xl font-extrabold'>Loading...</h1>
  }

  return (
    <div className='my-2 container mx-auto'>
      <h1 className='text-5xl font-extrabold my-4'>
        Welcome, {user.fname} {user.lname}!
      </h1>
      <hr />
      <div className='mt-4 text-2xl space-y-6'>
        <p>Email: {user.email}</p>
        <p>Contact Number: {user.contact_number}</p>
        <p>Country: {user.country}</p>
        <p>Date of Birth: {user.dob}</p>
      </div>
    </div>
  )
}
