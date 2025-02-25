import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { footerLogo, useTheme } from '@/components/theme-provider'
import { Link } from "react-router-dom"
import { useMediaQuery } from "@/hooks/use-media-query"

const dummyUsers = [
  { id: 1, name: "Taha Al-Mulla", avatar: '' },
  { id: 2, name: "Shadi Musharraf", avatar: '' },
  { id: 3, name: "Ali Ali", avatar: '' },
  { id: 4, name: "Zain Mansour", avatar: '' },
  { id: 5, name: "Ethan Hunt", avatar: '' },
  { id: 6, name: "Alice Johnson", avatar: '' },
  { id: 7, name: "Bob Smith", avatar: '' },
  { id: 8, name: "Charlie Brown", avatar: '' },
  { id: 9, name: "Diana Ross", avatar: '' },
  { id: 10, name: "Ethan Hunt", avatar: '' },
]

interface SidebarProps {
  width: number
  setWidth: (width: number) => void
}

export function Sidebar({ width, setWidth }: SidebarProps) {
  const { theme } = useTheme()
  const [isResizing, setIsResizing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const sidebarRef = useRef<HTMLDivElement>(null)
  const isSmallScreen = useMediaQuery('(max-width: 640px)')
  useEffect(() => {
    isSmallScreen && setWidth(70)
  }, [isSmallScreen, setWidth])
  const filteredUsers = dummyUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const startResizing = useCallback(() => setIsResizing(true), [])

  const stopResizing = useCallback(() => setIsResizing(false), [])

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left
        setWidth(Math.max(200, Math.min(newWidth, 400)))
      }
    },
    [isResizing, setWidth],
  )

  useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [resize, stopResizing])

  return (
    <motion.div
      ref={sidebarRef}
      className="bg-background border-r relative h-screen overflow-hidden"
      style={{ width }}
      animate={{ width }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className={`p-4 border-b border-border flex items-center justify-center ${width > 70 ? 'gap-4' : 'gap-0'} max-h-[100px]`}>

        {width > 60 && (
          <Link to='/home' className='transition-all duration-300 ease-in-out flex-1'>
            <img
              src={footerLogo(theme)}
              alt='Triple Logo'
              className='size-full'
            />
          </Link>
        )}

        {/* Collapse/Expand Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setWidth(width === 70 ? 300 : 70)}
          className="shrink-0"
        >
          {width === 70 ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      {width > 70 && (
        <div className="relative mt-4 mx-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      <ScrollArea className="h-[calc(100vh-5rem)]">
        {filteredUsers.map((user) => (
          <div key={user.id} className="flex items-center p-4 hover:bg-accent cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="ml-4 text-sm font-medium">{user.name}</span>
          </div>
        ))}
      </ScrollArea>
      <div
        className="absolute right-0 top-1/2 w-1 h-16 bg-accent cursor-col-resize -translate-y-1/2"
        onMouseDown={startResizing}
      />
    </motion.div>
  )
}

