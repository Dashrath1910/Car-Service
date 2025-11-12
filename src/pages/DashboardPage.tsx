// src/pages/DashboardPage.tsx
import React from "react";
import { ls } from "@/lib/storage";
import { Provider } from "@/types";
import ProviderCard from "@/features/providers/ProviderCard";
import { currentUser } from "@/utils/auth";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const user = currentUser();
  const providers = ls.get<Provider[]>("providers", []);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-4">Welcome to AutoCare</h2>
        <p className="mb-6 text-gray-600">
          You are not logged in. Please{" "}
          <Link to="/auth/login" className="text-blue-600 underline">
            sign in
          </Link>{" "}
          or{" "}
          <Link to="/auth/register" className="text-blue-600 underline">
            create an account
          </Link>{" "}
          to view your dashboard.
        </p>
        {/* Optionally show public list of providers */}
        <div className="grid md:grid-cols-2 gap-6">
          {providers.map((p) => (
            <ProviderCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome back, {user.name}!</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {providers.map((p) => (
          <ProviderCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
