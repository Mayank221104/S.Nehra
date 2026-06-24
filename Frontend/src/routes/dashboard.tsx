import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — S.Nehra" }] }),
  beforeLoad: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, { credentials: "include",
        headers: { 
          "Content-Type": "application/json", 
          // Add this line below to match your login structure!
          "Authorization": `Bearer ${localStorage.getItem("paymentToken")}`
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
