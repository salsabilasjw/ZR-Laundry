import React, { useState } from 'react';

export default function ServicesSection({ scrollToSection, isMemberActive }) {
  const [dollSize, setDollSize] = useState('kecil');

  const dollPrices = {
    kecil: 'Rp 20.000',
    sedang: 'Rp 30.000',
    besar: 'Rp 40.000'
  };

  const servicesList = [
    {
      id: 'kiloan-2hari',
      icon: '👕',
      title: 'Cuci Kiloan Reguler (2 Hari)',
      desc: 'Pengerjaan 2 hari, bersih, wangi, dan rapi.',
      price: 'Rp 8.000',
      unit: '/ kg',
      color: 'sky',
      category: 'Reguler',
      isMemberIncluded: true
    },
    {
      id: 'kiloan-express-1hari',
      icon: '⚡',
      title: 'Cuci Express (1 Hari)',
      desc: 'Layanan kilat selesai dalam 1 hari.',
      price: 'Rp 10.000',
      unit: '/ kg',
      color: 'pink',
      category: 'Express',
      isMemberIncluded: true
    },
    {
      id: 'kiloan-express-sameday',
      icon: '🚀',
      title: 'Cuci Express (Pagi/Sore)',
      desc: 'Selesai di hari yang sama (Pagi ambil Sore).',
      price: 'Rp 15.000',
      unit: '/ kg',
      color: 'pink',
      category: 'Express',
      isMemberIncluded: true
    },
    {
      id: 'sprei',
      icon: '🛏️',
      title: 'Cuci Sprei',
      desc: 'Pembersihan mendalam untuk sprei tempat tidur.',
      price: 'Rp 9.000',
      unit: '/ kg',
      color: 'sky',
      category: 'Satuan / Kiloan',
      isMemberIncluded: true
    },
    {
      id: 'bedcover',
      icon: '🛌',
      title: 'Cuci Bed Cover',
      desc: 'Bersih mendalam untuk selimut tebal & bedcover.',
      price: 'Rp 10.000',
      unit: '/ kg',
      color: 'pink',
      category: 'Satuan / Kiloan',
      isMemberIncluded: true
    },
    {
      id: 'baju-gaun',
      icon: '👗',
      title: 'Cuci Baju Gaun',
      desc: 'Perawatan ekstra halus untuk gaun & gaun pesta.',
      price: 'Rp 30.000',
      unit: '/ pcs',
      color: 'pink',
      category: 'Satuan',
      isMemberIncluded: false
    },
    {
      id: 'jas-baju',
      icon: '🧥',
      title: 'Cuci Jas / Baju',
      desc: 'Perawatan khusus bahan tebal dan jas atasan.',
      price: 'Rp 15.000',
      unit: '/ pcs',
      color: 'sky',
      category: 'Satuan',
      isMemberIncluded: false
    },
    {
      id: 'jas-setelan',
      icon: '👔',
      title: 'Cuci Jas Setelan',
      desc: 'Pembersihan lengkap untuk atasan dan bawahan jas.',
      price: 'Rp 30.000',
      unit: '/ pcs',
      color: 'sky',
      category: 'Satuan',
      isMemberIncluded: false
    },
    {
      id: 'sepatu',
      icon: '👟',
      title: 'Cuci Sepatu',
      desc: 'Deep cleaning bagian sol dan upper sepatu.',
      price: 'Rp 25.000',
      unit: '/ pasang',
      color: 'sky',
      category: 'Satuan',
      isMemberIncluded: false
    },
    {
      id: 'tas',
      icon: '🎒',
      title: 'Cuci Tas',
      desc: 'Pembersihan bahan tas ransel/kasual.',
      price: 'Rp 15.000',
      unit: '/ kg',
      color: 'pink',
      category: 'Satuan / Kiloan',
      isMemberIncluded: true
    },
    {
      id: 'gorden',
      icon: '🪟',
      title: 'Cuci Gorden',
      desc: 'Pembersihan mendalam dari debu dan kuman.',
      price: 'Rp 10.000',
      unit: '/ kg',
      color: 'sky',
      category: 'Satuan / Kiloan',
      isMemberIncluded: true
    },
    {
      id: 'boneka',
      icon: '🧸',
      title: 'Cuci Boneka',
      desc: 'Pembersihan higienis untuk boneka (Kecil, Sedang, Besar).',
      priceRange: 'Rp 20.000 - Rp 40.000',
      unit: '/ pcs',
      color: 'pink',
      category: 'Satuan',
      isMemberIncluded: false,
      isDollCard: true 
    }
  ];

  return (
    <section id="services" className="px-4 sm:px-8 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex bg-pink-50 text-pink-600 border border-pink-100 px-4 py-2 rounded-full text-xs font-extrabold tracking-wider">
            ✨ DAFTAR LAYANAN KAMI
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
            Layanan Laundry
            <span className="text-sky-600"> Terbaik</span>
            <br />
            Untuk Kebutuhanmu
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed">
            Pilih layanan sesuai kebutuhan. Nikmati keuntungan hemat dengan paket member ZR Laundry!
          </p>
        </div>

        {/* BANNER PAKET MEMBER */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              👑 PAKET SULTAN MEMBER
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Langganan Member ZR Premium
            </h3>
            <p className="text-amber-100 text-xs sm:text-sm max-w-xl">
              Hanya <strong className="text-white">Rp 150.000 / Bulan</strong>. Bebas biaya bayar per transaksi untuk cuci pakaian, handuk, dan seprei!
            </p>
            {isMemberActive && (
              <p className="text-xs bg-green-900/40 border border-green-300 text-green-200 px-3 py-1.5 rounded-xl font-bold inline-block mt-2">
                ✅ Status Anda Saat Ini: MEMBER AKTIF
              </p>
            )}
          </div>
          
          <button
            onClick={() => scrollToSection('portal')}
            className="bg-white text-orange-600 hover:bg-amber-50 font-black px-6 py-3.5 rounded-2xl text-sm shadow-md transition hover:scale-105 shrink-0"
          >
            {isMemberActive ? 'Perpanjang Member →' : 'Daftar Member Sekarang →'}
          </button>
        </div>

        {/* Grid Kartu Layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesList.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className={`h-32 flex items-center justify-center ${
                item.color === 'pink'
                  ? 'bg-gradient-to-br from-pink-100 to-rose-50'
                  : 'bg-gradient-to-br from-sky-100 to-blue-50'
              }`}>
                <div className="text-5xl group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-slate-800 text-sm">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed min-h-10">
                    {item.desc}
                  </p>

                  {item.isDollCard && (
                    <div className="pt-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Pilih Ukuran Boneka:
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {['kecil', 'sedang', 'besar'].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setDollSize(size)}
                            className={`py-1 rounded-lg text-[10px] font-extrabold capitalize border transition ${
                              dollSize === size
                                ? 'bg-pink-500 text-white border-pink-500 shadow-xs'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                </div>

                <div className="border-t border-dashed border-slate-200 mt-5 pt-4">
                  <div className="mb-4">
                    {isMemberActive && item.isMemberIncluded ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs line-through text-slate-400">{item.price}</span>
                        <span className="text-sm font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-200">
                          GRATIS (Member)
                        </span>
                      </div>
                    ) : item.isDollCard ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-pink-500">
                            {dollPrices[dollSize]}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {item.unit}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 ml-1">
                            ({dollSize})
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Range harga: {item.priceRange}
                        </p>
                      </div>
                    ) : (
                      <>
                        <span className={`text-lg font-black ${
                          item.color === 'pink' ? 'text-pink-500' : 'text-sky-600'
                        }`}>
                          {item.price}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {' '}{item.unit}
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => scrollToSection('portal')}
                    className={`w-full py-3 rounded-xl text-xs font-bold text-white transition ${
                      item.color === 'pink'
                        ? 'bg-pink-500 hover:bg-pink-600'
                        : 'bg-sky-600 hover:bg-sky-700'
                    }`}
                  >
                    Pesan Layanan →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 text-center">
          <p className="text-xs sm:text-sm text-sky-800">
            📌 <strong>Catatan Member:</strong> Layanan yang termasuk cakupan member hanya jenis cucian dengan hitungan <strong>kiloan (/kg)</strong>.
          </p>
        </div>

      </div>
    </section>
  );
}