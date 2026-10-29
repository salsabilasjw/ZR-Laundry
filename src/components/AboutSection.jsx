import React from 'react';

export default function AboutSection() {
  return (
    <section id="tentang-kami" className="py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-sm">
        
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Sisi Kiri: Teks & Fitur Unggulan */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center bg-blue-50 text-blue-600 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold tracking-wider uppercase border border-blue-100">
              TENTANG ZR-LAUNDRY
            </div>

            {/* Judul Utama */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              Berkomitmen Memberikan Perawatan Pakaian Terbaik Sejak 2024
            </h2>

            {/* Deskripsi */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              ZR-Laundry hadir untuk mengubah cara tradisional mencuci pakaian menjadi modern dan efisien. Didukung oleh mesin cuci higienis berstandar tinggi, pewangi kelas eksekutif, serta tim profesional yang teliti menjaga kualitas pakaian Anda.
            </p>

            {/* Dua Kotak Kecil di Bawah */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1">
                <h4 className="text-xl sm:text-2xl font-black text-blue-600">100%</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium">Pakaian Bersih & Higienis</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1">
                <h4 className="text-xl sm:text-2xl font-black text-blue-600">24 Jam</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium">Layanan Express Tersedia</p>
              </div>
            </div>

          </div>

          {/* Sisi Kanan: Kotak Gerai Utama & Workshop */}
          <div className="lg:col-span-5">
            <div className="bg-blue-50/60 border border-blue-100/80 p-6 sm:p-8 rounded-3xl text-center space-y-5 shadow-inner">
              
              <div className="w-10 h-10 bg-rose-500 text-white rounded-full mx-auto flex items-center justify-center text-lg shadow-md animate-bounce">
                📍
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-base text-slate-900">Gerai Utama & Workshop</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Jl. Perintis Kemerdekaan No. 45 (Dekat Kampus Utama), Kota Medan, Sumatera Utara. Buka setiap hari pukul 07.00 - 21.00 WIB.
                </p>
              </div>

              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 px-4 rounded-2xl font-bold text-xs shadow-md transition"
              >
                <span>💬</span> Chat WhatsApp Store
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}