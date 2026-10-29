import React, { useState } from 'react';

export default function HeroSection({ scrollToSection }) {
  const [resiQuickInput, setResiQuickInput] = useState('');

  const handleQuickTrack = (e) => {
    e.preventDefault();
    if (!resiQuickInput.trim()) {
      alert('Masukkan nomor resi terlebih dahulu!');
      return;
    }
    // Arahkan ke bagian pelacakan resi
    scrollToSection('track');
  };

  return (
    <section id="beranda" className="py-2">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
        
        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Sisi Kiri: Teks & Tombol Utama */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-white/20">
              <span>🚚</span> LAYANAN ANTAR-JEMPUT GRATIS
            </div>

            {/* Judul Utama */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Solusi Laundry Kilat, Bersih, & Harum Tanpa Repot!
            </h1>

            {/* Deskripsi Singkat */}
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
              Nikmati kemudahan mencuci pakaian dengan teknologi pemesanan online dan sistem pelacakan real-time. Kami jemput, cuci dengan deterjen premium, dan antar kembali ke rumah Anda.
            </p>

            {/* Tombol Aksi Kiri */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => scrollToSection('portal')}
                className="bg-white hover:bg-slate-100 text-blue-600 font-extrabold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5"
              >
                Pesan Laundry Sekarang
              </button>

              <button 
                onClick={() => scrollToSection('track')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 font-extrabold px-6 py-3 rounded-2xl text-xs sm:text-sm transition"
              >
                Lacak Resi Cucian
              </button>
            </div>

          </div>

          {/* Sisi Kanan: Card Cek Status Cepat Resi */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl w-full max-w-sm shadow-2xl space-y-4">
              
              <div className="flex items-center gap-2">
                <span className="text-sm">🔍</span>
                <h3 className="font-extrabold text-sm text-white">Cek Status Cepat Resi</h3>
              </div>

              <form onSubmit={handleQuickTrack} className="space-y-3">
                <input 
                  type="text" 
                  value={resiQuickInput}
                  onChange={(e) => setResiQuickInput(e.target.value)}
                  placeholder="Cth: LND-839201" 
                  className="w-full px-4 py-3 bg-white text-slate-800 placeholder-slate-400 font-medium rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-inner" 
                />

                <button 
                  type="submit"
                  className="w-full bg-white hover:bg-slate-100 text-blue-600 font-extrabold py-3 rounded-2xl text-xs shadow-md transition"
                >
                  Lacak Sekarang
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}