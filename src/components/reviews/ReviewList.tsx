import React from "react";
import { ls } from "../../lib/storage";
import type { Review, ReviewStatus } from "../../lib/types";
import StarRating from "../common/StarRating";

export default function ReviewList({ providerId, status = "approved" as ReviewStatus }) {
  const all = ls.get<Review[]>("reviews", []);
  const items = all.filter(r => r.providerId===providerId && r.status===status);
  if (items.length===0) return <p className="text-sm text-gray-500">No {status} reviews yet.</p>;

  return (
    <div className="space-y-3">
      {items.map(r => (
        <div key={r.id} className="p-3 rounded-xl border bg-white">
          <div className="flex justify-between items-center">
            <div className="font-semibold">{r.reviewerName}</div>
            <StarRating value={r.rating} />
          </div>
          <p className="mt-1 text-gray-700">{r.comment}</p>
          <div className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
