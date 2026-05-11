import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HistoryPage = ({ id }) => {
  const containerRef = useRef(null);
  const trackerRef = useRef(null);
  const lineRef = useRef(null);
  const leftElephantRef = useRef(null);
  const rightElephantRef = useRef(null);

  const timelineData = [
    {
      chapter: "Chapter 1",
      title: "Construction Begins",
      year: "2012",
      text: "Construction of Venkateswara temple began",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", 
    },
    {
      chapter: "Chapter 2",
      title: "Temple Consecration",
      year: "2014",
      text: "Temple consecration (pranapratishta on 5 May 2014 at 9:57 AM)",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      chapter: "Chapter 3",
      title: "Living Tradition",
      year: "2014-2026",
      text: "Regular worship and local festivals (annadanam each Saturday)",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      chapter: "Chapter 4",
      title: "The Main Structure",
      year: "Architecture",
      text: "The main structure is the modern Venkateswara Swamy temple, featuring an 81-foot gopuram and a Swamy Pushkarini (temple tank). The inner sanctum houses a 9.17-foot statue of Lord Venkateswara. The complex also contains a Varaha Swamy sub-temple and a function hall.",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      chapter: "Chapter 5",
      title: "Local Heritage",
      year: "Did You Know?",
      text: "\"The temple is nicknamed 'Toorpu Tirumala' (Eastern Tirumala) in local tradition. It was built adjacent to the famous Sai Baba temple (Andhra Shirdi).\"",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-linked Tracker Animation
      gsap.to(trackerRef.current, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.1, 
        },
      });

      // 2. YOYO ANIMATION: Pulsing the Golden Tracker SVG
      gsap.to(trackerRef.current.querySelector("svg"), {
        scale: 1.2,                               
        filter: "drop-shadow(0px 0px 8px #d4af37)", 
        duration: 1.2,                              
        repeat: -1,                               
        yoyo: true,                               
        ease: "sine.inOut"                        
      });

      // 3. Reveal Animations for each row
      const rows = gsap.utils.toArray(".timeline-row");
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%", 
              end: "top 50%",   
              scrub: 1.8,      
            },
          }
        );
      });

      // 4. ELEPHANT SCROLL ENTRANCE 🐘
      // Left Elephant enters from off-screen left
      gsap.fromTo(
        leftElephantRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 0.9, 
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%", // Triggers earlier as you scroll down
            end: "bottom top", // Stays on screen until the very bottom leaves the screen completely
            toggleActions: "play reverse play reverse", 
          },
        }
      );

      // Right Elephant enters from off-screen right
      gsap.fromTo(
        rightElephantRef.current,
        { x: "100%", opacity: 0 },
        {
          x: "0%",
          opacity: 0.9,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom top", 
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 5. ELEPHANT CONTINUOUS BOBBING (Breathing loop) 🐘
      gsap.to(
        [
          leftElephantRef.current.querySelector("img"), 
          rightElephantRef.current.querySelector("img")
        ], 
        {
          y: 12,            
          duration: 2.5,    
          repeat: -1,       
          yoyo: true,   
          scrub:true,    
          ease: "sine.inOut"
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id={id}
      className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-[#F07A2A] text-[#ee3800] py-32 px-4 relative overflow-hidden font-sans"
      ref={containerRef}
    >

      {/* 🐘 DECORATIVE LEFT ELEPHANT (Fixed to viewport, high z-index) 🐘 */}
      <div 
        ref={leftElephantRef} 
        className="absolute bottom-0 left-[-15%] w-48 md:w-72 lg:w-[650px] pointer-events-none z-10"
      >
        <img 
          src="elephant.png" /* ⚠️ CHECK YOUR FILE PATH/IMPORT HERE ⚠️ */
          alt="Decorative Elephant Left" 
          className="w-full h-auto scale-x-[-1] drop-shadow-2xl" 
        />
      </div>

      {/* 🐘 DECORATIVE RIGHT ELEPHANT (Fixed to viewport, high z-index) 🐘 */}
      <div 
        ref={rightElephantRef} 
        className="absolute bottom-0 right-[-15%] w-48 md:w-72 lg:w-[650px] pointer-events-none z-10"
      >
        <img 
          src="elephant.png" /* ⚠️ CHECK YOUR FILE PATH/IMPORT HERE ⚠️ */
          alt="Decorative Elephant Right" 
          className="w-full h-auto drop-shadow-2xl" 
        />
      </div>

      {/* 🎭 DECORATIVE TOP-LEFT CURTAIN 🎭 */}
      <img 
        src="historycurtain.png" 
        alt="Decorative red curtain left" 
        className="absolute top-0 left-0 w-64 md:w-96 lg:w-[700px] pointer-events-none z-0 opacity-95"
      />

      {/* 🎭 DECORATIVE TOP-RIGHT CURTAIN (Flipped) 🎭 */}
      <img 
        src="historycurtain.png" 
        alt="Decorative red curtain right" 
        className="absolute top-0 right-0 w-64 md:w-96 lg:w-[700px] pointer-events-none z-0 opacity-95 scale-x-[-1]"
      />

      {/* 🌟 DECORATIVE TOP-LEFT BORDER IMAGE (Flipped) 🌟 */}
      <img 
        src="historyborder.png" 
        alt="Decorative golden corner left" 
        className="absolute top-0 left-0 w-48 md:w-64 lg:w-80 pointer-events-none z-10 opacity-100 scale-x-[-1]"
      />

      {/* 🌟 DECORATIVE TOP-RIGHT BORDER IMAGE (Natural Orientation) 🌟 */}
      <img 
        src="historyborder.png" 
        alt="Decorative golden corner right" 
        className="absolute top-0 right-0 w-48 md:w-64 lg:w-80 pointer-events-none z-10 opacity-100"
      />

      {/* 📜 Header Area with Golden Frame 📜 */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto mb-32 z-20 min-h-[220px] md:min-h-[280px]">
        
        {/* The Golden Frame Plate (Behind the text) */}
        <img
          src="historybanner.png" 
          alt="Decorative title frame"
          className="absolute top-[-1] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] md:w-full min-w-[280px] max-w-[600px] pointer-events-none -z-10 drop-shadow-xl"
        />

        {/* Text Content (Sitting inside the frame) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 mt-2 md:mt-4">
          <p className="text-[#7a0a06] uppercase tracking-[0.3em] text-xs md:text-sm mb-2 font-bold opacity-90 drop-shadow-sm">
            Historical Overview
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#5a0804] drop-shadow-sm font-bold">
            Temple Development Timeline
          </h2>
        </div>

      </div>

      {/* Timeline Container */}
      <div className="max-w-6xl mx-auto relative flex flex-col gap-24 md:gap-32 pb-20 z-20">
        
        {/* The Central Track Line */}
        <div 
          ref={lineRef}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[5px] bg-orange-700 md:-translate-x-1/2 z-0"
        >
          {/* The Moving Golden Tracker */}
          <div
            ref={trackerRef}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 flex justify-center items-center z-20"
            style={{ top: "0%" }}
          >
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="#d4af37" strokeWidth="2" fill="#0a0a0a"/>
              <path d="M12 0L12 6" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Timeline Rows */}
        {timelineData.map((data, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`timeline-row relative flex flex-col md:flex-row items-center w-full ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Central Static Waypoint Node */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/20 bg-[#0a0a0a] z-10" />

              {/* Content Block */}
              <div className="w-full md:w-1/2 flex flex-col relative pl-16 pr-4 md:px-16 z-10">
                
                {/* Mobile static node */}
                <div className="md:hidden absolute left-6 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-white/20 bg-[#0a0a0a] z-10" />
                
                <div className={`flex flex-col ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                  <span className="text-[#fd6602] text-sm font-semibold tracking-widest mb-3 uppercase">
                    {data.year}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-red-950 mb-6">
                    {data.title}
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-lg max-w-md">
                    {data.text}
                  </p>
                </div>
              </div>

              {/* Chapter Card Block */}
              <div className="w-full md:w-1/2 mt-8 md:mt-0 pl-16 pr-4 md:px-16 flex justify-start md:justify-center z-10">
                 
                 {/* Conditional Rendering for Video vs. Text Card */}
                 {data.videoSrc ? (
                    
                    /* 🎬 VIDEO CARD */
                    <div className="border border-red-950 rounded-xl overflow-hidden w-full max-w-sm group hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 relative aspect-video bg-[#0a0a0a]">
                      <video 
                        src={data.videoSrc}
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    </div>

                 ) : (

                    /* 📝 STANDARD TEXT CARD */
                    <div className="border border-x-red-950 rounded-xl overflow-hidden w-full max-w-sm group hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 relative aspect-video bg-[#0a0a0a]">
                      <div className="flex items-center gap-3 mb-3 p-4 pb-0">
                        <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <h4 className="text-[#d4af37] font-serif text-xl italic">{data.chapter}</h4>
                      </div>
                      <p className="text-gray-500 text-xs uppercase tracking-widest px-4 pb-4">
                        A story etched in stone and flame
                      </p>
                    </div>

                 )}

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;