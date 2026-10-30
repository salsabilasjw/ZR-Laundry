import react, { useState } from 'react';
import zrLogo from '../assets/zr-logo.png';

export default function Navbar({ scrollToSection, currentView, setCurrentView, activeSection }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false); // Tutup menu mobile setelah diklik
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 sticky top-0 z-50 shadow-sm">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full px-1 sm:px-2">
        
        {/* Brand / Logo */}
        <div
          className="flex items-center cursor-pointer justify-self-start"
          onClick={() => handleNavClick('beranda')}
        >
          <img
            src={zrLogo}
            alt="ZR Laundry Logo"
            className="h-14 sm:h-16 w-auto object-contain"
          />
        </div>

        {/* Menu Navigasi Tengah (Desktop) */}
        <div className="hidden md:flex items-center justify-self-center space-x-6 text-sm font-semibold text-slate-600">
          <button onClick={() => handleNavClick('beranda')} className="hover:text-blue-600 transition">Beranda</button>
          <button onClick={() => handleNavClick('tentang-kami')} className="hover:text-blue-600 transition">Tentang Kami</button>
          <button onClick={() => handleNavClick('services')} className="hover:text-blue-600 transition">Layanan & Harga</button>
          <button onClick={() => handleNavClick('track')} className="hover:text-blue-600 transition">Cek Resi & Pesan</button>
          <button onClick={() => handleNavClick('contact')} className="hover:text-blue-600 transition">Kontak</button>
        </div>

        {/* Tombol Aksi Kanan (Desktop) */}
        <div className="hidden md:flex items-center justify-self-end space-x-3 ml-auto">
          <button 
            onClick={() => handleNavClick('portal')}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition flex items-center gap-1.5 ${
              currentView === 'home' && activeSection === 'portal'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
            }`}
          >
            📱 Portal Pelanggan
          </button>

          <button 
            onClick={() => { setCurrentView('cashier'); setIsMobileMenuOpen(false); }}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition flex items-center gap-1.5 ${
              currentView === 'cashier'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
            }`}
          >
            💻 Dashboard Kasir
          </button>
        </div>

        {/* Tombol Garis 3 (Hamburger Menu untuk HP/Mobile) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <span className="text-lg font-bold">✕</span>
          ) : (
            <span className="text-lg font-bold">☰</span>
          )}
        </button>

      </div>

      {/* Menu Dropdown Mobile (Muncul saat tombol garis 3 ditekan) */}
      {isMobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-slate-100 mt-3 space-y-2 animate-fadeIn">
          <div className="flex flex-col space-y-2 text-xs font-semibold text-slate-700">
            <button onClick={() => handleNavClick('beranda')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-100">Beranda</button>
            <button onClick={() => handleNavClick('tentang-kami')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-100">Tentang Kami</button>
            <button onClick={() => handleNavClick('services')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-100">Layanan & Harga</button>
            <button onClick={() => handleNavClick('track')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-100">Cek Resi & Pesan</button>
            <button onClick={() => handleNavClick('contact')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-100">Kontak</button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button 
              onClick={() => handleNavClick('portal')}
              className={`w-full text-xs font-bold px-4 py-2.5 rounded-xl border text-center ${
                currentView === 'home' && activeSection === 'portal'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              📱 Portal Pelanggan
            </button>

            <button 
              onClick={() => { setCurrentView('cashier'); setIsMobileMenuOpen(false); }}
              className={`w-full text-xs font-bold px-4 py-2.5 rounded-xl border text-center ${
                currentView === 'cashier'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              💻 Dashboard Kasir
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}