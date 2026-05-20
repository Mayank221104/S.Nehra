import { useState } from "react";

export function Toast({ message }: { message: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-ink text-primary-foreground px-4 py-2 shadow-lg">
      {message}
      <button className="ml-4" onClick={() => setOpen(false)} aria-label="Close">
        ×
      </button>
    </div>
  );
}
