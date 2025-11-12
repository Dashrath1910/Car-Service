import { Booking } from "@/utils/bookings";

// src/lib/storage.ts
export const ls = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch { return fallback; }
  },
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export const fmtINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR" });

export const seedIfEmpty = () => {
  // providers
  if (ls.get("providers", []).length === 0) {
    ls.set("providers", [
      { id: "p1", name: "Ahmedabad Auto Care", category: "Mechanic", approved: true },
      { id: "p2", name: "Gujarat Shine Detailing", category: "Detailing", approved: false },
      { id: "p3", name: "Sarkhej Tyre & Wheel", category: "Tyres", approved: true },
    ]);
  }
  // users - note: demo passwords (plain text) for local dev only
  if (ls.get("users", []).length === 0) {
    ls.set("users", [
      { id: "u1", name: "Riya Shah", email: "riya@example.com", password: "password123", role: "customer", active: true },
      { id: "u2", name: "Auto Care Owner", email: "owner@aac.example", password: "ownerpass", role: "provider", providerId: "p1", active: true },
      { id: "u3", name: "Platform Admin", email: "admin@aah.example", password: "adminpass", role: "admin", active: true },
    ]);
  }
  // reviews
  if (ls.get("reviews", []).length === 0) {
    const now = new Date().toISOString();
    ls.set("reviews", [
      { id: crypto.randomUUID(), providerId: "p1", reviewerName: "Riya", rating: 5, comment: "Great service!", createdAt: now, status: "approved" },
      { id: crypto.randomUUID(), providerId: "p1", reviewerName: "Amit", rating: 4, comment: "Quick & fair.", createdAt: now, status: "approved" },
      { id: crypto.randomUUID(), providerId: "p3", reviewerName: "Neha", rating: 3, comment: "Okay experience.", createdAt: now, status: "pending" },
    ]);
  }
  // notifications
  if (ls.get("notifications", []).length === 0) {
    ls.set("notifications", [
      { id: crypto.randomUUID(), title: "Welcome!", body: "Thanks for joining Ahmedabad Auto Hub.", channel: "inapp", createdAt: new Date().toISOString(), read: false }
    ]);
  }
  // payments
  if (ls.get("payments", []).length === 0) {
    const now = new Date().toISOString();
    ls.set("payments", [
      { id: crypto.randomUUID(), providerId: "p1", userId: "u1", amount: 1500, taxRate: 18, status: "success", method: "razorpay", ref: "RZP_DEMO_001", createdAt: now }
    ]);
  }
  // vehicles
  if (ls.get("vehicles", []).length === 0) {
    ls.set("vehicles", [
      { id: "V001", userId: "u1", make: "Maruti Suzuki", model: "Swift", year: 2020, registrationNumber: "GJ-01-XX-1234", fuelType: "Petrol", mileage: 45000 },
    ]);
  }
};
// // --- add to src/lib/storage.ts (below existing exports) ---
// export type Booking = {
//   id: string;
//   userId?: string; // optional for demo
//   status: "upcoming" | "completed" | "cancelled";
//   provider: { id?: string; name: string; location?: string; phone?: string };
//   date: string; // ISO date string or simple date
//   time: string;
//   services: { id?:string; name: string; price: number; duration?: number; category?: string }[];
//   vehicle?: {
//     make?: string;
//     model?: string;
//     registrationNumber?: string;
//   };
//   total: number;
//   createdAt: string;
//   updatedAt?: string;
//   cancelledAt?: string;
// };

export const getBookings = (): Booking[] => ls.get<Booking[]>("bookings", []);
export const addBooking = (b: Booking) => {
  const list = getBookings();
  list.unshift(b);
  ls.set("bookings", list);
  return b;
};
export const updateBooking = (id: string, patch: Partial<Booking>) => {
  const list = getBookings().map((bk) => (bk.id === id ? { ...bk, ...patch, updatedAt: new Date().toISOString() } : bk));
  ls.set("bookings", list);
  return list.find((x) => x.id === id) ?? null;
};
