import React, { useEffect, useState } from "react";
import { ls } from "../../lib/storage";
import type { Notification, NotificationChannel } from "../../lib/types";

export default function NotificationCenter() {
  const [list,setList] = useState<Notification[]>(() => ls.get("notifications", []));
  const [prefs,setPrefs] = useState<Record<NotificationChannel, boolean>>(
    () => ls.get("notif_prefs", { email:true, sms:false, whatsapp:false, inapp:true })
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (!prefs.inapp) return;
      const n: Notification = {
        id: crypto.randomUUID(),
        title: "Live update",
        body: "Your booking is being processed.",
        channel: "inapp",
        createdAt: new Date().toISOString(),
        read: false,
      };
      const next = [n, ...list];
      setList(next); ls.set("notifications", next);
    }, 20000);
    return () => clearInterval(id);
  }, [list, prefs.inapp]);

  function togglePref(c: NotificationChannel) {
    const next = { ...prefs, [c]: !prefs[c] };
    setPrefs(next); ls.set("notif_prefs", next);
  }
  function markAllRead() {
    const next = list.map(n => ({ ...n, read:true }));
    setList(next); ls.set("notifications", next);
  }
  // placeholders
  function sendSMS(to:string, body:string){ alert(`(Placeholder) SMS to ${to}: ${body}`); }
  function sendEmail(to:string, subject:string, body:string){ alert(`(Placeholder) Email to ${to}: ${subject}`); }
  function sendWhatsApp(to:string, body:string){ alert(`(Placeholder) WhatsApp to ${to}: ${body}`); }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-4 rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Notification Center</h3>
          <button onClick={markAllRead} className="px-3 py-1 rounded-lg bg-black text-white">Mark all read</button>
        </div>
        <div className="space-y-3 max-h-[420px] overflow-auto">
          {list.length===0 ? <p className="text-sm text-gray-500">No notifications yet.</p> :
            list.map(n => (
              <div key={n.id} className="p-3 rounded-xl border flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{n.title}</div>
                  <div className="text-sm text-gray-700">{n.body}</div>
                  <div className="text-xs text-gray-400 mt-1">{n.channel.toUpperCase()} • {new Date(n.createdAt).toLocaleString()}</div>
                </div>
                {!n.read && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">new</span>}
              </div>
            ))
          }
        </div>
      </div>

      <div className="p-4 rounded-2xl border bg-white shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Preferences & Integrations</h3>
        <div className="grid grid-cols-2 gap-3">
          {(["email","sms","whatsapp","inapp"] as NotificationChannel[]).map(c => (
            <label key={c} className="flex items-center gap-2 border rounded-xl p-2">
              <input type="checkbox" checked={!!prefs[c]} onChange={()=>togglePref(c)} />
              <span className="capitalize">{c}</span>
            </label>
          ))}
        </div>
        <div className="rounded-xl border p-3">
          <div className="font-medium mb-2">Send Test (placeholders)</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={()=>sendEmail("you@example.com","Test Email","Hello from AAH!")} className="px-3 py-1 rounded-lg bg-neutral-800 text-white">Email</button>
            <button onClick={()=>sendSMS("+91XXXXXXXXXX","Your service is booked.")} className="px-3 py-1 rounded-lg bg-neutral-800 text-white">SMS</button>
            <button onClick={()=>sendWhatsApp("+91XXXXXXXXXX","Your invoice is ready.")} className="px-3 py-1 rounded-lg bg-neutral-800 text-white">WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  );
}
