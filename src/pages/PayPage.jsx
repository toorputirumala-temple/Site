import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RotatingFlowers from '../components/RotatingFlowers';

const TEMPLE_UPI_ID = "Q910582112@ybl";
const TEMPLE_NAME   = "Sri Venkateswara Swamy Aalaya Sankshema Sangham";

const PayPage = () => {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount') || '101';
  const donorName = searchParams.get('name') || '';
  const donorMobile = searchParams.get('mobile') || '';

  const [showDirectQr, setShowDirectQr] = useState(false);

  const rawUpiUrl = `upi://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${amount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(rawUpiUrl)}`;

  const handleAppPay = (appType) => {
    let target = rawUpiUrl;
    if (appType === 'phonepe') {
      target = `phonepe://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${amount}&cu=INR`;
    } else if (appType === 'gpay') {
      target = `gpay://upi/pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${amount}&cu=INR`;
    } else if (appType === 'paytm') {
      target = `paytmmp://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${amount}&cu=INR`;
    }
    window.location.href = target;
  };

  const handleDownloadQr = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Temple_QR_₹${amount}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('QR Code saved to Gallery!');
    } catch (e) {
      window.open(qrCodeUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-[#1a0a00] via-[#2d1200] to-[#120500]">
      {/* Background decoration */}
      <RotatingFlowers tintColor="rgba(245,200,66,0.15)" />

      <div
        className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative z-10 p-6 sm:p-8"
        style={{
          background: 'linear-gradient(165deg, rgba(35,15,5,0.95) 0%, rgba(20,8,0,0.98) 100%)',
          border: '1px solid rgba(245,200,66,0.35)',
          boxShadow: '0 25px 70px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,200,66,0.15) inset',
        }}
      >
        {/* Gold top accent line */}
        <div className="h-1.5 w-full absolute top-0 left-0" style={{ background: 'linear-gradient(90deg, #c8860a, #f5c842, #f47728, #f5c842, #c8860a)' }} />

        {/* Temple Salutation & Header */}
        <div className="text-center mt-2 mb-6">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#f5c842] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            ॥ ॐ నమో వేంకటేశాయ ॥
          </p>
          <h1
            className="text-xl sm:text-2xl font-black mb-1"
            style={{
              fontFamily: "'Yatra One', sans-serif",
              background: 'linear-gradient(135deg, #f5c842, #f47728)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి దేవస్థానం
          </h1>
          <p className="text-xs text-orange-200/70 tracking-wider">
            Toorpu Tirumala • Balabhadrapuram
          </p>
        </div>

        {/* Donation Amount Badge */}
        <div
          className="rounded-2xl p-4 mb-6 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(245,200,66,0.12), rgba(244,119,40,0.08))',
            border: '1px solid rgba(245,200,66,0.3)',
          }}
        >
          <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
            Donation Amount
          </p>
          <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center gap-1">
            <span className="text-[#f5c842]">₹</span>
            <span>{amount}</span>
          </div>
          {donorName && (
            <p className="text-xs text-orange-100/80 mt-1 font-medium">
              Donor: <span className="text-white font-semibold">{donorName}</span> {donorMobile ? `(${donorMobile})` : ''}
            </p>
          )}
        </div>

        {/* ── UPI APP LAUNCH BUTTONS ── */}
        <div className="space-y-3 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-200/80 text-center mb-2">
            Select your UPI App to Pay
          </p>

          {/* PhonePe */}
          <button
            type="button"
            onClick={() => handleAppPay('phonepe')}
            className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
            style={{
              background: '#5f259f',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-black text-[#5f259f] text-lg shadow-sm">
                पे
              </div>
              <span className="text-sm font-semibold">Pay via PhonePe</span>
            </div>
            <span className="text-xs opacity-80 font-normal">Open App ➔</span>
          </button>

          {/* Google Pay */}
          <button
            type="button"
            onClick={() => handleAppPay('gpay')}
            className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
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
              <span className="text-sm font-semibold text-gray-800">Pay via Google Pay</span>
            </div>
            <span className="text-xs text-gray-500 font-normal">Open App ➔</span>
          </button>

          {/* Paytm */}
          <button
            type="button"
            onClick={() => handleAppPay('paytm')}
            className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
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
              <span className="text-sm font-semibold">Pay via Paytm</span>
            </div>
            <span className="text-xs opacity-80 font-normal">Open App ➔</span>
          </button>

          {/* Any UPI App */}
          <button
            type="button"
            onClick={() => handleAppPay('generic')}
            className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #f5c842 0%, #f47728 100%)',
              color: '#1a0a00',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1a0a00] flex items-center justify-center font-bold text-[#f5c842] text-xs shadow-sm">
                UPI
              </div>
              <span className="text-sm font-bold">Pay via Any UPI App</span>
            </div>
            <span className="text-xs opacity-90 font-medium">BHIM / CRED ➔</span>
          </button>
        </div>

        {/* ── TOGGLE DIRECT QR CODE ── */}
        <div className="border-t border-amber-900/60 pt-4 mb-4 text-center">
          <button
            type="button"
            onClick={() => setShowDirectQr(prev => !prev)}
            className="text-xs font-semibold text-amber-300 underline underline-offset-4 hover:text-amber-200 transition-colors cursor-pointer"
          >
            {showDirectQr ? '▲ Hide QR Code' : '▼ Show QR Code / Scan with Camera'}
          </button>

          {showDirectQr && (
            <div className="mt-4">
              <div
                className="p-3 rounded-2xl mx-auto w-fit relative bg-white"
                style={{
                  border: '3px solid #f5c842',
                  boxShadow: '0 0 30px rgba(245,200,66,0.3)',
                }}
              >
                <img src={qrCodeUrl} alt="UPI QR Code" className="w-44 h-44 block" />
              </div>
              <button
                type="button"
                onClick={handleDownloadQr}
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-semibold hover:bg-amber-500/30 transition-all cursor-pointer"
              >
                📥 Save QR to Gallery
              </button>
            </div>
          )}
        </div>

        {/* ── 1-TAP COPY UPI ID ── */}
        <div
          className="rounded-xl px-4 py-2.5 text-center mb-6 cursor-pointer hover:bg-white/10 transition-colors"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px dashed rgba(245,200,66,0.3)',
          }}
          onClick={() => {
            navigator.clipboard?.writeText(TEMPLE_UPI_ID);
            toast.success('UPI ID copied to clipboard!');
          }}
        >
          <p className="text-xs text-amber-200/50 mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Temple Official UPI ID
          </p>
          <p className="font-bold text-sm text-[#f5c842] font-mono tracking-wider">
            {TEMPLE_UPI_ID}
          </p>
          <p className="text-[11px] text-amber-300/70 mt-0.5">📋 tap to copy UPI ID</p>
        </div>

        {/* Back to Temple Website */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-orange-300 hover:text-white transition-colors underline underline-offset-4"
          >
            ← Back to Temple Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
