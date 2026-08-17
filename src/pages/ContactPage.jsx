import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import RotatingFlowers from "../components/RotatingFlowers";

const ContactPage = ({ id }) => {
  const { lang, t } = useLanguage();

  const facilitiesTags = lang === 'en' 
    ? ["Parking Space", "Annadanam Hall", "Function Premises", "Open Daily"]
    : ["పార్కింగ్ స్థలం", "అన్నదాన హాల్", "కళ్యాణ మండపం", "రోజూ తెరిచి ఉంటుంది"];

  return (
    <div
      id={id}
      className="relative w-full overflow-hidden py-16 px-4 sm:px-8 bg-gradient-to-b from-[#fff7e7] via-[#ffedd5] to-[#fed7aa]"
    >
      {/* Rotating flower background */}
      <RotatingFlowers tintColor="rgba(120,17,2,0.35)" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#c45c00] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {lang === 'en' ? 'Visit & Information' : 'సందర్శించండి & సమాచారం'}
          </p>
          <h2
            className="text-3xl md:text-5xl font-black text-[#800808]"
            style={{ fontFamily: "'Yatra One', sans-serif" }}
          >
            {t.nav.contact} &amp; {t.events.facilities}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-16 bg-[#f47728]" />
            <span className="text-[#f47728] text-xl">✦ ॐ ✦</span>
            <div className="h-px w-16 bg-[#f47728]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT COLUMN → Contact Info & Temple Facilities */}
          <div className="space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#800808]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.nav.contact}
                  </h3>
                  <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Address & Location' : 'ఆలయ స్థాన వివరాలు'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                {t.contact.address}
              </p>
            </div>

            {/* Facilities Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-2xl">
                  🏛️
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#182856]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.events.facilities}
                  </h3>
                  <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Temple Amenities' : 'ఆలయ వసతులు'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium mb-5">
                {t.events.facilitiesText}
              </p>

              {/* Highlight Badges */}
              <div className="flex flex-wrap gap-2">
                {facilitiesTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-[#182856] border border-indigo-200 shadow-sm"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN → Google Map Location */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200 h-full flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#800808] underline mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {t.contact.mapLabel}
              </h3>
              <p className="text-sm text-gray-600 font-semibold">
                {t.details.locationVal}
              </p>
            </div>

            <div className="w-full rounded-2xl overflow-hidden shadow-inner border border-amber-300">
              <iframe
                title="Temple Map Location"
                width="100%"
                height="380"
                frameBorder="0"
                style={{ borderRadius: "16px" }}
                scrolling="no"
                src="https://maps.google.com/maps?q=16.9583,82.0056&hl=en&z=14&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;