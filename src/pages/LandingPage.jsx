import React from "react";
import "../App.css";
// Import images
import devi from "../images/devii.png";
import toranLeft from "../images/Toran-left.svg";
import toranRight from "../images/Toran-right.svg";
import diya from "../images/diya.gif";
import { useLanguage } from "../contexts/LanguageContext";

const LandingPage = () => {
  const { t } = useLanguage();
  
  return (
    <div
      className="h-[100vh] w-[100vw] bg-[#fcf0d8] relative"
      // style={{
      //   backgroundImage: `url(${bgTemple})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      {/* Left Toran */}
      <div
        className="absolute top-[75px] left-0 md:h-[450px] w-[50vw] bg-no-repeat bg-left bg-contain sm:h-[250px] xs:h-[250px] animate-slideInLeft"
        style={{
          backgroundImage: `url(${toranLeft})`,
        }}
      ></div>

      {/* Right Toran */}
      <div
        className="absolute top-[75px] right-0 md:h-[450px] w-[50vw] bg-no-repeat bg-right bg-contain sm:h-[250px] xs:h-[250px] animate-slideInRight"
        style={{
          backgroundImage: `url(${toranRight})`,
        }}
      ></div>

      <div
        className="absolute md:top-[77px] md:left-[15%] xs:w-0 h-48 md:w-full z-30"
        style={{
          backgroundImage: `url(${diya})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",

        }}
      ></div>
<div className="absolute top-[85px] w-full text-center z-[100] px-4">
  <h3
    className="templename font-bold leading-tight"
    style={{
      fontSize: "2.75rem", /* Custom size between 4xl (2.25rem) and 5xl (3rem) */
      background: "linear-gradient(90deg, rgba(253, 190, 87, 1) 0%, rgba(252, 187, 88, 1) 10%, rgba(244, 119, 40, 1) 40%, rgba(244, 119, 40, 1) 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {t.hero.title}
  </h3>
  <p className="text-xl md:text-2xl font-semibold mt-4 text-[#f47728]">
    {t.hero.subtitle}
  </p>
</div>
      <div className="absolute top-[77px] right-[15%] xs:w-0 h-full md:w-full z-30">
        <div
          className="h-48 w-full"
          style={{
            backgroundImage: `url(${diya})`,
            backgroundRepeat: "no-repeat",
            // backgroundPosition: "center",
            backgroundSize: "contain",
            transform: "rotate(180deg) scaleY(-1)", // Flip vertically for reflection effect
          }}
        ></div>
      </div>

      {/* Chakra */}
      <div
        className="absolute chakra md:top-[40%] md:left-[20%] md:h-28 md:w-28 opacity-30 animate-spin-slow
            xs:left-[10%] xs:h-20 xs:w-20 xs:top-[45%]
        "
        style={{
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="absolute chakra md:top-[40%] md:right-[20%] md:h-28 md:w-28 opacity-30 animate-spin-slow
            xs:right-[10%] xs:h-20 xs:w-20 xs:top-[30%]
        "
        style={{
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="absolute chakra top-0 left-[-50px] md:h-40 md:w-40 opacity-40 animate-spin-slow
            xs:h-32 xs:w-32
        "
        style={{
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="absolute chakra top-0 right-[-50px] md:h-40 md:w-40 opacity-40 animate-spin-slow
            xs:h-32 xs:w-32
        "
        style={{
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Base */}
      <div
        className="absolute base bottom-0 w-full h-24"
        style={{
          backgroundSize: "contain",
        }}
      ></div>

      {/* Aasan */}
      <div
        className="absolute aasan bottom-[95px] md:bottom-[95px] w-[400px] md:w-[695px] h-[200px] md:h-[240px] left-0 right-0 mx-auto xs:bottom-[62px]"
        style={{
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Middle Chakra */}
      <div
        className="absolute middle_chakra chakra animate-spin-slow
        bottom-[200px] md:bottom-[250px] w-36 h-36 md:w-48 md:h-48 left-0 right-0 mx-auto"
        style={{
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Devi Pic */}
      <div
        className="absolute bottom-8 md:bottom-[40px] w-[250px] md:w-[420px] h-[250px] md:h-[420px] left-0 right-0 mx-auto z-10 animate-slideInUp"
        style={{
          backgroundImage: `url(${devi})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default LandingPage;
