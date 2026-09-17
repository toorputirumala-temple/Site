import React, { useState, useRef, useCallback } from 'react';

const VIDEOS = [
  '/videos/video1.mp4',
  '/videos/video2.mp4',
  '/videos/video3.mp4',
  '/videos/video4.mp4',
  '/videos/video5.mp4',
  '/videos/video6.mp4',
  '/videos/video7.mp4',
  '/videos/video8.mp4',
];

const VideoPage = ({ id }) => {
  const [current, setCurrent] = useState(0);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const videoRef = useRef(null);

  // Force muted as a property (React's `muted` prop doesn't render the
  // attribute, and Chrome blocks autoplay unless the element is muted).
  const setVideoRef = useCallback((el) => {
    videoRef.current = el;
    if (el) {
      el.defaultMuted = true;
      el.muted = true;
      el.setAttribute('playsinline', '');
      el.setAttribute('muted', '');
    }
  }, []);

  const playNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % VIDEOS.length);
    setAutoplayFailed(false); // Reset on next video
  }, []);

  const handleCanPlay = useCallback(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay prevented:', err);
          setAutoplayFailed(true);
        });
      }
    }
  }, []);

  return (
    <div
      id={id}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100vh' }}
    >
      {/* Native video — fills the whole page, plays one after another,
          no controls, and shows the previous video's last frame while the
          next one loads */}
      <video
        key={VIDEOS[current]}
        ref={setVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={playNext}
        onError={playNext}
        onCanPlay={handleCanPlay}
      >
        <source src={VIDEOS[current]} type="video/mp4" />
      </video>

      {/* Safari Autoplay Fallback Button */}
      {autoplayFailed && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <button
            onClick={() => {
              videoRef.current?.play();
              setAutoplayFailed(false);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full border border-white/50 backdrop-blur-md transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-medium tracking-wider">Tap to Play Video</span>
          </button>
        </div>
      )}

      {/* Subtle dark overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 45%)',
        }}
      />

      {/* Spiritual overlay text — centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
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
    </div>
  );
};

export default VideoPage;