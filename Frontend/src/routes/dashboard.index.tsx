import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useSession } from "@/lib/session";
import {
  User,
  Mail,
  Phone,
  Linkedin,
  Globe,
  MapPin,
  Pencil,
  Check,
  X,
  FileText,
  ExternalLink,
  Loader2,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/dashboard/")({
  component: Profile,
});

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  bio: string;
  skills: string[];
  resumeUrl: string | null;
  avatarUrl: string | null;
  cohort: string;
  track: string;
}

function completionScore(p: ProfileData) {
  const checks = [
    !!p.name,
    !!p.email,
    !!p.phone,
    !!p.location,
    !!p.linkedin,
    !!p.portfolio,
    !!p.bio,
    p.skills.length >= 3,
    !!p.resumeUrl,
    !!p.avatarUrl,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

const completionItems = [
  { key: "name", label: "Full name" },
  { key: "email", label: "Email address" },
  { key: "phone", label: "Phone number" },
  { key: "location", label: "Location" },
  { key: "linkedin", label: "LinkedIn URL" },
  { key: "portfolio", label: "Portfolio / website" },
  { key: "bio", label: "Short bio" },
  { key: "skills3", label: "3+ skills added" },
  { key: "resume", label: "Resume uploaded" },
  { key: "avatar", label: "Profile photo" },
];

function EditField({
  label,
  value,
  icon: Icon,
  placeholder = "—",
  multiline = false,
  onSave,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  placeholder?: string;
  multiline?: boolean;
  onSave: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null);

  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  const commit = () => {
    onSave(draft);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div className="group flex items-start gap-4 py-4">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
        {editing ? (
          <div className="mt-1 flex items-start gap-2">
            {multiline ? (
              <textarea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                value={draft}
                rows={3}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    commit();
                  }
                  if (e.key === "Escape") cancel();
                }}
                className="w-full resize-none rounded-[10px] border border-border bg-transparent px-3 py-2 text-sm text-ink outline-none ring-1 ring-ink/20 focus:ring-ink"
              />
            ) : (
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commit();
                  if (e.key === "Escape") cancel();
                }}
                className="w-full rounded-[10px] border border-border bg-transparent px-3 py-2 text-sm text-ink outline-none ring-1 ring-ink/20 focus:ring-ink"
              />
            )}
            <button
              onClick={commit}
              className="mt-0.5 rounded-full bg-ink p-1.5 text-primary-foreground hover:bg-ink/90"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={cancel}
              className="mt-0.5 rounded-full bg-muted p-1.5 text-muted-foreground hover:bg-muted/80"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="mt-0.5 flex items-center gap-2">
            <span className={`text-sm ${value ? "text-ink" : "text-muted-foreground/50 italic"}`}>
              {value || placeholder}
            </span>
            <button
              onClick={() => {
                setDraft(value);
                setEditing(true);
              }}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Pencil className="h-3 w-3 text-muted-foreground hover:text-ink" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillsEditor({ skills, onChange }: { skills: string[]; onChange: (s: string[]) => void }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (adding) inputRef.current?.focus();
  }, [adding]);

  const add = () => {
    const trimmed = draft.trim();
    if (trimmed && !skills.includes(trimmed)) onChange([...skills, trimmed]);
    setDraft("");
    setAdding(false);
  };
  const remove = (s: string) => onChange(skills.filter((x) => x !== s));

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <span
          key={s}
          className="group flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs text-ink"
        >
          {s}
          <button
            onClick={() => remove(s)}
            className="opacity-0 transition-opacity group-hover:opacity-60 hover:!opacity-100"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {adding ? (
        <div className="flex items-center gap-1">
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") add();
              if (e.key === "Escape") {
                setAdding(false);
                setDraft("");
              }
            }}
            placeholder="e.g. Cold Calling"
            className="w-36 rounded-full border border-ink/30 bg-transparent px-3 py-1 text-xs text-ink outline-none ring-1 ring-ink/20 focus:ring-ink"
          />
          <button onClick={add} className="rounded-full bg-ink p-1 text-primary-foreground">
            <Check className="h-3 w-3" />
          </button>
          <button
            onClick={() => {
              setAdding(false);
              setDraft("");
            }}
            className="rounded-full bg-muted p-1"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground hover:border-ink hover:text-ink transition-colors"
        >
          <Plus className="h-3 w-3" /> Add skill
        </button>
      )}
    </div>
  );
}

function AvatarUpload({
  name,
  avatarUrl,
  onUpload,
}: {
  name: string;
  avatarUrl: string | null;
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const initials =
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/avatar`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data.avatarUrl) onUpload(data.avatarUrl);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="group relative h-20 w-20 cursor-pointer"
      onClick={() => !uploading && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="h-20 w-20 rounded-full object-cover ring-4 ring-surface"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink text-2xl font-display font-medium text-primary-foreground ring-4 ring-surface">
          {initials}
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        ) : (
          <Pencil className="h-4 w-4 text-white" />
        )}
      </div>
    </div>
  );
}

function Profile() {
  const { user } = useSession();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<ProfileData>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    bio: "",
    skills: [],
    resumeUrl: null,
    avatarUrl: null,
    cohort: "Cohort 14",
    track: "Sales Excellence",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setProfile((p) => ({
            ...p,
            phone: data.phone ?? "",
            location: data.location ?? "",
            linkedin: data.linkedinUrl ?? "",
            portfolio: data.portfolioUrl ?? "",
            bio: data.bio ?? "",
            skills: data.skills ?? [],
            resumeUrl: data.resumeUrl ?? null,
            avatarUrl: data.avatarUrl ?? null,
          }));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (key: keyof ProfileData, value: any) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const saveProfile = async () => {
    setSaving(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: profile.phone,
          location: profile.location,
          linkedinUrl: profile.linkedin,
          portfolioUrl: profile.portfolio,
          bio: profile.bio,
          skills: profile.skills,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const score = completionScore(profile);
  const completionChecks: Record<string, boolean> = {
    name: !!profile.name,
    email: !!profile.email,
    phone: !!profile.phone,
    location: !!profile.location,
    linkedin: !!profile.linkedin,
    portfolio: !!profile.portfolio,
    bio: !!profile.bio,
    skills3: profile.skills.length >= 3,
    resume: !!profile.resumeUrl,
    avatar: !!profile.avatarUrl,
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">
              {profile.cohort} · {profile.track}
            </div>
            <h1 className="mt-3 font-display text-display-md text-ink">Your Profile</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep this complete — recruiters review it before interviews.
            </p>
          </div>
          <button
            onClick={saveProfile}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              <Check className="h-4 w-4 text-gold" />
            ) : null}
            {saved ? "Saved!" : "Save changes"}
          </button>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Reveal>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
              <div className="flex items-start gap-6">
                <AvatarUpload
                  name={profile.name}
                  avatarUrl={profile.avatarUrl}
                  onUpload={(url) => update("avatarUrl", url)}
                />
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-2xl text-ink">{profile.name || "Your Name"}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {profile.track} · {profile.cohort}
                  </p>
                  {profile.bio && (
                    <p className="mt-3 text-sm text-ink/70 leading-relaxed line-clamp-2">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
              <h2 className="font-display text-2xl text-ink">Personal details</h2>
              <div className="mt-2 divide-y divide-[oklch(0_0_0/0.06)]">
                <EditField
                  label="Full name"
                  value={profile.name}
                  icon={User}
                  placeholder="Jane Sharma"
                  onSave={(v) => update("name", v)}
                />
                <EditField
                  label="Email"
                  value={profile.email}
                  icon={Mail}
                  placeholder="jane@example.com"
                  onSave={(v) => update("email", v)}
                />
                <EditField
                  label="Phone"
                  value={profile.phone}
                  icon={Phone}
                  placeholder="+91 98765 43210"
                  onSave={(v) => update("phone", v)}
                />
                <EditField
                  label="Location"
                  value={profile.location}
                  icon={MapPin}
                  placeholder="Mumbai, Maharashtra"
                  onSave={(v) => update("location", v)}
                />
                <EditField
                  label="LinkedIn"
                  value={profile.linkedin}
                  icon={Linkedin}
                  placeholder="linkedin.com/in/jane"
                  onSave={(v) => update("linkedin", v)}
                />
                <EditField
                  label="Portfolio"
                  value={profile.portfolio}
                  icon={Globe}
                  placeholder="jane.dev"
                  onSave={(v) => update("portfolio", v)}
                />
                <EditField
                  label="Short bio"
                  value={profile.bio}
                  icon={Pencil}
                  placeholder="Write 2–3 lines about yourself…"
                  multiline
                  onSave={(v) => update("bio", v)}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl text-ink">Skills</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add at least 3 — shown on your recruiter profile.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{profile.skills.length} added</span>
              </div>
              <div className="mt-6">
                <SkillsEditor skills={profile.skills} onChange={(s) => update("skills", s)} />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.05}>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-ink p-8 text-primary-foreground shadow-soft">
              <div className="eyebrow text-primary-foreground/60">Profile strength</div>
              <div className="mt-4 flex items-end gap-2">
                <div className="font-display text-5xl text-gold">{score}%</div>
                <div className="mb-1.5 text-xs text-primary-foreground/50">complete</div>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-700"
                  style={{ width: `${score}%` }}
                />
              </div>
              <ul className="mt-6 space-y-2.5">
                {completionItems.map((item) => {
                  const done = completionChecks[item.key];
                  return (
                    <li key={item.key} className="flex items-center gap-2.5 text-xs">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${done ? "bg-gold" : "bg-white/20"}`}
                      />
                      <span
                        className={
                          done
                            ? "text-primary-foreground/80"
                            : "text-primary-foreground/40 line-through"
                        }
                      >
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-ink">Resume</h2>
                <FileText className="h-5 w-5 text-gold" />
              </div>
              {profile.resumeUrl ? (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 rounded-[14px] bg-muted px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100">
                      <FileText className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-ink truncate">resume.pdf</div>
                      <div className="text-xs text-muted-foreground">Uploaded</div>
                    </div>
                  </div>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-[14px] border border-border px-4 py-2.5 text-sm transition-colors hover:bg-muted"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> View resume
                  </a>
                  <a
                    href="/dashboard/resume"
                    className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-ink px-4 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-ink/90"
                  >
                    Replace resume <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-muted-foreground">No resume uploaded yet.</p>
                  <a
                    href="/dashboard/resume"
                    className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-ink px-4 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-ink/90"
                  >
                    Upload resume <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          </Reveal>

          {(profile.linkedin || profile.portfolio) && (
            <Reveal delay={0.15}>
              <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
                <h2 className="font-display text-2xl text-ink">Links</h2>
                <div className="mt-4 space-y-3">
                  {profile.linkedin && (
                    <a
                      href={
                        profile.linkedin.startsWith("http")
                          ? profile.linkedin
                          : `https://${profile.linkedin}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-[14px] border border-border px-4 py-3 text-sm transition-colors hover:bg-muted group"
                    >
                      <Linkedin className="h-4 w-4 text-muted-foreground" />
                      <span className="min-w-0 flex-1 truncate text-ink">{profile.linkedin}</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </a>
                  )}
                  {profile.portfolio && (
                    <a
                      href={
                        profile.portfolio.startsWith("http")
                          ? profile.portfolio
                          : `https://${profile.portfolio}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-[14px] border border-border px-4 py-3 text-sm transition-colors hover:bg-muted group"
                    >
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="min-w-0 flex-1 truncate text-ink">{profile.portfolio}</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
