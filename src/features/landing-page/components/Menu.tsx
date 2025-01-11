/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@/components/theme-provider'
import menu from '/menu.svg'
import lightMenu from '/lightMenu.svg'
import { useCallback, useEffect, useState } from 'react'
type MenuProps = { className: string }
export default function Menu({ className }: MenuProps) {
  const { theme } = useTheme()
  const [icon, setIcon] = useState<any>()
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const getEffectiveTheme = useCallback(() => {
    return theme === 'system' ? getSystemTheme() : theme
  }, [theme])

  useEffect(() => {
    const effectiveTheme = getEffectiveTheme()
    if (effectiveTheme === 'dark') {
      setIcon(menu)
    } else {
      setIcon(lightMenu)
    }
  }, [getEffectiveTheme, theme])

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = (e: any) => {
        const newTheme = e.matches ? 'dark' : 'light'
        setIcon(newTheme === 'dark' ? lightMenu : menu)
      }

      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () =>
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme])
  return <img src={icon} alt='menu icon' className={className} />
}
