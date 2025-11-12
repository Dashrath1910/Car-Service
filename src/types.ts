// src/types.ts
export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  providerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: ReviewStatus;
};

export type Provider = {
  id: string;
  name: string;
  category: string;
  approved: boolean;
};

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "customer" | "provider" | "admin";
  active: boolean;
};

export type NotificationChannel = "email" | "sms" | "whatsapp" | "inapp";

export type Notification = {
  id: string;
  title: string;
  body: string;
  channel: NotificationChannel;
  createdAt: string;
  read: boolean;
};

export type Payment = {
  id: string;
  providerId: string;
  userId: string;
  amount: number;
  taxRate: number;
  status: "created" | "success" | "failed" | "refunded";
  method?: "razorpay" | "upi";
  ref?: string;
  createdAt: string;
};
