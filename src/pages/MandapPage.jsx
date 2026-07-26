import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useLanguage } from "../contexts/LanguageContext";
import RotatingFlowers from "../components/RotatingFlowers";

const eventTypes = [
  { value: "Marriage", icon: "💍", label_en: "Marriage", label_te: "వివాహం" },
  { value: "Birthday", icon: "🎂", label_en: "Birthday", label_te: "పుట్టినరోజు" },
  { value: "Puja", icon: "🪔", label_en: "Puja", label_te: "పూజ" },
  { value: "Other", icon: "✨", label_en: "Other", label_te: "ఇతరాలు" },
];

/* ─── Greeting Card Sticker Component ─── */
const GreetingCard = ({ onOpen }) => {
  const [phase, setPhase] = useState("idle"); // idle | bounce | opening | open

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("bounce");
    setTimeout(() => setPhase("opening"), 500);
    setTimeout(() => {
      setPhase("open");
      onOpen();
    }, 1600);
  };

  if (phase === "open") return null;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Instruction hint */}
      <p
        className="text-xs font-semibold tracking-widest uppercase mb-8 animate-pulse"
        style={{ color: "rgba(245,200,66,0.6)", fontFamily: "'Outfit',sans-serif" }}
      >
        Tap the sticker to open your invitation
      </p>

      {/* Card container */}
      <div
        className="relative cursor-pointer select-none"
        onClick={handleClick}
        style={{
          width: "260px",
          height: "340px",
          perspective: "1000px",
        }}
      >
        {/* ── CARD BACK (envelope/card body) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            background: "linear-gradient(160deg,#2d1200,#1a0800)",
            border: "2px solid rgba(245,200,66,0.5)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,200,66,0.1) inset",
            overflow: "hidden",
          }}
        >
          {/* decorative pattern */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: `${i * 18}px`,
                left: 0,
                right: 0,
                height: "1px",
                background: `rgba(245,200,66,${0.04 + i * 0.015})`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(244,119,40,0.06),transparent)",
            }}
          />
          {/* Bottom text on card */}
          <div style={{
            position: "absolute",
            bottom: "20px",
            left: 0,
            right: 0,
            textAlign: "center",
          }}>
            <p style={{ color: "rgba(245,200,66,0.4)", fontSize: "10px", letterSpacing: "0.15em", fontFamily: "'Outfit',sans-serif" }}>
              శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి
            </p>
          </div>
        </div>

        {/* ── CARD LID / FLAP (animates open) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            borderRadius: "24px 24px 0 0",
            background: "linear-gradient(160deg,#3d1a00,#2d1000)",
            border: "2px solid rgba(245,200,66,0.5)",
            borderBottom: "none",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            transition: "transform 0.9s cubic-bezier(0.4,0,0.2,1)",
            transform: phase === "opening" || phase === "open"
              ? "rotateX(-170deg)"
              : "rotateX(0deg)",
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          {/* Flap inner gold line */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: "2px",
            background: "linear-gradient(90deg,transparent,#f5c842,transparent)",
          }} />
          {/* Diagonal fold lines */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "50%",
            bottom: 0,
            width: "1px",
            background: "linear-gradient(to bottom,rgba(245,200,66,0.3),transparent)",
          }} />
        </div>

        {/* ── STICKER (centered on card) ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%) ${phase === "bounce" ? "scale(1.15) rotate(-5deg)" :
                phase === "opening" ? "scale(0.85) rotate(5deg)" : "scale(1)"
              }`,
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            zIndex: 20,
            textAlign: "center",
          }}
        >
          {/* Outer glow ring */}
          <div style={{
            position: "absolute",
            inset: "-12px",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(244,119,40,0.35),transparent)",
            animation: phase === "idle" ? "stickerPulse 2s ease-in-out infinite" : "none",
          }} />

          {/* Sticker circle */}
          <div style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#f5c842 0%,#f47728 50%,#c45c00 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(244,119,40,0.7), 0 0 0 4px rgba(245,200,66,0.4), 0 8px 20px rgba(0,0,0,0.5)",
            position: "relative",
            zIndex: 1,
          }}>
            {/* Inner ring */}
            <div style={{
              position: "absolute",
              inset: "6px",
              borderRadius: "50%",
              border: "2px dashed rgba(255,255,255,0.4)",
            }} />
            <span style={{ fontSize: "36px", lineHeight: 1 }}>🪔</span>
            <span style={{
              color: "#1a0800",
              fontSize: "9px",
              fontWeight: 900,
              letterSpacing: "0.1em",
              fontFamily: "'Outfit',sans-serif",
              marginTop: "4px",
            }}>
              BOOK MANDAP
            </span>
          </div>

          {/* Sparkles */}
          {["top-0 right-0 translate-x-1/2 -translate-y-1/2",
            "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
            "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} text-yellow-300`}
              style={{
                fontSize: "14px",
                animation: `sparkle 1.5s ease-in-out ${i * 0.4}s infinite`,
              }}
            >✦</div>
          ))}
        </div>

        {/* ── OPENING SPARKLE BURST ── */}
        {(phase === "opening") && (
          <div style={{ position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none" }}>
            {["top-1/4 left-1/4", "top-1/4 right-1/4", "bottom-1/4 left-1/4", "bottom-1/4 right-1/4",
              "top-1/2 left-0", "top-1/2 right-0", "top-0 left-1/2", "bottom-0 left-1/2"].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} text-yellow-300`}
                  style={{
                    fontSize: "18px",
                    animation: `burstOut 0.8s ease-out ${i * 0.06}s both`,
                  }}
                >✦</div>
              ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes stickerPulse {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(1.3); opacity: 1; }
        }
        @keyframes sparkle {
          0%,100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50%      { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes burstOut {
          from { opacity: 1; transform: scale(0) translate(0,0); }
          to   { opacity: 0; transform: scale(2) translate(var(--tx,20px),var(--ty,-20px)); }
        }
      `}</style>
    </div>
  );
};

/* ─── Main Mandap Page ─── */
const MandapPage = ({ id }) => {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [cardOpened, setCardOpened] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", eventType: "Marriage", date: "", details: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Save booking to Firestore
      await addDoc(collection(db, "mandap_bookings"), {
        ...formData, timestamp: serverTimestamp(), status: "pending",
      });

      // 2. Send booking notification email via SMTP proxy
      await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replyTo: "",
          subject: `[Mandap Booking] ${formData.eventType} — ${formData.date}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #f47728;border-radius:12px;overflow:hidden">
              <div style="background:linear-gradient(135deg,#c45c00,#f47728);padding:24px;text-align:center">
                <h2 style="color:#fff;margin:0;font-size:22px">🪔 New Mandap Booking Request</h2>
                <p style="color:rgba(255,255,255,0.85);margin:6px 0 0">Sri Prasanna Venkateswara Swamy Temple</p>
              </div>
              <div style="padding:24px;background:#fff8f0">
                <table style="width:100%;border-collapse:collapse;font-size:15px">
                  <tr><td style="padding:10px 0;font-weight:bold;color:#c45c00;width:40%">👤 Name</td><td style="padding:10px 0;color:#222">${formData.name}</td></tr>
                  <tr><td style="padding:10px 0;font-weight:bold;color:#c45c00">📱 Phone</td><td style="padding:10px 0;color:#222">${formData.phone}</td></tr>
                  <tr><td style="padding:10px 0;font-weight:bold;color:#c45c00">🎉 Event Type</td><td style="padding:10px 0;color:#222">${formData.eventType}</td></tr>
                  <tr><td style="padding:10px 0;font-weight:bold;color:#c45c00">📅 Event Date</td><td style="padding:10px 0;color:#222">${formData.date}</td></tr>
                  <tr><td style="padding:10px 0;font-weight:bold;color:#c45c00;vertical-align:top">📝 Details</td><td style="padding:10px 0;color:#222">${formData.details || "N/A"}</td></tr>
                </table>
              </div>
              <div style="background:#f47728;padding:14px;text-align:center">
                <p style="color:#fff;margin:0;font-size:13px">This is an automated notification from the Temple Website</p>
              </div>
            </div>
          `,
        }),
      });

      toast.success(t.booking.success);
      setFormData({ name: "", phone: "", eventType: "Marriage", date: "", details: "" });
    } catch (error) {
      console.error("Error booking mandap: ", error);
      toast.error(t.booking.failure);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id={id}
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1a0a00 0%, #2d1200 40%, #1a0a00 100%)" }}
    >
      <RotatingFlowers tintColor="rgba(212,175,55,0.12)" />

      {/* Top ornamental border */}
      <div className="w-full h-2" style={{ background: "linear-gradient(90deg, #c8860a, #f5c842, #f47728, #f5c842, #c8860a)" }} />

      {/* Gold shimmer blobs */}
      <div className="absolute top-0 left-[-10%] w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #f5c842, transparent)" }} />
      <div className="absolute bottom-0 right-[-10%] w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #f47728, transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">

        {/* ── SECTION HEADING ── */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, #f5c842)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#f5c842" }} />
            <div className="h-px flex-1 max-w-[200px]" style={{ background: "linear-gradient(to right, #f5c842, #f47728, #f5c842)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#f5c842" }} />
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, #f5c842)" }} />
          </div>
          <p className="text-base font-semibold tracking-[0.35em] uppercase mb-2"
            style={{ color: "#f5c842", fontFamily: "'Outfit', sans-serif" }}>
            శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి దేవస్థానం
          </p>
          <h2 className="font-black leading-tight mb-3"
            style={{
              fontFamily: "'Yatra One', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              background: "linear-gradient(135deg, #f5c842 0%, #f47728 50%, #f5c842 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            {t.booking.mainTitle}
          </h2>
          <p className="max-w-xl mx-auto text-base md:text-lg"
            style={{ color: "rgba(255,240,200,0.75)", fontFamily: "'Outfit', sans-serif" }}>
            {t.booking.subTitle}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, #f5c842)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#f5c842" }} />
            <div className="h-px flex-1 max-w-[200px]" style={{ background: "linear-gradient(to right, #f5c842, #f47728, #f5c842)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#f5c842" }} />
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, #f5c842)" }} />
          </div>
        </div>

        {/* ── GREETING CARD STICKER (shown until opened) ── */}
        {!cardOpened && (
          <GreetingCard onOpen={() => setCardOpened(true)} />
        )}

        {/* ── BOOKING CONTENT (revealed after card opens) ── */}
        {cardOpened && (
          <div
            style={{
              animation: "cardReveal 0.7s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            {/* ── EVENT TYPE SELECTOR ── */}
            <div className="mb-10">
              <p className="text-center text-sm font-semibold tracking-widest uppercase mb-5"
                style={{ color: "#f5c842", fontFamily: "'Outfit', sans-serif" }}>
                Select Occasion · సందర్భం ఎంచుకోండి
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {eventTypes.map((ev) => (
                  <button
                    key={ev.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, eventType: ev.value })}
                    className="group flex flex-col items-center justify-center py-6 px-4 rounded-2xl transition-all duration-300"
                    style={{
                      background: formData.eventType === ev.value
                        ? "linear-gradient(135deg, #f47728, #c45c00)"
                        : "rgba(255,255,255,0.05)",
                      border: formData.eventType === ev.value
                        ? "2px solid #f5c842"
                        : "2px solid rgba(245,200,66,0.25)",
                      boxShadow: formData.eventType === ev.value
                        ? "0 0 24px rgba(244,119,40,0.5)"
                        : "none",
                      transform: formData.eventType === ev.value ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <span className="text-3xl mb-2">{ev.icon}</span>
                    <span className="font-bold text-sm"
                      style={{
                        color: formData.eventType === ev.value ? "#fff" : "rgba(255,240,200,0.8)",
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1rem",
                      }}>
                      {lang === "te" ? ev.label_te : ev.label_en}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── BOOKING FORM ── */}
            <div
              className="max-w-3xl mx-auto rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(245,200,66,0.3)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(245,200,66,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Form header */}
              <div className="px-8 pt-8 pb-5 flex items-center justify-between"
                style={{ borderBottom: "1px solid rgba(245,200,66,0.15)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 rounded-full" style={{ background: "linear-gradient(to bottom, #f5c842, #f47728)" }} />
                  <h3 className="text-xl font-bold" style={{ color: "#f5c842", fontFamily: "'Outfit', sans-serif" }}>
                    {t.booking.formHeading}
                  </h3>
                </div>
                <button
                  onClick={() => setCardOpened(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,240,200,0.6)" }}
                  title="Close form"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color: "#f5c842" }}>
                      {t.booking.fullName}
                    </label>
                    <input
                      type="text" name="name" required
                      value={formData.name} onChange={handleChange}
                      placeholder="e.g. Rama Rao"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(245,200,66,0.25)",
                        color: "#fff",
                      }}
                      onFocus={e => e.target.style.borderColor = "#f5c842"}
                      onBlur={e => e.target.style.borderColor = "rgba(245,200,66,0.25)"}
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color: "#f5c842" }}>
                      {t.booking.phone}
                    </label>
                    <input
                      type="tel" name="phone" required
                      pattern="[0-9]{10}" value={formData.phone} onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(245,200,66,0.25)",
                        color: "#fff",
                      }}
                      onFocus={e => e.target.style.borderColor = "#f5c842"}
                      onBlur={e => e.target.style.borderColor = "rgba(245,200,66,0.25)"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Type */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color: "#f5c842" }}>
                      {t.booking.eventType}
                    </label>
                    <select
                      name="eventType" value={formData.eventType} onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all appearance-none"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(245,200,66,0.25)",
                        color: "#fff",
                      }}
                    >
                      {eventTypes.map(ev => (
                        <option key={ev.value} value={ev.value}
                          style={{ background: "#2d1200", color: "#fff" }}>
                          {ev.icon} {lang === "te" ? ev.label_te : ev.label_en}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color: "#f5c842" }}>
                      {t.booking.date}
                    </label>
                    <input
                      type="date" name="date" required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date} onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(245,200,66,0.25)",
                        color: "#fff",
                        colorScheme: "dark",
                      }}
                      onFocus={e => e.target.style.borderColor = "#f5c842"}
                      onBlur={e => e.target.style.borderColor = "rgba(245,200,66,0.25)"}
                    />
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: "#f5c842" }}>
                    {t.booking.details}
                  </label>
                  <textarea
                    name="details" rows="3"
                    value={formData.details} onChange={handleChange}
                    placeholder="Any special requests, rituals, or requirements..."
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(245,200,66,0.25)",
                      color: "#fff",
                    }}
                    onFocus={e => e.target.style.borderColor = "#f5c842"}
                    onBlur={e => e.target.style.borderColor = "rgba(245,200,66,0.25)"}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit" disabled={loading}
                  className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #f5c842 0%, #f47728 50%, #c45c00 100%)",
                    color: "#1a0a00",
                    boxShadow: "0 8px 30px rgba(244,119,40,0.5)",
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t.booking.processing || "Processing..."}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      {t.booking.submit}
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* ── STEPS ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 max-w-3xl mx-auto">
              {[
                { num: "01", text: t.booking.step1 },
                { num: "02", text: t.booking.step2 },
                { num: "03", text: t.booking.step3 },
              ].map((step, i) => (
                <div key={i}
                  className="flex items-start gap-4 rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(245,200,66,0.15)",
                  }}>
                  <div className="text-lg font-black flex-shrink-0 mt-0.5" style={{ color: "#f47728", fontFamily: "'Outfit', sans-serif" }}>{step.num}</div>
                  <div>
                    <div className="text-xs font-bold mb-1" style={{ color: "#f5c842" }}>{step.num}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,240,200,0.7)" }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom ornamental border */}
      <div className="w-full h-2" style={{ background: "linear-gradient(90deg, #c8860a, #f5c842, #f47728, #f5c842, #c8860a)" }} />

      {/* Card reveal animation */}
      <style>{`
        @keyframes cardReveal {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MandapPage;
