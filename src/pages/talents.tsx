import { User, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CategoryPageLayout from "@/components/category-page-layout"

const featuredTalents = [
  {
    id: 1,
    name: "Emma Stone",
    specialty: "Actor",
    experience: "15 years",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Chris Evans",
    specialty: "Actor",
    experience: "20 years",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Meryl Streep",
    specialty: "Actor",
    experience: "40 years",
    rating: 5.0,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const talentsList = [
  { id: 4, name: "Tom Hanks", specialty: "Actor", experience: "30 years", rating: 4.9 },
  { id: 5, name: "Scarlett Johansson", specialty: "Actor", experience: "25 years", rating: 4.7 },
  { id: 6, name: "Leonardo DiCaprio", specialty: "Actor", experience: "30 years", rating: 4.8 },
  { id: 7, name: "Jennifer Lawrence", specialty: "Actor", experience: "15 years", rating: 4.6 },
  { id: 8, name: "Denzel Washington", specialty: "Actor", experience: "40 years", rating: 4.9 },
]

export default function TalentsPage() {
  const featuredItems = featuredTalents.map((talent) => (
    <Card key={talent.id}>
      <CardHeader className="p-0">
        <img
          src={talent.image || "/placeholder.svg"}
          alt={talent.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle>{talent.name}</CardTitle>
        <CardDescription>{talent.specialty}</CardDescription>
        <div className="flex justify-between items-center mt-2">
          <span>{talent.experience}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{talent.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  const listItems = talentsList.map((talent) => (
    <Card key={talent.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{talent.name}</CardTitle>
          <Badge>{talent.specialty}</Badge>
        </div>
        <CardDescription>{talent.experience}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span>Available for casting</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{talent.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  return (
    <CategoryPageLayout
      categoryName="Talents"
      categoryIcon={User}
      featuredItems={featuredItems}
      listItems={listItems}
      addNewText="Add New Talent"
    />
  )
}

