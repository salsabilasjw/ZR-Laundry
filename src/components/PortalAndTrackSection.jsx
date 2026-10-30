
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

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'Transfer Bank' && !buktiTransfer) {
      alert('Mohon unggah bukti transfer terlebih dahulu!');
      return;
    }

    setPesananBerhasil({
      nama,
      layanan,
      resi: 'ZRL-' + Math.floor(1000 + Math.random() * 9000),
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

    setQuickPesananBerhasil({
      nama: quickNama,
      layanan: quickLayanan,
      resi: 'ZRL-' + Math.floor(1000 + Math.random() * 9000)
    });
  };

  const handleTrack = () => {
    if (!resiInput.trim()) {
      alert('Masukkan nomor resi terlebih dahulu!');
      return;
    }
    setStatusResi('Pakaian sedang dalam proses pencucian di outlet Medan.');
  };

  const inputStyle =
    "w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition";

  const labelStyle = "block text-sm font-bold text-slate-700 mb-2";

  return (
    <section id="track" className="scroll-mt-24 px-4 sm:px-8 py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 items-stretch">

        {/* FORM PEMESANAN KIRI */}
        <div id="portal" className="lg:col-span-2 bg-white rounded-3xl border border-sky-100 shadow-md overflow-hidden">

          <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                🧺
              </div>
              <div>
                <h3 className="text-xl font-black">Buat Pesanan</h3>
                <p className="text-sky-100 text-xs mt-1">
                  Isi data untuk memulai pesanan laundry.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {pesananBerhasil ? (
              <div className="bg-sky-50 border border-sky-200 p-6 rounded-2xl text-center space-y-3">
                <div className="text-4xl">🎉</div>
                <h4 className="font-black text-sky-800 text-xl">Pesanan Berhasil Dibuat!</h4>
                <p className="text-sm text-slate-600">
                  Terima kasih, <strong>{pesananBerhasil.nama}</strong>.
                </p>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-xs text-slate-500">Nomor Resi Anda</p>
                  <p className="text-2xl font-black text-pink-500">{pesananBerhasil.resi}</p>
                </div>
                <p className="text-xs text-slate-600">
                  Metode pembayaran: {pesananBerhasil.paymentMethod}
                </p>
                {pesananBerhasil.bukti && (
                  <p className="text-xs text-slate-600">Bukti: {pesananBerhasil.bukti}</p>
                )}
                <button
                  onClick={() => {
                    setPesananBerhasil(null);
                    setNama('');
                    setWhatsapp('');
                    setBuktiTransfer(null);
                  }}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-xl text-sm font-bold"
                >
                  Buat Pesanan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-5">

                <div>
                  <label className={labelStyle}>Nama Lengkap</label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>Nomor WhatsApp</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>Pilih Layanan</label>
                  <select
                    value={layanan}
                    onChange={(e) => setLayanan(e.target.value)}
                    className={inputStyle}
                  >
                    <option value="Cuci Kiloan Reguler">Cuci Kiloan Reguler (Rp 7.000/Kg)</option>
                    <option value="Cuci Kiloan Express">Cuci Kiloan Express (Rp 12.000/Kg)</option>
                    <option value="Cuci Jaket/Jas">Cuci Jaket/Jas (Rp 15.000/Pcs)</option>
                    <option value="Cuci Bedcover">Cuci Bedcover (Rp 25.000/Pcs)</option>
                    <option value="Cuci Sepatu">Cuci Sepatu (Rp 35.000/Pasang)</option>
                  </select>
                </div>

                <div>
                  <label className={labelStyle}>Metode Pembayaran</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={inputStyle}
                  >
                    <option value="Cash (Tunai)">💵 Cash (Tunai)</option>
                    <option value="Transfer Bank">🏦 Transfer Bank</option>
                  </select>
                </div>

                {paymentMethod === 'Transfer Bank' && (
                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 space-y-3">
                    <h4 className="font-bold text-sky-800 text-sm">Informasi Rekening</h4>
                    <p className="text-sm text-slate-600">BCA: 1234-5678-90 a.n. ZR-Laundry</p>
                    <p className="text-sm text-slate-600">Mandiri: 9876-5432-10 a.n. ZR-Laundry</p>
                    <label className={labelStyle}>Unggah Bukti Transfer</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBuktiTransfer(e.target.files[0]?.name || null)}
                      required
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-sky-600 file:text-white file:font-bold"
                    />
                    {buktiTransfer && (
                      <p className="text-xs text-green-700">✓ {buktiTransfer}</p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-xl font-extrabold text-sm shadow-md transition hover:-translate-y-0.5"
                >
                  Kirim Pesanan Sekarang →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="flex flex-col gap-6 h-full min-h-0">

          {/* CEK RESI */}
          <div className="bg-white p-6 rounded-3xl shadow-md border border-sky-100 space-y-4">
            <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-2xl">
              🔍
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800">Lacak Cucian</h3>
              <p className="text-xs text-slate-500 mt-1">
                Masukkan nomor resi untuk mengecek status cucian.
              </p>
            </div>

            <input
              type="text"
              value={resiInput}
              onChange={(e) => setResiInput(e.target.value)}
              placeholder="Contoh: ZRL-8821"
              className={inputStyle}
            />

            <button
              onClick={handleTrack}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3.5 rounded-xl font-bold text-sm transition"
            >
              Cek Status Sekarang
            </button>

            {statusResi && (
              <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl text-xs text-slate-700">
                <p className="font-bold text-sky-800 mb-1">Status Terkini:</p>
                {statusResi}
              </div>
            )}
          </div>

          {/* PESAN KILAT */}
          <div className="bg-white p-6 rounded-3xl shadow-md border border-pink-100 space-y-4 flex-1 min-h-0">
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-2xl">
              ⚡
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800">Pesan Kilat</h3>
              <p className="text-xs text-slate-500 mt-1">
                Buat pesanan dengan lebih praktis.
              </p>
            </div>

            {quickPesananBerhasil ? (
              <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center space-y-2">
                <p className="text-sm font-bold text-green-800">Pesanan Berhasil!</p>
                <p className="text-xs text-slate-600">
                  Resi: <strong className="text-sky-600">{quickPesananBerhasil.resi}</strong>
                </p>
                <button
                  onClick={() => setQuickPesananBerhasil(null)}
                  className="text-xs text-sky-600 underline font-bold"
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
                  className={inputStyle}
                  required
                />
                <select
                  value={quickLayanan}
                  onChange={(e) => setQuickLayanan(e.target.value)}
                  className={inputStyle}
                >
                  <option>Cuci Kiloan Reguler</option>
                  <option>Cuci Kiloan Express</option>
                  <option>Cuci Jaket dan Jas</option>
                  <option>Cuci Bedcover</option>
                  <option>Cuci Sepatu</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3.5 rounded-xl font-bold text-sm transition"
                >
                  Pesan Cepat →
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
