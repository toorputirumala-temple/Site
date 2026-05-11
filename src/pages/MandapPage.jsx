import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useLanguage } from "../contexts/LanguageContext";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const MandapPage = ({ id }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "Marriage",
    date: "",
    details: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "mandap_bookings"), {
        ...formData,
        timestamp: serverTimestamp(),
        status: "pending"
      });
      toast.success(t.booking.success);
      setFormData({
        name: "",
        phone: "",
        eventType: "Marriage",
        date: "",
        details: "",
      });
      setShowForm(false); // Optionally reset back to landing after submission
    } catch (error) {
      console.error("Error booking mandap: ", error);
      toast.error(t.booking.failure);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id={id}
      className="min-h-screen w-full py-20 px-4 md:px-12 flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fff9f1 0%, #ffe5d9 100%)",
      }}
    >
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-orange-300/20 blur-3xl"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-red-300/20 blur-3xl"></div>

      <div className={`max-w-6xl w-full flex flex-col md:flex-row gap-8 z-10 transition-all duration-700 ease-in-out`}>
        
        {/* Left Side Info Panel */}
        <div className={`transition-all duration-700 ease-in-out bg-[#f47728] text-white rounded-3xl p-8 md:p-12 flex flex-col relative overflow-hidden shadow-2xl transform ${
          showForm 
            ? 'w-full md:w-5/12 justify-between' 
            : 'w-full md:w-8/12 mx-auto items-center text-center min-h-[450px] justify-center'
        }`}>
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/mandala.png')]"></div>
          
          <div className={`relative z-10 flex flex-col ${showForm ? '' : 'items-center'}`}>
            <div className={`bg-white/20 p-4 rounded-2xl w-fit mb-6 backdrop-blur-sm flex items-center justify-center ${showForm ? '' : 'scale-125 mb-8'}`}>
              <EventAvailableIcon style={{ fontSize: 48 }} />
            </div>
            <h2 className={`font-extrabold mb-4 leading-tight font-sans transition-all duration-500 ${showForm ? 'text-3xl md:text-4xl' : 'text-4xl md:text-6xl'}`}>
              {t.booking.mainTitle}
            </h2>
            <p className={`text-orange-50 leading-relaxed transition-all duration-500 ${showForm ? 'text-base mb-6' : 'text-xl mb-10 max-w-xl'}`}>
              {t.booking.subTitle}
            </p>

            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-white text-[#f47728] text-lg font-bold py-4 px-10 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-orange-900/20 flex items-center gap-3 animate-pulse hover:animate-none mt-4 border-4 border-orange-100/30"
              >
                {t.booking.startBooking}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            )}
          </div>

          {/* Steps visible only when showing form or as part of info later */}
          <div className={`space-y-4 transition-all duration-700 delay-100 relative z-10 ${showForm ? 'opacity-100 translate-y-0 mt-8' : 'opacity-0 translate-y-10 h-0 pointer-events-none overflow-hidden'}`}>
            <div className="flex items-center gap-4 bg-orange-600/30 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="bg-white text-orange-600 p-2 rounded-full font-bold text-xl h-10 w-10 flex items-center justify-center flex-shrink-0">1</div>
              <span className="font-medium">{t.booking.step1}</span>
            </div>
            <div className="flex items-center gap-4 bg-orange-600/30 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="bg-white text-orange-600 p-2 rounded-full font-bold text-xl h-10 w-10 flex items-center justify-center flex-shrink-0">2</div>
              <span className="font-medium">{t.booking.step2}</span>
            </div>
            <div className="flex items-center gap-4 bg-orange-600/30 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="bg-white text-orange-600 p-2 rounded-full font-bold text-xl h-10 w-10 flex items-center justify-center flex-shrink-0">3</div>
              <span className="font-medium">{t.booking.step3}</span>
            </div>
          </div>
        </div>

        {/* Right Side Form Panel with animation */}
        <div className={`transition-all duration-1000 ease-in-out transform bg-white rounded-3xl shadow-xl relative flex flex-col ${
          showForm 
            ? 'w-full md:w-7/12 opacity-100 translate-x-0 scale-100 p-8 md:p-12' 
            : 'w-0 opacity-0 translate-x-20 scale-95 p-0 overflow-hidden pointer-events-none'
        }`}>
          
          {showForm && (
            <>
              <div className="mb-8 flex items-center justify-between text-[#182856]">
                <div className="flex items-center gap-3">
                  <CalendarMonthIcon fontSize="large" className="text-[#f47728]" />
                  <h3 className="text-3xl font-bold">{t.booking.formHeading}</h3>
                </div>
                <button 
                  onClick={() => setShowForm(false)} 
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-100 rounded-full"
                  title="Back"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 block">
                      {t.booking.fullName}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rama Rao"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-4 transition duration-200 hover:border-orange-300 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 block">
                      {t.booking.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-4 transition duration-200 hover:border-orange-300 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 block">
                      {t.booking.eventType}
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-4 transition duration-200 hover:border-orange-300 outline-none appearance-none"
                      style={{backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem top 50%", backgroundSize: "0.65rem auto"}}
                    >
                      <option value="Marriage">{t.booking.marriage}</option>
                      <option value="Birthday">{t.booking.birthday}</option>
                      <option value="Puja">{t.booking.puja}</option>
                      <option value="Other">{t.booking.other}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 block">
                      {t.booking.date}
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-4 transition duration-200 hover:border-orange-300 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 block">
                    {t.booking.details}
                  </label>
                  <textarea
                    name="details"
                    rows="3"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Any specific requests or details..."
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-4 transition duration-200 hover:border-orange-300 outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-[#f47728] to-[#e65a00] hover:from-[#e65a00] hover:to-[#c74e00] focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-lg shadow-orange-200 transform transition-all duration-200 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    t.booking.submit
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MandapPage;
