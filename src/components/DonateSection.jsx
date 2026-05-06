import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

const DonateSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: QR Code
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);

  // REPLACE THIS WITH THE ACTUAL TEMPLE UPI ID
  const TEMPLE_UPI_ID = "kiranreddy0101-2@okaxis"; 
  const TEMPLE_NAME = "Sri Prasanna Venkateswara Swamy Temple";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'donations'), {
        ...formData,
        amount: parseFloat(formData.amount),
        timestamp: serverTimestamp()
      });
      setStep(2);
      toast.success("Details saved! Please scan the QR to pay.");
    } catch (error) {
      console.error("Error saving donation:", error);
      toast.error("Failed to process. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const upiUrl = `upi://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${formData.amount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

  return (
    <>
      {/* Floating Donate Button */}
      <button
        onClick={() => { setIsOpen(true); setStep(1); }}
        className="fixed bottom-8 right-8 z-[100] bg-red-600 text-white px-6 py-4 rounded-full font-bold shadow-2xl hover:bg-red-700 transition-all transform hover:scale-110 flex items-center gap-2 animate-bounce"
      >
        <FavoriteIcon />
        Donate Now
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon />
            </button>

            {step === 1 ? (
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FavoriteIcon className="text-red-500" fontSize="large" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#182856]">Temple Donation</h2>
                  <p className="text-gray-500 mt-2">Support our temple's growth and activities</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                    <input
                      required
                      type="tel"
                      name="mobile"
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      required
                      type="number"
                      name="amount"
                      min="1"
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-xl"
                      value={formData.amount}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors shadow-lg mt-4 disabled:bg-gray-400"
                  >
                    {loading ? "Processing..." : "Continue to Pay"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-10 text-center">
                <h3 className="text-2xl font-bold text-[#182856] mb-2">Scan & Pay</h3>
                <p className="text-gray-500 mb-8 font-semibold">Amount: ₹{formData.amount}</p>
                
                <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 mb-8">
                  <img 
                    src={qrCodeUrl} 
                    alt="UPI QR Code" 
                    className="mx-auto w-64 h-64 shadow-inner"
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-gray-400 px-6">
                    Scanning this QR will open your preferred UPI app (PhonePe, GPay, Paytm) with the amount pre-filled.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-[#182856] text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DonateSection;
