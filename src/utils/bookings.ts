// src/lib/storage.ts
// <- keep existing exports (ls, fmtINR, seedIfEmpty) above this block

import { ls } from "@/lib/storage";

export type Booking = {
  id: string;
  userId?: string;
  status: "upcoming" | "completed" | "cancelled";
  provider: any;
  date: string; // ISO
  time?: string;
  services: any[];
  vehicle?: any;
  total: number;
  createdAt: string;
  cancelledAt?: string;
};

// ensure bookings seed
if (ls.get<Booking[]>("bookings", []).length === 0) {
  ls.set("bookings", [
    // optional demo booking
    {
      id: "BKG-demo-1",
      userId: undefined,
      status: "upcoming",
      provider: { name: "AutoFix Solutions", location: "Ahmedabad, Gujarat", phone: "+91 98765 43210" },
      date: new Date().toISOString(),
      time: "10:00 AM",
      services: [{ id: "s1", name: "Full Service", price: 2500 }],
      vehicle: { make: "Maruti", model: "Swift", registrationNumber: "GJ-01-XX-1234" },
      total: 2950,
      createdAt: new Date().toISOString(),
    },
  ]);
}

export function getBookings(): Booking[] {
  return ls.get<Booking[]>("bookings", []);
}

export function addBooking(b: Booking) {
  const list = ls.get<Booking[]>("bookings", []);
  list.unshift(b);
  ls.set("bookings", list);
  return b;
}

export function updateBooking(id: string, patch: Partial<Booking>) {
  const list = ls.get<Booking[]>("bookings", []);
  const next = list.map((bk) => (bk.id === id ? { ...bk, ...patch } : bk));
  ls.set("bookings", next);
  return next.find((bk) => bk.id === id) ?? null;
}
