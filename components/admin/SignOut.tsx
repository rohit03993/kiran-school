"use client";

export function SignOut() {
  return (
    <button
      type="button"
      className="text-sm font-semibold text-maroon"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
      }}
    >
      Sign out
    </button>
  );
}
