import React, { useState } from 'react';
import ReceiptModal from './ReceiptModal';

export default function CashierPOS() {
  const [pin, setPin] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('antrian'); 
  const [receiptData, setReceiptData] = useState(null);

  // State untuk Anchor Date & Pilihan Periode
  const [selectedDate, setSelectedDate] = useState('2026-10-29');
  const [periodePendapatan, setPeriodePendapatan] = useState('harian'); 
  const [periodePelanggan, setPeriodePelanggan] = useState('harian');

  const [walkinName, setWalkinName] = useState('');
  const [walkinPhone, setWalkinPhone] = useState('');
  const [walkinService, setWalkinService] = useState('Cuci Kiloan Reguler (2 Hari) - Rp 8.000/Kg');
  const [walkinQty, setWalkinQty] = useState('');
  const [walkinPaymentMethod, setWalkinPaymentMethod] = useState('Cash (Tunai)');

  // Data contoh pesanan
  const [orders, setOrders] = useState([
    {
      id: 'LND-839201',
      date: '2026-10-29 08:30 (Online)',
      rawDate: '2026-10-29',
      name: 'Budi Santoso',
      phone: '081234567890',
      service: 'Cuci Kiloan Reguler',
      qty: 'Qty: 4',
      totalNominal: 32000,
      total: 'Rp 32,000',
      status: 'Selesai',
      paymentStatus: 'Lunas',
      paymentMethod: 'Transfer Bank'
    },
    {
      id: 'LND-902143',
      date: '2026-10-29 10:15 (Online)',
      rawDate: '2026-10-29',
      name: 'Siti Rahma',
      phone: '085678901234',
      service: 'Cuci Sprei',
      qty: 'Qty: 2',
      totalNominal: 18000,
      total: 'Rp 18,000',
      status: 'Menjemput',
      paymentStatus: 'Belum Lunas',
      paymentMethod: 'Cash (Tunai)'
    }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('PIN Salah! Gunakan PIN: 1234');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handlePaymentStatusChange = (id, newPaymentStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, paymentStatus: newPaymentStatus } : o));
  };

  const handlePaymentMethodChange = (id, newMethod) => {
    setOrders(orders.map(o => o.id === id ? { ...o, paymentMethod: newMethod } : o));
  };

  const handleWalkinSubmit = (e) => {
    e.preventDefault();
    if (!walkinName || !walkinQty) {
      alert('Mohon lengkapi nama dan jumlah berat/qty pesanan!');
      return;
    }
  
    const priceMatch = walkinService.match(/Rp\s?([\d.]+)/);
    const unitPrice = priceMatch ? parseInt(priceMatch[1].replace(/\./g, '')) : 8000;
    const nominal = parseFloat(walkinQty) * unitPrice;
      
    const newResi = 'ZRL-' + Math.floor(1000 + Math.random() * 9000);
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = `${selectedDate} ${timeNow}`;
    const cleanServiceName = walkinService.split(' - ')[0];

    const newOrder = {
      id: newResi,
      date: `${formattedDate} (Offline)`,
      rawDate: selectedDate,
      name: walkinName,
      phone: walkinPhone || '-',
      service: cleanServiceName,
      qty: `Qty: ${walkinQty}`,
      totalNominal: nominal,
      total: 'Rp ' + nominal.toLocaleString('id-ID'),
      status: 'Sedang Proses',
      paymentStatus: 'Lunas',
      paymentMethod: walkinPaymentMethod
    };

    setOrders([newOrder, ...orders]);

    setReceiptData({
      orderId: newResi,
      tanggal: formattedDate,
      nama: walkinName,
      noHp: walkinPhone || '-',
      layanan: cleanServiceName,
      berat: walkinQty,
      metode: walkinPaymentMethod,
      total: nominal
    });

    setWalkinName('');
    setWalkinPhone('');
    setWalkinQty('');
    
  };

  // Logika Filter Kalender
  const getWeekRange = (dateStr) => {
    const target = new Date(dateStr);
    const day = target.getDay(); 
    const diffToMonday = target.getDate() - day + (day === 0 ? -6 : 1);
    
    const startOfWeek = new Date(target);
    startOfWeek.setDate(diffToMonday);
    startOfWeek.setHours(0,0,0,0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23,59,59,999);
    
    return { startOfWeek, endOfWeek };
  };

  const isSameWeek = (dateStr, refDateStr) => {
    if (!dateStr || !refDateStr) return false;
    const { startOfWeek, endOfWeek } = getWeekRange(refDateStr);
    const orderDate = new Date(dateStr);
    return orderDate >= startOfWeek && orderDate <= endOfWeek;
  };

  const isSameMonth = (dateStr, refDateStr) => {
    if (!dateStr || !refDateStr) return false;
    return dateStr.substring(0, 7) === refDateStr.substring(0, 7);
  };

  // Filter Pendapatan Akurat
  let nominalPendapatanAktif = 0;
  if (periodePendapatan === 'harian') {
    nominalPendapatanAktif = orders.filter(o => o.rawDate === selectedDate && o.paymentStatus === 'Lunas').reduce((s, o) => s + o.totalNominal, 0);
  } else if (periodePendapatan === 'mingguan') {
    nominalPendapatanAktif = orders.filter(o => isSameWeek(o.rawDate, selectedDate) && o.paymentStatus === 'Lunas').reduce((s, o) => s + o.totalNominal, 0);
  } else if (periodePendapatan === 'bulanan') {
    nominalPendapatanAktif = orders.filter(o => isSameMonth(o.rawDate, selectedDate) && o.paymentStatus === 'Lunas').reduce((s, o) => s + o.totalNominal, 0);
  }

  // Filter Pelanggan Akurat
  let filteredPelanggan = [];
  if (periodePelanggan === 'harian') {
    filteredPelanggan = orders.filter(o => o.rawDate === selectedDate);
  } else if (periodePelanggan === 'mingguan') {
    filteredPelanggan = orders.filter(o => isSameWeek(o.rawDate, selectedDate));
  } else if (periodePelanggan === 'bulanan') {
    filteredPelanggan = orders.filter(o => isSameMonth(o.rawDate, selectedDate));
  }

  // Hitung total Cash & Transfer untuk periode aktif
  const totalCash = orders
  .filter(o => o.rawDate === selectedDate && o.paymentStatus === 'Lunas' && o.paymentMethod.includes('Cash'))
  .reduce((sum, o) => sum + o.totalNominal, 0);

  const totalTransfer = orders
  .filter(o => o.rawDate === selectedDate && o.paymentStatus === 'Lunas' && o.paymentMethod.includes('Transfer'))
  .reduce((sum, o) => sum + o.totalNominal, 0);

  const pesananAktifCount = orders.filter(o => o.status !== 'Selesai').length;
  const pesananSelesaiCount = orders.filter(o => o.status === 'Selesai').length;

  if (!isLoggedIn) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border max-w-sm mx-auto text-center space-y-5 my-8">
        <div className="bg-blue-50 w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-xl">
          🔒
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900">Area Terproteksi Kasir</h2>
          <p className="text-xs text-slate-500">Masukkan PIN Kasir untuk mengelola pesanan & laporan keuangan.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-3">
          <input 
            type="password" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)} 
            placeholder="Masukkan PIN (Default: 1234)" 
            className="w-full p-2.5 bg-slate-50 border rounded-xl text-center tracking-widest text-xs focus:outline-none focus:border-blue-500" 
            required 
          />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl font-bold text-xs shadow-md transition">
            Buka Dashboard Kasir
          </button>
        </form>
        <p className="text-[10px] text-slate-400 font-medium">PIN Akses: <strong>1234</strong></p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-6">
      
      {/* 1. KOTAK STATISTIK UTAMA (DISEJAJARKAN & TANGGAL AGAK GEDE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Kotak 1: Pendapatan */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-slate-600 flex items-center gap-1">📊 Pendapatan</p>
              <select 
                value={periodePendapatan}
                onChange={(e) => setPeriodePendapatan(e.target.value)}
                className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="harian">Harian</option>
                <option value="mingguan">Mingguan</option>
                <option value="bulanan">Bulanan</option>
              </select>
            </div>

            {/* Input Tanggal dibuat agak gede & di baris tersendiri */}
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
            />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">Rp {nominalPendapatanAktif.toLocaleString('id-ID')}</h3>
            <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-2 gap-1.5 text-[10px]">
              <div className="bg-emerald-50 p-1.5 rounded-xl border border-emerald-100">
                <span className="text-emerald-700 font-semibold block">💵 Cash</span>
                <span className="font-extrabold text-emerald-800 text-xs">Rp {totalCash.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-blue-50 p-1.5 rounded-xl border border-blue-100">
                <span className="text-blue-700 font-semibold block">🏦 Transfer</span>
                <span className="font-extrabold text-blue-800 text-xs">Rp {totalTransfer.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak 2: Total Pelanggan */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-slate-600 flex items-center gap-1">👥 Total Pelanggan</p>
              <select 
                value={periodePelanggan}
                onChange={(e) => setPeriodePelanggan(e.target.value)}
                className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="harian">Harian</option>
                <option value="mingguan">Mingguan</option>
                <option value="bulanan">Bulanan</option>
              </select>
            </div>

            {/* Input Tanggal dibuat agak gede & sejajar dengan Kotak 1 */}
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
            />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">{filteredPelanggan.length} Orang</h3>
            <div className="max-h-20 overflow-y-auto text-[10px] text-slate-600 space-y-1.5 pr-1 border-t pt-1.5 mt-1">
              {filteredPelanggan.length > 0 ? (
                filteredPelanggan.map((p, idx) => (
                  <div key={idx} className="bg-slate-50 p-1.5 rounded-lg flex justify-between items-center border border-slate-100">
                    <span className="font-semibold truncate max-w-[100px] text-slate-800">{p.name}</span>
                    <span className="text-[9px] text-slate-400">{p.date.split(' ')[0].substring(5)} | {p.date.split(' ')[1]}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 italic text-[10px]">Kosong di periode ini.</p>
              )}
            </div>
          </div>
        </div>

        {/* Kotak 3: Pesanan Aktif (Simetris & Rapi) */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between h-full min-h-[160px]">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-slate-600">Pesanan Aktif</p>
            <div className="bg-blue-50 p-2 rounded-2xl text-blue-600 text-base flex items-center justify-center">🔄</div>
          </div>
          
          <div className="my-auto py-2">
            <h3 className="text-3xl font-extrabold text-blue-600">{pesananAktifCount}</h3>
            <p className="text-[11px] font-medium text-slate-500 mt-1">Sedang dalam proses pencucian</p>
          </div>
        </div>

        {/* Kotak 4: Pesanan Selesai (Simetris & Rapi) */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between h-full min-h-[160px]">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-slate-600">Pesanan Selesai</p>
            <div className="bg-emerald-50 p-2 rounded-2xl text-emerald-600 text-base flex items-center justify-center">✅</div>
          </div>
          
          <div className="my-auto py-2">
            <h3 className="text-3xl font-extrabold text-emerald-600">{pesananSelesaiCount}</h3>
            <p className="text-[11px] font-medium text-slate-500 mt-1">Siap diambil / diantar ke pelanggan</p>
          </div>
        </div>

      </div>

      {/* 2. TAB NAVIGASI & FILTER */}
      <div className="bg-white p-3.5 rounded-3xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setActiveTab('antrian')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'antrian' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>📋</span> Antrian Pesanan
          </button>
          <button 
            onClick={() => setActiveTab('walkin')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'walkin' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>➕</span> Kasir Langsung
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full sm:w-auto bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border border-red-100"
          >
            Lock 🔒
          </button>
        </div>
      </div>

      {/* 3. TABEL DATA PESANAN */}
      {activeTab === 'antrian' ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[650px]">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-3.5">Resi & Waktu</th>
                  <th className="p-3.5">Pelanggan</th>
                  <th className="p-3.5">Layanan & Qty</th>
                  <th className="p-3.5">Total Biaya</th>
                  <th className="p-3.5">Status Cucian</th>
                  <th className="p-3.5">Pembayaran</th>
                  <th className="p-3.5 text-center">Aksi Kasir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 align-top">
                      <p className="font-bold text-blue-600">{order.id}</p>
                      <p className="text-[10px] text-slate-400">{order.date}</p>
                    </td>
                    <td className="p-3.5 align-top">
                      <p className="font-bold text-slate-900">{order.name}</p>
                      <p className="text-[10px] text-slate-500">{order.phone}</p>
                    </td>
                    <td className="p-3.5 align-top">
                      <p className="font-semibold text-slate-800">{order.service}</p>
                      <p className="text-[10px] text-slate-500">{order.qty}</p>
                    </td>
                    <td className="p-3.5 align-top font-bold text-slate-900">
                      {order.total}
                    </td>
                    <td className="p-3.5 align-top">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`font-bold px-2.5 py-1 rounded-xl text-xs border focus:outline-none ${
                          order.status === 'Selesai' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        <option value="Menjemput">Menjemput</option>
                        <option value="Pending">Menunggu</option>
                        <option value="Sedang Proses">Sedang Proses</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Diantar">Diantar</option>
                      </select>
                    </td>
                    <td className="p-3.5 align-top space-y-1">
                      <select 
                        value={order.paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(order.id, e.target.value)}
                        className={`w-full font-bold px-2.5 py-1 rounded-xl text-xs border focus:outline-none ${
                          order.paymentStatus === 'Lunas' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        <option value="Lunas">Lunas</option>
                        <option value="Belum Lunas">Belum Lunas</option>
                      </select>

                      <select 
                        value={order.paymentMethod}
                        onChange={(e) => handlePaymentMethodChange(order.id, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-lg text-[10px] focus:outline-none"
                      >
                        <option value="Cash (Tunai)">💵 Cash (Tunai)</option>
                        <option value="Transfer Bank">🏦 Transfer Bank</option>
                      </select>
                    </td>
                    <td className="p-3.5 align-top text-center">
                      <button 
                        onClick={() => {
                          const cleanQty = order.qty ? order.qty.replace('Qty: ', '') : '1';
                          setReceiptData({
                            orderId: order.id,
                            tanggal: order.date,
                            nama: order.name,
                            noHp: order.phone,
                            layanan: order.service,
                            berat: cleanQty,
                            metode: order.paymentMethod,
                            total: order.totalNominal
                          });
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-xl font-bold text-xs transition inline-flex items-center gap-1 shadow-sm mt-1 cursor-pointer"
                      >
                        <span>🖨️</span> Struk
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* KONTEN TAB KASIR WALK-IN */
        <form onSubmit={handleWalkinSubmit} className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Input Transaksi Kasir POS (Offline)</h3>
            <p className="text-xs text-slate-500">Catat pesanan langsung untuk pelanggan yang datang ke toko.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pelanggan</label>
              <input 
                type="text" 
                value={walkinName}
                onChange={(e) => setWalkinName(e.target.value)}
                placeholder="Nama pelanggan" 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp</label>
              <input 
                type="text" 
                value={walkinPhone}
                onChange={(e) => setWalkinPhone(e.target.value)}
                placeholder="0812xxxxxxxx" 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Layanan</label>
              <select 
                value={walkinService}
                onChange={(e) => setWalkinService(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none bg-white"
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
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Berat / Qty</label>
              <input 
                type="number" 
                value={walkinQty}
                onChange={(e) => setWalkinQty(e.target.value)}
                placeholder="Contoh: 3 (Kg / Pcs)" 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Pembayaran</label>
              <select 
                value={walkinPaymentMethod}
                onChange={(e) => setWalkinPaymentMethod(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none bg-white font-semibold text-blue-700"
              >
                <option value="Cash (Tunai)">💵 Cash (Tunai)</option>
                <option value="Transfer Bank">🏦 Transfer Bank</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-md transition"
          >
            Simpan & Cetak Struk 🖨️
          </button>
        </form>
      )}

      <ReceiptModal 
        receiptData={receiptData}
        onClose={() => setReceiptData(null)}
      />
    </div>
  );
}