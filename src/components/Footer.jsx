import React from "react";
import RotatingFlowers from "./RotatingFlowers";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <div
      className="flex flex-col justify-center items-center px-8 py-8 w-full z-50 relative"
      style={{
        background: "#781102",
      }}
    >
      {/* Rotating flower background */}
      <RotatingFlowers tintColor="rgba(255,190,80,0.55)" />
      <div
        className="text-orange-400 font-sans px-6 py-2 text-center"
      >
        © {new Date().getFullYear()} {t.footer.copyright}
      </div>
      <div className="foot-pattern opacity-20 absolute inset-0 pointer-events-none"></div>
    </div>
  );
};
export default Footer;
