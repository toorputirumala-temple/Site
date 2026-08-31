import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../contexts/LanguageContext';

const TEMPLE_UPI_ID  = "Q910582112@ybl";
const TEMPLE_NAME    = "Sri Prasanna Venkateswara Swamy Temple";

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
      toast.success(t.donate.successMsg);
    } catch (err) {
      console.error(err);
      toast.error(t.donate.failMsg);
    } finally {
      setLoading(false);
    }
  };

  const upiUrl    = `upi://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${formData.amount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

  const openModal = () => { setIsOpen(true); setStep(1); };
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
                    className="w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-300 disabled:opacity-60 mt-2"
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
              /* ── QR STEP ── */
              <div className="p-8 text-center">
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
                  {t.donate.scanPay}
                </h3>
                <p className="text-sm mb-6" style={{ color: 'rgba(255,240,200,0.6)' }}>
                  {t.donate.amountLabel}: <span className="font-bold text-white">₹{formData.amount}</span>
                </p>

                {isMobile() ? (
                  /* ── MOBILE: QR + single UPI button (same URL as QR encodes) ── */
                  <div className="mb-6">

                    {/* QR image — also tappable to open UPI directly */}
                    <a
                      href={upiUrl}
                      onClick={e => { e.preventDefault(); window.location.href = upiUrl; }}
                      className="relative mx-auto w-fit mb-2 block"
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="p-3 rounded-2xl mx-auto"
                        style={{
                          background: '#fff',
                          border: '3px solid #f5c842',
                          boxShadow: '0 0 30px rgba(245,200,66,0.3)',
                          width: 'fit-content',
                        }}
                      >
                        <img src={qrCodeUrl} alt="UPI QR Code" className="w-44 h-44 block" />
                      </div>
                      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                        <div key={i} className={`absolute ${pos} w-3.5 h-3.5 rounded-sm`}
                          style={{ background: '#f47728', opacity: 0.8 }} />
                      ))}
                    </a>

                    <p className="text-xs mb-3 text-center" style={{ color: 'rgba(255,240,200,0.4)' }}>
                      Tap QR or button below to open your UPI app
                    </p>

                    {/* Button uses window.location.href to bypass browser upi:// blocking */}
                    <button
                      onClick={() => { window.location.href = upiUrl; }}
                      className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #f5c842 0%, #f47728 60%, #c45c00 100%)',
                        color: '#1a0a00',
                        boxShadow: '0 6px 24px rgba(244,119,40,0.5)',
                        fontFamily: "'Outfit', sans-serif",
                        border: 'none',
                        cursor: 'pointer',
                        letterSpacing: '0.02em',
                        width: '100%',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 24L22 12L34 24L22 36Z" fill="#1a0a00"/>
                        <path d="M24 24L36 12L48 24L36 36Z" fill="#1a0a00" opacity="0.4"/>
                      </svg>
                      Pay ₹{formData.amount} via UPI
                    </button>

                    {/* Tap-to-copy UPI ID */}
                    <div
                      className="rounded-xl px-4 py-2.5 text-center mt-3"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px dashed rgba(245,200,66,0.22)',
                      }}
                    >
                      <p className="text-xs mb-0.5" style={{ color: 'rgba(255,240,200,0.38)', fontFamily: "'Outfit', sans-serif" }}>
                        UPI ID
                      </p>
                      <p
                        className="font-bold text-sm select-all cursor-pointer"
                        style={{ color: '#f5c842', fontFamily: 'monospace', letterSpacing: '0.06em' }}
                        onClick={() => {
                          navigator.clipboard?.writeText(TEMPLE_UPI_ID);
                          toast.info('UPI ID copied!');
                        }}
                      >
                        {TEMPLE_UPI_ID}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,240,200,0.25)' }}>tap to copy</p>
                    </div>
                  </div>
                ) : (
                  /* ── DESKTOP: QR code ── */
                  <div className="relative mx-auto w-fit mb-6">
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        background: '#fff',
                        border: '3px solid #f5c842',
                        boxShadow: '0 0 30px rgba(245,200,66,0.3)',
                      }}
                    >
                      <img src={qrCodeUrl} alt="UPI QR Code" className="w-56 h-56 block" />
                    </div>
                    {/* Corner accents */}
                    {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                      <div key={i} className={`absolute ${pos} w-4 h-4 rounded-sm`}
                        style={{ background: '#f47728', opacity: 0.8 }} />
                    ))}
                  </div>
                )}

                <p className="text-xs mb-6 px-4" style={{ color: 'rgba(255,240,200,0.5)' }}>
                  {t.donate.qrNote}
                </p>

                <button
                  onClick={closeModal}
                  className="w-full py-3 rounded-2xl font-bold transition-all"
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
