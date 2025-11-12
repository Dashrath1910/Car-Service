// src/pages/AdminPage.tsx
import React, { Suspense, lazy, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { currentUser } from "@/utils/auth";
import { Sidebar } from "@/components/ui/sidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";

// lazy import the heavy admin dashboard (code-splitting)

export default function AdminPage() {
  // Optionally block non-admin users
//   const user = currentUser();
//   useEffect(() => {
//     // Optional: redirect or show message if not admin (you can customize)
//     // if (!user || user.role !== "admin") { /* redirect to /auth/login or show message */ }
//   }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar / Havebar (left column) */}
        {/* <aside className="hidden lg:block w-64">
          <Sidebar />
        </aside> */}

        {/* Main content */}
        <main className="flex-1">
          <Suspense fallback={<div className="p-6 rounded-lg bg-white shadow">Loading admin dashboard…</div>}>
            <AdminDashboard />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
}
