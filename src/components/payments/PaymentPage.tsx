import React, { useState } from "react";
import { ls, fmtINR } from "../../lib/storage";
import type { Payment, Provider, User } from "../../lib/types";

export default function PaymentPage() {
  const [amount,setAmount] = useState(1500);
  const [taxRate,setTaxRate] = useState(18);
  const [method,setMethod] = useState<"razorpay"|"upi">("razorpay");
  const [providerId,setProviderId] = useState("p1");
  const users = ls.get<User[]>("users", []);
  const currentUser = users[0];

  const subtotal = amount;
  const tax = Math.round((subtotal*taxRate)/100);
  const total = subtotal + tax;

  function createPayment(status: Payment["status"], ref?: string) {
    const p: Payment = {
      id: crypto.randomUUID(),
      providerId,
      userId: currentUser.id,
      amount: subtotal,
      taxRate,
      status,
      method,
      ref,
      createdAt: new Date().toISOString(),
    };
    const list = ls.get<Payment[]>("payments", []);
    list.unshift(p); ls.set("payments", list);
    alert(`Payment ${status}${ref?` (ref: ${ref})`: ""}`);
  }

  function payNow() {
    if (method==="razorpay") {
      // requires adding Razorpay checkout.js script in index.html
      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) { alert("Razorpay SDK not found. Add <script src='https://checkout.razorpay.com/v1/checkout.js'></script> to index.html"); return; }
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: total*100,
        currency: "INR",
        name: "Ahmedabad Auto Hub",
        description: "Service Payment",
        handler: (resp:any) => createPayment("success", resp.razorpay_payment_id),
        modal: { ondismiss: () => createPayment("failed") },
        prefill: { name: currentUser.name, email: currentUser.email },
        notes: { providerId },
      };
      const rzp = new Razorpay(options);
      rzp.open();
    } else {
      const ref = `UPI_${Date.now()}`;
      createPayment("success", ref);
    }
  }

  function printInvoice(p: Payment) {
    const provider = ls.get<Provider[]>("providers", []).find(x => x.id===p.providerId);
    const win = window.open("", "_blank"); if (!win) return;
    const gst = Math.round((p.amount*p.taxRate)/100); const grand = p.amount + gst;
    win.document.write(`
      <html><head><title>Invoice ${p.id}</title>
      <style>body{font-family:Arial;padding:24px}.card{border:1px solid #ddd;padding:16px;border-radius:12px}.row{display:flex;justify-content:space-between;margin:6px 0}.muted{color:#666}</style>
      </head><body>
        <h2>Ahmedabad Auto Hub — Tax Invoice</h2>
        <div class="muted">Invoice ID: ${p.id}</div>
        <div class="muted">Date: ${new Date(p.createdAt).toLocaleString()}</div>
        <div class="card" style="margin-top:12px">
          <div class="row"><strong>Billed To</strong><span>${p.userId}</span></div>
          <div class="row"><strong>Provider</strong><span>${provider?.name ?? p.providerId}</span></div>
          <div class="row"><strong>Service Amount</strong><span>${fmtINR(p.amount)}</span></div>
          <div class="row"><strong>GST (${p.taxRate}%)</strong><span>${fmtINR(gst)}</span></div>
          <div class="row"><strong>Total</strong><span>${fmtINR(grand)}</span></div>
          <div class="row"><strong>Status</strong><span>${p.status}</span></div>
          <div class="row"><strong>Reference</strong><span>${p.ref ?? "—"}</span></div>
        </div>
        <p class="muted">* This is a system-generated invoice.</p>
        <script>window.print();</script>
      </body></html>
    `);
    win.document.close();
  }

  const payments = ls.get<Payment[]>("payments", []);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="p-4 rounded-2xl border bg-white shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Pay a Provider</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="font-medium">Provider</span>
            <select value={providerId} onChange={e=>setProviderId(e.target.value)} className="mt-1 w-full border rounded-xl p-2">
              {ls.get<Provider[]>("providers", []).filter(p=>p.approved).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="font-medium">Amount (excl. GST)</span>
            <input type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value||"0",10))} className="mt-1 w-full border rounded-xl p-2" />
          </label>
          <label className="text-sm">
            <span className="font-medium">GST %</span>
            <input type="number" value={taxRate} onChange={e=>setTaxRate(parseInt(e.target.value||"0",10))} className="mt-1 w-full border rounded-xl p-2" />
          </label>
          <label className="text-sm">
            <span className="font-medium">Method</span>
            <select value={method} onChange={e=>setMethod(e.target.value as any)} className="mt-1 w-full border rounded-xl p-2">
              <option value="razorpay">Razorpay (Card/UPI)</option>
              <option value="upi">UPI Intent (demo)</option>
            </select>
          </label>
        </div>
        <div className="rounded-xl border p-3">
          <div className="flex justify-between"><span>Subtotal</span><span>{fmtINR(subtotal)}</span></div>
          <div className="flex justify-between"><span>GST ({taxRate}%)</span><span>{fmtINR(tax)}</span></div>
          <div className="flex justify-between font-semibold text-lg mt-1"><span>Total</span><span>{fmtINR(total)}</span></div>
        </div>
        <button onClick={payNow} className="px-4 py-2 rounded-xl bg-black text-white">Pay Now</button>
        <p className="text-xs text-gray-500">For Razorpay, add the checkout.js script to <code>index.html</code> and set your key.</p>
      </div>

      <div className="p-4 rounded-2xl border bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Payment History</h3>
        <div className="space-y-2 max-h-[420px] overflow-auto">
          {payments.length===0 ? <p className="text-sm text-gray-500">No payments yet.</p> :
            payments.map(p => {
              const total = p.amount + Math.round((p.amount*p.taxRate)/100);
              return (
                <div key={p.id} className="border rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-medium">{p.method?.toUpperCase() ?? "—"} • {p.status}</div>
                    <div className="text-sm text-gray-600">{new Date(p.createdAt).toLocaleString()} • Ref: {p.ref ?? "—"}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{fmtINR(total)}</div>
                    <button onClick={()=>printInvoice(p)} className="text-sm underline">Invoice</button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
