/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import {
  Search,
  Bell,
  MessageSquare,
  User,
  Home,
  Users,
  Briefcase,
  Map,
  Camera,
  Package,
  Building,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const categories = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Pro-Crew", icon: Users, path: "/pro-crew" },
  { name: "Talents", icon: User, path: "/talents" },
  { name: "Operators", icon: Briefcase, path: "/operators" },
  { name: "Logistics", icon: Package, path: "/logistics" },
  { name: "Props", icon: Camera, path: "/props" },
  { name: "Locations", icon: Map, path: "/locations" },
  { name: "Agencies", icon: Building, path: "/agencies" },
]

interface CategoryPageLayoutProps {
  categoryName: string
  categoryIcon: React.ElementType
  featuredItems: React.ReactNode
  listItems: React.ReactNode
  addNewText: string
}

export default function CategoryPageLayout({
  categoryName,
  categoryIcon: CategoryIcon,
  featuredItems,
  listItems,
  addNewText,
}: CategoryPageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  const router: any = useNavigate()

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        {!isSmallScreen && (
          <aside className={`bg-white shadow-md transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}>
            <div className="flex items-center justify-between p-4">
              {sidebarOpen && <h1 className="text-2xl font-bold text-blue-600">Triple Platform</h1>}
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
              </Button>
            </div>
            <nav>
              <ul className="space-y-2 p-4">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link to={category.path}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${router.pathname === category.path ? "bg-blue-100 text-blue-600" : ""}`}
                      >
                        <category.icon className="h-5 w-5" />
                        {sidebarOpen && <span className="ml-2">{category.name}</span>}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <Input type="search" placeholder={`Search for ${categoryName.toLowerCase()}...`} className="max-w-md" />
                <Button variant="ghost" size="icon" className="ml-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{categoryName}</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> {addNewText}
              </Button>
            </div>

            {/* Featured Items */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Featured {categoryName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{featuredItems}</div>
            </section>

            {/* All Items */}
            <section>
              <h3 className="text-xl font-semibold mb-4">All {categoryName}</h3>
              <Tabs defaultValue="list" className="w-full">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                  <ScrollArea className="h-[400px] w-full rounded-md border">{listItems}</ScrollArea>
                </TabsContent>
                <TabsContent value="grid">
                  <ScrollArea className="h-[400px] w-full rounded-md border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">{listItems}</div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </section>
          </main>
        </div>
      </div>

      {/* Bottom Navigation for small screens */}
      {isSmallScreen && (
        <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
          <ul className="flex justify-around p-2">
            {categories.map((category) => (
              <li key={category.name}>
                <Link to={category.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex flex-col items-center ${router.pathname === category.path ? "text-blue-600" : ""}`}
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="text-xs mt-1">{category.name}</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

