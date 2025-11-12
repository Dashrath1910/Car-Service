import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Car, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addBooking } from "@/lib/storage";
import { currentUser } from "@/utils/auth";
// remove unused uuid import (if present)
// top of file alongside other imports
import type { Booking } from "@/utils/bookings";

const vehicleSchema = z.object({
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  year: z.string().regex(/^\d{4}$/, "Must be a valid year"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  fuelType: z.enum(["petrol", "diesel", "cng", "electric", "hybrid"]),
  mileage: z.string().regex(/^\d+$/, "Must be a valid number"),
  notes: z.string().optional(),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const bookingData = location.state || {
    provider: { name: "Unknown Provider", location: "Unknown Location" },
    selectedDate: new Date(),
    selectedSlot: "10:00",
    selectedServices: [],
    total: 0,
  };

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear().toString(),
      registrationNumber: "",
      fuelType: "petrol",
      mileage: "",
      notes: "",
    },
  });

 // inside src/pages/BookingConfirmation.tsx
const onSubmit = async (data: VehicleFormData) => {
  setIsProcessing(true);

  // create booking id (use crypto.randomUUID when available)
  const id = typeof crypto !== "undefined" && (crypto as any).randomUUID
    ? (crypto as any).randomUUID()
    : `BKG${Date.now()}`;

  const user = currentUser();

  // compute total if bookingData.total not provided
  const computedTotal =
    bookingData.total ??
    (bookingData.selectedServices ?? []).reduce(
      (sum: number, s: any) => sum + (s.price ?? 0),
      0
    );

  // Build a correctly-typed Booking object
  const booking: Booking = {
    id,
    // If your Booking.userId is optional, use undefined when no user
    userId: user?.id ?? undefined,
    // This must be one of the union values
    status: "upcoming",
    provider: bookingData.provider,
    // ensure date is ISO string
    date: new Date(bookingData.selectedDate).toISOString(),
    time: bookingData.selectedSlot ?? "10:00",
    services: bookingData.selectedServices ?? [],
    vehicle: {
      make: data.make,
      model: data.model,
      registrationNumber: data.registrationNumber,
      // include any additional vehicle fields your Booking.vehicle expects
      year: data.year,
      fuelType: data.fuelType as Booking["vehicle"]["fuelType"],
    },
    total: computedTotal,
    createdAt: new Date().toISOString(),
  };

  // Save booking (addBooking should accept Booking)
  addBooking(booking);

  // UX feedback
  toast({
    title: "Booking Confirmed!",
    description: `Your booking ${booking.id} is confirmed.`,
  });

  setIsProcessing(false);
  navigate("/bookings", { state: { bookingId: booking.id, status: "confirmed" } });
};


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            ← Back
          </Button>

          <h1 className="text-3xl font-bold mb-8">Confirm Your Booking</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Booking Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>Review your appointment details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-semibold">{bookingData.provider.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {bookingData.provider.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-semibold">
                        {new Date(bookingData.selectedDate).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-semibold">{bookingData.selectedSlot}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Selected Services</h4>
                    <div className="space-y-2">
                      {bookingData.selectedServices.map((service: any) => (
                        <div
                          key={service.id}
                          className="flex justify-between items-start p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{service.category}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {service.duration} min
                              </span>
                            </div>
                          </div>
                          <span className="font-semibold">₹{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vehicle Details Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    Vehicle Details
                  </CardTitle>
                  <CardDescription>
                    Enter your vehicle information for the service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="make"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Make</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Maruti Suzuki" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Model</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Swift" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year</FormLabel>
                              <FormControl>
                                <Input placeholder="2020" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="registrationNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Registration Number</FormLabel>
                              <FormControl>
                                <Input placeholder="GJ-01-XX-1234" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fuelType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fuel Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select fuel type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="petrol">Petrol</SelectItem>
                                  <SelectItem value="diesel">Diesel</SelectItem>
                                  <SelectItem value="cng">CNG</SelectItem>
                                  <SelectItem value="electric">Electric</SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="mileage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Mileage (km)</FormLabel>
                              <FormControl>
                                <Input placeholder="50000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any specific issues or requirements..."
                                className="min-h-20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          "Processing..."
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Proceed to Payment
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {bookingData.selectedServices.map((service: any) => (
                      <div key={service.id} className="flex justify-between text-sm">
                        <span>{service.name}</span>
                        <span>₹{service.price}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{bookingData.total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>GST (18%)</span>
                      <span>₹{Math.round(bookingData.total * 0.18)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">
                      ₹{Math.round(bookingData.total * 1.18)}
                    </span>
                  </div>

                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      <span>Pay via UPI, Cards, or Net Banking</span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                      <p className="font-semibold mb-1">Cancellation Policy</p>
                      <p className="text-muted-foreground">
                        Free cancellation up to 24 hours before the appointment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
