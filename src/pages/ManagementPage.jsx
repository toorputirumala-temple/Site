import React, { useEffect, useRef, useState } from "react";
import bottomBorder from "../assets/title-img-orange.svg";
import RotatingFlowers from "../components/RotatingFlowers";
import { useLanguage } from "../contexts/LanguageContext";

const TeamMember = ({ name, delay }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`w-60 sm:w-64 m-3 sm:m-4 flex flex-col items-center rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 bg-white transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-orange-400 cursor-pointer group ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      {/* Grey User Card Top Avatar Area */}
      <div className="w-full h-48 sm:h-52 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden group-hover:from-gray-300 group-hover:to-gray-400 transition-colors">
        {/* Subtle background glow */}
        <div className="absolute w-32 h-32 rounded-full bg-white/30 blur-xl" />
        
        {/* Grey User Avatar Icon */}
        <div className="w-24 h-24 rounded-full bg-gray-400/60 border-2 border-white/80 flex items-center justify-center shadow-inner relative z-10 group-hover:scale-105 transition-transform">
          <svg className="w-14 h-14 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Card Footer with Name */}
      <div className="w-full p-4 text-center bg-white border-t border-gray-100 flex items-center justify-center min-h-[72px]">
        <h3
          className="font-bold text-base sm:text-lg text-[#781102] group-hover:text-orange-600 transition-colors leading-tight tracking-wide"
          style={{ fontFamily: "'Cinzel', 'Marcellus', serif" }}
        >
          {name}
        </h3>
      </div>
    </div>
  );
};

const ManagementPage = ({ id }) => {
  const { t } = useLanguage();

  const committeeMembers = [
    "Nallamilli Subha Reddy",
    "Manda Venkateswara Reddy",
    "Nallamilli Venkata Subha Reddy",
    "Kovvuri Satish Reddy",
    "Mallidi Gangi Reddy",
    "Kovvuri Koteswara Reddy",
    "Vogireddy Venkata Reddy",
    "Sabella Srinivasa Reddy",
    "Padala Srinivasa Reddy",
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
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-stretch mt-10 px-4 relative z-10">
        {committeeMembers.map((memberName, index) => (
          <TeamMember
            key={`committee-${index}`}
            name={memberName}
            delay={index * 120}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagementPage;