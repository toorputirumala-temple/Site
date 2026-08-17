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
  const [poster, setPoster] = useState('');
  const videoRef = useRef(null);

  // Force muted as a property (React's `muted` prop doesn't render the
  // attribute, and Chrome blocks autoplay unless the element is muted).
  const setVideoRef = useCallback((el) => {
    videoRef.current = el;
    if (el) el.muted = true;
  }, []);

  const playNext = useCallback(() => {
    // Capture the last frame of the finished video to show while the
    // next one loads.
    const v = videoRef.current;
    if (v && v.videoWidth) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = v.videoWidth;
        canvas.height = v.videoHeight;
        canvas.getContext('2d').drawImage(v, 0, 0);
        setPoster(canvas.toDataURL('image/jpeg', 0.7));
      } catch {
        setPoster('');
      }
    }
    setCurrent((prev) => (prev + 1) % VIDEOS.length);
  }, []);

  const handleCanPlay = useCallback(() => {
    videoRef.current?.play().catch(() => {});
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
        key={current}
        ref={setVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEOS[current]}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={playNext}
        onError={playNext}
        onCanPlay={handleCanPlay}
      />

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