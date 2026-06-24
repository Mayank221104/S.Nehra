import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

   // Helper to extract cookies in both SSR and Client environments
function getCookie(name: string, ctx?: any): string | undefined {
  if (typeof window !== "undefined") {
    // Client side
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  } else if (ctx?.request?.headers) {
    // Server side (TanStack Start context)
    const cookieHeader = ctx.request.headers.get("cookie") || "";
    const value = `; ${cookieHeader}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }
  return undefined;
}

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — S.Nehra" }] }),
  beforeLoad: async (ctx) => {

    // Retrieve the token dynamically based on environment
    const token = getCookie("paymentToken", ctx);

    if (!token) {
      throw redirect({ to: "/login" });
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, { credentials: "include",
        headers: { 
          "Content-Type": "application/json", 
          // Add this line below to match your login structure!
          "Authorization": `Bearer ${token}`
        }
       });
      if (!res.ok) throw redirect({ to: "/login" });
    } catch (e: any) {
      if (e?.isRedirect) throw e;
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardLayout,
});
