import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLanguage } from "../contexts/LanguageContext";

const Header = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const forceUpdate = () => setActiveIndex(null);

  const handleClick = (index, id) => {
    if (id === "gallery") {
      forceUpdate();
    }
    setActiveIndex(index);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  const navItems = [
    { id: "events", label: t.nav.events },
    { id: "details", label: t.nav.details },
    { id: "management", label: t.nav.management },
    { id: "gallery", label: t.nav.gallery },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <div
      className="flex items-center justify-between px-4 sm:px-8 py-2 fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md"
      style={{
        background:
          "linear-gradient(90deg, rgba(253, 190, 87, 1) 0%, rgba(252, 187, 88, 1) 10%, rgba(244, 119, 40, 1) 40%, rgba(244, 119, 40, 1) 100%)",
        borderBottomLeftRadius: open ? "0px" : "20px",
        borderBottomRightRadius: open ? "0px" : "20px",
        zIndex: "1000",
      }}
    >
      <div className="nav-pattern"></div>

      {/* Logo & Temple Title */}
      <div className="flex items-center gap-3 relative z-10 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div className="logo h-11 w-11 sm:h-13 sm:w-13 md:h-14 md:w-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-amber-200/60 shadow-inner bg-black/40">
          <img
            src="/templedata/WhatsApp_Image_2026-05-23_at_4.12.41_PM-removebg-preview.png"
            alt="Temple Logo"
            className="h-full w-full object-contain p-0.5"
          />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 relative z-10">
        <nav>
          <ul className="flex gap-6 lg:gap-8 font-bold items-center text-sm lg:text-base">
            {navItems.map((item, index) => (
              <li
                key={item.id}
                className={`nav-item text-white cursor-pointer hover:text-amber-100 transition-colors ${
                  activeIndex === index ? "text-amber-200" : ""
                }`}
                onClick={() => handleClick(index, item.id)}
              >
                {item.label}
              </li>
            ))}
            <li>
              <button
                onClick={toggleLang}
                className="bg-white text-orange-600 px-3.5 py-1 rounded-full text-xs lg:text-sm font-extrabold border-2 border-white shadow-sm hover:bg-orange-50 hover:scale-105 transition-all"
              >
                {lang === "en" ? "తెలుగు" : "English"}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden relative z-50 flex items-center gap-3">
        <button
          onClick={toggleLang}
          className="bg-white text-orange-600 px-2.5 py-1 rounded-full text-xs font-bold border border-white shadow-sm"
        >
          {lang === "en" ? "తెలుగు" : "English"}
        </button>
        {open ? (
          <CloseIcon onClick={toggleMenu} className="cursor-pointer text-3xl text-white" />
        ) : (
          <MenuIcon onClick={toggleMenu} className="cursor-pointer text-3xl text-white" />
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      <nav
        className={`fixed top-0 left-0 w-full transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: "60px",
          background:
            "linear-gradient(135deg, rgba(253, 190, 87, 0.98) 0%, rgba(244, 119, 40, 0.98) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <ul className="flex flex-col gap-6 p-8 font-bold text-lg">
          {navItems.map((item, index) => (
            <li
              key={item.id}
              className={`nav-item text-white cursor-pointer border-b border-white/20 pb-3 ${
                activeIndex === index ? "text-amber-200" : ""
              }`}
              onClick={() => handleClick(index, item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
