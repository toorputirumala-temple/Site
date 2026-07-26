import React from "react";
import "../App.css";
// Import images
import devi from "../images/devii.png";
import toranLeft from "../images/Toran-left.svg";
import toranRight from "../images/Toran-right.svg";
import diya from "../images/diya.gif";
import { useLanguage } from "../contexts/LanguageContext";
import RotatingFlowers from "../components/RotatingFlowers";

const LandingPage = () => {
  const { t } = useLanguage();
  
  return (
    <div
      className="h-[100vh] w-full bg-[#fcf0d8] relative overflow-hidden"
      // style={{
      //   backgroundImage: `url(${bgTemple})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      {/* Rotating flower background */}
      <RotatingFlowers tintColor="rgba(212,175,55,0.7)" />
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
<div className="absolute top-[120px] md:top-[160px] w-full text-center z-[100] px-4 md:px-12 flex flex-col items-center justify-center">
  <h3
    className="templename font-extrabold leading-tight tracking-wide"
    style={{
      fontSize: "clamp(1.50rem, 3.5vw, 3.25rem)",
      fontFamily: "'Yatra One', sans-serif",
      color: "#800808",
      textShadow: "1px 1px 0px #fff, 2px 2px 5px rgba(212, 175, 55, 0.5)",
      letterSpacing: "0.03em",
    }}
  >
    {t.hero.title}
  </h3>
  <div className="w-24 md:w-36 h-[2px] bg-gradient-to-r from-transparent via-[#f47728] to-transparent my-3 md:my-4"></div>
  <p 
    className="text-base md:text-xl font-bold tracking-widest text-[#f47728] uppercase"
    style={{
      fontFamily: "'Outfit', sans-serif",
      textShadow: "1px 1px 0px rgba(255, 255, 255, 0.5)",
    }}
  >
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
        className="absolute base bottom-0 w-full h-20 md:h-24 z-10"
        style={{
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Aasan */}
      <div
        className="absolute aasan bottom-0 w-[320px] sm:w-[360px] md:w-[560px] lg:w-[620px] h-[90px] md:h-[130px] lg:h-[150px] left-0 right-0 mx-auto z-[15]"
        style={{
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
        }}
      ></div>

      {/* Middle Chakra */}
      <div
        className="absolute middle_chakra chakra animate-spin-slow
        bottom-[90px] sm:bottom-[110px] md:bottom-[150px] lg:bottom-[180px] w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 left-0 right-0 mx-auto opacity-20 z-0"
        style={{
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Devi Pic */}
      <div
        className="absolute bottom-0 w-[300px] sm:w-[350px] md:w-[480px] lg:w-[540px] h-[320px] sm:h-[370px] md:h-[490px] lg:h-[550px] left-0 right-0 mx-auto z-20 animate-slideInUp overflow-hidden"
        style={{
          borderRadius: "50% 50% 0 0",
          border: "6px double #D4AF37",
          boxShadow: "0 0 25px rgba(212, 175, 55, 0.6), inset 0 0 30px rgba(0,0,0,0.8)",
        }}
      >
        <img
          src={devi}
          alt="Deities"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center top",
          }}
        />
      </div>
    </div>
  );
};

export default LandingPage;
