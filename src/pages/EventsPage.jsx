import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Mandir from "../images/Mandir.svg";
import diya from "../images/Diya.svg";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RotatingFlowers from "../components/RotatingFlowers";

// Helper to convert Google Drive shareable link to direct image URL
const getDirectDriveUrl = (url) => {
  if (!url) return "";
  let fileId = "";
  if (url.includes("drive.google.com")) {
    const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (dMatch) {
      fileId = dMatch[1];
    } else {
      const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (idMatch) fileId = idMatch[1];
    }
  }
  if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}`;
  return url;
};

const TempleEvent = ({ id }) => {
  const { t } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const cardSettings = {
    dots: true,
    infinite: events.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  const imageSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div
      id={id}
      style={{ position: "relative", overflow: "hidden", background: "#fff7e7" }}
    >
      {/* ── TOP BANNER ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #c45c00 0%, #f47728 50%, #fdb261 100%)",
          paddingBottom: "80px",
        }}
      >
        {/* Rotating flowers */}
        <RotatingFlowers tintColor="rgba(255,255,255,0.18)" />

        {/* Mandir silhouettes */}
        <div
          className="absolute top-0 left-0 h-full w-[45vw] opacity-10 bg-no-repeat bg-left bg-contain animate-slideInLeft pointer-events-none"
          style={{ backgroundImage: `url(${Mandir})` }}
        />
        <div
          className="absolute top-0 right-0 h-full w-[45vw] opacity-10 bg-no-repeat bg-right bg-contain animate-slideInRight pointer-events-none"
          style={{ backgroundImage: `url(${Mandir})` }}
        />

        {/* Diya decoration */}
        <div
          className="absolute top-0 left-0 w-full h-32 pointer-events-none"
          style={{
            backgroundImage: `url(${diya})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: 0.6,
          }}
        />

        {/* Section heading */}
        <div className="relative z-10 text-center pt-16 pb-4 px-4">
          {/* Om symbol */}
          <div
            className="text-white text-4xl mb-2 opacity-80"
            style={{ fontFamily: "'Noto Serif', serif", lineHeight: 1 }}
          >
            ॐ
          </div>

          <h2
            className="text-white font-black drop-shadow-lg"
            style={{
              fontFamily: "'Yatra One', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            {t.events.title}
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 bg-white/50" />
            <div className="w-2 h-2 rounded-full bg-white/80" />
            <div className="h-px w-8 bg-white/50" />
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="h-px w-8 bg-white/50" />
            <div className="w-2 h-2 rounded-full bg-white/80" />
            <div className="h-px w-20 bg-white/50" />
          </div>
        </div>
      </div>

      {/* ── INFO CARDS (overlap the banner) ────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4" style={{ marginTop: "-56px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Events Card */}
          <div
            className="group relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2"
            style={{ background: "#fff" }}
          >
            {/* Top accent stripe */}
            <div
              className="h-1.5 w-full"
              style={{ background: "linear-gradient(90deg, #f47728, #fdb261, #f47728)" }}
            />
            <div className="p-8">
              {/* Icon circle */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-md mx-auto transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
                  border: "2px solid #f47728",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8574/8574987.png"
                  alt="Events"
                  className="h-9 w-9"
                />
              </div>

              <h3
                className="text-center text-2xl font-extrabold mb-1"
                style={{ color: "#182856", fontFamily: "'Outfit', sans-serif" }}
              >
                {t.nav.events}
              </h3>
              {/* Underline */}
              <div className="w-12 h-1 rounded-full mx-auto mb-4" style={{ background: "#f47728" }} />

              <p className="text-gray-600 leading-relaxed text-base text-justify">
                {t.events.eventsText}
              </p>

              {/* Highlight badge */}
              <div className="mt-5 flex justify-center">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                  style={{ background: "#fff3e0", color: "#f47728", border: "1px solid #f47728" }}
                >
                  Every Saturday · Annadanam
                </div>
              </div>
            </div>
          </div>

          {/* Facilities Card */}
          <div
            className="group relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2"
            style={{ background: "#fff" }}
          >
            {/* Top accent stripe */}
            <div
              className="h-1.5 w-full"
              style={{ background: "linear-gradient(90deg, #182856, #2e4a9e, #182856)" }}
            />
            <div className="p-8">
              {/* Icon circle */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-md mx-auto transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #e8eaf6, #c5cae9)",
                  border: "2px solid #182856",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4791/4791033.png"
                  alt="Facilities"
                  className="h-9 w-9"
                />
              </div>

              <h3
                className="text-center text-2xl font-extrabold mb-1"
                style={{ color: "#182856", fontFamily: "'Outfit', sans-serif" }}
              >
                {t.events.facilities}
              </h3>
              {/* Underline */}
              <div className="w-12 h-1 rounded-full mx-auto mb-4" style={{ background: "#182856" }} />

              <p className="text-gray-600 leading-relaxed text-base text-justify">
                {t.events.facilitiesText}
              </p>

              {/* Highlight badges */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {["Parking", "Function Hall", "Open Daily"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl text-xs font-bold"
                    style={{ background: "#e8eaf6", color: "#182856", border: "1px solid #c5cae9" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DYNAMIC EVENTS SLIDER ──────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        {/* Section sub-heading */}
        <div className="text-center mb-12">
          <h3
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "#182856", fontFamily: "'Outfit', sans-serif" }}
          >
            {t.events.recentUpcoming}
          </h3>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-16 bg-[#f47728]" />
            <span className="text-[#f47728] text-xl">✦</span>
            <div className="h-px w-16 bg-[#f47728]" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#f47728]" />
          </div>
        ) : events.length > 0 ? (
          <div className="px-2 md:px-8">
            <Slider {...cardSettings}>
              {events.map((event) => (
                <div key={event.id} className="px-2">
                  <div
                    className="rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(244,119,40,0.15)",
                      boxShadow: "0 20px 60px rgba(244,119,40,0.12), 0 4px 20px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Image slider */}
                    <div className="h-64 md:h-[420px] overflow-hidden relative">
                      <Slider {...imageSettings}>
                        {event.images.map((img, idx) => (
                          <div key={idx} className="h-64 md:h-[420px]">
                            <img
                              src={getDirectDriveUrl(img)}
                              alt={`${event.name} ${idx}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </Slider>
                      {/* Gradient overlay on image */}
                      <div
                        className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}
                      />
                    </div>

                    {/* Event info */}
                    <div className="p-6 md:p-10">
                      {/* Orange top bar */}
                      <div
                        className="h-1 w-16 rounded-full mb-5"
                        style={{ background: "linear-gradient(90deg, #f47728, #fdb261)" }}
                      />
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                        <h4
                          className="text-xl md:text-2xl font-extrabold"
                          style={{ color: "#182856", fontFamily: "'Outfit', sans-serif" }}
                        >
                          {event.name}
                        </h4>
                        <span
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap"
                          style={{
                            background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
                            color: "#c45c00",
                            border: "1px solid #f47728",
                          }}
                        >
                          📅{" "}
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-base md:text-lg text-justify">
                        {event.details}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div
            className="rounded-3xl p-14 text-center shadow-inner"
            style={{
              background: "linear-gradient(135deg, #fff8f0, #fff3e0)",
              border: "2px dashed #f47728",
            }}
          >
            <div className="text-5xl mb-4">🪔</div>
            <p className="text-gray-500 text-xl italic">{t.events.noEvents}</p>
          </div>
        )}
      </div>

      {/* Slick overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        .slick-prev:before, .slick-next:before {
          color: #f47728 !important;
          font-size: 28px;
        }
        .slick-dots li button:before {
          color: #f47728 !important;
          font-size: 10px;
        }
        .slick-dots li.slick-active button:before {
          color: #182856 !important;
        }
      `}} />
    </div>
  );
};

export default TempleEvent;
