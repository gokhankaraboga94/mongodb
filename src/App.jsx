import { useState } from 'react'

function App() {
  const [durum, setDurum] = useState('Henüz kasaya veri gitmedi.')

  const veritabaninaGonder = async () => {
    setDurum('⏳ Sunucuya iletiliyor...');
    
    try {
      // Node.js'teki 5000 portuna kurye yolluyoruz
      const cevap = await fetch('http://localhost:5000/api/mesaj-kaydet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mesaj: 'Merhaba MongoDB! Ben React. Gökhan gönderdi.' })
      });
      
      const veri = await cevap.json();
      
      if(veri.basari) {
        setDurum('✅ ' + veri.sonuc);
      }
    } catch (hata) {
      setDurum('❌ Hata: Node.js kapalı olabilir.');
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1>MERN Mimarisinde İlk Adım 🚀</h1>
      <button 
        onClick={veritabaninaGonder} 
        style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        Veriyi Veritabanına Yaz!
      </button>
      <p style={{ fontSize: '20px', marginTop: '20px', fontWeight: 'bold' }}>{durum}</p>
    </div>
  )
}

export default App