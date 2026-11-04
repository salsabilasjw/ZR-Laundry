import React from 'react';

export default function ServicesSection({ scrollToSection, isMemberActive }) {
  const servicesList = [
    {
      id: 'kiloan-reguler',
      icon: '👕',
      title: 'Cuci Kiloan Reguler',
      desc: 'Pengerjaan 2 hari, bersih dan wangi.',
      price: 'Rp 7.000',
      unit: '/ kg',
      color: 'sky',
      category: 'Reguler'
    },
    {
      id: 'kiloan-express',
      icon: '⚡',
      title: 'Cuci Kiloan Express',
      desc: 'Kilat 1 hari selesai, prioritas utama.',
      price: 'Rp 12.000',
      unit: '/ kg',
      color: 'pink',
      category: 'Express'
    },
    {
      id: 'jaket-jas',
      icon: '🧥',
      title: 'Cuci Jaket & Jas',
      desc: 'Perawatan khusus bahan tebal dan jas.',
      price: 'Rp 15.000',
      unit: '/ pcs',
      color: 'sky',
      category: 'Satuan'
    },
    {
      id: 'bedcover',
      icon: '🛏️',
      title: 'Cuci Bedcover',
      desc: 'Bersih mendalam untuk selimut dan bedcover.',
      price: 'Rp 25.000',
      unit: '/ pcs',
      color: 'pink',
      category: 'Satuan'
    },
    {
      id: 'sepatu',
      icon: '👟',
      title: 'Cuci Sepatu',
      desc: 'Deep cleaning bagian sol dan upper sepatu.',
      price: 'Rp 35.000',
      unit: '/ pasang',
      color: 'sky',
      category: 'Satuan'
    },
    // Penambahan Variasi Layanan Mitra Baru
    {
      id: 'karpet-gorden',
      icon: '🪟',
      title: 'Cuci Karpet & Gorden',
      desc: 'Pembersihan mendalam dari debu dan kuman.',
      price: 'Rp 20.000',
      unit: '/ m²',
      color: 'pink',
      category: 'Mitra Khusus'
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
            Pilih layanan sesuai kebutuhan. Nikmati keuntungan lebih hemat dengan paket berlangganan Member ZR Laundry!
          </p>
        </div>

        {/* KARTU BANNER KHUSUS MEMBER (BERLANGGANAN) */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              👑 PAKET SULTAN MEMBER
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Langganan Member ZR Premium
            </h3>
            <p className="text-amber-100 text-xs sm:text-sm max-w-xl">
              Hanya <strong className="text-white">Rp 150.000 / Bulan</strong>. Bebas biaya bayar per transaksi untuk semua laundry kiloan reguler & discount 20% layanan khusus hingga masa kedaluwarsa habis!
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
                </div>

                <div className="border-t border-dashed border-slate-200 mt-5 pt-4">
                  <div className="mb-4">
                    {isMemberActive && item.category === 'Reguler' ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs line-through text-slate-400">{item.price}</span>
                        <span className="text-sm font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-200">
                          GRATIS (Member)
                        </span>
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
            💡 <strong>Info Mitra & Member:</strong> Harga khusus anggota berlaku otomatis pada sistem Portal Pembayaran saat pesanan diproses.
          </p>
        </div>

      </div>
    </section>
  );
}