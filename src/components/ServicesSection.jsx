
import React from 'react';

export default function ServicesSection({ scrollToSection }) {
  const servicesList = [
    {
      icon: '👕',
      title: 'Cuci Kiloan Reguler',
      desc: 'Pengerjaan 2 hari, bersih dan wangi.',
      price: 'Rp 7.000',
      unit: '/ kg',
      color: 'sky'
    },
    {
      icon: '⚡',
      title: 'Cuci Kiloan Express',
      desc: 'Kilat 1 hari selesai, prioritas utama.',
      price: 'Rp 12.000',
      unit: '/ kg',
      color: 'pink'
    },
    {
      icon: '🧥',
      title: 'Cuci Jaket & Jas',
      desc: 'Perawatan khusus bahan tebal dan jas.',
      price: 'Rp 15.000',
      unit: '/ pcs',
      color: 'sky'
    },
    {
      icon: '🛏️',
      title: 'Cuci Bedcover',
      desc: 'Bersih mendalam untuk selimut dan bedcover.',
      price: 'Rp 25.000',
      unit: '/ pcs',
      color: 'pink'
    },
    {
      icon: '👟',
      title: 'Cuci Sepatu',
      desc: 'Deep cleaning bagian sol dan upper sepatu.',
      price: 'Rp 35.000',
      unit: '/ pasang',
      color: 'sky'
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
            Pilih layanan sesuai kebutuhan. Kami siap membantu
            pakaian dan barang kesayanganmu tetap bersih dan terawat.
          </p>
        </div>

        {/* Kartu layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {servicesList.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Bagian ikon */}
              <div className={`h-36 flex items-center justify-center ${
                item.color === 'pink'
                  ? 'bg-gradient-to-br from-pink-100 to-rose-50'
                  : 'bg-gradient-to-br from-sky-100 to-blue-50'
              }`}>
                <div className="text-6xl group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Informasi layanan */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex-1 space-y-2">
                  <h3 className="font-extrabold text-slate-800 text-sm">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-xs leading-relaxed min-h-10">
                    {item.desc}
                  </p>
                </div>

                <div className="border-t border-dashed border-slate-200 mt-5 pt-4">
                  <div className="mb-4">
                    <span className={`text-lg font-black ${
                      item.color === 'pink' ? 'text-pink-500' : 'text-sky-600'
                    }`}>
                      {item.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {' '}{item.unit}
                    </span>
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

        {/* Catatan bawah */}
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 text-center">
          <p className="text-xs sm:text-sm text-sky-800">
            💡 <strong>Info:</strong> Harga dapat disesuaikan dengan jenis
            layanan dan ketentuan gerai ZR Laundry.
          </p>
        </div>

      </div>
    </section>
  );
}
