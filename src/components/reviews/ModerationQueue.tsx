import React, { useState } from "react";
import { ls } from "../../lib/storage";
import type { Review, ReviewStatus } from "../../lib/types";

export default function ModerationQueue() {
  const [_, force] = useState(0);
  const list = ls.get<Review[]>("reviews", []);
  const pending = list.filter(r => r.status==="pending");

  function update(id: string, status: ReviewStatus) {
    const updated = list.map(r => r.id===id ? { ...r, status } : r);
    ls.set("reviews", updated);
    force(v => v+1);
  }

  return (
    <div className="p-4 rounded-2xl border bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Moderation Queue</h3>
      {pending.length===0 ? <p className="text-sm text-gray-500">No reviews pending.</p> : (
        <div className="space-y-3">
          {pending.map(r => (
            <div key={r.id} className="p-3 rounded-xl border flex items-center justify-between gap-2">
              <div>
                <div className="font-semibold">{r.reviewerName}</div>
                <div className="text-sm text-gray-600">{r.comment}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>update(r.id,"approved")} className="px-3 py-1 rounded-lg bg-emerald-600 text-white">Approve</button>
                <button onClick={()=>update(r.id,"rejected")} className="px-3 py-1 rounded-lg bg-rose-600 text-white">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
