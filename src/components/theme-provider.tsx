/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const getEffectiveTheme = (theme: Theme) => {
  return theme === 'system' ? getSystemTheme() : theme
}

export const navLogo = (theme: Theme) => {
  const effectiveTheme = getEffectiveTheme(theme)
  return effectiveTheme === 'dark'
    ? '/triple-logo.webp'
    : '/triple-logo-light.png'
}
export const rootLogo = (theme: Theme) => {
  const effectiveTheme = getEffectiveTheme(theme)
  return effectiveTheme === 'dark'
    ? '/triple-logo.webp'
    : '/triple-logo-light.png'
}

export const footerLogo = (theme: Theme) => {
  const effectiveTheme = getEffectiveTheme(theme)
  return effectiveTheme === 'dark'
    ? '/triple-platform-logo.png'
    : '/triple-platform-light-logo.png'
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'triple-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = getSystemTheme()
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
