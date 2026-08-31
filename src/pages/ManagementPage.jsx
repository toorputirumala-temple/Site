import React, { useEffect, useRef, useState } from "react";
import bottomBorder from "../assets/title-img-orange.svg";
import RotatingFlowers from "../components/RotatingFlowers";
import { useLanguage } from "../contexts/LanguageContext";

const roleTranslations = {
  en: {
    Testator: "Testator",
    Chairman: "Chairman",
    ViceChairman: "Vice Chairman",
    Treasurer: "Treasurer",
    Member: "Member",
  },
  te: {
    Testator: "దాత",
    Chairman: "ఛైర్మన్",
    ViceChairman: "వైస్ ఛైర్మన్",
    Treasurer: "కోశాధికారి",
    Member: "సభ్యులు",
  },
};

/* ─────────────────────────────────────────────────────────────
   TeamMember card component
───────────────────────────────────────────────────────────── */
const TeamMember = ({ member, delay, lang }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  /* Entrance animation via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
          }, delay);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  /* Role badge colours */
  const roleColor = {
    Testator:      "bg-purple-100 text-purple-800 border-purple-300",
    Chairman:      "bg-red-100 text-red-800 border-red-300",
    ViceChairman:  "bg-orange-100 text-orange-800 border-orange-300",
    Treasurer:     "bg-yellow-100 text-yellow-800 border-yellow-400",
    Member:        "bg-green-100 text-green-800 border-green-300",
  };
  const badge = roleColor[member.role] ?? "bg-gray-100 text-gray-700 border-gray-300";
  const displayName = lang === "te" ? member.nameTe : member.nameEn;
  const displayRole = roleTranslations[lang]?.[member.role] ?? member.role;

  return (
    <div
      ref={ref}
      className={`w-60 sm:w-64 m-3 sm:m-4 flex flex-col items-center rounded-2xl overflow-hidden
        shadow-lg border border-gray-200/80 bg-white select-none
        transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-orange-400
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
      `}
      style={{ transitionProperty: "opacity,transform,box-shadow,border-color" }}
    >
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

      {/* Name & Role footer */}
      <div className="w-full px-4 pt-4 pb-4 text-center bg-white border-t border-gray-100 flex flex-col items-center">
        <div className="h-14 flex items-center justify-center w-full">
          <h3
            className="font-bold text-base sm:text-lg text-[#781102] leading-tight tracking-wide"
            style={{ fontFamily: lang === "te" ? "'Outfit', 'Noto Sans Telugu', sans-serif" : "'Cinzel', 'Marcellus', serif" }}
          >
            {displayName}
          </h3>
        </div>
        <span className={`text-[11px] font-semibold px-3 py-1 mt-1 rounded-full border ${badge}`}>
          {displayRole}
        </span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ManagementPage
───────────────────────────────────────────────────────────── */
const ManagementPage = ({ id }) => {
  const { t, lang } = useLanguage();

  const committeeMembers = [
    {
      nameEn: "Nallamilli Subha Reddy",
      nameTe: "నల్లమిల్లి సుబ్బారెడ్డి",
      role: "Testator",
    },
    {
      nameEn: "Manda Venkateswara Reddy",
      nameTe: "మందా వెంకటేశ్వరరెడ్డి",
      role: "Chairman",
    },
    {
      nameEn: "Nallamilli Venkata Subha Reddy",
      nameTe: "నల్లమిల్లి వెంకట సుబ్బారెడ్డి",
      role: "ViceChairman",
    },
    {
      nameEn: "Kovvuri Satish Reddy",
      nameTe: "కొవ్వూరి సతీష్ రెడ్డి",
      role: "Treasurer",
    },
    {
      nameEn: "Mallidi Ganga Reddy",
      nameTe: "మల్లిడి గంగారెడ్డి",
      role: "Treasurer",
    },
    {
      nameEn: "Kovvuri Koteswara Reddy",
      nameTe: "కొవ్వూరి కోటేశ్వరరెడ్డి",
      role: "Member",
    },
    {
      nameEn: "Vogireddy Venkata Reddy",
      nameTe: "వోగిరెడ్డి వెంకటరెడ్డి",
      role: "Member",
    },
    {
      nameEn: "Sabella Srinivasa Reddy",
      nameTe: "సబెళ్ల శ్రీనివాసరెడ్డి",
      role: "Member",
    },
    {
      nameEn: "Padala Srinivasa Reddy",
      nameTe: "పడాల శ్రీనివాసరెడ్డి",
      role: "Member",
    },
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
      </div>

      {/* MEMBERS */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-stretch mt-8 px-4 relative z-10">
        {committeeMembers.map((member, index) => (
          <TeamMember
            key={`committee-${index}`}
            member={member}
            delay={index * 120}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagementPage;