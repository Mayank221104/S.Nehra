import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { Stub } from "./dashboard.training";

export const Route = createFileRoute("/dashboard/settings")({
  component: () => <Stub title="Settings" icon={SettingsIcon} desc="Account, notifications, privacy, password, appearance, and account deletion." />,
});
