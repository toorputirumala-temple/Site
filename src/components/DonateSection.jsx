import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../contexts/LanguageContext';

const TEMPLE_UPI_ID  = "Q910582112@ybl";
const TEMPLE_NAME    = "Sri Venkateswara Swamy Aalaya Sankshema Sangham";

/* Quick-amount presets */
const PRESETS = [51, 101, 251, 501, 1001];

/* Detect mobile device */
const isMobile = () =>
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  );

const DonateSection = () => {
  const { t } = useLanguage();
  const [isOpen,   setIsOpen]   = useState(false);
  const [step,     setStep]     = useState(1);
  const [loading,  setLoading]  = useState(false);
  const [showQr,   setShowQr]   = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', amount: '' });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'donations'), {
        ...formData,
        amount: parseFloat(formData.amount),
        timestamp: serverTimestamp(),
      });
      setStep(2);
      setShowQr(false);
      toast.success(t.donate.successMsg);
    } catch (err) {
      console.error(err);
      toast.error(t.donate.failMsg);
    } finally {
      setLoading(false);
    }
  };

  const genericUpiUrl = `upi://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${formData.amount}&cu=INR`;
  const qrCodeUrl     = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(genericUpiUrl)}`;

  const handleAppPayment = (appType) => {
    let targetUrl = genericUpiUrl;
    if (appType === 'phonepe') {
      targetUrl = `phonepe://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${formData.amount}&cu=INR`;
    } else if (appType === 'gpay') {
      targetUrl = `gpay://upi/pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${formData.amount}&cu=INR`;
    } else if (appType === 'paytm') {
      targetUrl = `paytmmp://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${formData.amount}&cu=INR`;
    }
    window.location.href = targetUrl;
  };

  const openModal = () => { setIsOpen(true); setStep(1); setShowQr(false); };
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* ── FLOATING BUTTON ──────────────────────────────── */}
      <button
        onClick={openModal}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full font-bold transition-all duration-300 hover:scale-110 text-xs sm:text-sm"
        style={{
          background:   'linear-gradient(135deg, #c8860a, #f5c842, #f47728)',
          color:        '#1a0a00',
          boxShadow:    '0 8px 30px rgba(244,119,40,0.55)',
          fontFamily:   "'Outfit', sans-serif",
          fontSize:     '0.95rem',
          letterSpacing:'0.03em',
          animation:    'pulse-glow 2.5s ease-in-out infinite',
        }}
      >
        {/* Diya SVG icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C11.4 2 11 2.6 11 3C11 3.8 11.3 4.5 11.8 5H10C8.3 5 7 6.3 7 8V9H17V8C17 6.3 15.7 5 14 5H12.2C12.7 4.5 13 3.8 13 3C13 2.6 12.6 2 12 2Z" fill="#1a0a00"/>
          <path d="M6 10L5 19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19L18 10H6Z" fill="#1a0a00" opacity="0.8"/>
          <ellipse cx="12" cy="8.5" rx="5" ry="1.5" fill="#1a0a00" opacity="0.4"/>
        </svg>
        {t.donate.buttonLabel}
      </button>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 8px 30px rgba(244,119,40,0.55); }
          50%       { box-shadow: 0 8px 45px rgba(245,200,66,0.8); }
        }
      `}</style>

      {/* ── MODAL ────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
          style={{ background: 'rgba(15,5,0,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md relative overflow-hidden rounded-3xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
            style={{
              background:  'linear-gradient(160deg, #1a0a00 0%, #2d1200 100%)',
              border:      '1px solid rgba(245,200,66,0.35)',
              boxShadow:   '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,200,66,0.1) inset',
            }}
          >
            {/* Top gold stripe */}
            <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #c8860a, #f5c842, #f47728, #f5c842, #c8860a)' }} />

            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-all"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,240,200,0.6)' }}
            >
              <CloseIcon fontSize="small" />
            </button>

            {step === 1 ? (
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-7">
                  {/* Gold divider */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #f5c842)' }} />
                    <span style={{ color: '#f5c842', fontSize: '0.7rem', letterSpacing: '0.2em' }}>✦</span>
                    <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, #f5c842, #f47728, #f5c842)' }} />
                    <span style={{ color: '#f5c842', fontSize: '0.7rem', letterSpacing: '0.2em' }}>✦</span>
                    <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #f5c842)' }} />
                  </div>

                  <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-1"
                    style={{ color: '#f5c842', fontFamily: "'Outfit', sans-serif" }}>
                    ॐ నమో వేంకటేశాయ
                  </p>
                  <h2 className="text-2xl font-black mb-1"
                    style={{
                      fontFamily: "'Yatra One', sans-serif",
                      background: 'linear-gradient(135deg, #f5c842, #f47728)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                    {t.donate.modalTitle}
                  </h2>
                  <p className="text-sm" style={{ color: 'rgba(255,240,200,0.6)', fontFamily: "'Outfit', sans-serif" }}>
                    {t.donate.modalSubtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-1.5"
                      style={{ color: '#f5c842' }}>
                      {t.donate.fullName}
                    </label>
                    <input
                      required type="text" name="name"
                      placeholder={t.donate.namePlaceholder}
                      value={formData.name} onChange={handleInputChange}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(245,200,66,0.25)',
                        color: '#fff',
                      }}
                      onFocus={e => e.target.style.borderColor = '#f5c842'}
                      onBlur={e  => e.target.style.borderColor = 'rgba(245,200,66,0.25)'}
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-1.5"
                      style={{ color: '#f5c842' }}>
                      {t.donate.mobile}
                    </label>
                    <input
                      required type="tel" name="mobile"
                      placeholder={t.donate.mobilePlaceholder}
                      value={formData.mobile} onChange={handleInputChange}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(245,200,66,0.25)',
                        color: '#fff',
                      }}
                      onFocus={e => e.target.style.borderColor = '#f5c842'}
                      onBlur={e  => e.target.style.borderColor = 'rgba(245,200,66,0.25)'}
                    />
                  </div>

                  {/* Amount presets */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-1.5"
                      style={{ color: '#f5c842' }}>
                      {t.donate.amount}
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {PRESETS.map(p => (
                        <button
                          key={p} type="button"
                          onClick={() => setFormData({ ...formData, amount: String(p) })}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                          style={{
                            background: formData.amount === String(p)
                              ? 'linear-gradient(135deg, #f47728, #c45c00)'
                              : 'rgba(255,255,255,0.07)',
                            border: formData.amount === String(p)
                              ? '1px solid #f5c842'
                              : '1px solid rgba(245,200,66,0.2)',
                            color: formData.amount === String(p) ? '#fff' : 'rgba(255,240,200,0.7)',
                          }}
                        >
                          ₹{p}
                        </button>
                      ))}
                    </div>
                    <input
                      required type="number" name="amount" min="1"
                      placeholder={t.donate.amountPlaceholder}
                      value={formData.amount} onChange={handleInputChange}
                      className="w-full rounded-xl px-4 py-3 text-sm font-bold outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(245,200,66,0.25)',
                        color: '#fff',
                        colorScheme: 'dark',
                      }}
                      onFocus={e => e.target.style.borderColor = '#f5c842'}
                      onBlur={e  => e.target.style.borderColor = 'rgba(245,200,66,0.25)'}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit" disabled={loading}
                    className="w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-300 disabled:opacity-60 mt-2 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #f5c842 0%, #f47728 60%, #c45c00 100%)',
                      color: '#1a0a00',
                      fontFamily: "'Outfit', sans-serif",
                      boxShadow: '0 6px 24px rgba(244,119,40,0.5)',
                    }}
                  >
                    {loading ? t.donate.processing : t.donate.continuePay}
                  </button>
                </form>
              </div>
            ) : (
              /* ── STEP 2: APP SELECTOR & QR STEP ── */
              <div className="p-6 sm:p-8 text-center">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-1"
                  style={{ color: '#f5c842', fontFamily: "'Outfit', sans-serif" }}>
                  ఓం నమో వేంకటేశాయ
                </p>
                <h3 className="text-2xl font-black mb-1"
                  style={{
                    fontFamily: "'Yatra One', sans-serif",
                    background: 'linear-gradient(135deg, #f5c842, #f47728)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {t.donate.chooseApp}
                </h3>
                <p className="text-sm mb-5" style={{ color: 'rgba(255,240,200,0.7)' }}>
                  {t.donate.amountLabel}: <span className="font-extrabold text-white text-base">₹{formData.amount}</span>
                </p>

                {/* ── UPI APP BUTTONS LIST ── */}
                <div className="space-y-3 mb-5">
                  {/* PhonePe Button */}
                  <button
                    type="button"
                    onClick={() => handleAppPayment('phonepe')}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md"
                    style={{
                      background: '#5f259f',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-bold text-[#5f259f] text-lg shadow-sm">
                        पे
                      </div>
                      <span className="text-sm font-semibold">{t.donate.payViaPhonePe}</span>
                    </div>
                    <span className="text-xs opacity-75 font-normal">Instant ➔</span>
                  </button>

                  {/* Google Pay Button */}
                  <button
                    type="button"
                    onClick={() => handleAppPayment('gpay')}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md"
                    style={{
                      background: '#ffffff',
                      color: '#1f2937',
                      border: '1px solid rgba(245,200,66,0.3)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#f0f4f9] flex items-center justify-center font-bold text-[#4285F4] text-base shadow-sm">
                        G
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{t.donate.payViaGPay}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-normal">Instant ➔</span>
                  </button>

                  {/* Paytm Button */}
                  <button
                    type="button"
                    onClick={() => handleAppPayment('paytm')}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md"
                    style={{
                      background: '#002e6e',
                      color: '#ffffff',
                      border: '1px solid rgba(0,185,245,0.4)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-bold text-[#00b9f5] text-xs shadow-sm">
                        Paytm
                      </div>
                      <span className="text-sm font-semibold">{t.donate.payViaPaytm}</span>
                    </div>
                    <span className="text-xs opacity-75 font-normal">Instant ➔</span>
                  </button>

                  {/* Any UPI / Other App Button */}
                  <button
                    type="button"
                    onClick={() => handleAppPayment('generic')}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #f5c842 0%, #f47728 100%)',
                      color: '#1a0a00',
                      border: 'none',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#1a0a00] flex items-center justify-center font-bold text-[#f5c842] text-xs shadow-sm">
                        UPI
                      </div>
                      <span className="text-sm font-bold">{t.donate.payViaAnyUpi}</span>
                    </div>
                    <span className="text-xs opacity-90 font-medium">BHIM / CRED ➔</span>
                  </button>
                </div>

                {/* ── TOGGLE QR CODE SECTION ── */}
                <div className="border-t border-amber-900/60 pt-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setShowQr(prev => !prev)}
                    className="text-xs font-semibold text-amber-300 underline underline-offset-4 hover:text-amber-200 transition-colors cursor-pointer"
                  >
                    {showQr ? '▲ Hide QR Code' : '▼ Show QR Code / Scan with another phone'}
                  </button>

                  {(showQr || !isMobile()) && (
                    <div className="mt-4">
                      <div
                        className="p-3 rounded-2xl mx-auto w-fit relative"
                        style={{
                          background: '#fff',
                          border: '3px solid #f5c842',
                          boxShadow: '0 0 30px rgba(245,200,66,0.3)',
                        }}
                      >
                        <img src={qrCodeUrl} alt="UPI QR Code" className="w-44 h-44 sm:w-48 sm:h-48 block" />
                        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                          <div key={i} className={`absolute ${pos} w-3.5 h-3.5 rounded-sm`}
                            style={{ background: '#f47728', opacity: 0.8 }} />
                        ))}
                      </div>
                      <p className="text-xs mt-2" style={{ color: 'rgba(255,240,200,0.5)' }}>
                        {t.donate.qrNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tap-to-copy UPI ID */}
                <div
                  className="rounded-xl px-4 py-2.5 text-center mb-4 cursor-pointer hover:bg-white/10 transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px dashed rgba(245,200,66,0.3)',
                  }}
                  onClick={() => {
                    navigator.clipboard?.writeText(TEMPLE_UPI_ID);
                    toast.info('UPI ID copied to clipboard!');
                  }}
                >
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(255,240,200,0.4)', fontFamily: "'Outfit', sans-serif" }}>
                    Temple UPI ID
                  </p>
                  <p
                    className="font-bold text-sm select-all"
                    style={{ color: '#f5c842', fontFamily: 'monospace', letterSpacing: '0.06em' }}
                  >
                    {TEMPLE_UPI_ID}
                  </p>
                  <p className="text-[11px] mt-0.5 text-amber-200/50">📋 tap to copy UPI ID</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,240,200,0.8)',
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-2/3 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(245,200,66,0.3)',
                      color: '#f5c842',
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {t.donate.done}
                  </button>
                </div>
              </div>
            )}

            {/* Bottom gold stripe */}
            <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #c8860a, #f5c842, #f47728, #f5c842, #c8860a)' }} />
          </div>
        </div>
      )}
    </>
  );
};

export default DonateSection;
