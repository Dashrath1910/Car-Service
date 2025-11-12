// src/components/Layout.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-500 text-white flex items-center justify-center font-bold">AA</div>
            <div className="font-bold text-lg">AutoCare</div>
          </div>
          <nav className="flex gap-3">
            <Link to="/" className="px-3 py-1">Home</Link>
            <Link to="/providers" className="px-3 py-1">Find Services</Link>
            <Link to="/dashboard" className="px-3 py-1 bg-blue-600 text-white rounded">Dashboard</Link>
            <Link to="/bookings" className="px-3 py-1">My Bookings</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      <footer className="text-center text-xs text-gray-500 py-6">© {new Date().getFullYear()} AutoCare</footer>
    </div>
  );
}
