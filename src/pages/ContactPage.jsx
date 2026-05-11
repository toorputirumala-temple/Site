import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const ContactPage = ({ id }) => {
  const { t } = useLanguage();

  return (
    <div
      className="flex flex-col md:flex-row bg-orange-200 w-full min-h-[50vh] px-8 py-16"
      id={id}
    >
      {/* LEFT → CONTACT (moved here) */}
      <div className="left bg-white rounded-3xl shadow-lg w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-center text-red-900">
          {t.nav.contact}
        </h2>
        <p className="text-lg text-center text-gray-700 font-medium">
          Sridevi Bhoodevi Sametha Sri Prasanna Venkateswara Swamy Devasthanam<br/>
          (Toorpu Tirumala)<br/><br/>
          Balabhadrapuram village, Biccavolu mandal<br/>
          East Godavari district, Andhra Pradesh, India<br/>
          PIN: 533343<br/><br/>
        </p>
      </div>

      {/* RIGHT → MAP (moved here) */}
      <div className="right w-full md:w-1/2 flex flex-col justify-center p-8">
        <div className="flex flex-col justify-center leading-9">
          <h1 className="font-bold text-2xl text-red-900 underline mb-4">
            {t.nav.contact} & {t.details.location}
          </h1>

          <h1 className="font-bold text-xl text-red-900 leading-9 mb-8">
            {t.details.locationVal}
          </h1>

          <h1 className="font-bold text-2xl text-red-900 underline mb-4">
            Map Location:
          </h1>

          <iframe
            title="Temple Map Location"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            scrolling="no"
            src="https://maps.google.com/maps?q=16.9583,82.0056&hl=en&z=14&output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;