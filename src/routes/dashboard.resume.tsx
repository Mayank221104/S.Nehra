import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { Stub } from "./dashboard.training";

export const Route = createFileRoute("/dashboard/resume")({
  component: () => <Stub title="Resume Builder" icon={FileText} desc="ATS score, editable sections, and a one-click PDF export." />,
});
