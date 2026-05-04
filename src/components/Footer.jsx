import React from "react";

const Footer = () => {
  return (
    <div
      className="flex flex-col justify-center items-center px-8 py-8 w-full z-50 relative"
      style={{
        background: "#781102",
      }}
    >
      <div
        className="text-orange-400 font-sans px-6 py-2 text-center"
      >
        &copy; {new Date().getFullYear()} Sridevi Bhoodevi Sametha Sri Prasanna Venkateswara Swamy Devasthanam, Balabhadrapuram.
      </div>
      <div className="foot-pattern opacity-20 absolute inset-0 pointer-events-none"></div>
    </div>
  );
};
export default Footer;
