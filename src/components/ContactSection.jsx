import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white p-8 rounded-3xl shadow-sm border max-w-xl mx-auto text-center space-y-4 mt-24">
      <h3 className="text-2xl font-bold text-slate-900">📞 Hubungi Kami</h3>
      <p className="text-slate-600 text-sm">
        Punya pertanyaan seputar layanan cuci kami atau ingin konsultasi? Silakan kunjungi atau hubungi kontak di bawah ini:
      </p>
      
      <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-left text-sm border">
        <p><strong>📍 Alamat Toko:</strong> Jl. Contoh No. 123, Medan, Sumatera Utara</p>
        <p><strong>📱 WhatsApp CS:</strong> +62 812-3456-7890</p>
        <p><strong>⏰ Jam Operasional:</strong> Setiap Hari (08.00 - 21.00 WIB)</p>
      </div>
    </section>
  );
}