"use client";

import { FormEvent, useState } from "react";
import { enquiryTypes } from "@/lib/data";

export function EnquiryForm({
  tone = "panel",
  id = "enquiry",
  emailTo,
}: {
  tone?: "panel" | "plain";
  id?: string;
  emailTo: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !type) {
      setError("Add your name, email, and the type of enquiry.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter an email address that looks complete.");
      return;
    }
    setError("");
    await fetch("/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, type, message }),
    });
    setSent(true);
  }

  if (sent) {
    const mailto = `mailto:${emailTo}?subject=${encodeURIComponent(
      `${type} from ${name}`,
    )}&body=${encodeURIComponent(`${message}\n\n${name}\n${email}`)}`;

    return (
      <div className="rounded-3xl bg-white p-6 text-ink" id={id}>
        <h3 className="text-xl font-semibold">Enquiry received</h3>
        <p className="mt-2 text-sm leading-6 text-ink/75">
          A copy is saved for the admin. You can also open your email app and send it directly.
        </p>
        <a
          href={mailto}
          className="mt-5 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-maroon"
        >
          Email this enquiry
        </a>
      </div>
    );
  }

  const label = tone === "panel" ? "text-white" : "text-ink";
  const field =
    "mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-ink outline-none";

  return (
    <form id={id} onSubmit={onSubmit} className="grid scroll-mt-32 gap-4" noValidate>
      <label className={`text-sm font-medium ${label}`}>
        Name
        <input
          className={field}
          name="name"
          autoComplete="name"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className={`text-sm font-medium ${label}`}>
        Type of enquiry
        <select
          className={field}
          name="type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="">Choose</option>
          {enquiryTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className={`text-sm font-medium ${label}`}>
        Email
        <input
          className={field}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      {tone === "plain" ? (
        <label className={`text-sm font-medium ${label}`}>
          Message
          <textarea
            className={`${field} min-h-32 resize-y`}
            name="message"
            placeholder="Which class are you asking about?"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>
      ) : null}
      {error ? (
        <p className={`text-sm font-medium ${tone === "panel" ? "text-gold" : "text-maroon"}`} role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="justify-self-start rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-maroon"
      >
        Submit
      </button>
    </form>
  );
}
