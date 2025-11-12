import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  Wrench,
  Calendar as CalendarIcon,
} from "lucide-react";

// Mock data - replace with API call
const mockProvider = {
  id: "1",
  name: "AutoFix Solutions",
  verified: true,
  rating: 4.8,
  reviewCount: 156,
  location: "Ahmedabad, Gujarat",
  phone: "+91 98765 43210",
  email: "contact@autofix.com",
  description:
    "Professional car service center with 15+ years of experience. Specialized in all major car brands with certified technicians and genuine parts.",
  images: [
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800",
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800",
    "https://images.unsplash.com/photo-1632823469850-1b7d32648d96?w=800",
  ],
  services: [
    {
      id: "s1",
      name: "Basic Service",
      description: "Oil change, filter replacement, basic inspection",
      price: 1200,
      duration: 60,
      category: "Maintenance",
    },
    {
      id: "s2",
      name: "Full Service",
      description: "Complete vehicle inspection and maintenance",
      price: 2500,
      duration: 120,
      category: "Maintenance",
    },
    {
      id: "s3",
      name: "AC Service",
      description: "AC gas refill, filter cleaning, performance check",
      price: 1800,
      duration: 90,
      category: "Repair",
    },
    {
      id: "s4",
      name: "Brake Service",
      description: "Brake pad replacement, disc machining, fluid check",
      price: 2200,
      duration: 90,
      category: "Repair",
    },
    {
      id: "s5",
      name: "Wheel Alignment",
      description: "Complete wheel alignment and balancing",
      price: 800,
      duration: 45,
      category: "Maintenance",
    },
    {
      id: "s6",
      name: "Battery Service",
      description: "Battery check, replacement, terminal cleaning",
      price: 500,
      duration: 30,
      category: "Repair",
    },
  ],
  capacity: {
    baysCount: 4,
    techsCount: 6,
  },
  workingHours: {
    open: "09:00",
    close: "20:00",
    daysOff: [0], // Sunday
  },
  reviews: [
    {
      id: "r1",
      customerName: "Rajesh Patel",
      rating: 5,
      comment: "Excellent service! Very professional and transparent pricing.",
      date: "2024-11-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    },
    {
      id: "r2",
      customerName: "Priya Shah",
      rating: 4,
      comment: "Good service, but had to wait a bit longer than expected.",
      date: "2024-11-02",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      id: "r3",
      customerName: "Amit Kumar",
      rating: 5,
      comment: "Best service center in Ahmedabad. Highly recommended!",
      date: "2024-10-28",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    },
  ],
};

// Mock capacity data for slots - replace with API
const getSlotCapacity = (date: Date, time: string) => {
  // Simulate different capacities
  const random = Math.floor(Math.random() * 5);
  return { available: random, total: 4 };
};

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export default function ProviderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState(0);

  const provider = mockProvider; // Replace with API call using id

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return provider.services
      .filter((service) => selectedServices.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot || selectedServices.length === 0) {
      alert("Please select date, time slot, and at least one service");
      return;
    }
    // Navigate to booking confirmation page
    navigate(`/book/${id}`, {
      state: {
        provider,
        selectedDate,
        selectedSlot,
        selectedServices: provider.services.filter((s) =>
          selectedServices.includes(s.id)
        ),
        total: calculateTotal(),
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Provider Header */}
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate("/providers")}
            className="mb-4"
          >
            ← Back to Providers
          </Button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Gallery */}
            <div className="md:w-1/2">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={provider.images[activeImage]}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {provider.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-video rounded overflow-hidden border-2 transition-all ${
                      activeImage === idx
                        ? "border-primary"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${provider.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Provider Info */}
            <div className="md:w-1/2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">
                      {provider.name}
                    </h1>
                    {provider.verified && (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{provider.rating}</span>
                  <span className="text-muted-foreground">
                    ({provider.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{provider.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <a
                    href={`tel:${provider.phone}`}
                    className="text-primary hover:underline"
                  >
                    {provider.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <a
                    href={`mailto:${provider.email}`}
                    className="text-primary hover:underline"
                  >
                    {provider.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">
                    {provider.workingHours.open} - {provider.workingHours.close}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">
                    {provider.capacity.baysCount} Service Bays •{" "}
                    {provider.capacity.techsCount} Technicians
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Services and Booking */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="services">Services & Pricing</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="space-y-4 mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {provider.services.map((service) => (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedServices.includes(service.id)
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => toggleService(service.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {service.name}
                            </CardTitle>
                            <Badge variant="secondary" className="mt-2">
                              {service.category}
                            </Badge>
                          </div>
                          {selectedServices.includes(service.id) && (
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          {service.description}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">
                            ₹{service.price}
                          </span>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{service.duration} min</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4 mt-6">
                {provider.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>
                            {review.customerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.customerName}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
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
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Book Appointment
                </CardTitle>
                <CardDescription>
                  Select date, time, and services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calendar */}
                <div>
                  <h4 className="font-semibold mb-3">Select Date</h4>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) =>
                      date < new Date() ||
                      provider.workingHours.daysOff.includes(date.getDay())
                    }
                    className="rounded-md border"
                  />
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div>
                    <h4 className="font-semibold mb-3">Available Time Slots</h4>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((time) => {
                        const capacity = getSlotCapacity(selectedDate, time);
                        const isAvailable = capacity.available > 0;

                        return (
                          <Button
                            key={time}
                            variant={selectedSlot === time ? "default" : "outline"}
                            className="flex flex-col items-start h-auto py-2"
                            disabled={!isAvailable}
                            onClick={() => setSelectedSlot(time)}
                          >
                            <span className="font-semibold">{time}</span>
                            <span className="text-xs opacity-70">
                              {isAvailable
                                ? `${capacity.available}/${capacity.total} available`
                                : "Full"}
                            </span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Selected Services Summary */}
                {selectedServices.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Selected Services</h4>
                    <div className="space-y-2">
                      {provider.services
                        .filter((s) => selectedServices.includes(s.id))
                        .map((service) => (
                          <div
                            key={service.id}
                            className="flex justify-between text-sm"
                          >
                            <span>{service.name}</span>
                            <span className="font-semibold">₹{service.price}</span>
                          </div>
                        ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{calculateTotal()}</span>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleBooking}
                  disabled={
                    !selectedDate ||
                    !selectedSlot ||
                    selectedServices.length === 0
                  }
                >
                  Book Now
                </Button>

                {selectedServices.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">
                    Select at least one service to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
