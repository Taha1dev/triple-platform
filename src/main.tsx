/* eslint-disable react-hooks/rules-of-hooks */
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from './components/theme-provider.tsx'
import Login from './features/authentication/Login.tsx'
import Register from './features/authentication/Register.tsx'
import ResetPassword from './features/authentication/ResetPassword.tsx'
import { store } from './store/store.ts'
import { Toaster } from 'sonner'
import OTP_Verification from './features/authentication/forget-password-otp.tsx'
import ForgetPassword from './features/authentication/ForgetPassword.tsx'
import FAQ from './pages/FAQs.tsx'
import TermsAndConditions from './pages/TermsAndConditions.tsx'
import PrivacyPolicy from './pages/PrivacyPolicy.tsx'
import Layout from './features/landing-page/layout/Layout.tsx'
import PanelLayout from './features/dashboard/layout/index.tsx'
import Dashboard from './features/dashboard/pages/Dashboard.tsx'

import UpdateProfile from './features/dashboard/pages/profile/update-profile.tsx'
import ChangePassword from './features/authentication/ChangePassword.tsx'
import NotFound from './pages/404.tsx'
import ContactUs from './pages/ContactUs.tsx'
import AboutUs from './pages/AboutUs.tsx'
import Chat from './features/chat/page.tsx'
import NewProfile from './features/dashboard/pages/new-profile.tsx'
import UserProfile from './features/dashboard/pages/profile/Profile.tsx'
import VerifyEmailOTP from './features/authentication/verify-email-otp.tsx'
import PortfolioPage from './features/dashboard/pages/profile/portfolio-page.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '',
    element: <Layout />,
    children: [
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
        path: 'forget-password',
        element: <ForgetPassword />,
      },
      {
        path: 'otp-verification',
        element: <OTP_Verification />,
      },
      {
        path: 'verify-otp',
        element: <VerifyEmailOTP />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: 'terms',
        element: <TermsAndConditions />,
      },
      {
        path: 'faq',
        element: <FAQ />,
      },
      {
        path: 'contact',
        element: <ContactUs />,
      },
      {
        path: 'about',
        element: <AboutUs />,
      },
    ],
  },
  {
    path: 'home',
    element: <PanelLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'update-profile', element: <UpdateProfile /> },
      { path: 'change-password', element: <ChangePassword /> },
      {
        path: 'profile-settings',
        element: <NewProfile />,
      },
      {
        path: 'potfolio',
        element: <PortfolioPage />,
      },
    ],
  },
  { path: 'home/chat', element: <Chat /> },
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
