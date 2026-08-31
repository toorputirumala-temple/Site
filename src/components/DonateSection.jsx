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

  const webPayUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/pay?amount=${formData.amount}&name=${encodeURIComponent(formData.name || '')}&mobile=${encodeURIComponent(formData.mobile || '')}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(webPayUrl)}`;

  const handleDownloadQr = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Temple_Donation_QR_₹${formData.amount || '0'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('QR Code saved to downloads/gallery!');
    } catch (e) {
      window.open(qrCodeUrl, '_blank');
    }
  };

  const openModal = () => { setIsOpen(true); setStep(1); };
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* ── FLOATING BUTTON ──────────────────────────────── */}
      <button
        onClick={openModal}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full font-bold transition-all duration-300 hover:scale-110 text-xs sm:text-sm cursor-pointer"
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
            className="w-full max-w-md relative overflow-hidden rounded-3xl max-h-[92vh] overflow-y-auto"
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
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-all cursor-pointer hover:bg-white/20"
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
                          className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
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
              /* ── STEP 2: INSTANT QR CODE & UPI ID PAYMENT ── */
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
                  {t.donate.scanPay}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'rgba(255,240,200,0.7)' }}>
                  {t.donate.amountLabel}: <span className="font-extrabold text-white text-lg">₹{formData.amount}</span>
                </p>

                {/* ── HIGH RES WEB GATEWAY QR CODE ── */}
                <div className="relative mx-auto w-fit mb-3">
                  <div
                    className="p-3.5 rounded-2xl bg-white relative"
                    style={{
                      border: '3px solid #f5c842',
                      boxShadow: '0 0 35px rgba(245,200,66,0.35)',
                    }}
                  >
                    <img src={qrCodeUrl} alt="Web UPI Gateway QR Code" className="w-48 h-48 sm:w-52 sm:h-52 block mx-auto" />
                  </div>
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-3.5 h-3.5 rounded-sm`}
                      style={{ background: '#f47728', opacity: 0.9 }} />
                  ))}
                </div>

                {/* Mobile Web Direct Pay Button */}
                <div className="flex flex-col gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => { window.location.href = webPayUrl; }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #f5c842 0%, #f47728 100%)',
                      color: '#1a0a00',
                    }}
                  >
                    <span>⚡</span> Open Web Payment Gateway on this Phone
                  </button>

                  {/* Save QR to photos */}
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer bg-white/10 border border-amber-400/40 text-amber-200 hover:bg-white/15"
                  >
                    <span>📥</span> {t.donate.saveQr}
                  </button>
                </div>

                {/* Supported App Badges */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#5f259f]/40 border border-[#5f259f] text-purple-200 font-semibold">PhonePe</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-900/40 border border-blue-400 text-blue-200 font-semibold">Google Pay</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#002e6e]/60 border border-[#00b9f5] text-cyan-200 font-semibold">Paytm</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-900/40 border border-amber-500 text-amber-200 font-semibold">BHIM</span>
                </div>

                {/* Scan Info */}
                <p className="text-xs text-amber-200/70 mb-3 leading-relaxed font-medium">
                  Scan this QR code with <strong>Google Lens, iPhone Camera, or Any QR Scanner</strong> to open the payment page in your browser.
                </p>

                {/* ── 1-TAP COPY UPI ID ── */}
                <div
                  className="rounded-xl px-4 py-2.5 text-center mb-5 cursor-pointer hover:bg-white/10 transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px dashed rgba(245,200,66,0.4)',
                  }}
                  onClick={() => {
                    navigator.clipboard?.writeText(TEMPLE_UPI_ID);
                    toast.success('UPI ID copied! Open any UPI App and paste.');
                  }}
                >
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(255,240,200,0.5)', fontFamily: "'Outfit', sans-serif" }}>
                    {t.donate.templeUpi}
                  </p>
                  <p
                    className="font-bold text-sm select-all"
                    style={{ color: '#f5c842', fontFamily: 'monospace', letterSpacing: '0.06em' }}
                  >
                    {TEMPLE_UPI_ID}
                  </p>
                  <p className="text-[11px] mt-0.5 text-amber-300 font-medium">📋 {t.donate.copyUpiBtn}</p>
                </div>

                {/* Navigation actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer hover:bg-white/10"
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
                    className="w-2/3 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, #f5c842, #f47728)',
                      color: '#1a0a00',
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
