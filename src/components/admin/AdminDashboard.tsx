import React, { useMemo, useState } from "react";
import { ls, fmtINR } from "../../lib/storage";
import type { Payment, Provider, Review, User } from "../../lib/types";
import ModerationQueue from "../reviews/ModerationQueue";

function TinyBar({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  const w = 240, h = 60, gap = 6;
  const bw = (w - gap * (values.length - 1)) / values.length;

  // Use Tailwind colors or a consistent gradient
  const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#1d4ed8"];

  return (
    <svg width={w} height={h}>
      {values.map((v, i) => {
        const bh = (v / max) * (h - 10);
        const color = colors[i % colors.length];
        return (
          <rect
            key={i}
            x={i * (bw + gap)}
            y={h - bh}
            width={bw}
            height={bh}
            rx={6}
            ry={6}
            fill={color}
          />
        );
      })}
    </svg>
  );
}


export default function AdminDashboard() {
  const [users,setUsers] = useState<User[]>(() => ls.get("users", []));
  const [providers,setProviders] = useState<Provider[]>(() => ls.get("providers", []));
  const payments = ls.get<Payment[]>("payments", []);
  const reviews = ls.get<Review[]>("reviews", []);

  const totalRevenue = payments.filter(p => p.status==="success")
    .reduce((a,p)=>a + p.amount + Math.round((p.amount*p.taxRate)/100), 0);
  const approvedProviders = providers.filter(p => p.approved).length;
  const approvedReviews = reviews.filter(r => r.status==="approved").length;

  function toggleUserActive(id:string){
    const next = users.map(u => u.id===id ? { ...u, active: !u.active } : u);
    setUsers(next); ls.set("users", next);
  }
  function approveProvider(id:string, ok:boolean){
    const next = providers.map(p => p.id===id ? { ...p, approved: ok } : p);
    setProviders(next); ls.set("providers", next);
  }

  const byMonth = useMemo(() => {
    const buckets: Record<string,number> = {};
    payments.forEach(p => {
      const d = new Date(p.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
      const amt = p.amount + Math.round((p.amount*p.taxRate)/100);
      buckets[key] = (buckets[key]||0) + amt;
    });
    const keys = Object.keys(buckets).sort();
    return { keys, values: keys.map(k => buckets[k]) };
  }, [payments]);

  return (
    <div className="space-y-6">
      <ModerationQueue />

      <div className="grid md:grid-cols-4 gap-4">
        <div className="rounded-2xl border p-4 bg-white"><div className="text-sm text-gray-500">Revenue (lifetime)</div><div className="text-2xl font-semibold">{fmtINR(totalRevenue)}</div></div>
        <div className="rounded-2xl border p-4 bg-white"><div className="text-sm text-gray-500">Users</div><div className="text-2xl font-semibold">{users.length}</div></div>
        <div className="rounded-2xl border p-4 bg-white"><div className="text-sm text-gray-500">Providers (Approved)</div><div className="text-2xl font-semibold">{approvedProviders}/{providers.length}</div></div>
        <div className="rounded-2xl border p-4 bg-white"><div className="text-sm text-gray-500">Approved Reviews</div><div className="text-2xl font-semibold">{approvedReviews}</div></div>
      </div>

      <div className="rounded-2xl border p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">Revenue (by Month)</h3>
        {byMonth.keys.length === 0 ? (
          <p className="text-gray-500">No revenue data available</p>
        ) : (
          <table className="min-w-full text-sm border-t">
            <thead>
              <tr className="text-left border-b bg-gray-50">
                <th className="p-2">Month</th>
                <th className="p-2">Revenue (with GST)</th>
              </tr>
            </thead>
            <tbody>
              {byMonth.keys.map((k, i) => (
                <tr key={k} className="border-b">
                  <td className="p-2">{k}</td>
                  <td className="p-2 font-medium">{fmtINR(byMonth.values[i])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-4 bg-white">
          <h3 className="text-lg font-semibold mb-2">User Management</h3>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead><tr className="text-left">
                <th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Role</th><th className="p-2">Active</th><th className="p-2"></th>
              </tr></thead>
              <tbody>
                {users.map(u=>(
                  <tr key={u.id} className="border-t">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.role}</td>
                    <td className="p-2">{u.active ? "Yes":"No"}</td>
                    <td className="p-2"><button onClick={()=>toggleUserActive(u.id)} className="px-3 py-1 rounded-lg bg-neutral-800 text-white">{u.active?"Disable":"Enable"}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border p-4 bg-white">
          <h3 className="text-lg font-semibold mb-2">Provider Approvals</h3>
          <div className="space-y-2">
            {providers.map(p=>(
              <div key={p.id} className="border rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${p.approved?"bg-emerald-600 text-white":"bg-yellow-500"}`}>{p.approved?"Approved":"Pending"}</span>
                  <button onClick={()=>approveProvider(p.id,true)} className="px-3 py-1 rounded-lg bg-neutral-800 text-white">Approve</button>
                  <button onClick={()=>approveProvider(p.id,false)} className="px-3 py-1 rounded-lg bg-rose-600 text-white">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">Revenue Reports</h3>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left">
              <th className="p-2">Date</th><th className="p-2">Provider</th><th className="p-2">Method</th><th className="p-2">Status</th><th className="p-2">Total (incl. GST)</th>
            </tr></thead>
            <tbody>
              {ls.get<Payment[]>("payments", []).map(p=>{
                const provider = ls.get<Provider[]>("providers", []).find(x=>x.id===p.providerId);
                const total = p.amount + Math.round((p.amount*p.taxRate)/100);
                return (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{new Date(p.createdAt).toLocaleString()}</td>
                    <td className="p-2">{provider?.name ?? p.providerId}</td>
                    <td className="p-2">{p.method}</td>
                    <td className="p-2">{p.status}</td>
                    <td className="p-2">{fmtINR(total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
