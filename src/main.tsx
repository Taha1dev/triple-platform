/* eslint-disable react-hooks/rules-of-hooks */
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from './components/theme-provider.tsx'
import Login from './features/dashboard/authentication/Login.tsx'
import Register from './features/dashboard/authentication/Register.tsx'
import ResetPassword from './features/dashboard/authentication/ResetPassword.tsx'
import { store } from './store/store.ts'
import Test from './Test.tsx'
import { Toaster } from 'sonner'
import OTP_Verification from './features/dashboard/authentication/OTP-Verification.tsx'
import ForgetPassword from './features/dashboard/authentication/ForgetPassword.tsx'
import CountrySelection from './features/dashboard/authentication/CountrySelection.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
  {
    path: 'ss',
    element: <Test />,
  },
  {
    path: 'forget-password',
    element: <ForgetPassword />,
  },
  {
    path: 'otp-verification',
    element: <OTP_Verification />,
  },
  {
    path: 'select-country',
    element: <CountrySelection />,
  },
])
type Theme = 'light' | 'dark' | 'system'

const getThemeFromLocalStorage = (key: string): Theme | undefined => {
  const theme = window.localStorage.getItem(key)
  if (theme === 'dark' || theme === 'light' || theme === 'system') {
    return theme
  }
  return undefined
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='dark' storageKey='triple-theme'>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        richColors
        duration={5000}
        theme={getThemeFromLocalStorage('triple-theme') || 'dark'}
      />
    </Provider>
  </ThemeProvider>,
)
