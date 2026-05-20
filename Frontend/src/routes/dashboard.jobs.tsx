import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { Stub } from "./dashboard.training";

export const Route = createFileRoute("/dashboard/jobs")({
  component: () => <Stub title="Job Applications" icon={Briefcase} desc="Applied jobs, pipeline status, interview rounds and recruiter notes." />,
});
