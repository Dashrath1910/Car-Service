export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  providerId: string;
  reviewerName: string;
  rating: number; // 1..5
  comment: string;
  createdAt: string;
  status: ReviewStatus;
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

export type Provider = {
  id: string;
  name: string;
  category: string;
  approved: boolean;
  rating?: number;
  ratingsCount?: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "provider" | "admin";
  providerId?: string;
  active: boolean;
};

export type Payment = {
  id: string;
  providerId: string;
  userId: string;
  amount: number;   // before tax
  taxRate: number;  // e.g., 18
  status: "created" | "success" | "failed" | "refunded";
  method?: "razorpay" | "upi";
  ref?: string;
  createdAt: string;
};
