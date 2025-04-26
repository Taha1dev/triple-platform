import { Layout } from 'lucide-react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ChangePassword from './features/authentication/ChangePassword'
import OTP_Verification from './features/authentication/forget-password-otp'
import ForgetPassword from './features/authentication/ForgetPassword'
import Login from './features/authentication/Login'
import Register from './features/authentication/Register'
import ResetPassword from './features/authentication/ResetPassword'
import VerifyEmailOTP from './features/authentication/verify-email-otp'
import Chat from './features/chat/page'
import PanelLayout from './features/dashboard/layout'
import Dashboard from './features/dashboard/pages/Dashboard'
import NewProfile from './features/dashboard/pages/new-profile'
import PortfolioPage from './features/dashboard/pages/profile/portfolio-page'
import UserProfile from './features/dashboard/pages/profile/Profile'
import UpdateProfile from './features/dashboard/pages/profile/update-profile'
import NotFound from './pages/404'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import FAQ from './pages/FAQs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'

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
