
import React from 'react';

export default function AboutSection() {
  return (
    <section id="tentang-kami" className="px-4 sm:px-8 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] p-7 sm:p-10 lg:p-14 border border-sky-100 shadow-sm">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Bagian kiri */}
          <div className="space-y-6">

            <div className="inline-flex items-center bg-sky-50 text-sky-600 px-4 py-2 rounded-full text-xs font-extrabold tracking-wider border border-sky-100">
              TENTANG ZR LAUNDRY
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
              Merawat Pakaian,
              <span className="block text-sky-600">
                Memudahkan Aktivitas
              </span>
              <span className="text-pink-500">
                Setiap Hari!
              </span>
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              ZR Laundry hadir sebagai solusi perawatan pakaian yang praktis
              dan terpercaya. Kami membantu pelanggan menghemat waktu dengan
              layanan pencucian yang mudah, bersih, wangi, dan nyaman.
              Dengan dukungan sistem pemesanan online, pelanggan juga dapat
              memantau proses laundry dengan lebih mudah.
            </p>

            {/* Keunggulan */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">

              <div className="bg-sky-50 border border-sky-100 p-5 rounded-2xl">
                <div className="text-2xl mb-2">🫧</div>
                <h4 className="font-extrabold text-sky-700 text-sm">
                  Bersih dan Wangi
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Perawatan pakaian agar tetap segar dan nyaman digunakan.
                </p>
              </div>

              <div className="bg-pink-50 border border-pink-100 p-5 rounded-2xl">
                <div className="text-2xl mb-2">⏰</div>
                <h4 className="font-extrabold text-pink-600 text-sm">
                  Hemat Waktu
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Proses pemesanan praktis tanpa harus datang langsung.
                </p>
              </div>

            </div>
          </div>

          {/* Bagian kanan */}
          <div className="relative">

            <div className="absolute -top-5 -right-5 w-28 h-28 bg-pink-100 rounded-full blur-2xl" />

            <div className="relative bg-gradient-to-br from-sky-100 to-pink-100 p-7 sm:p-10 rounded-[2rem]">

              <div className="bg-white rounded-2xl p-7 shadow-sm text-center space-y-5">

                <div className="text-6xl">🏪</div>

                <div>
                  <h3 className="text-xl font-black text-slate-800">
                    Gerai Utama & Workshop
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Jl. Perintis Kemerdekaan No. 45
                    (Dekat Kampus Utama), Kota Medan,
                    Sumatera Utara.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 bg-sky-50 text-sky-700 rounded-xl py-3 text-sm font-bold">
                  <span>🕒</span>
                  Buka setiap hari, 07.00–21.00 WIB
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
