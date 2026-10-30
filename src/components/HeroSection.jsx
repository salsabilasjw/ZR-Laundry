
import React, { useState } from 'react';

export default function HeroSection({ scrollToSection }) {
  const [resiQuickInput, setResiQuickInput] = useState('');

  const handleQuickTrack = (e) => {
    e.preventDefault();

    if (!resiQuickInput.trim()) {
      alert('Masukkan nomor resi terlebih dahulu!');
      return;
    }

    scrollToSection('track');
  };

  return (
    <section
      id="beranda"
      className="px-4 sm:px-8 lg:px-12 pt-8 pb-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-100 via-blue-50 to-pink-100 shadow-lg">

          {/* Dekorasi background */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink-200/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-sky-200/60 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center p-7 sm:p-12 lg:p-16">

            {/* Bagian kiri */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sky-700 text-xs font-bold">
                <span>🫧</span>
                LAUNDRY PRAKTIS & PROFESIONAL
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 leading-tight">
                Cucian Bersih,
                <span className="block text-sky-600">
                  Hidup Lebih
                </span>
                <span className="text-pink-500">
                  Praktis!
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
                Tidak perlu repot mencuci sendiri.
                ZR Laundry siap membantu pakaianmu tetap
                bersih, wangi, dan rapi dengan layanan
                yang mudah dan praktis.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => scrollToSection('portal')}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-sky-200 transition hover:-translate-y-1"
                >
                  Pesan Sekarang →
                </button>

                <button
                  onClick={() => scrollToSection('track')}
                  className="bg-white hover:bg-pink-50 text-pink-600 border border-pink-200 font-bold px-6 py-3.5 rounded-xl text-sm transition hover:-translate-y-1"
                >
                  Cek Status Cucian
                </button>
              </div>

              <div className="flex flex-wrap gap-5 pt-3 text-xs font-semibold text-slate-600">
                <span>✓ Praktis</span>
                <span>✓ Bersih dan Wangi</span>
                <span>✓ Mudah Dipesan</span>
              </div>
            </div>

            {/* Bagian kanan */}
            <div className="flex flex-col items-center gap-6">

              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-pink-300/40 rounded-full blur-3xl" />

                <div className="relative bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white">
                  <div className="text-center space-y-4">
                    <div className="text-7xl">🧺</div>
                    <h2 className="text-2xl font-black text-slate-800">
                      Fresh Clothes,
                      <span className="block text-pink-500">
                        Happy Days!
                      </span>
                    </h2>
                    <p className="text-sm text-slate-500">
                      Serahkan urusan cucianmu kepada ZR Laundry.
                    </p>
                    <div className="flex justify-center gap-3 text-3xl">
                      <span>🫧</span>
                      <span>👕</span>
                      <span>✨</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form cek resi */}
              <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-lg border border-sky-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🔍</span>
                  <h3 className="font-extrabold text-slate-800">
                    Cek Status Cucian
                  </h3>
                </div>

                <form onSubmit={handleQuickTrack} className="space-y-3">
                  <input
                    type="text"
                    value={resiQuickInput}
                    onChange={(e) => setResiQuickInput(e.target.value)}
                    placeholder="Masukkan nomor resi..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />

                  <button
                    type="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl text-sm transition"
                  >
                    Lacak Sekarang →
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
