"use client";

import { useState } from "react";
import type { Field } from "@/lib/admin-sections";

type Value = Record<string, unknown>;

function blankItem(fields: Field[]): Value {
  const item: Value = {};
  for (const field of fields) {
    if (field.type === "list" || field.type === "lines") item[field.name] = [];
    else if (field.type === "select") item[field.name] = field.options[0];
    else item[field.name] = "";
  }
  return item;
}

function setAt(source: unknown, path: (string | number)[], next: unknown): unknown {
  if (path.length === 0) return next;
  const [head, ...rest] = path;
  if (Array.isArray(source)) {
    return source.map((item, index) => (index === head ? setAt(item, rest, next) : item));
  }
  const record = (source && typeof source === "object" ? source : {}) as Value;
  return { ...record, [String(head)]: setAt(record[String(head)], rest, next) };
}

function FieldControl({
  field,
  value,
  path,
  onChange,
}: {
  field: Field;
  value: unknown;
  path: (string | number)[];
  onChange: (path: (string | number)[], next: unknown) => void;
}) {
  const label = <span className="text-sm font-semibold text-ink">{field.label}</span>;

  if (field.type === "lines") {
    const lines = Array.isArray(value) ? value.map(String) : [];
    return (
      <label className="block">
        {label}
        {field.hint ? <span className="mt-1 block text-xs text-ink/55">{field.hint}</span> : null}
        <textarea
          className="mt-2 min-h-28 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
          value={lines.join("\n")}
          onChange={(event) => onChange(path, event.target.value.split("\n"))}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="block">
        {label}
        <select
          className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
          value={String(value ?? field.options[0])}
          onChange={(event) => onChange(path, event.target.value)}
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option === "maroon" ? "Green" : option === "gold" ? "Yellow" : "Photo"}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "image") {
    return (
      <ImageField label={field.label} value={String(value ?? "")} onChange={(next) => onChange(path, next)} />
    );
  }

  if (field.type === "list") {
    const items = Array.isArray(value) ? (value as Value[]) : [];
    return (
      <div className="rounded-[24px] border border-black/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-maroon">{field.label}</p>
          <button
            type="button"
            className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-maroon"
            onClick={() => onChange(path, [...items, blankItem(field.fields)])}
          >
            Add {field.itemLabel.toLowerCase()}
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {items.map((item, index) => (
            <div key={index} className="rounded-2xl bg-mist p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold">
                  {field.itemLabel} {index + 1}
                </p>
                <button
                  type="button"
                  className="text-sm font-semibold text-maroon"
                  onClick={() => onChange(path, items.filter((_, itemIndex) => itemIndex !== index))}
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-4">
                {field.fields.map((child) => (
                  <FieldControl
                    key={child.name}
                    field={child}
                    value={item?.[child.name]}
                    path={[...path, index, child.name]}
                    onChange={onChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const long = field.type === "textarea";
  return (
    <label className="block">
      {label}
      {long ? (
        <textarea
          className="mt-2 min-h-28 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
          value={String(value ?? "")}
          onChange={(event) => onChange(path, event.target.value)}
        />
      ) : (
        <input
          className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
          value={String(value ?? "")}
          onChange={(event) => onChange(path, event.target.value)}
        />
      )}
    </label>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (next: string) => void }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    setError("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const payload = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
    setBusy(false);
    if (!response.ok || !payload?.url) {
      setError(payload?.error || "Upload failed.");
      return;
    }
    onChange(payload.url);
  }

  return (
    <div>
      <p className="text-sm font-semibold text-ink">{label}</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-20 w-28 rounded-xl object-cover" />
        ) : (
          <div className="grid h-20 w-28 place-items-center rounded-xl bg-mist text-xs text-ink/50">No photo</div>
        )}
        <label className="inline-flex cursor-pointer rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white">
          {busy ? "Uploading…" : "Upload photo"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) upload(file);
            }}
          />
        </label>
      </div>
      {error ? <p className="mt-2 text-sm text-maroon">{error}</p> : null}
    </div>
  );
}

export function SectionForm({
  sectionKey,
  fields,
  initial,
}: {
  sectionKey: string;
  fields: Field[];
  initial: Value;
}) {
  const [value, setValue] = useState<Value>(initial);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function onChange(path: (string | number)[], next: unknown) {
    setValue((current) => setAt(current, path, next) as Value);
    setStatus("");
  }

  async function save() {
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ key: sectionKey, value }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    setSaving(false);
    setStatus(response.ok ? "Saved. Refresh the public page to see it." : payload?.error || "Could not save.");
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      {fields.map((field) => (
        <FieldControl key={field.name} field={field} value={value[field.name]} path={[field.name]} onChange={onChange} />
      ))}
      <div className="flex items-center gap-4">
        <button type="submit" className="rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-maroon" disabled={saving}>
          {saving ? "Saving…" : "Save section"}
        </button>
        {status ? <p className="text-sm font-medium text-maroon">{status}</p> : null}
      </div>
    </form>
  );
}
