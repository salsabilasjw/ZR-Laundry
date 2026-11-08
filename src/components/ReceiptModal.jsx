import React from 'react';

export default function ReceiptModal({ receiptData, onClose }) {
  // Jika tidak ada data struk, komponen tidak merender apa-apa
  if (!receiptData) return null;

  // Fungsi untuk mengunduh struk menjadi file PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById('zr-receipt-print-area');
    
    if (typeof window.html2pdf !== 'undefined' && element) {
      setTimeout(() => {
        const options = {
          margin: 10,
          filename: `Struk-ZR-${receiptData.orderId}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            useCORS: true, 
            backgroundColor: '#FFFFFF',
            scrollX: 0,
            scrollY: 0
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        window.html2pdf().set(options).from(element).save();
      }, 250);
    } else {
      alert('Sistem PDF belum siap. Pastikan CDN html2pdf sudah terpasang di index.html!');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white max-w-sm w-full rounded-2xl p-6 shadow-2xl border border-slate-200 font-mono text-xs text-slate-800 relative animate-fadeIn">
        
        {/* Tombol Silang (Tutup Modal) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-black font-sans font-bold text-lg cursor-pointer transition"
          aria-label="Tutup Struk"
        >
          ✕
        </button>

        {/* Area Struk yang Akan Dicetak Ke PDF */}
        <div id="zr-receipt-print-area" className="p-4 bg-white text-black">
          
          {/* Header Struk */}
          <div className="text-center border-b-2 border-dashed border-slate-300 pb-3 mb-3">
            <h3 className="text-base font-bold font-sans text-blue-600 tracking-wide">ZR LAUNDRY</h3>
            <p className="text-[10px] text-slate-500 font-sans mt-0.5">Bersih Hari Ini, Lebih Nyaman Esok</p>
          </div>

          {/* Detail Transaksi & Pelanggan */}
          <div className="space-y-1 mb-3 border-b border-slate-200 pb-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">No. Resi:</span>
              <span className="font-bold text-blue-600">{receiptData.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tanggal:</span>
              <span>{receiptData.tanggal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Pelanggan:</span>
              <span className="font-bold">{receiptData.nama}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">No. WA:</span>
              <span>{receiptData.noHp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Metode Bayar:</span>
              <span className="font-bold text-slate-800">{receiptData.metode}</span>
            </div>
          </div>

          {/* Rincian Layanan */}
          <div className="space-y-1 mb-3 border-b-2 border-dashed border-slate-300 pb-3 text-[11px]">
            <div className="flex justify-between font-bold">
              <span>{receiptData.layanan}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Jumlah / Berat:</span>
              <span>{receiptData.berat} Kg / Pcs</span>
            </div>
          </div>

          {/* Total Bayar */}
          <div className="flex justify-between text-xs font-bold text-black border-t border-slate-200 pt-2 mb-4">
            <span>TOTAL BAYAR:</span>
            <span>Rp {receiptData.total?.toLocaleString('id-ID')}</span>
          </div>

          {/* Footer Struk */}
          <div className="text-center font-sans text-[10px] text-slate-400">
            <p>Terima Kasih Atas Kepercayaan Anda!</p>
          </div>
        </div>

        {/* Tombol Aksi Kanan-Kiri */}
        <div className="flex gap-2 mt-4 font-sans">
          <button
            onClick={handleDownloadPDF}
            className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>📥</span> Cetak PDF
          </button>
          
          <button
            onClick={onClose}
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-md"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
}