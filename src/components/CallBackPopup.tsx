import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface CallBackPopupProps {
  autoShowDelay?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CallBackPopup({
  autoShowDelay = 6000,
  isOpen: controlledOpen,
  onClose,
}: CallBackPopupProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (controlledOpen !== undefined) return;
    // Har refresh pe show karo — sessionStorage check nahi karo
    const timer = setTimeout(() => {
      setOpen(true);
    }, autoShowDelay);
    return () => clearTimeout(timer);
  }, [autoShowDelay, controlledOpen]);

  const isVisible = controlledOpen !== undefined ? controlledOpen : open;

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    setApiError("");
    try {
      const res = await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "popup" }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || !isVisible) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 14px 13px 42px",
    background: "#ede9e0",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "10px",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 300,
    color: "#1a1a18",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
  };

  const popup = (
    <>
      <style>{`
        @keyframes acFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes acSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 28px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        .ac-input::placeholder { color: #b0aa9e; }
        .ac-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #ede9e0 inset !important;
          -webkit-text-fill-color: #1a1a18 !important;
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(20, 18, 14, 0.5)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 99998,
          animation: "acFadeIn 0.25s ease",
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ac-popup-title"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 99999,
          width: "min(420px, 92vw)",
          background: "#f5f1ea",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "18px",
          padding: "44px 38px 34px",
          boxShadow: "0 8px 48px rgba(0,0,0,0.14)",
          animation: "acSlideUp 0.34s cubic-bezier(.22,1,.36,1)",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.05)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7a746a",
            fontSize: "18px",
            lineHeight: "1",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
        >
          ×
        </button>

        {!submitted ? (
          <>
            {/* Icon */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#ede9e0",
                border: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 22px",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.6 10.8C7.8 13.2 9.8 15.2 12.2 16.4L14.2 14.4C14.5 14.1 14.9 14 15.2 14.2C16.3 14.6 17.5 14.8 18.7 14.8C19.4 14.8 20 15.4 20 16.1V19.3C20 20 19.4 20.6 18.7 20.6C10.3 20.6 3.4 13.7 3.4 5.3C3.4 4.6 4 4 4.7 4H7.9C8.6 4 9.2 4.6 9.2 5.3C9.2 6.5 9.4 7.7 9.8 8.8C9.9 9.2 9.8 9.6 9.5 9.9L7.5 11.9L6.6 10.8Z"
                  fill="#7a746a"
                />
              </svg>
            </div>

            <h2
              id="ac-popup-title"
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontSize: "28px",
                fontWeight: 500,
                color: "#1a1a18",
                textAlign: "center",
                lineHeight: 1.2,
                margin: "0 0 10px",
              }}
            >
              Request a Call Back
            </h2>

            <p
              style={{
                fontSize: "13.5px",
                fontWeight: 300,
                color: "#7a746a",
                textAlign: "center",
                lineHeight: 1.6,
                margin: "0 0 28px",
              }}
            >
              Leave your details and our expert
              <br />
              will reach out shortly.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Name */}
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#b0aa9e",
                    display: "flex",
                    pointerEvents: "none",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </span>
                <input
                  className="ac-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0,0,0,0.3)";
                    e.target.style.background = "#e8e4dc";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0,0,0,0.1)";
                    e.target.style.background = "#ede9e0";
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#b0aa9e",
                    display: "flex",
                    pointerEvents: "none",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8C7.8 13.2 9.8 15.2 12.2 16.4L14.2 14.4C14.5 14.1 14.9 14 15.2 14.2C16.3 14.6 17.5 14.8 18.7 14.8C19.4 14.8 20 15.4 20 16.1V19.3C20 20 19.4 20.6 18.7 20.6C10.3 20.6 3.4 13.7 3.4 5.3C3.4 4.6 4 4 4.7 4H7.9C8.6 4 9.2 4.6 9.2 5.3C9.2 6.5 9.4 7.7 9.8 8.8C9.9 9.2 9.8 9.6 9.5 9.9L7.5 11.9L6.6 10.8Z" />
                  </svg>
                </span>
                <input
                  className="ac-input"
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0,0,0,0.3)";
                    e.target.style.background = "#e8e4dc";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0,0,0,0.1)";
                    e.target.style.background = "#ede9e0";
                  }}
                />
              </div>

              {/* API Error */}
              {apiError && (
                <p style={{ color: "#e53e3e", fontSize: "12px", textAlign: "center", margin: "0" }}>
                  {apiError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#1a1a18",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#f5f1ea",
                  cursor: submitting ? "not-allowed" : "pointer",
                  marginTop: "4px",
                  letterSpacing: "0.03em",
                  opacity: submitting ? 0.7 : 1,
                  transition: "background 0.2s, transform 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.background = "#2c2c29";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#1a1a18";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {submitting ? "Submitting..." : "Get a Call Back"}
              </button>
            </form>

            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                fontSize: "11.5px",
                fontWeight: 300,
                color: "#b0aa9e",
                marginTop: "16px",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Your details are safe with us
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#ede9e0",
                border: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1a18"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontSize: "26px",
                fontWeight: 500,
                color: "#1a1a18",
                margin: "0 0 10px",
              }}
            >
              We'll be in touch.
            </h2>
            <p
              style={{
                fontSize: "13.5px",
                fontWeight: 300,
                color: "#7a746a",
                lineHeight: 1.6,
                margin: "0 0 26px",
              }}
            >
              Thanks, {name}. Our team will call
              <br />
              {phone} shortly.
            </p>
            <button
              onClick={handleClose}
              style={{
                padding: "12px 32px",
                background: "#1a1a18",
                border: "none",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: 500,
                color: "#f5f1ea",
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </>
  );

  return createPortal(popup, document.body);
}
