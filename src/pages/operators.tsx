import { Briefcase, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CategoryPageLayout from "./category-page-layout"

const featuredOperators = [
  {
    id: 1,
    name: "David Miller",
    specialty: "Drone Operator",
    experience: "8 years",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    specialty: "Steadicam Operator",
    experience: "12 years",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Michael Chen",
    specialty: "Crane Operator",
    experience: "10 years",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const operatorsList = [
  { id: 4, name: "Emma Thompson", specialty: "Gimbal Operator", experience: "6 years", rating: 4.6 },
  { id: 5, name: "James Wilson", specialty: "Jib Operator", experience: "9 years", rating: 4.7 },
  { id: 6, name: "Olivia Davis", specialty: "Dolly Grip", experience: "7 years", rating: 4.5 },
  { id: 7, name: "Ryan Murphy", specialty: "Camera Car Operator", experience: "11 years", rating: 4.8 },
  { id: 8, name: "Sophie Lee", specialty: "Motion Control Operator", experience: "5 years", rating: 4.4 },
]

export default function OperatorsPage() {
  const featuredItems = featuredOperators.map((operator) => (
    <Card key={operator.id}>
      <CardHeader className="p-0">
        <img
          src={operator.image || "/placeholder.svg"}
          alt={operator.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle>{operator.name}</CardTitle>
        <CardDescription>{operator.specialty}</CardDescription>
        <div className="flex justify-between items-center mt-2">
          <span>{operator.experience}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{operator.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  const listItems = operatorsList.map((operator) => (
    <Card key={operator.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{operator.name}</CardTitle>
          <Badge>{operator.specialty}</Badge>
        </div>
        <CardDescription>{operator.experience}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span>Available for hire</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{operator.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  return (
    <CategoryPageLayout
      categoryName="Operators"
      categoryIcon={Briefcase}
      featuredItems={featuredItems}
      listItems={listItems}
      addNewText="Add New Operator"
    />
  )
}

