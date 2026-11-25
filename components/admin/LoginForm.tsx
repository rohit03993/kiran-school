"use client";

import { FormEvent, useState } from "react";
import { Logo } from "@/components/ui";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    setBusy(false);
    if (!response.ok) {
      setError(payload?.error || "Could not sign in.");
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <main className="grid min-h-screen place-items-center bg-mist px-5">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-card">
        <Logo />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-maroon">Admin sign in</h1>
        <p className="mt-2 text-sm text-ink/70">Edit the site section by section. This page is not part of the public menu.</p>
        <label className="mt-6 block text-sm font-semibold">
          Email
          <input
            type="email"
            autoComplete="username"
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 font-normal"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Password
          <input
            type="password"
            autoComplete="current-password"
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 font-normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error ? <p className="mt-4 text-sm font-medium text-maroon">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-maroon"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
