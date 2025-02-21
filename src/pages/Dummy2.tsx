/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Wifi,
  Coffee,
  ParkingMeterIcon as Parking,
  Users,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// Mock data for a single location
const locationData = {
  id: 1,
  name: "Sunset Beach Studio",
  type: "Beach",
  address: "123 Coastal Drive, Beachtown, BT 12345",
  price: 1000,
  rating: 4.8,
  reviewsNum: 24,
  description:
    "A beautiful beachfront studio perfect for film and photo shoots. Featuring panoramic ocean views and modern amenities.",
  images: [
    "https://placeholder.svg?height=400&width=600",
    "https://placeholder.svg?height=400&width=600",
    "https://placeholder.svg?height=400&width=600",
  ],
  amenities: ["Wi-Fi", "Parking", "Catering Area", "Dressing Rooms", "Power Outlets"],
  capacity: "Up to 20 crew members",
  availability: [
    { date: "2023-06-01", status: "available" },
    { date: "2023-06-02", status: "booked" },
    { date: "2023-06-03", status: "available" },
    { date: "2023-06-04", status: "available" },
    { date: "2023-06-05", status: "booked" },
  ],
  reviews: [
    {
      id: 1,
      user: "Alice Johnson",
      rating: 5,
      comment: "Absolutely stunning location! Perfect for our beach scene shoot.",
    },
    {
      id: 2,
      user: "Bob Smith",
      rating: 4,
      comment: "Great amenities and helpful staff. Slightly difficult parking for large vehicles.",
    },
  ],
}

const amenityIcons: any = {
  "Wi-Fi": Wifi,
  Parking: Parking,
  "Catering Area": Coffee,
  "Dressing Rooms": Users,
  "Power Outlets": Check,
}

export default function LocationPage() {


  // In a real application, you would fetch the location data based on the id
  // For this example, we're using the mock data

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/locations">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Locations
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{locationData.name}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <img
                  src={locationData.images[0] || "/placeholder.svg"}
                  alt={locationData.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge>{locationData.type}</Badge>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-bold">{locationData.rating}</span>
                    <span className="text-gray-500 ml-1">({locationData.reviewsNum} reviews)</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">{locationData.name}</h2>
                <p className="text-gray-500 mb-4">
                  <MapPin className="inline-block h-4 w-4 mr-1" />
                  {locationData.address}
                </p>
                <p className="mb-4">{locationData.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold mb-2">Amenities</h3>
                    <ul className="space-y-1">
                      {locationData.amenities.map((amenity) => (
                        <li key={amenity} className="flex items-center">
                          {amenityIcons[amenity] &&
                            React.createElement(amenityIcons[amenity], { className: "h-4 w-4 mr-2" })}
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Capacity</h3>
                    <p>{locationData.capacity}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {locationData.reviews.map((review) => (
                  <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{review.user}</span>
                      <div className="ml-auto flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking</CardTitle>
                <CardDescription>Check availability and book this location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">${locationData.price}</span>
                  <span className="text-gray-500">per day</span>
                </div>
                <Tabs defaultValue="calendar">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                  <TabsContent value="calendar">
                    {/* Implement a calendar component here */}
                    <div className="h-64 bg-gray-100 flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-gray-400" />
                      <span className="ml-2">Calendar view coming soon</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="list">
                    <ul className="space-y-2">
                      {locationData.availability.map((day) => (
                        <li key={day.date} className="flex justify-between items-center">
                          <span>{day.date}</span>
                          <Badge variant={day.status === "available" ? "default" : "secondary"}>{day.status}</Badge>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
                <Button className="w-full mt-4">
                  <Calendar className="mr-2 h-4 w-4" /> Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

