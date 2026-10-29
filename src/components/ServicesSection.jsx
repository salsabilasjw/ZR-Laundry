import React from 'react';

export default function ServicesSection({ scrollToSection }) {
  const servicesList = [
    {
      icon: '👕',
      title: 'Cuci Kiloan Reguler',
      desc: 'Pengerjaan 2 hari, bersih dan wangi.',
      price: 'Rp 7,000',
      unit: '/ kg'
    },
    {
      icon: '⚡',
      title: 'Cuci Kiloan Express',
      desc: 'Kilat 1 hari selesai, prioritas utama.',
      price: 'Rp 12,000',
      unit: '/ kg'
    },
    {
      icon: '🧥',
      title: 'Cuci Satuan Jaket/Jas',
      desc: 'Perawatan khusus bahan tebal dan jas.',
      price: 'Rp 15,000',
      unit: '/ pcs'
    },
    {
      icon: '🛏️',
      title: 'Cuci Bedcover/Selimut',
      desc: 'Bersih mendalam bebas tungau.',
      price: 'Rp 25,000',
      unit: '/ pcs'
    },
    {
      icon: '👟',
      title: 'Cuci Sepatu Sneakers',
      desc: 'Deep cleaning sol & upper sepatu.',
      price: 'Rp 35,000',
      unit: '/ pasang'
    }
  ];

  return (
    <section id="services" className="py-8">
      <div className="space-y-8">
        
        {/* Header Judul */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center bg-blue-50 text-blue-600 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold tracking-wider uppercase border border-blue-100">
            DAFTAR LAYANAN & TARIF
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pilih Layanan Sesuai Kebutuhan Anda
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Transparan, tanpa biaya tersembunyi, dihitung akurat berdasarkan berat atau satuan.
          </p>
        </div>

        {/* Grid Kartu Layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {servicesList.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                  {item.icon}
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-lg font-black text-blue-600">{item.price}</span>
                  <span className="text-[11px] text-slate-400 font-semibold"> {item.unit}</span>
                </div>

                <button 
                  onClick={() => scrollToSection('portal')}
                  className="w-full bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs transition border border-slate-200 hover:border-blue-600 shadow-sm"
                >
                  Pesan Layanan
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}