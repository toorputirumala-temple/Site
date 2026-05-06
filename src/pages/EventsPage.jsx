import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Mandir from "../images/Mandir.svg";
import diya from "../images/Diya.svg";

const TempleEvent = ({ id }) => {
  const { t } = useLanguage();

  return (
    <div
      id={id}
      style={{
        backgroundImage: "linear-gradient(to bottom, rgb(244, 119, 40) 50%, #fff7e7 50%)",
        backgroundSize: "90% 110%",
        minHeight: "80vh",
        position: "relative",
      }}
    >
      <div className="top-pattern"></div>

      <section className="events-section py-12 text-center overflow-hidden relative min-h-[80vh]">
        <div
          className="absolute md:top-0 md:left-0 xs:w-0 h-48 md:w-full z-20"
          style={{
            backgroundImage: `url(${diya})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            pointerEvents: "none",
          }}
        ></div>

        <div className="absolute top-0 right-0 xs:w-0 h-full md:w-full z-20">
          <div
            className="h-48 w-full"
            style={{
              backgroundImage: `url(${diya})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              transform: "rotate(180deg) scaleY(-1)",
              pointerEvents: "none",
            }}
          ></div>
        </div>
        <div
          className="absolute top-[80px] left-0 md:h-[300px] w-[50vw] bg-no-repeat bg-left bg-contain sm:h-[250px] xs:h-[250px] animate-slideInLeft opacity-30"
          style={{
            backgroundImage: `url(${Mandir})`,
          }}
        ></div>
        <div
          className="absolute top-[80px] right-0 md:h-[300px] w-[50vw] bg-no-repeat bg-right bg-contain sm:h-[250px] xs:h-[250px] animate-slideInRight opacity-30"
          style={{
            backgroundImage: `url(${Mandir})`,
          }}
        ></div>

        <div className="relative z-30 max-w-5xl mx-auto px-4 mt-24">
          <h2 className="text-4xl mb-12 text-white font-extrabold shadow-sm">
            {t.events.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 
hover:bg-[#ff840a] hover:text-white 
hover:scale-105 hover:-translate-y-2 
hover:shadow-[0_0_40px_rgba(255,132,10,0.6)] 
transition-all duration-300 group">
              <img src="https://cdn-icons-png.flaticon.com/512/8574/8574987.png" alt="Events" className="h-16 w-16 mb-4 mx-auto" />
              <h3 className="text-2xl text-[#182856] mb-4 font-bold group-hover:text-white">
                {t.nav.events}
              </h3>
              <p className="text-gray-700 group-hover:text-gray-300 text-lg leading-relaxed text-justify">
                {t.events.eventsText}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 
hover:bg-[#ff840a] hover:text-white 
hover:scale-105 hover:-translate-y-2 
hover:shadow-[0_0_40px_rgba(255,132,10,0.6)] 
transition-all duration-300 group">
              <img src="https://cdn-icons-png.flaticon.com/512/4791/4791033.png" alt="Facilities" className="h-16 w-16 mb-4 mx-auto" />
              <h3 className="text-2xl text-[#182856] mb-4 font-bold group-hover:text-white">
                {t.events.facilities}
              </h3>
              <p className="text-gray-700 group-hover:text-gray-300 text-lg leading-relaxed text-justify">
                {t.events.facilitiesText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TempleEvent;
