import React from "react";

type Tab = { id: string; label: string };
const tabs: Tab[] = [
  { id: "providers", label: "Providers" },
  { id: "notifications", label: "Notifications" },
  { id: "payments", label: "Payments" },
  { id: "admin", label: "Admin" },
];

export default function AppExtrasNav() {
  const params = new URLSearchParams(location.search);
  const page = params.get("page") || "";

  function go(id: string) {
    const p = new URLSearchParams(location.search);
    p.set("page", id);
    history.pushState(null, "", "?" + p.toString());
    window.dispatchEvent(new Event("popstate"));
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => go(t.id)}
          className={`px-3 py-1.5 rounded-xl border ${page===t.id ? "bg-black text-white":"bg-white"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
