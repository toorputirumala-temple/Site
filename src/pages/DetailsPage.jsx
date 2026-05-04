import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const DetailsPage = ({ id }) => {
  const { t } = useLanguage();

  return (
    <div id={id} className="w-full min-h-[50vh] flex py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
        <h2 className="text-center text-4xl font-extrabold text-red-900 underline mb-8">
          {t.details.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
          {/* Location Details */}
          <div className="bg-orange-50 rounded-lg p-6 shadow border border-orange-200">
            <h3 className="text-xl font-bold text-orange-800 mb-2">{t.details.location}</h3>
            <p className="text-gray-700">{t.details.locationVal}</p>
            
            <h3 className="text-xl font-bold text-orange-800 mt-6 mb-2">{t.details.coords}</h3>
            <p className="text-gray-700">{t.details.coordsVal}</p>
          </div>

          {/* Admin & Transport */}
          <div className="bg-orange-50 rounded-lg p-6 shadow border border-orange-200">
            <h3 className="text-xl font-bold text-orange-800 mb-2">{t.details.admin}</h3>
            <p className="text-gray-700">{t.details.adminVal}</p>

            <h3 className="text-xl font-bold text-orange-800 mt-6 mb-2">{t.details.transport}</h3>
            <p className="text-gray-700">{t.details.transportVal}</p>
          </div>

          {/* Geography */}
          <div className="bg-orange-50 rounded-lg p-6 shadow border border-orange-200 md:col-span-2">
            <h3 className="text-xl font-bold text-orange-800 mb-2">{t.details.geography}</h3>
            <p className="text-gray-700">{t.details.geographyVal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
