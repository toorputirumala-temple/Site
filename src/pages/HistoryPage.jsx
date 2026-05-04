import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../App.css";
import { useLanguage } from "../contexts/LanguageContext";

const HistoryPage = ({ id }) => {
  const containerRef = useRef(null);
  const { t } = useLanguage();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const cards = containerRef.current.querySelectorAll('.timeline-card');
          gsap.fromTo(
            cards,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
          );
          
          gsap.fromTo(
            containerRef.current.querySelectorAll('.history-text'),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
          );
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id={id} className="w-full min-h-screen flex flex-col items-center py-20 px-4 bg-gradient-to-br from-[#fffdf9] to-[#ffeeda] overflow-hidden" ref={containerRef}>
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-[#ef5521] mb-16 drop-shadow-sm tracking-wide">
        {t.history.title}
      </h2>
      
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
        
        {/* Timeline Section */}
        <div className="w-full lg:w-1/2 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-12 bottom-0 w-1 bg-gradient-to-b from-[#ef5521] to-[#ffb16a] rounded-full shadow-[0_0_8px_rgba(239,85,33,0.5)]"></div>
          
          <h3 className="text-3xl font-bold text-red-900 mb-10 ml-16 timeline-card">{t.history.timeline}</h3>
          
          <div className="space-y-10">
            {[t.history.year2012, t.history.year2014, t.history.year2014_2026].map((item, idx) => {
              const splitIndex = item.indexOf(':');
              const year = splitIndex > -1 ? item.substring(0, splitIndex) : '';
              const text = splitIndex > -1 ? item.substring(splitIndex + 1).trim() : item;
              
              return (
                <div key={idx} className="relative pl-16 timeline-card group">
                  {/* Timeline Dot */}
                  <div className="absolute left-[20px] top-5 w-4 h-4 bg-white border-4 border-[#ef5521] rounded-full z-10 group-hover:scale-150 group-hover:border-[#ff9800] group-hover:bg-[#ef5521] transition-all duration-300 shadow-[0_0_10px_rgba(239,85,33,0.6)]"></div>
                  
                  {/* Card Content */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-orange-100 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                    {year && (
                      <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-orange-100 to-orange-50 text-[#ef5521] font-bold rounded-full text-sm mb-3 shadow-sm border border-orange-200">
                        {year}
                      </span>
                    )}
                    <p className="text-gray-800 font-medium text-lg leading-snug">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
          <div className="history-text bg-white rounded-3xl p-8 md:p-10 shadow-2xl border-t-[10px] border-[#ef5521] relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(239,85,33,0.15)] transition-shadow duration-500">
             
             {/* Decorative Background Element */}
             <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full opacity-50 -z-10 group-hover:scale-125 transition-transform duration-700"></div>
             
             <p className="text-gray-700 leading-relaxed font-medium text-lg mb-8 text-justify opacity-90">
              {t.history.details}
             </p>
             
             <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border-l-4 border-[#ef5521] shadow-inner">
               <div className="flex items-center gap-3 mb-2">
                 <span className="text-2xl">🏛️</span>
                 <h4 className="font-bold text-orange-800 text-lg">Did You Know?</h4>
               </div>
               <p className="text-[#b33d16] font-semibold italic text-md leading-relaxed">
                 "{t.history.nickname}"
               </p>
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HistoryPage;
