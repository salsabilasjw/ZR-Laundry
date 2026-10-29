import React, { useState } from 'react';

export default function Chatbox({ isOpen, setIsOpen }) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Halo! Saya Asisten AI ZR-Laundry. Ada yang bisa saya bantu seputar layanan laundry atau cara cek resi hari ini? 😊' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let aiReply = 'Terima kasih pertanyaannya! Silakan isi formulir pesanan di portal atau hubungi admin WhatsApp kami.';
      const lower = userMsg.toLowerCase();
      if (lower.includes('harga') || lower.includes('tarif')) {
        aiReply = 'Tarif kami mulai dari Rp 7.000/Kg untuk Cuci Kiloan Reguler dan Rp 12.000/Kg untuk Cuci Kilat.';
      } else if (lower.includes('resi') || lower.includes('lacak')) {
        aiReply = 'Anda bisa memasukkan nomor resi pada menu "Cek Resi" di halaman utama.';
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 600);
  };

  const handleQuickReply = (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text: text }]);
    setTimeout(() => {
      let reply = 'Baik, ada lagi yang ingin Anda tanyakan?';
      if (text.includes('Harga Kiloan')) {
        reply = 'Cuci Kiloan Reguler kami seharga Rp 7.000/Kg dan Express Rp 12.000/Kg.';
      } else if (text.includes('Cara Resi')) {
        reply = 'Masukkan nomor resi Anda pada kotak Cek Resi di halaman utama untuk melihat status real-time.';
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition flex items-center justify-center text-xl relative"
        >
          🤖
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">1</span>
        </button>
      ) : (
        <div className="bg-white w-80 sm:w-96 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl text-lg">🤖</div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Asisten AI ZR-Laundry</h4>
                <p className="text-[10px] text-blue-100">Tanya tarif, layanan & tracking</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition"
            >
              ✕
            </button>
          </div>

          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="bg-blue-100 text-blue-700 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px]">
                    AI
                  </div>
                )}
                <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px]">
            <button onClick={() => handleQuickReply('💰 Harga Kiloan')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full shrink-0 font-medium transition">
              💰 Harga Kiloan
            </button>
            <button onClick={() => handleQuickReply('🔍 Cara Resi')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full shrink-0 font-medium transition">
              🔍 Cara Resi
            </button>
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              placeholder="Ketik pertanyaan..." 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500" 
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition shadow">
              Kirim
            </button>
          </form>
        </div>
      )}
    </div>
  );
}