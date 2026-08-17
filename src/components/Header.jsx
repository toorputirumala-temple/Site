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
      className="flex items-center justify-between px-6 pt-2 pb-1 fixed w-full z-50"
      style={{
        background:
          "linear-gradient(90deg, rgba(253, 190, 87, 1) 0%, rgba(252, 187, 88, 1) 10%, rgba(244, 119, 40, 1) 40%, rgba(244, 119, 40, 1) 100%)",
        borderBottomLeftRadius: open ? "0px" : "30px",
        borderBottomRightRadius: open ? "0px" : "30px",
        zIndex: "1000",
      }}
    >
      <div className="nav-pattern"></div>

      {/* Desktop Navigation */}
      <div className="logo h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
        <img
          src="/templedata/WhatsApp_Image_2026-05-23_at_4.12.41_PM-removebg-preview.png"
          alt="Temple Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="hidden md:flex items-center gap-6">
        <nav>
          <ul className="flex gap-10 font-bold items-center">
            {navItems.map((item, index) => (
              <li
                key={item.id}
                className={`nav-item text-white cursor-pointer ${
                  activeIndex === index ? "text-blue-900" : ""
                }`}
                onClick={() => handleClick(index, item.id)}
              >
                {item.label}
              </li>
            ))}
            <li>
              <button
                onClick={toggleLang}
                className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-bold border-2 border-orange-600 hover:bg-orange-50 transition-colors"
              >
                {lang === "en" ? "తెలుగు" : "English"}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden z-50">
        {open ? (
          <CloseIcon onClick={toggleMenu} className="cursor-pointer text-3xl text-white" />
        ) : (
          <MenuIcon onClick={toggleMenu} className="cursor-pointer text-3xl text-white" />
        )}
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: "69px",
          background:
            "linear-gradient(90deg, rgba(253, 190, 87, 1) 0%, rgba(252, 187, 88, 1) 10%, rgba(244, 119, 40, 1) 40%, rgba(244, 119, 40, 1) 100%)",
        }}
      >
        <ul className="flex flex-col gap-8 p-8 font-bold h-full">
          {navItems.map((item, index) => (
            <li
              key={item.id}
              className={`nav-item text-white cursor-pointer ${
                activeIndex === index ? "text-blue-900" : ""
              }`}
              onClick={() => handleClick(index, item.id)}
            >
              {item.label}
            </li>
          ))}
          <li>
            <button
              onClick={toggleLang}
              className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-bold border-2 border-orange-600 mt-2"
            >
              {lang === "en" ? "తెలుగు" : "English"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
