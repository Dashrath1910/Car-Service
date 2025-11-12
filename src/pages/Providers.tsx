import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Star, Clock, CheckCircle2, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Mock data
const providers = [
  {
    id: 1,
    name: "Premium Auto Care",
    location: "Satellite, Ahmedabad",
    rating: 4.8,
    reviews: 234,
    services: ["General Repair", "AC Repair", "Car Wash"],
    priceRange: "₹500 - ₹5,000",
    available: true,
    nextSlot: "Today 2:00 PM",
    image: "🚗",
    verified: true,
  },
  {
    id: 2,
    name: "Elite Car Service",
    location: "Vastrapur, Ahmedabad",
    rating: 4.9,
    reviews: 456,
    services: ["Oil Change", "Tire Service", "Detailing"],
    priceRange: "₹800 - ₹8,000",
    available: true,
    nextSlot: "Today 4:30 PM",
    image: "🔧",
    verified: true,
  },
  {
    id: 3,
    name: "Speed Auto Workshop",
    location: "Bodakdev, Ahmedabad",
    rating: 4.6,
    reviews: 189,
    services: ["General Repair", "Engine Service", "Brakes"],
    priceRange: "₹600 - ₹6,000",
    available: false,
    nextSlot: "Tomorrow 10:00 AM",
    image: "⚙️",
    verified: true,
  },
  {
    id: 4,
    name: "Royal Car Spa",
    location: "SG Highway, Ahmedabad",
    rating: 4.7,
    reviews: 312,
    services: ["Car Wash", "Detailing", "Polish"],
    priceRange: "₹400 - ₹3,000",
    available: true,
    nextSlot: "Today 1:00 PM",
    image: "💧",
    verified: true,
  },
  {
    id: 5,
    name: "Tech Auto Solutions",
    location: "Prahladnagar, Ahmedabad",
    rating: 4.5,
    reviews: 145,
    services: ["AC Repair", "Electrical", "Diagnostics"],
    priceRange: "₹700 - ₹7,000",
    available: true,
    nextSlot: "Today 3:00 PM",
    image: "🔌",
    verified: false,
  },
  {
    id: 6,
    name: "Fast Track Service",
    location: "Ashram Road, Ahmedabad",
    rating: 4.4,
    reviews: 98,
    services: ["Oil Change", "General Repair", "Tire Service"],
    priceRange: "₹500 - ₹4,500",
    available: true,
    nextSlot: "Today 5:00 PM",
    image: "⏱️",
    verified: true,
  },
];

const Providers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const locations = ["All Locations", "Satellite", "Vastrapur", "Bodakdev", "SG Highway", "Prahladnagar", "Ashram Road"];
  const serviceTypes = ["All Services", "General Repair", "AC Repair", "Car Wash", "Oil Change", "Tire Service", "Detailing"];

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "all" || provider.location.includes(selectedLocation);
    const matchesService = selectedService === "all" || provider.services.some(s => s === selectedService);
    const matchesRating = selectedRating === "all" || provider.rating >= parseFloat(selectedRating);
    
    return matchesSearch && matchesLocation && matchesService && matchesRating;
  });

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.slice(1).map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Service Type</label>
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {serviceTypes.slice(1).map((service) => (
              <SelectItem key={service} value={service}>{service}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Minimum Rating</label>
        <Select value={selectedRating} onValueChange={setSelectedRating}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="4.5">4.5+ ⭐</SelectItem>
            <SelectItem value="4.0">4.0+ ⭐</SelectItem>
            <SelectItem value="3.5">3.5+ ⭐</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Price Range</label>
        <div className="pt-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            step={500}
            className="w-full"
          />
          <div className="mt-2 flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSelectedLocation("all");
          setSelectedService("all");
          setSelectedRating("all");
          setPriceRange([0, 10000]);
        }}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-hero py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Find Service Providers</h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Discover trusted car service providers near you in Ahmedabad
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Desktop Filters */}
              <aside className="hidden w-72 flex-shrink-0 lg:block">
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <Filter className="h-5 w-5" />
                      Filters
                    </h2>
                    <FilterContent />
                  </CardContent>
                </Card>
              </aside>

              {/* Results */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Found <span className="font-semibold text-foreground">{filteredProviders.length}</span> providers
                  </p>
                  
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="grid gap-6">
                  {filteredProviders.map((provider, index) => (
                    <Card 
                      key={provider.id} 
                      className="group overflow-hidden transition-all hover:shadow-lg animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Provider Image */}
                          <div className="flex h-48 w-full items-center justify-center bg-gradient-primary text-6xl md:h-auto md:w-48">
                            {provider.image}
                          </div>

                          {/* Provider Info */}
                          <div className="flex flex-1 flex-col p-6">
                            <div className="mb-4 flex items-start justify-between">
                              <div>
                                <div className="mb-2 flex items-center gap-2">
                                  <h3 className="text-xl font-bold">{provider.name}</h3>
                                  {provider.verified && (
                                    <Badge variant="secondary" className="gap-1">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  {provider.location}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 rounded-lg bg-success/10 px-3 py-1">
                                <Star className="h-4 w-4 fill-success text-success" />
                                <span className="font-semibold text-success">{provider.rating}</span>
                                <span className="text-xs text-muted-foreground">({provider.reviews})</span>
                              </div>
                            </div>

                            <div className="mb-4 flex flex-wrap gap-2">
                              {provider.services.map((service) => (
                                <Badge key={service} variant="outline">{service}</Badge>
                              ))}
                            </div>

                            <div className="mt-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                              <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Price Range</p>
                                <p className="font-semibold">{provider.priceRange}</p>
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className={provider.available ? "text-success font-medium" : "text-muted-foreground"}>
                                  {provider.available ? "Available" : "Not Available"}
                                </span>
                                <span className="text-muted-foreground">• {provider.nextSlot}</span>
                              </div>

                              <Button asChild className="bg-gradient-secondary">
                                <Link to={`/providers/${provider.id}`}>
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredProviders.length === 0 && (
                  <Card className="p-12 text-center">
                    <p className="mb-2 text-lg font-semibold">No providers found</p>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Providers;
