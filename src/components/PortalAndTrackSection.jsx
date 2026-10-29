import React, { useState } from 'react';

export default function PortalAndTrackSection() {
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [layanan, setLayanan] = useState('Cuci Kiloan Reguler');
  const [paymentMethod, setPaymentMethod] = useState('Cash (Tunai)');
  const [buktiTransfer, setBuktiTransfer] = useState(null);
  const [pesananBerhasil, setPesananBerhasil] = useState(null);

  const [resiInput, setResiInput] = useState('');
  const [statusResi, setStatusResi] = useState(null);

  const [quickNama, setQuickNama] = useState('');
  const [quickLayanan, setQuickLayanan] = useState('Cuci Kiloan Reguler');
  const [quickPesananBerhasil, setQuickPesananBerhasil] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBuktiTransfer(file.name);
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'Transfer Bank' && !buktiTransfer) {
      alert('Mohon unggah bukti transfer bank terlebih dahulu!');
      return;
    }

    const generatedResi = 'ZRL-' + Math.floor(1000 + Math.random() * 9000);
    setPesananBerhasil({ 
      nama, 
      layanan, 
      resi: generatedResi, 
      paymentMethod, 
      bukti: buktiTransfer 
    });
  };

  const handleQuickOrderSubmit = (e) => {
    e.preventDefault();
    if (!quickNama.trim()) {
      alert('Masukkan nama Anda terlebih dahulu!');
      return;
    }
    const generatedResi = 'ZRL-' + Math.floor(1000 + Math.random() * 9000);
    setQuickPesananBerhasil({ nama: quickNama, layanan: quickLayanan, resi: generatedResi });
  };

  const handleTrack = () => {
    if (!resiInput.trim()) {
      alert('Masukkan nomor resi terlebih dahulu!');
      return;
    }
    setStatusResi('Pakaian sedang dalam proses pencucian di outlet Medan.');
  };

  return (
    <div id="track" className="scroll-mt-24 grid md:grid-cols-3 gap-8 items-start">
      
      {/* Kolom Kiri: Formulir Pesanan & Pembayaran Lengkap */}
      <div id="portal" className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border space-y-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-slate-900">Portal Pelanggan — Buat Pesanan</h3>
          <p className="text-slate-600 text-sm">Isi formulir di bawah ini untuk memesan layanan laundry.</p>
        </div>

        {pesananBerhasil ? (
          <div className="bg-green-50 border border-green-200 p-5 rounded-2xl text-center space-y-2">
            <h4 className="font-bold text-green-800 text-lg">Pesanan Berhasil Dibuat! 🎉</h4>
            <p className="text-sm text-green-700">Terima kasih <strong>{pesananBerhasil.nama}</strong>.</p>
            <p className="text-sm">Nomor Resi Anda: <strong className="text-blue-600 text-base">{pesananBerhasil.resi}</strong></p>
            <p className="text-xs text-slate-600">Metode Pembayaran: <strong>{pesananBerhasil.paymentMethod}</strong></p>
            {pesananBerhasil.bukti && (
              <p className="text-xs text-green-700">Bukti Transfer: <strong>{pesananBerhasil.bukti}</strong> (Berhasil Diunggah)</p>
            )}
            <button 
              onClick={() => { setPesananBerhasil(null); setBuktiTransfer(null); }} 
              className="mt-2 bg-blue-600 text-white text-xs px-4 py-2 rounded-xl font-bold"
            >
              Buat Pesanan Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
              <input 
                type="text" 
                value={nama} 
                onChange={(e) => setNama(e.target.value)} 
                placeholder="Contoh: Budi" 
                className="w-full p-2.5 border rounded-xl mt-1 text-sm focus:outline-none focus:border-blue-500" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Nomor WhatsApp</label>
              <input 
                type="text" 
                value={whatsapp} 
                onChange={(e) => setWhatsapp(e.target.value)} 
                placeholder="0812xxxxxxxx" 
                className="w-full p-2.5 border rounded-xl mt-1 text-sm focus:outline-none focus:border-blue-500" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Pilih Layanan</label>
              <select 
                value={layanan} 
                onChange={(e) => setLayanan(e.target.value)} 
                className="w-full p-2.5 border rounded-xl mt-1 text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option>Cuci Kiloan Reguler (Rp 7.000/Kg)</option>
                <option>Cuci Kilat / Express (Rp 12.000/Kg)</option>
                <option>Cuci Sepatu (Rp 30.000/Pasang)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Metode Pembayaran</label>
              <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="w-full p-2.5 border rounded-xl mt-1 text-sm font-semibold text-blue-700 focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="Cash (Tunai)">💵 Cash (Tunai - Bayar saat kurir jemput/antar)</option>
                <option value="Transfer Bank">🏦 Transfer Bank (BCA / Mandiri / BSI)</option>
              </select>
            </div>

            {paymentMethod === 'Transfer Bank' && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-900">Silakan Transfer ke Rekening ZR-Laundry:</p>
                  <p className="text-xs text-slate-700 font-mono">BCA: 1234-5678-90 a.n. ZR-Laundry</p>
                  <p className="text-xs text-slate-700 font-mono">Mandiri: 9876-5432-10 a.n. ZR-Laundry</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unggah Bukti Transfer</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    required
                  />
                  {buktiTransfer && (
                    <p className="text-[11px] text-green-700 font-semibold mt-1">✓ File terpilih: {buktiTransfer}</p>
                  )}
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold text-sm shadow transition">
              Kirim Pesanan Sekarang
            </button>
          </form>
        )}
      </div>

      {/* Kolom Kanan: Cek Resi & Pesan Kilat */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>🔍</span> Cek Resi / Lacak Cucian
            </h3>
            <input 
              type="text" 
              value={resiInput} 
              onChange={(e) => setResiInput(e.target.value)} 
              placeholder="Cth: ZRL-8821" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500" 
            />
            <button 
              onClick={handleTrack} 
              className="w-full bg-[#111827] hover:bg-black text-white py-3 rounded-xl font-bold text-sm shadow-md transition"
            >
              Cek Status Sekarang
            </button>

            {statusResi && (
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-slate-700 space-y-1 mt-2">
                <p className="font-bold text-blue-900">Status Terkini:</p>
                <p>{statusResi}</p>
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>⚡</span> Pesan Kilat Langsung
            </h3>

            {quickPesananBerhasil ? (
              <div className="bg-green-50 border border-green-200 p-3 rounded-xl text-center space-y-1">
                <p className="text-xs font-bold text-green-800">Berhasil Dipesan! 🎉</p>
                <p className="text-[11px] text-slate-700">Resi: <strong className="text-blue-600">{quickPesananBerhasil.resi}</strong></p>
                <button 
                  onClick={() => setQuickPesananBerhasil(null)} 
                  className="text-[10px] text-blue-600 underline font-bold mt-1 block mx-auto"
                >
                  Pesan Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickOrderSubmit} className="space-y-3">
                <input 
                  type="text" 
                  value={quickNama}
                  onChange={(e) => setQuickNama(e.target.value)}
                  placeholder="Nama Anda" 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500" 
                  required
                />
                <select 
                  value={quickLayanan}
                  onChange={(e) => setQuickLayanan(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                >
                  <option>Cuci Kiloan Reguler</option>
                  <option>Cuci Kilat / Express</option>
                  <option>Cuci Sepatu</option>
                </select>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-xs shadow transition"
                >
                  Pesan Cepat
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="bg-[#111827] text-white p-6 rounded-3xl shadow-md space-y-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-white">Butuh Bantuan Cepat?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tanya langsung dengan asisten AI di pojok kanan bawah[cite: 9].
            </p>
          </div>
          <a 
            href="https://wa.me/6281234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 px-4 rounded-xl font-bold text-xs shadow transition flex items-center justify-center gap-2"
          >
            <span>💬</span> Chat WhatsApp Admin
          </a>
        </div>

      </div>

    </div>
  );
}