// src/utils/ls.ts
import { Provider, User, Review, Notification, Payment } from "../types";

const KEY = (k: string) => k;

export const ls = {
  get<T>(k: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(KEY(k));
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set<T>(k: string, value: T) {
    localStorage.setItem(KEY(k), JSON.stringify(value));
  },
};

export function seedIfEmpty() {
  const providers = ls.get<Provider[]>("providers", []);
  if (!providers.length) {
    ls.set("providers", [
      { id: "p1", name: "AutoFix Solutions", category: "Mechanic", approved: true },
      { id: "p2", name: "Premium Car Care", category: "Detailing", approved: true },
      { id: "p3", name: "SpeedyFix Auto Center", category: "Service", approved: false },
    ]);
  }

  const users = ls.get<User[]>("users", []);
  if (!users.length) {
    ls.set("users", [
      { id: "u1", name: "Demo Customer", email: "demo@customer", role: "customer", active: true },
      { id: "u2", name: "Demo Provider", email: "provider@demo", role: "provider", active: true },
      { id: "u3", name: "Admin", email: "admin@demo", role: "admin", active: true },
    ]);
  }

  const reviews = ls.get<Review[]>("reviews", []);
  if (!reviews.length) {
    const now = new Date().toISOString();
    ls.set("reviews", [
      { id: "r1", providerId: "p1", reviewerName: "Riya", rating: 5, comment: "Great!", createdAt: now, status: "approved" },
      { id: "r2", providerId: "p1", reviewerName: "Amit", rating: 4, comment: "Quick service.", createdAt: now, status: "approved" },
      { id: "r3", providerId: "p3", reviewerName: "Neha", rating: 3, comment: "Pending review", createdAt: now, status: "pending" },
    ]);
  }

  const notifications = ls.get<Notification[]>("notifications", []);
  if (!notifications.length) {
    ls.set("notifications", [
      { id: "n1", title: "Welcome", body: "Demo app", channel: "inapp", createdAt: new Date().toISOString(), read: false },
    ]);
  }

  const payments = ls.get<Payment[]>("payments", []);
  if (!payments.length) {
    ls.set("payments", [
      { id: "pay1", providerId: "p1", userId: "u1", amount: 1200, taxRate: 18, status: "success", method: "razorpay", ref: "RZP123", createdAt: new Date().toISOString() },
    ]);
  }
}
