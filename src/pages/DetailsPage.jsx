import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import RotatingFlowers from "../components/RotatingFlowers";

const DetailsPage = ({ id }) => {
  const { t } = useLanguage();

  return (
    <div
      id={id}
      className="w-full min-h-[50vh] flex flex-col md:flex-row py-16 px-4 bg-gradient-to-b from-white to-orange-50 relative overflow-hidden"
    >
      {/* Rotating flower background */}
      <RotatingFlowers tintColor="rgba(244,119,40,0.6)" />
      {/* 🔥 LEFT → IMAGE AREA (Now set to relative) */}
      <div className="w-full md:w-2/5 flex justify-center items-center mb-8 md:mb-0 relative">
        
        {/* 🌀 NEW: ROTATING MANDALA BACKGROUND 🌀 */}
        <img
          src="godmandala.png" /* 👈 CHANGE THIS TO YOUR MANDALA FILENAME */
          alt="Mandala Background"
          className="absolute top-[-4%] left-[-10%]  w-[80%] sm:w-[90%] md:w-[120%] max-w-[1000px] opacity-60 z-0 animate-[spin_40s_linear_infinite]"
        />

        {/* 🕉️ FOREGROUND GOD IMAGE (Z-index added to sit on top) */}
        <img
          src="god-bg.png"   
          alt="Temple"
          className="relative z-10 max-h-[1000px] md:max-h-[1050px] object-contain opacity-95 drop-shadow-[0_0_25px_black]"
        />
      </div>

      {/* 🔥 RIGHT → CONTENT */}
      <div className="w-full md:w-2/3 max-w-4xl mx-auto flex flex-col items-center z-10">
        
        <h2 className="text-center text-4xl font-extrabold text-red-900 underline mb-8">
          {t.details.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
          
          {/* Admin & Transport */}
          <div className="bg-orange-50 rounded-lg p-6 shadow border border-orange-200">
            <h3 className="text-xl font-bold text-orange-800 mb-2">
              {t.details.admin}
            </h3>
            <p className="text-gray-700">{t.details.adminVal}</p>

            <h3 className="text-xl font-bold text-orange-800 mt-6 mb-2">
              {t.details.transport}
            </h3>
            <p className="text-gray-700">{t.details.transportVal}</p>
          </div>

          {/* Location */}
          <div className="bg-orange-50 rounded-lg p-6 shadow border border-orange-200">
            <h3 className="text-xl font-bold text-orange-800 mb-2">
              {t.details.location}
            </h3>
            <p className="text-gray-700">{t.details.locationVal}</p>
            
            <h3 className="text-xl font-bold text-orange-800 mt-6 mb-2">
              {t.details.coords}
            </h3>
            <p className="text-gray-700">{t.details.coordsVal}</p>
          </div>

          {/* Geography */}
          <div className="bg-orange-50 rounded-lg p-6 shadow border border-orange-200 md:col-span-2">
            <h3 className="text-xl font-bold text-orange-800 mb-2">
              {t.details.geography}
            </h3>
            <p className="text-gray-700">{t.details.geographyVal}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsPage;