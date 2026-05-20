// Centralized API client for SSR-safe fetch with credentials
export const api = {
  get: async (url: string, opts: RequestInit = {}) => {
    const res = await fetch(url, { ...opts, credentials: "include" });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  post: async (url: string, data: any, opts: RequestInit = {}) => {
    const res = await fetch(url, {
      ...opts,
      method: "POST",
      headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  // Add put, delete, etc. as needed
};
