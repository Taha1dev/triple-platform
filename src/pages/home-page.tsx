import { Search, Bell, MessageSquare, User, Users, Briefcase, Map, Camera, Package, Building, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  { name: "Pro-Crew", icon: Users },
  { name: "Talents", icon: User },
  { name: "Operators", icon: Briefcase },
  { name: "Logistics", icon: Package },
  { name: "Props", icon: Camera },
  { name: "Locations", icon: Map },
  { name: "Agencies", icon: Building },
]

const topRatedUsers = [
  { name: "Alice Cooper", role: "Cinematographer", rating: 4.9, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Bob Dylan", role: "Location Scout", rating: 4.8, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Charlie Chaplin", role: "Talent", rating: 4.7, avatar: "/placeholder.svg?height=40&width=40" },
]

export default function HomePage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Triple Platform</h1>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.name}>
                <Button variant="ghost" className="w-full justify-start">
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <Input type="search" placeholder="Search for services, users, or locations..." className="max-w-md" />
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
          <h2 className="text-2xl font-semibold mb-6">Welcome back, User!</h2>

          {/* Top Rated Users */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Top Rated Professionals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRatedUsers.map((user) => (
                <Card key={user.name}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{user.name}</CardTitle>
                      <CardDescription>{user.role}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{user.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Explore Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <category.icon className="h-8 w-8 mb-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

