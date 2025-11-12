// src/features/providers/ProviderCard.tsx
import React from "react";
import { Provider } from "../../types";
import { ls } from "../../utils/ls";

export default function ProviderCard({ p }: { p: Provider }) {
  // compute rating from reviews
  const reviews = ls.get("reviews", []).filter((r:any)=>r.providerId === p.id && r.status === "approved");
  const avg = reviews.length ? (reviews.reduce((a:any,b:any)=>a+b.rating,0)/reviews.length) : 0;
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{p.name}</div>
          <div className="text-sm text-gray-500">{p.category} {p.approved ? "• Approved" : "• Pending"}</div>
        </div>
        <div className="text-right">
          <div className="font-semibold">{avg ? avg.toFixed(1) : "-"}</div>
          <div className="text-sm text-gray-500">{reviews.length} reviews</div>
        </div>
      </div>
    </div>
  );
}
