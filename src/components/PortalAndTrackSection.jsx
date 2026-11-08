import React, { useState } from 'react';

export default function PortalAndTrackSection({ isMemberActive, memberExpiryDate, setIsMemberActive, setMemberExpiryDate }) {
  const [jenisTransaksi, setJenisTransaksi] = useState('laundry'); // 'laundry' atau 'member'
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [layanan, setLayanan] = useState('Cuci Kiloan Reguler');
  const [paymentMethod, setPaymentMethod] = useState('Cash (Tunai)');
  
  // State File & Validasi Bukti Transfer
  const [buktiTransferFile, setBuktiTransferFile] = useState(null);
  const [buktiTransferName, setBuktiTransferName] = useState('');
  const [uploadError, setUploadError] = useState('');
  
  const [pesananBerhasil, setPesananBerhasil] = useState(null);

  // Tracking
  const [resiInput, setResiInput] = useState('');
  const [statusResi, setStatusResi] = useState(null);

  // Pesan Cepat
  const [quickNama, setQuickNama] = useState('');
  const [quickLayanan, setQuickLayanan] = useState('Cuci Kiloan Reguler');
  const [quickPesananBerhasil, setQuickPesananBerhasil] = useState(null);

  // Handler Unggah & Validasi Bukti Transfer
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadError('');

    if (!file) {
      setBuktiTransferFile(null);
      setBuktiTransferName('');
      return;
    }

    // Validasi Tipe File (JPG, PNG, PDF)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Format file tidak valid! Harap unggah foto (JPG/PNG) atau PDF.');
      setBuktiTransferFile(null);
      setBuktiTransferName('');
      e.target.value = '';
      return;
    }

    // Validasi Ukuran File (Maksimal 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Ukuran file terlalu besar! Maksimal ukuran file adalah 2MB.');
      setBuktiTransferFile(null);
      setBuktiTransferName('');
      e.target.value = '';
      return;
    }

    setBuktiTransferFile(file);
    setBuktiTransferName(file.name);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'Transfer Bank' && !buktiTransferFile) {
      alert('Mohon unggah bukti transfer yang valid terlebih dahulu!');
      return;
    }

    // Logika Pendaftaran Member Baru / Perpanjangan
    if (jenisTransaksi === 'member') {
      const today = new Date();
      const expiry = new Date(today.setDate(today.getDate() + 30)).toISOString().split('T')[0];
      setIsMemberActive(true);
      setMemberExpiryDate(expiry);

      setPesananBerhasil({
        nama,
        layanan: 'Paket Langganan Member Premium (30 Hari)',
        resi: 'MEM-' + Math.floor(10000 + Math.random() * 90000),
        paymentMethod,
        isMemberOrder: true,
        expiry
      });
      return;
    }

    // Logika Pemesanan Laundry Biasa
    const isFreeForMember = isMemberActive && layanan.includes('Reguler');
    setPesananBerhasil({
      nama,
      layanan,
      resi: 'ZRL-' + Math.floor(1000 + Math.random() * 9000),
      paymentMethod,
      isFreeForMember
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

  // Redirect ke WhatsApp Admin untuk Bantuan Cepat
  const openWhatsAppHelp = () => {
    const message = encodeURIComponent(`Halo Admin ZR Laundry, saya ${nama || 'Pelanggan'} ingin bertanya seputar layanan / pembayaran.`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  const inputStyle =
    "w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition";

  const labelStyle = "block text-sm font-bold text-slate-700 mb-2";

  return (
    <section id="track" className="scroll-mt-24 px-4 sm:px-8 py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 items-stretch">

        {/* FORM PEMESANAN & PORTAL PEMBAYARAN KIRI */}
        <div id="portal" className="lg:col-span-2 bg-white rounded-3xl border border-sky-100 shadow-md overflow-hidden flex flex-col justify-between">

          <div>
            <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-7 py-6 text-white flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                  💳
                </div>
                <div>
                  <h3 className="text-xl font-black">Portal Pembayaran & Pesanan</h3>
                  <p className="text-sky-100 text-xs mt-0.5">
                    Isi data transaksi atau pendaftaran member aktif.
                  </p>
                </div>
              </div>

              {/* Status Indicator Member */}
              {isMemberActive && (
                <div className="bg-amber-400 text-slate-900 px-3 py-1.5 rounded-xl text-xs font-black shadow flex items-center gap-1.5">
                  <span>👑 Member Aktif</span>
                  <span className="text-[10px] font-medium text-slate-800">(s/d {memberExpiryDate})</span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              {pesananBerhasil ? (
                <div className="bg-sky-50 border border-sky-200 p-6 rounded-2xl text-center space-y-3">
                  <div className="text-4xl">🎉</div>
                  <h4 className="font-black text-sky-800 text-xl">
                    {pesananBerhasil.isMemberOrder ? 'Pendaftaran Member Berhasil!' : 'Pesanan Berhasil Dibuat!'}
                  </h4>
                  <p className="text-sm text-slate-600">
                    Terima kasih, <strong>{pesananBerhasil.nama}</strong>.
                  </p>
                  
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p className="text-xs text-slate-500">Nomor Resi / ID Transaksi</p>
                    <p className="text-2xl font-black text-pink-500">{pesananBerhasil.resi}</p>
                    {pesananBerhasil.isFreeForMember && (
                      <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs font-extrabold px-3 py-1 rounded-full">
                        🆓 Gratis (Bebas Biaya Bayar Member)
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600">
                    Layanan: <strong>{pesananBerhasil.layanan}</strong> | Metode: <strong>{pesananBerhasil.paymentMethod}</strong>
                  </p>

                  <button
                    onClick={() => {
                      setPesananBerhasil(null);
                      setNama('');
                      setWhatsapp('');
                      setBuktiTransferFile(null);
                      setBuktiTransferName('');
                    }}
                    className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition"
                  >
                    Buat Transaksi Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-5">

                  {/* Opsi Switch Jenis Transaksi */}
                  <div>
                    <label className={labelStyle}>Kategori Pemesanan</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setJenisTransaksi('laundry')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition ${
                          jenisTransaksi === 'laundry'
                            ? 'bg-blue-600 text-white border-blue-600 shadow'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        🧺 Laundry Biasa
                      </button>
                      <button
                        type="button"
                        onClick={() => setJenisTransaksi('member')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition ${
                          jenisTransaksi === 'member'
                            ? 'bg-amber-500 text-white border-amber-500 shadow'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        👑 Langganan Member (Rp 150rb)
                      </button>
                    </div>
                  </div>

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

                  {jenisTransaksi === 'laundry' ? (
                    <div>
                      <label className={labelStyle}>Pilih Layanan</label>
                      <select
                        value={layanan}
                        onChange={(e) => setLayanan(e.target.value)}
                        className={inputStyle}
                      >
                        <option value="Cuci Kiloan Reguler (2 Hari) - Rp 8.000/Kg">Cuci Kiloan Reguler (2 Hari) - Rp 8.000/Kg</option>
                        <option value="Cuci Express (1 Hari) - Rp 10.000/Kg">Cuci Express (1 Hari) - Rp 10.000/Kg</option>
                        <option value="Cuci Express (Pagi/Sore) - Rp 15.000/Kg">Cuci Express (Pagi/Sore) - Rp 15.000/Kg</option>
                        <option value="Cuci Sprei - Rp 9.000/Kg">Cuci Sprei - Rp 9.000/Kg</option>
                        <option value="Cuci Bed Cover - Rp 10.000/Kg">Cuci Bed Cover - Rp 10.000/Kg</option>
                        <option value="Cuci Baju Gaun - Rp 30.000/Pcs">Cuci Baju Gaun - Rp 30.000/Pcs</option>
                        <option value="Cuci Jas / Baju - Rp 15.000/Pcs">Cuci Jas / Baju - Rp 15.000/Pcs</option>
                        <option value="Cuci Jas Setelan - Rp 30.000/Pcs">Cuci Jas Setelan - Rp 30.000/Pcs</option>
                        <option value="Cuci Sepatu - Rp 25.000/Pasang">Cuci Sepatu - Rp 25.000/Pasang</option>
                        <option value="Cuci Tas - Rp 15.000/Kg">Cuci Tas - Rp 15.000/Kg</option>
                        <option value="Cuci Gorden - Rp 10.000/Kg">Cuci Gorden - Rp 10.000/Kg</option>
                        <option value="Cuci Boneka Kecil - Rp 20.000/Pcs">Cuci Boneka Kecil - Rp 20.000/Pcs</option>
                        <option value="Cuci Boneka Sedang - Rp 30.000/Pcs">Cuci Boneka Sedang - Rp 30.000/Pcs</option>
                        <option value="Cuci Boneka Besar - Rp 40.000/Pcs">Cuci Boneka Besar - Rp 40.000/Pcs</option>
                      </select>

                      {/* Notifikasi Pembebasan Biaya Member */}
                      {isMemberActive && layanan.includes('Reguler') && (
                        <div className="mt-2.5 p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-bold flex items-center gap-2">
                          <span>✨</span>
                          Status Member Aktif: Biaya transaksi ini DIBEBASKAN (Rp 0)!
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1">
                      <p className="text-xs font-bold text-amber-800">Paket Langganan Member Premium (30 Hari)</p>
                      <p className="text-xs text-amber-700">
                        Bebas biaya laundry kiloan reguler & discount 20% khusus semua layanan mitra selama 1 bulan penuh.
                      </p>
                    </div>
                  )}

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
                      <h4 className="font-bold text-sky-800 text-sm">Informasi Rekening Pembayaran</h4>
                      <div className="text-xs text-slate-600 space-y-1 bg-white p-3 rounded-xl border border-sky-100">
                        <p>🔹 BCA: <strong>1234-5678-90</strong> a.n. ZR-Laundry</p>
                        <p>🔹 Mandiri: <strong>9876-5432-10</strong> a.n. ZR-Laundry</p>
                      </div>

                      <div>
                        <label className={labelStyle}>Unggah Bukti Transfer (Max 2MB: JPG/PNG/PDF)</label>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileChange}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-sky-600 file:text-white file:font-bold cursor-pointer"
                        />
                        {uploadError && (
                          <p className="text-xs font-bold text-red-500 mt-1.5">{uploadError}</p>
                        )}
                        {buktiTransferName && !uploadError && (
                          <p className="text-xs font-bold text-green-700 mt-1.5">✓ Terunggah: {buktiTransferName}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-xl font-extrabold text-sm shadow-md transition hover:-translate-y-0.5"
                  >
                    {jenisTransaksi === 'member' ? 'Bayar & Aktifkan Member Sekarang →' : 'Kirim Pesanan Sekarang →'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* WIDGET BANTUAN CEPAT WHATSAPP */}
          <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">Mengalami kendala pembayaran?</span>
            <button
              type="button"
              onClick={openWhatsAppHelp}
              className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
            >
              <span>💬</span> Bantuan WhatsApp
            </button>
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
                  <option>Cuci Express (1 Hari)</option>
                  <option>Cuci Express (Pagi/Sore)</option>
                  <option>Cuci Sprei</option>
                  <option>Cuci Bedcover</option>
                  <option>Cuci Baju Gaun</option>
                  <option>Cuci Jas / Baju</option>
                  <option>Cuci Jas Setelan</option>
                  <option>Cuci Sepatu</option>
                  <option>Cuci Tas</option>
                  <option>Cuci Gorden</option>
                  <option>Cuci Boneka Kecil</option>
                  <option>Cuci Boneka Sedang</option>
                  <option>Cuci Boneka Besar</option>
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