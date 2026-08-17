import React from "react";
import "../App.css";
// Import images
import devi from "../images/deity_front.png";
import toranLeft from "../images/Toran-left.svg";
import toranRight from "../images/Toran-right.svg";
import diya from "../images/diya.gif";
import { useLanguage } from "../contexts/LanguageContext";
import RotatingFlowers from "../components/RotatingFlowers";

const LandingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#fcf0d8] via-[#faebd0] to-[#f6dfab] relative overflow-hidden flex flex-col justify-between pt-[64px] sm:pt-[72px] pb-0">
      {/* Background Rotating Flower Mandalas */}
      <RotatingFlowers tintColor="rgba(212,175,55,0.7)" />

      {/* Left Decorative Toran (Aligned seamlessly right below top header) */}
      <div
        className="absolute top-[56px] sm:top-[60px] left-0 h-[70px] sm:h-[110px] md:h-[180px] lg:h-[240px] w-[30vw] max-w-[280px] bg-no-repeat bg-left-top bg-contain pointer-events-none z-10 animate-slideInLeft"
        style={{
          backgroundImage: `url(${toranLeft})`,
        }}
      />

      {/* Right Decorative Toran (Aligned seamlessly right below top header) */}
      <div
        className="absolute top-[56px] sm:top-[60px] right-0 h-[70px] sm:h-[110px] md:h-[180px] lg:h-[240px] w-[30vw] max-w-[280px] bg-no-repeat bg-right-top bg-contain pointer-events-none z-10 animate-slideInRight"
        style={{
          backgroundImage: `url(${toranRight})`,
        }}
      />

      {/* Traditional Side Lamps / Diyas */}
      <div
        className="hidden xl:block absolute top-[140px] left-[3%] h-20 w-20 z-20 opacity-90 pointer-events-none"
        style={{
          backgroundImage: `url(${diya})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      <div
        className="hidden xl:block absolute top-[140px] right-[3%] h-20 w-20 z-20 opacity-90 pointer-events-none"
        style={{
          backgroundImage: `url(${diya})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          transform: "scaleX(-1)",
        }}
      />

      {/* Main Temple Header Content */}
      <div className="relative z-30 w-full text-center px-3 sm:px-6 max-w-5xl mx-auto flex flex-col items-center justify-center pt-3 sm:pt-4 pb-1 shrink-0">
        <h1
          className="templename font-extrabold leading-tight tracking-normal transition-all w-full text-center"
          style={{
            fontSize: "clamp(1.05rem, 3.2vw, 2.3rem)",
            fontFamily: "'Yatra One', sans-serif",
            color: "#800808",
            textShadow: "0 1px 2px rgba(255,255,255,0.8), 0 3px 12px rgba(212, 175, 55, 0.45)",
            letterSpacing: "0.01em",
          }}
        >
          <span className="inline-block px-1">{t.hero.title}</span>
        </h1>

        {/* Ornate Gold Divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 my-1.5 sm:my-2 w-full">
          <div className="h-[2px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-[#f47728] to-[#f47728]"></div>
          <span className="text-[#f47728] text-xs sm:text-base font-bold">✦ ॐ ✦</span>
          <div className="h-[2px] w-10 sm:w-20 bg-gradient-to-l from-transparent via-[#f47728] to-[#f47728]"></div>
        </div>

        <p
          className="text-xs sm:text-sm md:text-base font-extrabold tracking-widest text-[#d9651a] uppercase text-center px-2"
          style={{
            fontFamily: "'Outfit', sans-serif",
            textShadow: "0 1px 1px rgba(255, 255, 255, 0.7)",
          }}
        >
          {t.hero.subtitle}
        </p>
      </div>

      {/* Divine Deity Hero Image Section */}
      <div className="relative z-20 flex justify-center items-end mt-auto w-full px-2 animate-slideInUp shrink min-h-0">
        {/* Deity Container (Holds image + locked spinning chakra alignment) */}
        <div className="relative flex items-end justify-center z-10 w-full">
          {/* Golden Spinning Chakra - Perfect Centered Axis behind Deity Arch */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center">
            <div
              className="chakra animate-spin-slow w-[260px] h-[260px] xs:w-[320px] xs:h-[320px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] lg:w-[560px] lg:h-[560px] opacity-55"
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: "drop-shadow(0 0 24px rgba(212,175,55,0.85))",
              }}
            />
          </div>

          {/* Soft Glowing Golden Radial Aura behind Deity Arch */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] xs:w-[300px] sm:w-[400px] md:w-[480px] lg:w-[540px] h-[250px] xs:h-[300px] sm:h-[400px] md:h-[480px] lg:h-[540px] bg-gradient-to-t from-amber-400/50 via-yellow-300/30 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

          {/* Deity Front PNG (Clean transparent idol) */}
          <img
            src={devi}
            alt="Sri Prasanna Venkateswara Swamy"
            className="h-[42vh] xs:h-[45vh] sm:h-[48vh] md:h-[50vh] max-h-[480px] min-h-[220px] w-auto max-w-[95vw] object-contain drop-shadow-[0_12px_28px_rgba(212,175,55,0.5)] transition-all duration-300 relative z-10"
          />
        </div>
      </div>

      {/* Ground Golden Platform Line */}
      <div className="absolute bottom-0 w-full h-4 sm:h-8 bg-gradient-to-t from-[#e6ca85] via-[#f0d89e]/60 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default LandingPage;
