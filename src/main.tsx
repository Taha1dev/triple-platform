import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from './app/dashboard/pages/Login.tsx'
import Register from './app/dashboard/pages/Register.tsx'
import ResetPassword from './app/dashboard/pages/ResetPassword.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { store } from './app/store.ts'
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
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
