import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RotatingFlowers from '../components/RotatingFlowers';

const TEMPLE_UPI_ID = "Q910582112@ybl";
const TEMPLE_NAME   = "Sri Venkateswara Swamy Aalaya Sankshema Sangham";

const PayPage = () => {
  const [searchParams] = useSearchParams();
  const amount     = searchParams.get('amount')  || '101';
  const donorName  = searchParams.get('name')    || '';
  const donorMobile = searchParams.get('mobile') || '';

  // ── QR encodes UPI pay URL directly (works when scanned by UPI app or phone camera)
  const upiPayUrl = `upi://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${amount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(upiPayUrl)}`;

  const handleDownloadQr = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Temple_QR_Rs${amount}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('QR Code saved! Open your UPI app and scan from Gallery.');
    } catch {
      window.open(qrCodeUrl, '_blank');
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(TEMPLE_UPI_ID);
    toast.success('UPI ID copied! Paste it in any UPI app to pay.');
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #1a0a00 0%, #2d1200 50%, #120500 100%)' }}
    >
      <RotatingFlowers tintColor="rgba(245,200,66,0.12)" />

      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative z-10"
        style={{
          background: 'linear-gradient(160deg, rgba(35,15,5,0.97) 0%, rgba(18,7,0,0.99) 100%)',
          border: '1px solid rgba(245,200,66,0.3)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,200,66,0.1) inset',
        }}
      >
        {/* Gold top bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #c8860a, #f5c842, #f47728, #f5c842, #c8860a)' }} />

        <div className="px-6 pt-6 pb-3 text-center">
          {/* Deity greeting */}
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-1"
            style={{ color: '#f5c842', fontFamily: "'Outfit', sans-serif" }}
          >
            ॥ ఓం నమో వేంకటేశాయ ॥
          </p>
          <h1
            className="text-lg sm:text-xl font-black leading-tight mb-0.5"
            style={{
              fontFamily: "'Yatra One', 'Outfit', sans-serif",
              background: 'linear-gradient(135deg, #f5c842, #f47728)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి
          </h1>
          <p className="text-xs text-orange-200/60 tracking-wider mb-4">
            Toorpu Tirumala • Balabhadrapuram
          </p>

          {/* Amount badge */}
          <div
            className="rounded-2xl py-3 px-4 mb-5"
            style={{
              background: 'linear-gradient(135deg, rgba(245,200,66,0.1), rgba(244,119,40,0.07))',
              border: '1px solid rgba(245,200,66,0.25)',
            }}
          >
            <p className="text-[11px] uppercase tracking-widest text-amber-300/80 font-semibold mb-0.5">
              Donation Amount
            </p>
            <div className="text-4xl font-extrabold text-white flex items-center justify-center gap-1">
              <span className="text-[#f5c842] text-3xl">₹</span>
              <span>{amount}</span>
            </div>
            {donorName && (
              <p className="text-xs text-orange-100/70 mt-1 font-medium">
                {donorName}{donorMobile ? ` · ${donorMobile}` : ''}
              </p>
            )}
          </div>
        </div>

        {/* ── QR CODE ── */}
        <div className="px-6 pb-4 flex flex-col items-center">
          <div
            className="p-3 rounded-2xl bg-white mb-3 relative"
            style={{
              border: '3px solid #f5c842',
              boxShadow: '0 0 40px rgba(245,200,66,0.3), 0 0 0 1px rgba(245,200,66,0.15)',
            }}
          >
            <img
              src={qrCodeUrl}
              alt="UPI QR Code"
              className="w-52 h-52 block"
              style={{ display: 'block' }}
            />
          </div>

          {/* Supported app logos row */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#5f259f]/40 border border-[#9c4ddd] text-purple-200 font-bold">PhonePe</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-900/40 border border-blue-400 text-blue-200 font-bold">GPay</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-900/40 border border-sky-400 text-sky-200 font-bold">Paytm</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-900/40 border border-amber-500 text-amber-200 font-bold">BHIM</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-green-900/40 border border-green-500 text-green-200 font-bold">CRED</span>
          </div>

          {/* ── HOW TO PAY INSTRUCTIONS ── */}
          <div
            className="w-full rounded-2xl px-4 py-3.5 mb-4 text-left"
            style={{
              background: 'rgba(245,200,66,0.06)',
              border: '1px solid rgba(245,200,66,0.2)',
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300 mb-2">
              How to Pay
            </p>
            <div className="space-y-2">
              {[
                { icon: '📸', text: 'Open your UPI app (PhonePe / GPay / Paytm / BHIM)' },
                { icon: '🔍', text: 'Tap "Scan QR" inside the app' },
                { icon: '✅', text: 'Point your camera at this QR code and confirm payment' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-sm flex-shrink-0">{step.icon}</span>
                  <p className="text-xs text-orange-100/80 leading-snug">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── SAVE QR BUTTON ── */}
          <button
            type="button"
            onClick={handleDownloadQr}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm mb-3 transition-all active:scale-95 hover:opacity-90 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #f5c842 0%, #f47728 100%)',
              color: '#1a0a00',
              boxShadow: '0 4px 20px rgba(244,119,40,0.4)',
            }}
          >
            <span>📥</span> Save QR to Gallery
          </button>

          <p className="text-[11px] text-amber-200/60 text-center mb-4 px-2 leading-relaxed">
            Save QR → Open UPI App → Scan from Gallery
          </p>

          {/* ── COPY UPI ID ── */}
          <div
            onClick={handleCopyUpi}
            className="w-full rounded-2xl px-4 py-3 text-center cursor-pointer hover:bg-white/10 transition-colors mb-4"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px dashed rgba(245,200,66,0.35)',
            }}
          >
            <p className="text-[11px] text-amber-200/50 mb-0.5">Temple Official UPI ID</p>
            <p
              className="font-bold text-sm tracking-wider"
              style={{ color: '#f5c842', fontFamily: 'monospace' }}
            >
              {TEMPLE_UPI_ID}
            </p>
            <p className="text-[11px] text-amber-300/70 mt-0.5">📋 Tap to copy UPI ID</p>
          </div>

          {/* Back link */}
          <Link
            to="/"
            className="text-xs text-orange-300/70 hover:text-white transition-colors underline underline-offset-4"
          >
            ← Back to Temple Website
          </Link>
        </div>

        {/* Gold bottom bar */}
        <div className="h-1.5 w-full mt-2" style={{ background: 'linear-gradient(90deg, #c8860a, #f5c842, #f47728, #f5c842, #c8860a)' }} />
      </div>
    </div>
  );
};

export default PayPage;
