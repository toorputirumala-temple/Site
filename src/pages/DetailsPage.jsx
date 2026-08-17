import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import RotatingFlowers from "../components/RotatingFlowers";

const DetailsPage = ({ id }) => {
  const { t } = useLanguage();

  return (
    <div
      id={id}
      className="w-full min-h-[50vh] flex flex-col lg:flex-row items-center justify-between py-16 px-4 sm:px-8 bg-gradient-to-b from-white via-orange-50/50 to-orange-50 relative overflow-hidden"
    >
      {/* Rotating flower background */}
      <RotatingFlowers tintColor="rgba(244,119,40,0.6)" />
      
      {/* 🔥 LEFT → IMAGE AREA */}
      <div className="w-full lg:w-5/12 flex justify-center items-center mb-10 lg:mb-0 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
        {/* 🌀 ROTATING MANDALA BACKGROUND (Centering container prevents spin transform override) 🌀 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img
            src="godmandala.png"
            alt="Mandala Background"
            className="w-[85%] sm:w-[90%] max-w-[480px] aspect-square object-contain opacity-40 animate-[spin_40s_linear_infinite]"
          />
        </div>

        {/* 🕉️ FOREGROUND GOD IMAGE */}
        <img
          src="god-bg.png"   
          alt="Temple"
          className="relative z-10 max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] object-contain opacity-95 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
        />
      </div>

      {/* 🔥 RIGHT → CONTENT */}
      <div className="w-full lg:w-7/12 max-w-4xl flex flex-col items-center z-10 px-2 sm:px-4">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-red-900 underline mb-8" style={{ fontFamily: "'Yatra One', serif" }}>
          {t.details.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full mt-4">
          
          {/* Admin & Transport */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-orange-200/80 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-orange-800 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.details.admin}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{t.details.adminVal}</p>

            <h3 className="text-xl font-bold text-orange-800 mt-6 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.details.transport}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{t.details.transportVal}</p>
          </div>

          {/* Location */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-orange-200/80 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-orange-800 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.details.location}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{t.details.locationVal}</p>
            
            <h3 className="text-xl font-bold text-orange-800 mt-6 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.details.coords}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{t.details.coordsVal}</p>
          </div>

          {/* Geography */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-orange-200/80 md:col-span-2 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-orange-800 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.details.geography}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{t.details.geographyVal}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsPage;