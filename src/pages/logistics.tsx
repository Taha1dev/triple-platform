import { Package, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CategoryPageLayout from "@/components/category-page-layout"

const featuredLogistics = [
  {
    id: 1,
    name: "Express Film Transport",
    service: "Equipment Transportation",
    experience: "10 years",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Set Catering Co.",
    service: "On-Set Catering",
    experience: "15 years",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Mobile Wardrobe Solutions",
    service: "Wardrobe Trailers",
    experience: "8 years",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const logisticsList = [
  { id: 4, name: "Crew Shuttle Services", service: "Transportation", experience: "12 years", rating: 4.6 },
  { id: 5, name: "Power Generator Rentals", service: "Power Solutions", experience: "20 years", rating: 4.8 },
  { id: 6, name: "Portable Restroom Trailers", service: "Sanitation", experience: "7 years", rating: 4.5 },
  { id: 7, name: "Set Security Solutions", service: "Security Services", experience: "15 years", rating: 4.7 },
  { id: 8, name: "Waste Management for Sets", service: "Waste Disposal", experience: "10 years", rating: 4.4 },
]

export default function LogisticsPage() {
  const featuredItems = featuredLogistics.map((logistics) => (
    <Card key={logistics.id}>
      <CardHeader className="p-0">
        <img
          src={logistics.image || "/placeholder.svg"}
          alt={logistics.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle>{logistics.name}</CardTitle>
        <CardDescription>{logistics.service}</CardDescription>
        <div className="flex justify-between items-center mt-2">
          <span>{logistics.experience}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{logistics.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  const listItems = logisticsList.map((logistics) => (
    <Card key={logistics.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{logistics.name}</CardTitle>
          <Badge>{logistics.service}</Badge>
        </div>
        <CardDescription>{logistics.experience}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span>Available for booking</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{logistics.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))

  return (
    <CategoryPageLayout
      categoryName="Logistics"
      categoryIcon={Package}
      featuredItems={featuredItems}
      listItems={listItems}
      addNewText="Add New Logistics Service"
    />
  )
}

