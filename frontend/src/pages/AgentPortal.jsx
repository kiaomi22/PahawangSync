import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AgentPortal() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('boat');
    const [boats, setBoats] = useState([]);
    const [homestays, setHomestays] = useState([]);
    const [snorkelings, setSnorkelings] = useState([]);
    
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        user_id: localStorage.getItem('user_id') || 1, 
        item_type: '', item_id: '', start_date: '', end_date: '', itemName: '', price: 0
    });

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => { fetchData(); }, []);

    useEffect(() => {
        if (bookingData.start_date && bookingData.end_date) {
            const start = new Date(bookingData.start_date);
            const end = new Date(bookingData.end_date);
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            if (diffDays > 0) setTotalPrice(diffDays * bookingData.price);
            else setTotalPrice(0);
        } else {
            setTotalPrice(0);
        }
    }, [bookingData.start_date, bookingData.end_date, bookingData.price]);

    const fetchData = async () => {
        try {
            const [resBoats, resHomestays, resSnorkelings] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/boats'),
                axios.get('http://127.0.0.1:8000/api/homestays'),
                axios.get('http://127.0.0.1:8000/api/snorkelings')
            ]);
            setBoats(resBoats.data.data.filter(b => b.status === 'available'));
            setHomestays(resHomestays.data.data.filter(h => h.status === 'available'));
            setSnorkelings(resSnorkelings.data.data.filter(s => s.status === 'available'));
        } catch (error) { console.error("Gagal", error); }
    };

    const openBookingModal = (type, item) => {
        setBookingData({ ...bookingData, item_type: type, item_id: item.id, start_date: '', end_date: '', itemName: item.name, price: type === 'homestay' ? item.price_per_night : item.price_per_day });
        setShowBookingModal(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/bookings', bookingData);
            alert('Sukses! Invoice telah diterbitkan dan menunggu konfirmasi Admin.');
            setShowBookingModal(false);
        } catch (error) { alert('Gagal memproses pesanan.'); }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
            <style>{`
                .tab-btn { padding: 12px 24px; font-weight: 600; cursor: pointer; border: none; background: transparent; color: #64748b; border-bottom: 3px solid transparent; transition: all 0.3s; }
                .tab-btn.active { color: #0ea5e9; border-bottom: 3px solid #0ea5e9; }
                .catalog-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; transition: transform 0.2s, box-shadow 0.2s; }
                .catalog-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
                .card-header { padding: 20px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; }
                .card-body { padding: 20px; }
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(5px); }
                .input-modern { width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 8px; font-family: 'Inter'; outline: none; }
                .input-modern:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
            `}</style>

            <header style={{ background: '#0f172a', padding: '20px 40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
                <div>
                    <h2 style={{ margin: 0, color: 'white', fontSize: '20px' }}><span style={{ color: '#0ea5e9' }}>B2B</span> Portal</h2>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Welcome, {localStorage.getItem('user_name') || 'Mitra Agen'}</p>
                </div>
                <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Log Out</button>
            </header>

            <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '32px', color: '#0f172a', marginBottom: '12px', letterSpacing: '-1px' }}>Katalog Rantai Pasok Pahawang</h1>
                    <p style={{ color: '#64748b', fontSize: '16px' }}>Kelola pengadaan inventaris wisata untuk klien Anda dalam satu pintu.</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', borderBottom: '1px solid #e2e8f0', marginBottom: '40px' }}>
                    <button className={`tab-btn ${activeTab === 'boat' ? 'active' : ''}`} onClick={() => setActiveTab('boat')}>⚓ Armada Kapal</button>
                    <button className={`tab-btn ${activeTab === 'homestay' ? 'active' : ''}`} onClick={() => setActiveTab('homestay')}>🏠 Penginapan</button>
                    <button className={`tab-btn ${activeTab === 'snorkeling' ? 'active' : ''}`} onClick={() => setActiveTab('snorkeling')}>🤿 Snorkeling</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {activeTab === 'boat' && boats.map(item => (
                        <div key={item.id} className="catalog-card">
                            <div className="card-header">
                                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px' }}>{item.name}</h3>
                                <span style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginTop: '8px' }}>Tersedia</span>
                            </div>
                            <div className="card-body">
                                <p style={{ color: '#64748b', margin: '0 0 16px 0', fontSize: '14px' }}>Kapasitas Maksimal: <strong>{item.capacity} Penumpang</strong></p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#0f172a', fontWeight: 700, fontSize: '20px' }}>Rp {parseInt(item.price_per_day).toLocaleString('id-ID')} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 400 }}>/hari</span></div>
                                    <button onClick={() => openBookingModal('boat', item)} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Booking</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'homestay' && homestays.map(item => (
                        <div key={item.id} className="catalog-card">
                            <div className="card-header">
                                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px' }}>{item.name}</h3>
                                <span style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginTop: '8px' }}>Tersedia</span>
                            </div>
                            <div className="card-body">
                                <p style={{ color: '#64748b', margin: '0 0 16px 0', fontSize: '14px' }}>Total Kamar: <strong>{item.total_rooms}</strong></p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#0f172a', fontWeight: 700, fontSize: '20px' }}>Rp {parseInt(item.price_per_night).toLocaleString('id-ID')} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 400 }}>/malam</span></div>
                                    <button onClick={() => openBookingModal('homestay', item)} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Booking</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'snorkeling' && snorkelings.map(item => (
                        <div key={item.id} className="catalog-card">
                            <div className="card-header">
                                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px' }}>{item.name}</h3>
                                <span style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginTop: '8px' }}>Tersedia</span>
                            </div>
                            <div className="card-body">
                                <p style={{ color: '#64748b', margin: '0 0 16px 0', fontSize: '14px' }}>Stok Gudang: <strong>{item.quantity} Set</strong></p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#0f172a', fontWeight: 700, fontSize: '20px' }}>Rp {parseInt(item.price_per_day).toLocaleString('id-ID')} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 400 }}>/hari</span></div>
                                    <button onClick={() => openBookingModal('snorkeling', item)} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Booking</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {showBookingModal && (
                <div className="modal-overlay">
                    <div style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '450px', maxWidth: '90%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ margin: 0, color: '#0f172a', fontSize: '22px' }}>Buat Pesanan Baru</h2>
                            <button onClick={() => setShowBookingModal(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8' }}>&times;</button>
                        </div>
                        
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px dashed #cbd5e1' }}>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Item Terpilih</p>
                            <p style={{ margin: '4px 0 0 0', color: '#0f172a', fontWeight: 700, fontSize: '16px' }}>{bookingData.itemName}</p>
                        </div>
                        
                        <form onSubmit={handleBookingSubmit}>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Mulai Sewa</label>
                                    <input type="date" className="input-modern" required value={bookingData.start_date} onChange={e => setBookingData({...bookingData, start_date: e.target.value})} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Selesai Sewa</label>
                                    <input type="date" className="input-modern" required value={bookingData.end_date} onChange={e => setBookingData({...bookingData, end_date: e.target.value})} />
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid #f1f5f9', paddingTop: '20px', marginBottom: '24px' }}>
                                <div>
                                    <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Total Tagihan (Estimasi)</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <h3 style={{ margin: 0, color: '#0ea5e9', fontSize: '28px' }}>Rp {totalPrice.toLocaleString('id-ID')}</h3>
                                </div>
                            </div>

                            <button type="submit" disabled={totalPrice === 0} style={{ width: '100%', padding: '14px', background: totalPrice === 0 ? '#cbd5e1' : '#0ea5e9', color: 'white', border: 'none', borderRadius: '12px', cursor: totalPrice === 0 ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '16px', transition: 'background 0.2s' }}>
                                {totalPrice === 0 ? 'Pilih Tanggal Dulu' : 'Konfirmasi Pesanan'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}