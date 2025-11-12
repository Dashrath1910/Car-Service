import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  TrendingUp,
  Users,
  IndianRupee,
  Star,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

// Mock data
const bookings = [
  {
    id: "BKG001",
    customer: "Rajesh Patel",
    vehicle: "Maruti Swift GJ-01-XX-1234",
    service: "Full Service + AC Service",
    date: "2024-11-20",
    time: "10:00 AM",
    status: "confirmed",
    amount: 5074,
  },
  {
    id: "BKG002",
    customer: "Priya Shah",
    vehicle: "Honda City GJ-02-XX-5678",
    service: "Basic Service",
    date: "2024-11-20",
    time: "2:00 PM",
    status: "confirmed",
    amount: 1416,
  },
  {
    id: "BKG003",
    customer: "Amit Kumar",
    vehicle: "Hyundai i20 GJ-03-XX-9012",
    service: "Brake Service",
    date: "2024-11-21",
    time: "11:00 AM",
    status: "pending",
    amount: 2596,
  },
];

const reviews = [
  {
    id: "R001",
    customer: "Rajesh Patel",
    rating: 5,
    comment: "Excellent service! Very professional and transparent pricing.",
    date: "2024-11-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
  },
  {
    id: "R002",
    customer: "Priya Shah",
    rating: 4,
    comment: "Good service, but had to wait a bit longer than expected.",
    date: "2024-11-08",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
];

const earningsData = {
  today: 6490,
  week: 45230,
  month: 182400,
  bookingsToday: 2,
  bookingsWeek: 18,
  bookingsMonth: 76,
};

const capacitySlots = [
  { time: "09:00", booked: 3, total: 4 },
  { time: "10:00", booked: 4, total: 4 },
  { time: "11:00", booked: 2, total: 4 },
  { time: "12:00", booked: 1, total: 4 },
  { time: "14:00", booked: 0, total: 4 },
  { time: "15:00", booked: 1, total: 4 },
  { time: "16:00", booked: 0, total: 4 },
  { time: "17:00", booked: 0, total: 4 },
];

export default function ProviderDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getStatusBadge = (status: string) => {
    const config: any = {
      confirmed: { variant: "default", icon: CheckCircle },
      pending: { variant: "secondary", icon: Clock },
      completed: { variant: "outline", icon: CheckCircle },
      cancelled: { variant: "destructive", icon: XCircle },
    };
    const { variant, icon: Icon } = config[status] || config.pending;
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
            <p className="text-muted-foreground">
              Manage bookings, capacity, and earnings
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Bookings</p>
                    <p className="text-2xl font-bold">{earningsData.bookingsToday}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Earnings</p>
                    <p className="text-2xl font-bold">₹{earningsData.today}</p>
                  </div>
                  <IndianRupee className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-2xl font-bold">₹{earningsData.week}</p>
                    <p className="text-xs text-muted-foreground">
                      {earningsData.bookingsWeek} bookings
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">₹{earningsData.month}</p>
                    <p className="text-xs text-muted-foreground">
                      {earningsData.bookingsMonth} bookings
                    </p>
                  </div>
                  <CalendarIcon className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bookings">Booking Management</TabsTrigger>
              <TabsTrigger value="capacity">Capacity Calendar</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
            </TabsList>

            {/* Booking Management */}
            <TabsContent value="bookings" className="mt-6 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Bookings</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">
                            {booking.customer}
                          </h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Booking ID</p>
                            <p className="font-medium">{booking.id}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Vehicle</p>
                            <p className="font-medium">{booking.vehicle}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Service</p>
                            <p className="font-medium">{booking.service}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Date & Time</p>
                            <p className="font-medium">
                              {new Date(booking.date).toLocaleDateString()} at{" "}
                              {booking.time}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-muted-foreground mb-1">Amount</p>
                        <p className="text-2xl font-bold text-primary">
                          ₹{booking.amount}
                        </p>
                        <div className="flex gap-2 mt-4">
                          {booking.status === "pending" && (
                            <>
                              <Button size="sm" variant="default">
                                Accept
                              </Button>
                              <Button size="sm" variant="outline">
                                Reject
                              </Button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <Button size="sm" variant="outline">
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Capacity Calendar */}
            <TabsContent value="capacity" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Capacity Overview -{" "}
                        {selectedDate.toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardTitle>
                      <CardDescription>
                        Bay utilization for the selected date
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {capacitySlots.map((slot) => {
                          const percentage = (slot.booked / slot.total) * 100;
                          const isFull = slot.booked >= slot.total;

                          return (
                            <div
                              key={slot.time}
                              className={`p-4 rounded-lg border-2 ${
                                isFull
                                  ? "border-red-500 bg-red-500/10"
                                  : "border-border bg-card"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold">{slot.time}</span>
                                <Badge variant={isFull ? "destructive" : "secondary"}>
                                  {slot.booked}/{slot.total}
                                </Badge>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    isFull ? "bg-red-500" : "bg-primary"
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                {isFull ? "Fully Booked" : `${slot.total - slot.booked} available`}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Earnings */}
            <TabsContent value="earnings" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>Your revenue breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Today</p>
                        <p className="text-2xl font-bold">₹{earningsData.today}</p>
                        <p className="text-xs text-muted-foreground">
                          {earningsData.bookingsToday} bookings
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">This Week</p>
                        <p className="text-2xl font-bold">₹{earningsData.week}</p>
                        <p className="text-xs text-muted-foreground">
                          {earningsData.bookingsWeek} bookings
                        </p>
                      </div>
                      <CalendarIcon className="w-8 h-8 text-primary" />
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">This Month</p>
                        <p className="text-2xl font-bold">₹{earningsData.month}</p>
                        <p className="text-xs text-muted-foreground">
                          {earningsData.bookingsMonth} bookings
                        </p>
                      </div>
                      <IndianRupee className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Summary</CardTitle>
                    <CardDescription>Pending and completed payments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Earnings</span>
                        <span className="font-semibold">
                          ₹{earningsData.month}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Platform Fee (10%)</span>
                        <span className="font-semibold text-red-500">
                          -₹{Math.round(earningsData.month * 0.1)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">GST (18%)</span>
                        <span className="font-semibold text-red-500">
                          -₹{Math.round(earningsData.month * 0.18)}
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Net Payout</span>
                        <span className="text-2xl font-bold text-primary">
                          ₹{Math.round(earningsData.month * 0.72)}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Request Payout</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews" className="mt-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Star className="w-12 h-12 fill-yellow-500 text-yellow-500" />
                      <div>
                        <p className="text-3xl font-bold">4.8</p>
                        <p className="text-sm text-muted-foreground">
                          Average Rating
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Users className="w-12 h-12 text-primary" />
                      <div>
                        <p className="text-3xl font-bold">156</p>
                        <p className="text-sm text-muted-foreground">
                          Total Reviews
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>
                          {review.customer.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{review.customer}</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-500 text-yellow-500"
                                      : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
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
