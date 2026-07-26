import React from 'react';

const VideoPage = ({ id }) => {
  return (
    <div
      id={id}
      className="relative w-full"
      style={{ height: '100vh' }}
    >
      {/* Fullscreen Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/templedata/WhatsApp Video 2026-07-04 at 7.03.15 PM.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Subtle dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Spiritual overlay text — centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        {/* Decorative divider top */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-16 md:w-28 bg-gradient-to-r from-transparent to-[#f47728]" />
          <span className="text-[#f5c842] text-2xl md:text-3xl">🪔</span>
          <div className="h-[1px] w-16 md:w-28 bg-gradient-to-l from-transparent to-[#f47728]" />
        </div>

        {/* Sanskrit shloka */}
        <p
          className="text-white text-lg md:text-2xl font-semibold mb-3 drop-shadow-lg"
          style={{
            fontFamily: "'Noto Serif', serif",
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            letterSpacing: '0.04em',
          }}
        >
          ॐ नमो वेंकटेशाय
        </p>

        {/* Temple name */}
        <h2
          className="text-white text-xl md:text-3xl lg:text-4xl font-black drop-shadow-2xl leading-snug max-w-3xl"
          style={{
            fontFamily: "'Yatra One', sans-serif",
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
            color: '#fff',
          }}
        >
          శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి దేవస్థానం
        </h2>

        <p
          className="text-[#f5c842] mt-3 text-sm md:text-base font-semibold tracking-widest uppercase drop-shadow-lg"
          style={{
            fontFamily: "'Outfit', sans-serif",
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          తూర్పు తిరుమల · బలభద్రపురం
        </p>

        {/* Decorative divider bottom */}
        <div className="flex items-center gap-4 mt-6">
          <div className="h-[1px] w-16 md:w-28 bg-gradient-to-r from-transparent to-[#f47728]" />
          <span className="text-[#f5c842] text-2xl md:text-3xl">🪔</span>
          <div className="h-[1px] w-16 md:w-28 bg-gradient-to-l from-transparent to-[#f47728]" />
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(252,240,216,1))',
        }}
      />
    </div>
  );
};

export default VideoPage;