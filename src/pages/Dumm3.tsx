import { Mail, Phone, MapPin, Calendar, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock user data
const userData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "Los Angeles, CA",
  joinDate: "January 2022",
  role: "Cinematographer",
  bio: "Experienced cinematographer with a passion for creating visually stunning narratives. Specializing in commercial and independent film projects.",
  skills: ["Cinematography", "Lighting", "Color Grading", "Camera Operation"],
  portfolio: [
    { id: 1, title: "Summer Breeze", type: "Short Film", image: "/placeholder.svg?height=150&width=250" },
    { id: 2, title: "Urban Rhythms", type: "Music Video", image: "/placeholder.svg?height=150&width=250" },
    { id: 3, title: "Eco Warriors", type: "Documentary", image: "/placeholder.svg?height=150&width=250" },
  ],
}

export default function ProfilePage() {
  const handleShare = () => {
    const profileUrl = `${window.location.origin}/profile/${userData.id}`
    navigator.clipboard.writeText(profileUrl)
    alert("Profile link copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                <CardDescription>{userData.role}</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Profile
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-600 mb-4">{userData.bio}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    {userData.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="mr-2 h-4 w-4" />
                    {userData.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    {userData.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Member since {userData.joinDate}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Portfolio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userData.portfolio.map((item) => (
                  <Card key={item.id}>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.type}</p>
                      <Button variant="link" size="sm" className="mt-2 p-0">
                        View Project <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

