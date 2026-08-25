import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface CallBackPopupProps {
  autoShowDelay?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CallBackPopup({
  autoShowDelay = 4000,
  isOpen: controlledOpen,
  onClose,
}: CallBackPopupProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (controlledOpen !== undefined) return;
    if (sessionStorage.getItem("popup_shown")) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("popup_shown", "1");
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
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/visitors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "popup" }),
      });
    } catch (err) {
      console.error("Visitor save failed:", err);
    }
    setSubmitted(true);
  };

  if (!isVisible) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 14px 13px 42px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 400,
    color: "#f1f5f9",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
  };

  const popup = (
    <>
      <style>{`
        @keyframes snFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes snSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 24px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        .sn-input::placeholder { color: #475569; }
        .sn-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #0f1f3d inset !important;
          -webkit-text-fill-color: #f1f5f9 !important;
        }
        .sn-submit:hover {
          background: #ea6c0a !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px -4px rgba(249,115,22,0.5);
        }
        .sn-close:hover { background: rgba(255,255,255,0.12) !important; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(5, 10, 25, 0.75)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 99998,
          animation: "snFadeIn 0.25s ease",
        }}
      />

      {/* Modal — dark navy card like Scaler */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sn-popup-title"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 99999,
          width: "min(420px, 92vw)",
          background: "#0a0f1e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "40px 36px 32px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          animation: "snSlideUp 0.34s cubic-bezier(.22,1,.36,1)",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      >
        {/* Orange top accent bar */}
        <div style={{
          position: "absolute",
          top: 0, left: "10%", right: "10%",
          height: "3px",
          background: "linear-gradient(90deg, transparent, #f97316, transparent)",
          borderRadius: "0 0 4px 4px",
        }} />

        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="sn-close"
          style={{
            position: "absolute",
            top: "16px", right: "16px",
            width: "30px", height: "30px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
            fontSize: "18px",
            lineHeight: "1",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#f1f5f9"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; }}
        >
          ×
        </button>

        {!submitted ? (
          <>
            {/* Icon ring — orange accent */}
            <div style={{
              width: "60px", height: "60px",
              borderRadius: "50%",
              background: "rgba(249,115,22,0.12)",
              border: "1px solid rgba(249,115,22,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.6 10.8C7.8 13.2 9.8 15.2 12.2 16.4L14.2 14.4C14.5 14.1 14.9 14 15.2 14.2C16.3 14.6 17.5 14.8 18.7 14.8C19.4 14.8 20 15.4 20 16.1V19.3C20 20 19.4 20.6 18.7 20.6C10.3 20.6 3.4 13.7 3.4 5.3C3.4 4.6 4 4 4.7 4H7.9C8.6 4 9.2 4.6 9.2 5.3C9.2 6.5 9.4 7.7 9.8 8.8C9.9 9.2 9.8 9.6 9.5 9.9L7.5 11.9L6.6 10.8Z"
                  fill="#f97316"
                />
              </svg>
            </div>

            {/* Eyebrow */}
            <p style={{
              fontSize: "11px", fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.16em",
              color: "#f97316", textAlign: "center",
              margin: "0 0 8px",
            }}>
              Free Consultation
            </p>

            <h2 id="sn-popup-title" style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "28px", fontWeight: 500,
              color: "#f1f5f9", textAlign: "center",
              lineHeight: 1.15, margin: "0 0 10px",
            }}>
              Request a Call Back
            </h2>

            <p style={{
              fontSize: "13.5px", fontWeight: 400,
              color: "#64748b", textAlign: "center",
              lineHeight: 1.6, margin: "0 0 26px",
            }}>
              Leave your details and our expert<br />will reach out shortly.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Name */}
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "14px", top: "50%",
                  transform: "translateY(-50%)", color: "#475569",
                  display: "flex", pointerEvents: "none",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </span>
                <input
                  className="sn-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = "rgba(249,115,22,0.5)";
                    e.target.style.background = "rgba(249,115,22,0.06)";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = "rgba(255,255,255,0.12)";
                    e.target.style.background = "rgba(255,255,255,0.06)";
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "14px", top: "50%",
                  transform: "translateY(-50%)", color: "#475569",
                  display: "flex", pointerEvents: "none",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8C7.8 13.2 9.8 15.2 12.2 16.4L14.2 14.4C14.5 14.1 14.9 14 15.2 14.2C16.3 14.6 17.5 14.8 18.7 14.8C19.4 14.8 20 15.4 20 16.1V19.3C20 20 19.4 20.6 18.7 20.6C10.3 20.6 3.4 13.7 3.4 5.3C3.4 4.6 4 4 4.7 4H7.9C8.6 4 9.2 4.6 9.2 5.3C9.2 6.5 9.4 7.7 9.8 8.8C9.9 9.2 9.8 9.6 9.5 9.9L7.5 11.9L6.6 10.8Z"/>
                  </svg>
                </span>
                <input
                  className="sn-input"
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = "rgba(249,115,22,0.5)";
                    e.target.style.background = "rgba(249,115,22,0.06)";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = "rgba(255,255,255,0.12)";
                    e.target.style.background = "rgba(255,255,255,0.06)";
                  }}
                />
              </div>

              {/* Orange CTA — Coding Ninjas style */}
              <button
                type="submit"
                className="sn-submit"
                style={{
                  width: "100%", padding: "14px",
                  background: "#f97316",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px", fontWeight: 600,
                  color: "#fff", cursor: "pointer",
                  marginTop: "4px", letterSpacing: "0.02em",
                  transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
                }}
              >
                Get a Free Call Back →
              </button>
            </form>

            {/* Trust signals */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "16px", marginTop: "16px",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#475569" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                100% Private
              </span>
              <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
              <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#475569" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                Reply within 2 hrs
              </span>
              <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
              <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#475569" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                No spam
              </span>
            </div>
          </>
        ) : (
          /* Success state */
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p style={{
              fontSize: "11px", fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.16em",
              color: "#22c55e", margin: "0 0 8px",
            }}>
              You're All Set
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "26px", fontWeight: 500,
              color: "#f1f5f9", margin: "0 0 10px",
            }}>
              We'll be in touch.
            </h2>
            <p style={{
              fontSize: "13.5px", color: "#64748b",
              lineHeight: 1.6, margin: "0 0 26px",
            }}>
              Thanks, <strong style={{ color: "#f1f5f9" }}>{name}</strong>. Our team
              will call <strong style={{ color: "#f1f5f9" }}>{phone}</strong> within 2 hours.
            </p>
            <button
              onClick={handleClose}
              style={{
                padding: "12px 32px",
                background: "#f97316",
                border: "none", borderRadius: "8px",
                fontSize: "13.5px", fontWeight: 600,
                color: "#fff", cursor: "pointer", letterSpacing: "0.02em",
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