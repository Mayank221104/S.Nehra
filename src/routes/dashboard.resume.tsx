import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  FileText,
  Upload,
  Trash2,
  ExternalLink,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

function ResumeBuilder() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/resume", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setResumeUrl(data.resumeUrl))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Sirf PDF files allowed hain.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File 5MB se badi hai.");
      return;
    }

    setError(null);
    setUploading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/resume/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResumeUrl(data.resumeUrl);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Resume delete karna chahte ho?")) return;
    setDeleting(true);
    try {
      await fetch("/api/resume", { method: "DELETE", credentials: "include" });
      setResumeUrl(null);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileText className="text-blue-500" size={28} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume</h1>
          <p className="text-sm text-gray-500">
            PDF upload karo — profile pe automatically dikhega
          </p>
        </div>
      </div>

      {/* Error / Success */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          <CheckCircle size={16} /> Resume successfully upload ho gaya!
        </div>
      )}

      {/* Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleUpload(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={[
          "border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors",
          dragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-blue-500">
            <Loader2 className="animate-spin" size={36} />
            <p className="font-medium">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Upload size={36} />
            <p className="font-medium text-gray-600">
              {resumeUrl ? "Naya resume upload karo (replace hoga)" : "PDF yahan drop karo"}
            </p>
            <p className="text-xs">ya click karke select karo • Max 5MB</p>
          </div>
        )}
      </div>

      {/* Current Resume Card */}
      {resumeUrl && (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <FileText className="text-red-500" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-800 text-sm">resume.pdf</p>
              <p className="text-xs text-gray-400">Cloudinary pe stored</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline px-3 py-1.5 rounded-lg hover:bg-blue-50"
            >
              <ExternalLink size={14} /> View
            </a>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50"
            >
              {deleting ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/dashboard/resume")({
  component: ResumeBuilder,
});
