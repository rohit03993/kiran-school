"use client";

import { useState } from "react";

type Item = { id: number; name: string; email: string; type: string; message: string; createdAt: string };

export function EnquiryList({ initial }: { initial: Item[] }) {
  const [items, setItems] = useState(initial);

  async function remove(id: number) {
    const response = await fetch("/api/admin/enquiries", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) setItems((current) => current.filter((item) => item.id !== id));
  }

  if (items.length === 0) {
    return <p className="mt-8 rounded-[24px] bg-white p-6 text-ink/70">No enquiries yet.</p>;
  }

  return (
    <div className="mt-8 space-y-4">
      {items.map((item) => (
        <article key={item.id} className="rounded-[24px] bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm text-maroon">
                {item.type} · {item.email}
              </p>
            </div>
            <button type="button" className="text-sm font-semibold text-maroon" onClick={() => remove(item.id)}>
              Delete
            </button>
          </div>
          {item.message ? <p className="mt-3 leading-6 text-ink/80">{item.message}</p> : null}
          <p className="mt-3 text-xs text-ink/50">{new Date(item.createdAt).toLocaleString()}</p>
        </article>
      ))}
    </div>
  );
}
