import React, { useState } from "react";
import { ls } from "../../lib/storage";
import type { Review } from "../../lib/types";
import StarRating from "../common/StarRating";

export default function ReviewForm({ providerId, onSubmitted }:{ providerId:string; onSubmitted:()=>void }) {
  const [name,setName] = useState("");
  const [rating,setRating] = useState(5);
  const [comment,setComment] = useState("");

  function submit() {
    if (!name.trim() || !comment.trim()) return alert("Please enter your name and comment.");
    const r: Review = {
      id: crypto.randomUUID(),
      providerId,
      reviewerName: name.trim(),
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    const list = ls.get<Review[]>("reviews", []);
    list.push(r); ls.set("reviews", list);
    setName(""); setRating(5); setComment("");
    onSubmitted(); alert("Review submitted! It will show after approval.");
  }

  return (
    <div className="p-4 rounded-2xl border bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Your Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded-xl p-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Rating</label>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <div>
          <label className="text-sm font-medium">Comment</label>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} className="mt-1 w-full border rounded-xl p-2" rows={3}/>
        </div>
        <button onClick={submit} className="px-4 py-2 rounded-xl bg-black text-white">Submit</button>
      </div>
    </div>
  );
}
