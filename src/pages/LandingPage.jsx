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
    <div className="min-h-screen md:h-screen w-full bg-gradient-to-b from-[#fcf0d8] via-[#faebd0] to-[#f6dfab] relative overflow-hidden flex flex-col justify-between pt-[85px] md:pt-[95px] pb-0">
      {/* Background Rotating Flower Mandalas */}
      <RotatingFlowers tintColor="rgba(212,175,55,0.7)" />

      {/* Left Decorative Toran (Aligned seamlessly right below top header) */}
      <div
        className="absolute top-[60px] md:top-[64px] left-0 h-[90px] sm:h-[130px] md:h-[220px] lg:h-[280px] w-[35vw] max-w-[320px] bg-no-repeat bg-left-top bg-contain pointer-events-none z-10 animate-slideInLeft"
        style={{
          backgroundImage: `url(${toranLeft})`,
        }}
      />

      {/* Right Decorative Toran (Aligned seamlessly right below top header) */}
      <div
        className="absolute top-[60px] md:top-[64px] right-0 h-[90px] sm:h-[130px] md:h-[220px] lg:h-[280px] w-[35vw] max-w-[320px] bg-no-repeat bg-right-top bg-contain pointer-events-none z-10 animate-slideInRight"
        style={{
          backgroundImage: `url(${toranRight})`,
        }}
      />

      {/* Traditional Side Lamps / Diyas */}
      <div
        className="hidden xl:block absolute top-[150px] left-[3%] h-24 w-24 z-20 opacity-90 pointer-events-none"
        style={{
          backgroundImage: `url(${diya})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      <div
        className="hidden xl:block absolute top-[150px] right-[3%] h-24 w-24 z-20 opacity-90 pointer-events-none"
        style={{
          backgroundImage: `url(${diya})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          transform: "scaleX(-1)",
        }}
      />

      {/* Main Temple Header Content */}
      <div className="relative z-30 w-full text-center px-1 sm:px-4 max-w-6xl mx-auto flex flex-col items-center justify-center mt-1 md:mt-2 mb-2 shrink-0">
        <h1
          className="templename font-extrabold leading-tight tracking-normal transition-all w-full"
          style={{
            fontSize: "clamp(0.88rem, 2.5vw, 2.35rem)",
            fontFamily: "'Yatra One', sans-serif",
            color: "#800808",
            textShadow: "0 1px 2px rgba(255,255,255,0.8), 0 3px 12px rgba(212, 175, 55, 0.45)",
            letterSpacing: "0.01em",
          }}
        >
          <span className="block whitespace-nowrap">{t.hero.title.split(" ").slice(0, 4).join(" ")}</span>
          <span className="block whitespace-nowrap">{t.hero.title.split(" ").slice(4).join(" ")}</span>
        </h1>

        {/* Ornate Gold Divider */}
        <div className="flex items-center justify-center gap-3 my-1.5 sm:my-2.5 w-full">
          <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#f47728] to-[#f47728]"></div>
          <span className="text-[#f47728] text-xs sm:text-base font-bold">✦ ॐ ✦</span>
          <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#f47728] to-[#f47728]"></div>
        </div>

        <p
          className="text-xs sm:text-sm md:text-lg font-extrabold tracking-widest text-[#d9651a] uppercase"
          style={{
            fontFamily: "'Outfit', sans-serif",
            textShadow: "0 1px 1px rgba(255, 255, 255, 0.7)",
          }}
        >
          {t.hero.subtitle}
        </p>
      </div>

      {/* Divine Deity Hero Image Section */}
      <div className="relative z-20 flex justify-center items-end mt-auto w-full px-2 animate-slideInUp grow-0">
        {/* Deity Container (Holds image + locked spinning chakra alignment) */}
        <div className="relative flex items-end justify-center z-10">
          {/* Golden Spinning Chakra - Perfect Centered Axis behind Deity Arch */}
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center">
            <div
              className="chakra animate-spin-slow w-[340px] h-[340px] xs:w-[400px] xs:h-[400px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] lg:w-[620px] lg:h-[620px] opacity-55"
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: "drop-shadow(0 0 24px rgba(212,175,55,0.85))",
              }}
            />
          </div>

          {/* Soft Glowing Golden Radial Aura behind Deity Arch */}
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] xs:w-[380px] sm:w-[460px] md:w-[540px] lg:w-[600px] h-[320px] xs:h-[380px] sm:h-[460px] md:h-[540px] lg:h-[600px] bg-gradient-to-t from-amber-400/50 via-yellow-300/30 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

          {/* Deity Front PNG (Clean transparent idol) */}
          <img
            src={devi}
            alt="Sri Prasanna Venkateswara Swamy"
            className="h-[46vh] xs:h-[48vh] sm:h-[52vh] md:h-[50vh] lg:h-[52vh] max-h-[520px] min-h-[310px] w-auto max-w-[95vw] object-contain drop-shadow-[0_12px_28px_rgba(212,175,55,0.5)] transition-all duration-300 relative z-10"
          />
        </div>
      </div>

      {/* Ground Golden Platform Line */}
      <div className="absolute bottom-0 w-full h-6 md:h-10 bg-gradient-to-t from-[#e6ca85] via-[#f0d89e]/60 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default LandingPage;
