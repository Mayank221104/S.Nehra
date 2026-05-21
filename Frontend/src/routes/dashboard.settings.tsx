import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSession } from "@/lib/session";
import { useNavigate } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { Lock, Bell, Shield, Trash2, Eye, EyeOff, Check, Loader2, Moon, Sun } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  component: Settings,
});

function Settings() {
  const { user, refetch } = useSession();
  const navigate = useNavigate();

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    updates: true,
  });

  // Delete account
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Passwords don't match" });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "Min 8 characters required" });
      return;
    }
    setPasswordLoading(true);
    setPasswordMsg(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPasswordMsg({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordMsg({ type: "error", text: err.message });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== user?.email) return;
    setDeleteLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/delete-account`, {
        method: "DELETE",
        credentials: "include",
      });
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
      navigate({ to: "/" });
    } catch {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Reveal>
        <div>
          <div className="eyebrow">Settings</div>
          <h1 className="mt-3 font-display text-display-md text-ink">Account Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account, security and preferences.
          </p>
        </div>
      </Reveal>

      {/* Password Change */}
      <Reveal delay={0.05}>
        <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Lock className="h-5 w-5 text-ink" />
            </div>
            <div>
              <h2 className="font-display text-xl text-ink">Change Password</h2>
              <p className="text-xs text-muted-foreground">
                Update your password regularly for security
              </p>
            </div>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Current Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                  className="w-full rounded-[12px] border border-border bg-background px-4 py-3 pr-10 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
                >
                  {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                New Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
                required
                className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Confirm New Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            {passwordMsg && (
              <p
                className={`text-sm ${passwordMsg.type === "success" ? "text-green-600" : "text-destructive"}`}
              >
                {passwordMsg.type === "success" && <Check className="inline h-4 w-4 mr-1" />}
                {passwordMsg.text}
              </p>
            )}
            <button
              type="submit"
              disabled={passwordLoading}
              className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 disabled:opacity-50"
            >
              {passwordLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </Reveal>

      {/* Notifications */}
      <Reveal delay={0.1}>
        <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Bell className="h-5 w-5 text-ink" />
            </div>
            <div>
              <h2 className="font-display text-xl text-ink">Notifications</h2>
              <p className="text-xs text-muted-foreground">Choose how you want to be notified</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                key: "email",
                label: "Email notifications",
                desc: "Placement updates, interview reminders",
              },
              { key: "sms", label: "SMS notifications", desc: "Important alerts via text message" },
              { key: "updates", label: "Product updates", desc: "New features and announcements" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-ink">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof prev],
                    }))
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? "bg-ink" : "bg-border"}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Account Info */}
      <Reveal delay={0.15}>
        <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Shield className="h-5 w-5 text-ink" />
            </div>
            <div>
              <h2 className="font-display text-xl text-ink">Account Info</h2>
              <p className="text-xs text-muted-foreground">Your account details</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-[14px] bg-muted/50 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Email
              </span>
              <span className="text-sm text-ink">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between rounded-[14px] bg-muted/50 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Role
              </span>
              <span className="text-sm text-ink capitalize">{user?.role?.toLowerCase()}</span>
            </div>
            <div className="flex items-center justify-between rounded-[14px] bg-muted/50 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Account Status
              </span>
              <span className="flex items-center gap-1.5 text-sm text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Active
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Danger Zone */}
      <Reveal delay={0.2}>
        <div className="rounded-[24px] border border-destructive/20 bg-destructive/5 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="font-display text-xl text-ink">Delete Account</h2>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            This action cannot be undone. Type your email{" "}
            <span className="font-medium text-ink">{user?.email}</span> to confirm.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder={user?.email}
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              className="w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirm !== user?.email || deleteLoading}
              className="inline-flex items-center gap-2 rounded-[14px] bg-destructive px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-destructive/90 disabled:opacity-40"
            >
              {deleteLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              {deleteLoading ? "Deleting..." : "Delete My Account"}
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
