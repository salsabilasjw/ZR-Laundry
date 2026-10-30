
import React from 'react';
import zrLogo from '../assets/zr-logo.png';

export default function ContactSection() {
  return (
    <footer
      id="contact"
      className="w-full bg-white px-6 sm:px-10 py-12"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* KOLOM LOGO DAN COPYRIGHT */}
        <div>
          <div className="border-b border-slate-300 pb-6 mb-3">
            <img
              src={zrLogo}
              alt="ZR Laundry Logo"
              className="w-64 h-20 object-contain object-left"
            />
          </div>

          <p className="text-xs text-slate-500 leading-6">
            © {new Date().getFullYear()} ZR Laundry. All Rights Reserved.
          </p>
        </div>

        {/* KOLOM TENTANG KAMI */}
        <div>
          <h3 className="text-xl font-bold italic text-slate-800 mb-8">
            Tentang Kami
          </h3>

          <div className="w-full h-[2px] bg-slate-300 mb-5">
            <div className="w-14 h-[5px] bg-sky-500"></div>
          </div>

          <p className="text-sm text-slate-600 leading-7 text-justify">
            ZR Laundry merupakan layanan laundry yang hadir untuk
            memenuhi kebutuhan perawatan pakaian Anda dengan layanan
            praktis, bersih, dan terpercaya.
          </p>
        </div>

        {/* KOLOM KONTAK KAMI */}
        <div>
          <h3 className="text-xl font-bold italic text-slate-800 mb-8">
            Kontak Kami
          </h3>

          <div className="w-full h-[2px] bg-slate-300 mb-5">
            <div className="w-14 h-[5px] bg-sky-500"></div>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-4">
              <span>☏</span>
              <p>WhatsApp: +62 812-3456-7890</p>
            </div>

            <div className="flex items-start gap-4">
              <span>☎</span>
              <p>Telepon: +62 812-3456-7890</p>
            </div>

            <div className="flex items-start gap-4">
              <span>📍</span>
              <p>
                Jl. Medan - Banda Aceh, Alue Dua,
                Kec. Langsa Baro, Kota Langsa,
                Aceh 24452
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
