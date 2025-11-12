import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Car,
  Shield,
  Clock,
  Star,
  Wrench,
  Droplet,
  Gauge,
  Wind,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted Providers",
      description: "All service providers are verified and rated by customers",
    },
    {
      icon: Clock,
      title: "Quick Booking",
      description: "Book your service in minutes with real-time availability",
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "100% satisfaction guarantee with every service",
    },
  ];

  const services = [
    {
      icon: Wrench,
      title: "General Repair",
      description: "Complete vehicle diagnostics and repair services",
      price: "Starting at ₹999",
    },
    {
      icon: Droplet,
      title: "Car Wash & Detailing",
      description: "Professional cleaning and detailing services",
      price: "Starting at ₹499",
    },
    {
      icon: Gauge,
      title: "Tire Service",
      description: "Rotation, balancing, and replacement services",
      price: "Starting at ₹799",
    },
    {
      icon: Wind,
      title: "AC Repair",
      description: "AC maintenance and repair for optimal cooling",
      price: "Starting at ₹1,299",
    },
  ];

  const benefits = [
    "Transparent pricing with detailed estimates",
    "GST-compliant digital invoices",
    "Multiple payment options including UPI",
    "Real-time booking and status updates",
    "Verified customer reviews and ratings",
    "Easy cancellation and refund policy",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Your Car Deserves the <span className="text-primary">Best Care</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Find trusted service providers in Ahmedabad. Book appointments instantly, track progress in real-time, and enjoy transparent pricing.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="bg-gradient-secondary shadow-lg hover:shadow-xl transition-all">
                <Link to="/providers">
                  Find Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth/register">Become a Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="group border-2 hover:border-primary transition-all hover:shadow-lg animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Popular Services</h2>
            <p className="text-lg text-muted-foreground">
              From routine maintenance to major repairs, we've got you covered
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary group-hover:scale-110 transition-transform">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                  <p className="font-semibold text-primary">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/providers">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Why Choose AutoCare?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                We're committed to providing the best car service experience in Ahmedabad with our innovative platform and trusted network of providers.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-success mt-0.5" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button size="lg" asChild className="bg-gradient-primary">
                  <Link to="/auth/register">Get Started Today</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-primary opacity-20 absolute -top-4 -right-4 w-72 h-72"></div>
              <div className="relative rounded-2xl bg-card p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-success/10">
                      <Star className="h-8 w-8 text-success" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">4.8/5</p>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                      <Car className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">10,000+</p>
                      <p className="text-sm text-muted-foreground">Services Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary/10">
                      <Shield className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">500+</p>
                      <p className="text-sm text-muted-foreground">Verified Providers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of satisfied customers in Ahmedabad
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/providers">Find a Service Provider</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link to="/auth/register">Register as Provider</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
