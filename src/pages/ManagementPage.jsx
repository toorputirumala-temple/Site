import React, { useEffect, useRef, useState } from "react";
import bottomBorder from "../assets/title-img-orange.svg";
import RotatingFlowers from "../components/RotatingFlowers";
import { useLanguage } from "../contexts/LanguageContext";

/* ─────────────────────────────────────────────────────────────
   Inline keyframes injected once into the document head
───────────────────────────────────────────────────────────── */
const STYLE = `
  @keyframes mgmt-hint-shake {
    0%,100% { transform: rotate(0deg); }
    15%      { transform: rotate(-4deg) scale(1.03); }
    30%      { transform: rotate(4deg)  scale(1.03); }
    45%      { transform: rotate(-3deg); }
    60%      { transform: rotate(3deg); }
    75%      { transform: rotate(-1deg); }
  }
  @keyframes mgmt-flip-in {
    from { transform: rotateY(90deg); opacity: 0; }
    to   { transform: rotateY(0deg);  opacity: 1; }
  }
  @keyframes mgmt-pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(240,122,42,0.55); }
    70%  { box-shadow: 0 0 0 10px rgba(240,122,42,0); }
    100% { box-shadow: 0 0 0 0 rgba(240,122,42,0); }
  }
  .mgmt-shake   { animation: mgmt-hint-shake 1.6s ease-in-out; }
  .mgmt-pulse   { animation: mgmt-pulse-ring 1.8s ease-out infinite; }
  .mgmt-flip-in { animation: mgmt-flip-in 0.35s ease-out both; }
`;

if (typeof document !== "undefined" && !document.getElementById("mgmt-styles")) {
  const tag = document.createElement("style");
  tag.id = "mgmt-styles";
  tag.textContent = STYLE;
  document.head.appendChild(tag);
}

/* ─────────────────────────────────────────────────────────────
   TeamMember card component
───────────────────────────────────────────────────────────── */
const TeamMember = ({ member, delay }) => {
  const ref = useRef();
  const [visible, setVisible]   = useState(false);
  const [flipped, setFlipped]   = useState(false);
  const [shaking, setShaking]   = useState(false);

  /* Entrance animation via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
            /* trigger hint-shake 0.8 s after card appears */
            setTimeout(() => {
              setShaking(true);
              setTimeout(() => setShaking(false), 1700);
            }, 800);
          }, delay);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const handleClick = () => setFlipped((prev) => !prev);

  /* Role badge colours */
  const roleColor = {
    Testator:      "bg-purple-100 text-purple-800 border-purple-300",
    Chairman:      "bg-red-100 text-red-800 border-red-300",
    ViceChairman:  "bg-orange-100 text-orange-800 border-orange-300",
    Treasurer:     "bg-yellow-100 text-yellow-800 border-yellow-400",
    Member:        "bg-green-100 text-green-800 border-green-300",
  };
  const badge = roleColor[member.role] ?? "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`w-60 sm:w-64 m-3 sm:m-4 flex flex-col items-center rounded-2xl overflow-hidden
        shadow-lg border border-gray-200/80 bg-white cursor-pointer select-none
        transition-all duration-500 ease-out
        ${shaking ? "mgmt-shake" : ""}
        ${!flipped ? "mgmt-pulse" : ""}
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
        ${flipped ? "border-orange-400 shadow-2xl -translate-y-2" : "hover:-translate-y-1 hover:shadow-xl hover:border-orange-300"}
      `}
      style={{ transitionProperty: "opacity,transform,box-shadow,border-color" }}
      role="button"
      aria-pressed={flipped}
      title="Click to view details"
    >
      {/* ── FRONT FACE ── */}
      {!flipped ? (
        <>
          {/* Avatar area */}
          <div className="w-full h-48 sm:h-52 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400
                          flex items-center justify-center relative overflow-hidden group">
            <div className="absolute w-32 h-32 rounded-full bg-white/30 blur-xl" />
            <div className="w-24 h-24 rounded-full bg-gray-400/60 border-2 border-white/80
                            flex items-center justify-center shadow-inner relative z-10">
              <svg className="w-14 h-14 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>


          </div>

          {/* Name footer */}
          <div className="w-full px-4 pt-3 pb-3 text-center bg-white border-t border-gray-100 flex flex-col items-center">
            {/* Fixed-height name area keeps badge on same line across all cards */}
            <div className="h-16 flex items-start justify-center w-full">
              <h3
                className="font-bold text-base sm:text-lg text-[#781102] leading-tight tracking-wide"
                style={{ fontFamily: "'Cinzel', 'Marcellus', serif" }}
              >
                {member.name}
              </h3>
            </div>
            <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${badge}`}>
              {member.role}
            </span>
          </div>
        </>
      ) : (
        /* ── BACK FACE (details revealed on click) ── */
        <div className="w-full flex-1 flex flex-col items-center justify-center px-5 py-8 gap-5 mgmt-flip-in
                        bg-gradient-to-b from-orange-50 to-amber-50">
          {/* Role badge */}
          <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${badge}`}>
            {member.role}
          </span>

          {/* Name */}
          <h3
            className="font-bold text-base sm:text-lg text-[#781102] text-center leading-snug"
            style={{ fontFamily: "'Cinzel', 'Marcellus', serif" }}
          >
            {member.name}
          </h3>

          {/* Divider */}
          <div className="w-10 h-[2px] rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />

          {/* Phone */}
          <a
            href={`tel:${member.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 bg-white border border-orange-300 rounded-xl
                       px-4 py-2.5 shadow-sm hover:bg-orange-50 transition-colors group"
          >
            <span className="text-orange-500 text-lg">📞</span>
            <span className="font-semibold text-gray-800 text-sm tracking-wider group-hover:text-orange-700 transition-colors">
              {member.phone}
            </span>
          </a>

          {/* Close hint */}
          <p className="text-[11px] text-gray-400 mt-1">Tap again to close</p>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ManagementPage
───────────────────────────────────────────────────────────── */
const ManagementPage = ({ id }) => {
  const { t } = useLanguage();

  const committeeMembers = [
    { name: "Nallamilli Subha Reddy",         role: "Testator",     phone: "9493793686" },
    { name: "Manda Venkateswara Reddy",        role: "Chairman",     phone: "9849561285" },
    { name: "Nallamilli Venkata Subha Reddy",  role: "ViceChairman", phone: "9701242888" },
    { name: "Kovvuri Satish Reddy",            role: "Treasurer",    phone: "9866766888" },
    { name: "Mallidi Gangi Reddy",             role: "Treasurer",    phone: "9603961699" },
    { name: "Kovvuri Koteswara Reddy",         role: "Member",       phone: "9542141586" },
    { name: "Vogireddy Venkata Reddy",         role: "Member",       phone: "9989547319" },
    { name: "Sabella Srinivasa Reddy",         role: "Member",       phone: "8247411191" },
    { name: "Padala Srinivasa Reddy",          role: "Member",       phone: "7893156999" },
  ];

  return (
    <div id={id} className="bg-gradient-to-b from-orange-50 via-orange-100 to-[#F07A2A] w-full min-h-[100vh] pt-20 pb-16 relative overflow-hidden">
      {/* Rotating flower background */}
      <RotatingFlowers tintColor="rgba(255,255,255,0.5)" />

      {/* TITLE */}
      <div className="relative z-10 text-center px-4">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#800808]" style={{ fontFamily: "'Yatra One', serif" }}>
          {t.management.title}
        </h2>
        <div className="flex justify-center mt-3">
          <img src={bottomBorder} alt="Bottom Border" className="w-48 sm:w-64 md:w-80" />
        </div>
        {/* Global hint text */}
        <p className="mt-4 text-sm text-orange-900/70 font-medium tracking-wide">
          ✨ Click / Tap on any card to reveal details
        </p>
      </div>

      {/* MEMBERS */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-stretch mt-8 px-4 relative z-10">
        {committeeMembers.map((member, index) => (
          <TeamMember
            key={`committee-${index}`}
            member={member}
            delay={index * 120}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagementPage;