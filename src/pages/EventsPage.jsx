import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Mandir from "../images/Mandir.svg";
import diya from "../images/Diya.svg";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Helper to convert Google Drive shareable link to direct image URL
const getDirectDriveUrl = (url) => {
  if (!url) return "";
  
  // Extract ID from various Google Drive link formats
  let fileId = "";
  
  if (url.includes("drive.google.com")) {
    // Format: .../file/d/FILE_ID/...
    const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (dMatch) {
      fileId = dMatch[1];
    } else {
      // Format: ...id=FILE_ID...
      const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (idMatch) {
        fileId = idMatch[1];
      }
    }
  }

  if (fileId) {
    // Using the modern direct link endpoint which is generally more reliable
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
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
    speed: 500,
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
      className="bg-[#fff7e7]"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgb(244, 119, 40) 30%, #fff7e7 30%)",
        backgroundSize: "100% 100%",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <section className="events-section py-12 text-center overflow-hidden relative min-h-screen">
        {/* Background Patterns */}
        <div
          className="absolute top-0 left-0 w-full h-48 z-20"
          style={{
            backgroundImage: `url(${diya})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            pointerEvents: "none",
          }}
        ></div>

        <div
          className="absolute top-[80px] left-0 md:h-[300px] w-[50vw] bg-no-repeat bg-left bg-contain animate-slideInLeft opacity-20"
          style={{ backgroundImage: `url(${Mandir})` }}
        ></div>
        <div
          className="absolute top-[80px] right-0 md:h-[300px] w-[50vw] bg-no-repeat bg-right bg-contain animate-slideInRight opacity-20"
          style={{ backgroundImage: `url(${Mandir})` }}
        ></div>

        <div className="relative z-30 max-w-6xl mx-auto px-4 mt-24">
          <h2 className="text-5xl mb-16 text-white font-black tracking-tight drop-shadow-lg">
            {t.events.title}
          </h2>

          {/* Static Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white border border-orange-100 rounded-3xl shadow-2xl p-10 hover:bg-[#182856] hover:text-white transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors">
                <img src="https://cdn-icons-png.flaticon.com/512/8574/8574987.png" alt="Events" className="h-10 w-10" />
              </div>
              <h3 className="text-3xl text-[#182856] mb-4 font-bold group-hover:text-white">
                {t.nav.events}
              </h3>
              <p className="text-gray-700 group-hover:text-gray-200 text-lg leading-relaxed text-justify">
                {t.events.eventsText}
              </p>
            </div>

            <div className="bg-white border border-orange-100 rounded-3xl shadow-2xl p-10 hover:bg-[#182856] hover:text-white transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors">
                <img src="https://cdn-icons-png.flaticon.com/512/4791/4791033.png" alt="Facilities" className="h-10 w-10" />
              </div>
              <h3 className="text-3xl text-[#182856] mb-4 font-bold group-hover:text-white">
                {t.events.facilities}
              </h3>
              <p className="text-gray-700 group-hover:text-gray-200 text-lg leading-relaxed text-justify">
                {t.events.facilitiesText}
              </p>
            </div>
          </div>

          {/* Dynamic Events List Slider */}
          <div className="mt-24 pb-12">
            <h3 className="text-4xl font-bold text-[#182856] mb-12 flex items-center justify-center gap-4">
              <span className="h-1 w-12 bg-[#f47728] rounded-full"></span>
              Recent & Upcoming Events
              <span className="h-1 w-12 bg-[#f47728] rounded-full"></span>
            </h3>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#f47728]"></div>
              </div>
            ) : events.length > 0 ? (
              <div className="max-w-4xl mx-auto px-10">
                <Slider {...cardSettings}>
                  {events.map((event) => (
                    <div key={event.id} className="px-4">
                      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col hover:shadow-orange-200 transition-shadow">
                        {/* Internal Image Slider */}
                        <div className="h-[450px] overflow-hidden relative">
                          <Slider {...imageSettings}>
                            {event.images.map((img, idx) => (
                              <div key={idx} className="h-[450px]">
                                <img 
                                  src={getDirectDriveUrl(img)} 
                                  alt={`${event.name} ${idx}`} 
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>

                        <div className="p-10 text-left">
                          <div className="flex justify-between items-start mb-6">
                            <h4 className="text-3xl font-bold text-[#182856]">{event.name}</h4>
                            <span className="bg-orange-100 text-[#f47728] px-6 py-2 rounded-full text-base font-bold border border-orange-200">
                              {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-lg text-justify">
                            {event.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 shadow-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-xl italic">No upcoming events scheduled at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{ __html: `
        .slick-prev:before, .slick-next:before {
          color: #f47728 !important;
          font-size: 30px;
        }
        .slick-dots li button:before {
          color: #f47728 !important;
          font-size: 12px;
        }
        .slick-dots li.slick-active button:before {
          color: #182856 !important;
        }
      `}} />
    </div>
  );
};

export default TempleEvent;
