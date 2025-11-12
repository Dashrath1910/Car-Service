import React from "react";
import { ls } from "../utils/ls";
import type { Provider } from "../lib/types";
import ReviewList from "../components/reviews/ReviewList";
import ReviewForm from "../components/reviews/ReviewForm";
import StarRating from "../components/common/StarRating";
import ProviderCard from "@/features/providers/ProviderCard";
// src/pages/ProvidersPage.tsx
// import { ls } from "../utils/ls";


export default function ProvidersPage(){
  const providers = ls.get("providers", []);
  return <div>
    <h2 className="text-xl font-semibold mb-4">All Providers</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {providers.map((p:any) => <ProviderCard key={p.id} p={p} />)}
    </div>
  </div>;
}
