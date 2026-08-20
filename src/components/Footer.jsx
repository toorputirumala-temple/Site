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
      {/* Contact Info */}
      <div className="flex flex-col items-center gap-1 mb-3 text-center">
        <div className="flex items-center gap-2 text-orange-200 text-sm font-sans">
          <span>✉</span>
          <a
            href="mailto:toorputirumala@gmail.com"
            className="hover:text-orange-400 transition-colors duration-200 underline underline-offset-2"
          >
            toorputirumala@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2 text-orange-200 text-sm font-sans">
          <span>📞</span>
          <a
            href="tel:+919963923129"
            className="hover:text-orange-400 transition-colors duration-200"
          >
            +91 99639 23129
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-orange-400 font-sans px-6 py-2 text-center">
        © {new Date().getFullYear()} {t.footer.copyright}
      </div>

      {/* Made by Omnitensors */}
      <div className="text-orange-300 text-xs font-sans mt-1 opacity-80 text-center">
        Made with ❤️ by{" "}
        <a
          href="https://www.omnitensors.in/team"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-orange-100 transition-colors duration-200"
        >
          Omnitensors
        </a>
      </div>

      <div className="foot-pattern opacity-20 absolute inset-0 pointer-events-none"></div>
    </div>
  );
};
export default Footer;
