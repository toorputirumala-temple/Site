import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../contexts/LanguageContext';

const TEMPLE_UPI_ID  = "Q539768773@ybl";
const TEMPLE_NAME    = "Sri Prasanna Venkateswara Swamy Temple";

/* Quick-amount presets */
const PRESETS = [51, 101, 251, 501, 1001];

/* Detect mobile / OS */
const isMobile  = () => /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
const isAndroid = () => /Android/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
const isIOS     = () => /iPhone|iPad|iPod/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');

/* Build per-app deep-link URLs */
const upiAppLink = (pa, pn, am, tn, appPkg, iosScheme) => {
  const base = `pa=${pa}&pn=${encodeURIComponent(pn)}&am=${am}&cu=INR&tn=${encodeURIComponent(tn)}`;
  if (isIOS() && iosScheme)  return `${iosScheme}://upi/pay?${base}`;
  if (isAndroid() && appPkg) return `intent://pay?${base}#Intent;scheme=upi;package=${appPkg};end`;
  return `upi://pay?${base}`; // generic fallback
};

/* UPI app definitions */
const UPI_APPS = (pa, pn, am, tn) => [
  {
    id: 'gpay',
    label: 'Google Pay',
    bg: 'linear-gradient(135deg, #1a73e8, #0d57c8)',
    shadow: 'rgba(26,115,232,0.4)',
    href: upiAppLink(pa, pn, am, tn, 'com.google.android.apps.nbu.paisa.user', 'tez'),
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-3.9 6.1l6.3 4.9C41 35.1 43.6 30.2 43.6 24.5z" fill="#4285F4"/>
        <path d="M24 44c5.4 0 10-1.8 13.3-4.8l-6.3-4.9c-1.8 1.2-4.1 1.9-7 1.9-5.4 0-10-3.6-11.6-8.6L5.6 32.6C8.9 39.1 16 44 24 44z" fill="#34A853"/>
        <path d="M12.4 27.6c-.4-1.2-.7-2.4-.7-3.6s.2-2.5.7-3.6l-6.8-5.2C4.2 17.7 3.5 20.8 3.5 24s.7 6.3 2.1 9l6.8-5.4z" fill="#FBBC04"/>
        <path d="M24 11.8c3 0 5.7 1 7.8 3l5.8-5.8C34 5.8 29.4 4 24 4 16 4 8.9 8.9 5.6 15.4l6.8 5.2C14 15.5 18.6 11.8 24 11.8z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: 'phonepe',
    label: 'PhonePe',
    bg: 'linear-gradient(135deg, #5f259f, #7b2fbe)',
    shadow: 'rgba(95,37,159,0.45)',
    href: upiAppLink(pa, pn, am, tn, 'com.phonepe.app', 'phonepe'),
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#fff" opacity="0.15"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff" fontFamily="serif">Pe</text>
      </svg>
    ),
  },
  {
    id: 'paytm',
    label: 'Paytm',
    bg: 'linear-gradient(135deg, #002970, #00BAF2)',
    shadow: 'rgba(0,186,242,0.35)',
    href: upiAppLink(pa, pn, am, tn, 'net.one97.paytm', 'paytm'),
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#fff"/>
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fontWeight="900" fill="#00BAF2" fontFamily="serif">P</text>
      </svg>
    ),
  },
  {
    id: 'amazon',
    label: 'Amazon Pay',
    bg: 'linear-gradient(135deg, #232f3e, #ff9900)',
    shadow: 'rgba(255,153,0,0.35)',
    href: upiAppLink(pa, pn, am, tn, 'in.amazon.mShop.android.shopping', null),
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="8" fill="#fff" opacity="0.15"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff" fontFamily="sans-serif">amzn</text>
      </svg>
    ),
  },
  {
    id: 'bhim',
    label: 'BHIM UPI',
    bg: 'linear-gradient(135deg, #00529b, #0082c8)',
    shadow: 'rgba(0,130,200,0.4)',
    href: upiAppLink(pa, pn, am, tn, 'in.org.npci.upiapp', null),
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="8" fill="#fff" opacity="0.15"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff" fontFamily="sans-serif">BHIM</text>
      </svg>
    ),
  },
  {
    id: 'any',
    label: 'Any UPI App',
    bg: 'linear-gradient(135deg, #f5c842 0%, #f47728 60%, #c45c00 100%)',
    shadow: 'rgba(244,119,40,0.45)',
    href: `upi://pay?pa=${pa}&pn=${encodeURIComponent(pn)}&am=${am}&cu=INR&tn=${encodeURIComponent(tn)}`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 24L22 12L34 24L22 36Z" fill="#1a0a00"/>
        <path d="M24 24L36 12L48 24L36 36Z" fill="#1a0a00" opacity="0.35"/>
      </svg>
    ),
    textColor: '#1a0a00',
  },
];

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
                  /* ── MOBILE: UPI App grid ── */
                  <div className="mb-6">
                    <p className="text-sm mb-3" style={{ color: 'rgba(255,240,200,0.55)', fontFamily: "'Outfit', sans-serif" }}>
                      Choose your UPI app to pay ₹{formData.amount}
                    </p>

                    {/* 2-column app grid */}
                    <div className="grid grid-cols-2 gap-2.5 mb-3">
                      {UPI_APPS(TEMPLE_UPI_ID, TEMPLE_NAME, formData.amount, 'Donation to ' + TEMPLE_NAME).map(app => (
                        <a
                          key={app.id}
                          href={app.href}
                          className="flex flex-col items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-xs transition-all active:scale-95"
                          style={{
                            background: app.bg,
                            color: app.textColor || '#fff',
                            boxShadow: `0 4px 18px ${app.shadow}`,
                            fontFamily: "'Outfit', sans-serif",
                            textDecoration: 'none',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {app.icon}
                          <span>{app.label}</span>
                        </a>
                      ))}
                    </div>

                    {/* Manual UPI ID copy box */}
                    <div
                      className="rounded-xl px-4 py-3 text-center"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px dashed rgba(245,200,66,0.25)',
                      }}
                    >
                      <p className="text-xs mb-1" style={{ color: 'rgba(255,240,200,0.4)', fontFamily: "'Outfit', sans-serif" }}>
                        Or enter UPI ID manually in any app
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
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,240,200,0.28)' }}>tap to copy</p>
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
