import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Icons = {
    Anchor: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>,
    Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    Water: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>,
    Receipt: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Ship: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"></path><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"></path><path d="M12 10v4"></path><path d="M12 2v3"></path></svg>
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [boats, setBoats] = useState([]);
    
    useEffect(() => { fetchBoats(); }, []);

    const fetchBoats = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/boats');
            setBoats(response.data.data);
        } catch (error) { console.error("Gagal", error); }
    };

    const handleLogout = () => { localStorage.clear(); navigate('/login'); };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: "'Inter', sans-serif" }}>
            <style>{`
                * { box-sizing: border-box; }
                .sidebar-item { display: flex; align-items: center; gap: 12px; padding: 14px 20px; color: #94a3b8; text-decoration: none; border-radius: 8px; transition: all 0.2s; cursor: pointer; margin-bottom: 5px; font-weight: 500; font-size: 14px; }
                .sidebar-item:hover { background-color: rgba(255,255,255,0.05); color: #fff; }
                .sidebar-item.active { background-color: #0ea5e9; color: #fff; }
                .metric-card { background: white; padding: 24px; border-radius: 16px; flex: 1; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; display: flex; align-items: center; gap: 20px; }
                .metric-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
            `}</style>

            <div style={{ width: '260px', backgroundColor: '#0f172a', color: 'white', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '0 10px', marginBottom: '40px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}><span style={{ color: '#0ea5e9' }}>Pahawang</span>Sync.</div>
                    <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>B2B Workspace</div>
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingLeft: '10px', fontWeight: 600 }}>Logistics</div>
                    <div className="sidebar-item active"><Icons.Anchor /> Armada Kapal</div>
                    <div className="sidebar-item" onClick={() => navigate('/homestay')}><Icons.Home /> Penginapan</div>
                    <div className="sidebar-item" onClick={() => navigate('/snorkeling')}><Icons.Water /> Alat Snorkeling</div>
                    
                    <div style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', marginTop: '20px', paddingLeft: '10px', fontWeight: 600 }}>Transactions</div>
                    <div className="sidebar-item" onClick={() => navigate('/booking')}><Icons.Receipt /> Pesanan (Booking)</div>
                </div>

                <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
                    <div className="sidebar-item" onClick={handleLogout} style={{ color: '#ef4444' }}><Icons.Logout /> Keluar Sesi</div>
                </div>
            </div>

            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Dashboard Admin</h1>
                        <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>Overview inventaris dan armada kapal hari ini.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
                    <div className="metric-card">
                        <div className="metric-icon" style={{ background: '#e0f2fe' }}><Icons.Ship /></div>
                        <div>
                            <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Total Armada Kapal</p>
                            <h3 style={{ margin: 0, fontSize: '28px', color: '#0f172a' }}>{boats.length} <span style={{ fontSize: '14px', color: '#10b981', fontWeight: 500 }}>Unit</span></h3>
                        </div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-icon" style={{ background: '#dcfce7' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <div>
                            <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Kapal Tersedia (Ready)</p>
                            <h3 style={{ margin: 0, fontSize: '28px', color: '#0f172a' }}>{boats.filter(b => b.status === 'available').length}</h3>
                        </div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-icon" style={{ background: '#fee2e2' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                        <div>
                            <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Kapal Maintenance</p>
                            <h3 style={{ margin: 0, fontSize: '28px', color: '#0f172a' }}>{boats.filter(b => b.status === 'maintenance').length}</h3>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a', fontWeight: 600 }}>Direktori Armada Kapal</h3>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, fontSize: '13px' }}><Icons.Plus /> Tambah Kapal</button>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Nama Kapal</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Tarif Sewa</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boats.map((boat) => (
                                <tr key={boat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ color: '#0f172a', fontWeight: 600, fontSize: '14px' }}>{boat.name}</div>
                                        <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Kapasitas: {boat.capacity} Penumpang</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 500, fontSize: '14px' }}>Rp {parseInt(boat.price_per_day).toLocaleString('id-ID')}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: boat.status === 'available' ? '#dcfce7' : '#fee2e2', color: boat.status === 'available' ? '#166534' : '#991b1b' }}>
                                            {boat.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}