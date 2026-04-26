import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Icons = {
    Anchor: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>,
    Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    Water: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>,
    Receipt: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

export default function Booking() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/bookings');
            setBookings(response.data.data);
        } catch (error) { console.error("Gagal mengambil data transaksi", error); }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        if (window.confirm(`Ubah status transaksi ini menjadi ${newStatus.toUpperCase()}?`)) {
            try {
                await axios.put(`http://127.0.0.1:8000/api/bookings/${id}/status`, { status: newStatus });
                fetchBookings(); 
            } catch (error) {
                alert('Gagal mengubah status!');
            }
        }
    };

    const handleLogout = () => { localStorage.removeItem('auth_token'); navigate('/login'); };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                * { box-sizing: border-box; }
                .sidebar-item { display: flex; align-items: center; gap: 12px; padding: 14px 20px; color: #94a3b8; text-decoration: none; border-radius: 8px; transition: all 0.2s; cursor: pointer; margin-bottom: 5px; font-weight: 500; fontSize: 14px; }
                .sidebar-item:hover { background-color: rgba(255,255,255,0.05); color: #fff; }
                .sidebar-item.active { background-color: #0ea5e9; color: #fff; }
                .table-row { border-bottom: 1px solid #f1f5f9; transition: background 0.2s; }
                .table-row:hover { background-color: #f8fafc; }
                .status-select { padding: 6px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12px; font-weight: 600; cursor: pointer; outline: none; }
            `}</style>

            <div style={{ width: '260px', backgroundColor: '#0f172a', color: 'white', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '0 10px', marginBottom: '40px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
                        <span style={{ color: '#0ea5e9' }}>Pahawang</span>Sync.
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>B2B Workspace</div>
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingLeft: '10px', fontWeight: 600 }}>Logistics</div>
                    <div className="sidebar-item" onClick={() => navigate('/dashboard')}><Icons.Anchor /> Armada Kapal</div>
                    <div className="sidebar-item" onClick={() => navigate('/homestay')}><Icons.Home /> Penginapan</div>
                    <div className="sidebar-item" onClick={() => navigate('/snorkeling')}><Icons.Water /> Alat Snorkeling</div>
                    
                    <div style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', marginTop: '20px', paddingLeft: '10px', fontWeight: 600 }}>Transactions</div>
                    <div className="sidebar-item active"><Icons.Receipt /> Pesanan (Booking)</div>
                </div>

                <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
                    <div className="sidebar-item" onClick={handleLogout} style={{ color: '#ef4444' }}><Icons.Logout /> Keluar Sesi</div>
                </div>
            </div>

            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Manajemen Transaksi</h1>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Pantau dan proses pesanan (booking) dari mitra agen travel.</p>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>ID / Layanan</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Agen Travel (User)</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Tanggal Sewa</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Total Harga</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Aksi Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((book) => (
                                <tr key={book.id} className="table-row">
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ color: '#0f172a', fontWeight: 600, fontSize: '14px', textTransform: 'capitalize' }}>{book.item_type}</div>
                                        <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>TRX-00{book.id} • Item ID: {book.item_id}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#334155', fontWeight: 500, fontSize: '14px' }}>
                                        {book.user ? book.user.name : `Agen ID: ${book.user_id}`}
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#475569', fontSize: '13px' }}>
                                        <div style={{ fontWeight: 600 }}>Mulai: {book.start_date}</div>
                                        <div>Selesai: {book.end_date}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#059669', fontWeight: 600, fontSize: '14px' }}>
                                        Rp {parseInt(book.total_price).toLocaleString('id-ID')}
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <select 
                                            className="status-select"
                                            value={book.status} 
                                            onChange={(e) => handleUpdateStatus(book.id, e.target.value)}
                                            style={{ 
                                                background: book.status === 'pending' ? '#fef3c7' : (book.status === 'confirmed' ? '#dcfce7' : (book.status === 'completed' ? '#e0e7ff' : '#fee2e2')),
                                                color: book.status === 'pending' ? '#b45309' : (book.status === 'confirmed' ? '#166534' : (book.status === 'completed' ? '#3730a3' : '#991b1b')),
                                            }}
                                        >
                                            <option value="pending">Menunggu (Pending)</option>
                                            <option value="confirmed">Dikonfirmasi (Confirmed)</option>
                                            <option value="completed">Selesai (Completed)</option>
                                            <option value="cancelled">Dibatalkan (Cancelled)</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                                        <div style={{ marginBottom: '16px', opacity: 0.5 }}><Icons.Receipt /></div>
                                        <div style={{ fontSize: '15px', fontWeight: 500, color: '#475569' }}>Belum ada transaksi masuk</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}