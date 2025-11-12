// src/pages/MyBookings.tsx
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Phone, X, RefreshCw, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getBookings, updateBooking } from "@/lib/storage";
import { currentUser } from "@/utils/auth";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [actionDialog, setActionDialog] = useState<"cancel" | "reschedule" | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadBookings();
  }, []);

  function loadBookings() {
    const user = currentUser();
    const all = getBookings();
    const visible = user ? all.filter(b => !b.userId || b.userId === user.id) : all;
    setBookings(visible);
  }

  function refresh() {
    loadBookings();
  }

  const getStatusBadge = (status: string) => {
    const variants: any = {
      upcoming: "default",
      completed: "secondary",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const handleCancel = (bookingId: string) => {
    updateBooking(bookingId, { status: "cancelled", cancelledAt: new Date().toISOString() });
    toast({ title: "Booking Cancelled", description: "Your booking has been cancelled." });
    setActionDialog(null);
    setSelectedBooking(null);
    refresh();
  };

  const handleReschedule = (bookingId: string) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 2);
    updateBooking(bookingId, { date: nextDate.toISOString(), status: "upcoming" });
    toast({ title: "Reschedule Saved", description: "Your booking has been rescheduled." });
    setActionDialog(null);
    setSelectedBooking(null);
    refresh();
  };

  const filterBookings = (status: string) => {
    if (status === "all") return bookings;
    return bookings.filter((b) => b.status === status);
  };

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{booking.provider?.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {booking.provider?.location}
            </CardDescription>
          </div>
          {getStatusBadge(booking.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{new Date(booking.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{booking.provider?.phone}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Vehicle</p>
            <p className="text-sm text-muted-foreground">
              {booking.vehicle?.make} {booking.vehicle?.model}
            </p>
            <p className="text-sm text-muted-foreground">{booking.vehicle?.registrationNumber}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Services</p>
          <div className="space-y-1">
            {booking.services?.map((service: any, idx: number) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>{service.name}</span>
                <span className="font-medium">₹{service.price}</span>
              </div>
            )) || <div className="text-sm text-muted-foreground">No services</div>}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-primary">₹{booking.total}</p>
          </div>
          <div className="flex gap-2">
            {booking.status === "upcoming" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setActionDialog("reschedule");
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Reschedule
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setActionDialog("cancel");
                  }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </>
            )}
            {booking.status === "completed" && (
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-1" />
                View Invoice
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            {["all", "upcoming", "completed", "cancelled"].map((status) => (
              <TabsContent key={status} value={status} className="space-y-4">
                {filterBookings(status).length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No bookings found</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterBookings(status).map((booking) => <BookingCard key={booking.id} booking={booking} />)
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {/* Cancel Dialog */}
      <Dialog open={actionDialog === "cancel"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-2 py-4">
              <p className="text-sm">
                <span className="font-semibold">Booking ID:</span> {selectedBooking.id}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Provider:</span> {selectedBooking.provider?.name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Date:</span> {new Date(selectedBooking.date).toLocaleDateString()} at{" "}
                {selectedBooking.time}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={() => handleCancel(selectedBooking?.id)}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog open={actionDialog === "reschedule"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">This feature will allow you to select a new date and time slot.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button onClick={() => handleReschedule(selectedBooking?.id)}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
