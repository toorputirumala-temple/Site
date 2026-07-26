import React from "react";
import RotatingFlowers from "../components/RotatingFlowers";

const images = [
  { src: "/templedata/WhatsApp Image 2026-07-04 at 7.03.15 PM.jpeg",     caption: "శ్రీ వేంకటేశ్వర స్వామి" },
  { src: "/templedata/WhatsApp Image 2026-07-04 at 7.03.16 PM.jpeg",     caption: "ఉత్సవ దృశ్యాలు" },
  { src: "/templedata/WhatsApp Image 2026-07-04 at 7.03.16 PM1(1).jpeg", caption: "ఆలయ పరిసరాలు" },
  { src: "/templedata/WhatsApp Image 2026-07-04 at 7.03.17 PM.jpeg",     caption: "భక్తుల సేవ" },
  { src: "/templedata/WhatsApp Image 2026-07-04 at 7.03.17 PM2.jpeg",    caption: "దైవ దర్శనం" },
  { src: "/templedata/WhatsApp Image 2026-07-04 at 7.03.18 PM.jpeg",     caption: "పూజా కార్యక్రమాలు" },
  { src: "/templedata/WhatsApp Image 2026-07-04 at 7.03.18 PM2.jpeg",    caption: "ప్రసాద వితరణ" },
  { src: "/templedata/WhatsApp Image 2026-07-04 at 7.03.18 PM22.jpeg",   caption: "ఆలయ సౌందర్యం" },
  { src: "/templedata/WhatsApp Image 2026-07-04 at 7.03.19 PM.jpeg",     caption: "వేడుకల వైభవం" },
];

// Duplicate for seamless loop
const row1 = [...images, ...images];
const row2 = [...images].reverse().concat([...images].reverse());
const row3 = [...images.slice(3), ...images.slice(0, 3), ...images.slice(3), ...images.slice(0, 3)];

const GalleryPage = ({ id }) => {

  return (
    <div
      id={id}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#0d0500 0%,#1a0a00 40%,#2d1200 70%,#1a0a00 100%)",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      <RotatingFlowers tintColor="rgba(212,175,55,0.08)" />

      {/* Top gold stripe */}
      <div className="w-full h-2" style={{ background: "linear-gradient(90deg,#c8860a,#f5c842,#f47728,#f5c842,#c8860a)" }} />

      {/* Ambient blobs */}
      <div className="absolute top-20 left-[-10%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#f5c842,transparent)" }} />
      <div className="absolute bottom-20 right-[-10%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#f47728,transparent)" }} />

      {/* ── Section Heading ── */}
      <div className="relative z-10 text-center py-14 px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right,transparent,#f5c842)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#f5c842" }} />
          <div className="h-px flex-1 max-w-[200px]" style={{ background: "linear-gradient(90deg,#f5c842,#f47728,#f5c842)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#f5c842" }} />
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left,transparent,#f5c842)" }} />
        </div>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-2"
          style={{ color: "#f5c842", fontFamily: "'Outfit',sans-serif" }}>
          ఆలయ చిత్రమాలిక
        </p>
        <h2 className="font-black leading-tight"
          style={{
            fontFamily: "'Yatra One',sans-serif",
            fontSize: "clamp(2rem,5vw,3.2rem)",
            background: "linear-gradient(135deg,#f5c842 0%,#f47728 50%,#f5c842 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          Sacred Gallery
        </h2>
        <p className="mt-3 text-sm" style={{ color: "rgba(255,240,200,0.5)", fontFamily: "'Outfit',sans-serif" }}>
          Glimpses of divine celebrations &amp; sacred moments
        </p>
        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right,transparent,#f5c842)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#f5c842" }} />
          <div className="h-px flex-1 max-w-[200px]" style={{ background: "linear-gradient(90deg,#f5c842,#f47728,#f5c842)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#f5c842" }} />
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left,transparent,#f5c842)" }} />
        </div>
      </div>

      {/* ── Scrolling Rows — pure CSS hover, NO React state ── */}
      <div className="gallery-rows relative z-10" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        {/* Row 1 — left */}
        <div className="marquee-mask">
          <div className="marquee-track track-left-35">
            {row1.map((img, idx) => (
              <div key={idx} className="gallery-card">
                <img src={img.src} alt={img.caption} className="gallery-card-img" />
                <div className="gallery-card-overlay">
                  <span className="gallery-card-caption">🪔 {img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="marquee-mask">
          <div className="marquee-track track-right-42">
            {row2.map((img, idx) => (
              <div key={idx} className="gallery-card">
                <img src={img.src} alt={img.caption} className="gallery-card-img" />
                <div className="gallery-card-overlay">
                  <span className="gallery-card-caption">🪔 {img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 — left */}
        <div className="marquee-mask">
          <div className="marquee-track track-left-30">
            {row3.map((img, idx) => (
              <div key={idx} className="gallery-card">
                <img src={img.src} alt={img.caption} className="gallery-card-img" />
                <div className="gallery-card-overlay">
                  <span className="gallery-card-caption">🪔 {img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ── All styles — pure CSS, no React state involved in hover ── */}
      <style>{`
        /* ── Keyframes ── */
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* ── Fade mask on edges ── */
        .marquee-mask {
          overflow: hidden;
          width: 100%;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
        }

        /* ── Tracks: base animation durations ── */
        .marquee-track {
          display: flex;
          will-change: transform;
        }
        .track-left-35  { animation: marqueeLeft  35s linear infinite; }
        .track-right-42 { animation: marqueeRight 42s linear infinite; }
        .track-left-30  { animation: marqueeLeft  30s linear infinite; }

        /* ── SLOW DOWN on hover — pure CSS, no React re-render ──
           Changing animation-duration mid-play via CSS preserves position.
           We target .gallery-rows:hover so the SAME element gets the new duration
           without any DOM mutation, preventing animation restart.            */
        .gallery-rows:hover .track-left-35  { animation-duration: 140s; }
        .gallery-rows:hover .track-right-42 { animation-duration: 168s; }
        .gallery-rows:hover .track-left-30  { animation-duration: 120s; }

        /* ── Cards ── */
        .gallery-card {
          flex-shrink: 0;
          width: 280px;
          height: 190px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          margin-right: 18px;
          border: 1.5px solid rgba(245,200,66,0.2);
          box-shadow: 0 8px 30px rgba(0,0,0,0.5);
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s;
          cursor: pointer;
        }
        .gallery-card:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 0 0 2px #f5c842, 0 22px 55px rgba(244,119,40,0.45);
          border-color: rgba(245,200,66,0.7);
        }

        /* ── Card image ── */
        .gallery-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .gallery-card:hover .gallery-card-img {
          transform: scale(1.1);
        }

        /* ── Caption overlay ── */
        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,3,0,0.65) 0%, transparent 55%);
          display: flex;
          align-items: flex-end;
          padding: 14px 16px;
          transition: background 0.35s ease;
        }
        .gallery-card:hover .gallery-card-overlay {
          background: linear-gradient(to top, rgba(10,3,0,0.88) 0%, rgba(0,0,0,0.15) 65%);
        }
        .gallery-card-caption {
          color: rgba(245,200,66,0.8);
          font-size: 11px;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.05em;
          transition: color 0.3s, opacity 0.3s;
        }
        .gallery-card:hover .gallery-card-caption {
          color: #f5c842;
        }

        /* ── Badge ── */
        .gallery-badge { transition: border-color 0.4s, color 0.4s; }
        .gallery-rows:hover ~ * .gallery-badge,
        .gallery-badge:hover {
          border-color: rgba(245,200,66,0.7) !important;
          color: #f5c842 !important;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;