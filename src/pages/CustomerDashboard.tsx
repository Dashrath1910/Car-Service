import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Car,
  Heart,
  Bell,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  Plus,
} from "lucide-react";

// Mock data
const upcomingBookings = [
  {
    id: "BKG001",
    provider: "AutoFix Solutions",
    date: "2024-11-20",
    time: "10:00 AM",
    service: "Full Service + AC Service",
    status: "confirmed",
  },
  {
    id: "BKG003",
    provider: "Premium Car Care",
    date: "2024-11-25",
    time: "11:00 AM",
    service: "Wheel Alignment",
    status: "confirmed",
  },
];

const savedVehicles = [
  {
    id: "V001",
    make: "Maruti Suzuki",
    model: "Swift",
    year: 2020,
    registrationNumber: "GJ-01-XX-1234",
    fuelType: "Petrol",
    mileage: 45000,
  },
  {
    id: "V002",
    make: "Honda",
    model: "City",
    year: 2019,
    registrationNumber: "GJ-02-XX-5678",
    fuelType: "Diesel",
    mileage: 52000,
  },
];

const favoriteProviders = [
  {
    id: "P001",
    name: "AutoFix Solutions",
    location: "Ahmedabad, Gujarat",
    rating: 4.8,
    reviewCount: 156,
    verified: true,
  },
  {
    id: "P002",
    name: "Premium Car Care",
    location: "Ahmedabad, Gujarat",
    rating: 4.7,
    reviewCount: 98,
    verified: true,
  },
];

const notifications = [
  {
    id: "N001",
    type: "booking",
    title: "Booking Confirmed",
    message: "Your booking at AutoFix Solutions is confirmed for Nov 20",
    date: "2024-11-15",
    read: false,
  },
  {
    id: "N002",
    type: "reminder",
    title: "Service Reminder",
    message: "Your car is due for service. Book now!",
    date: "2024-11-14",
    read: false,
  },
  {
    id: "N003",
    type: "offer",
    title: "Special Offer",
    message: "Get 20% off on AC service this week",
    date: "2024-11-13",
    read: true,
  },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [unreadCount] = useState(
    notifications.filter((n) => !n.read).length
  );

  

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Customer!</h1>
            <p className="text-muted-foreground">
              Manage your bookings, vehicles, and favorite providers
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicles</p>
                    <p className="text-2xl font-bold">{savedVehicles.length}</p>
                  </div>
                  <Car className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Favorites</p>
                    <p className="text-2xl font-bold">{favoriteProviders.length}</p>
                  </div>
                  <Heart className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Notifications</p>
                    <p className="text-2xl font-bold">{unreadCount}</p>
                  </div>
                  <Bell className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bookings">Upcoming Bookings</TabsTrigger>
              <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
              <TabsTrigger value="favorites">Favorite Providers</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Upcoming Bookings */}
            <TabsContent value="bookings" className="mt-6 space-y-4">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{booking.provider}</h3>
                          <Badge>{booking.status}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(booking.date).toLocaleDateString("en-IN", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                          <p className="font-medium text-foreground mt-2">
                            {booking.service}
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => navigate("/bookings")}>View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {upcomingBookings.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      No upcoming bookings
                    </p>
                    <Button onClick={() => navigate("/providers")}>
                      Book a Service
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* My Vehicles */}
            <TabsContent value="vehicles" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {savedVehicles.map((vehicle) => (
                  <Card key={vehicle.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>
                            {vehicle.make} {vehicle.model}
                          </CardTitle>
                          <CardDescription>{vehicle.year}</CardDescription>
                        </div>
                        <Car className="w-6 h-6 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Registration:
                        </span>
                        <span className="font-medium">
                          {vehicle.registrationNumber}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fuel Type:</span>
                        <span className="font-medium">{vehicle.fuelType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mileage:</span>
                        <span className="font-medium">{vehicle.mileage} km</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-center py-12">
                    <Button variant="outline" size="lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Vehicle
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Favorite Providers */}
            <TabsContent value="favorites" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {favoriteProviders.map((provider) => (
                  <Card key={provider.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle>{provider.name}</CardTitle>
                            {provider.verified && (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {provider.location}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{provider.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({provider.reviewCount})
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/providers/${provider.id}`)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="mt-6 space-y-3">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={notification.read ? "opacity-60" : ""}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.read ? "bg-muted" : "bg-primary"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
