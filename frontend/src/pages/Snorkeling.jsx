import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Icons = {
    Anchor: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>,
    Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    Water: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>,
    Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
    Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
    Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
};

export default function Snorkeling() {
    const navigate = useNavigate();
    const [snorkelings, setSnorkelings] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null); 
    
    const [formData, setFormData] = useState({
        name: '', quantity: '', price_per_day: '', status: 'available'
    });

    useEffect(() => { fetchSnorkelings(); }, []);

    const fetchSnorkelings = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/snorkelings');
            setSnorkelings(response.data.data);
        } catch (error) { console.error("Gagal", error); }
    };

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

    const handleEdit = (item) => {
        setEditId(item.id);
        setFormData({ name: item.name, quantity: item.quantity, price_per_day: parseInt(item.price_per_day), status: item.status });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) await axios.put(`http://127.0.0.1:8000/api/snorkelings/${editId}`, formData);
            else await axios.post('http://127.0.0.1:8000/api/snorkelings', formData);
            setShowForm(false); setEditId(null); setFormData({ name: '', quantity: '', price_per_day: '', status: 'available' }); 
            fetchSnorkelings(); 
        } catch (error) { alert('Gagal menyimpan data!'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Hapus alat ini dari sistem?")) {
            await axios.delete(`http://127.0.0.1:8000/api/snorkelings/${id}`);
            fetchSnorkelings(); 
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
                .action-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; }
                .btn-edit { background: #fef3c7; color: #d97706; } .btn-edit:hover { background: #fde68a; }
                .btn-delete { background: #fee2e2; color: #dc2626; } .btn-delete:hover { background: #fecaca; }
                .input-modern { width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; outline: none; transition: all 0.2s; }
                .input-modern:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15); }
                .table-row { border-bottom: 1px solid #f1f5f9; transition: background 0.2s; }
                .table-row:hover { background-color: #f8fafc; }
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
                    <div className="sidebar-item" onClick={() => navigate('/dashboard')}>
                        <Icons.Anchor /> Armada Kapal
                    </div>
                    <div className="sidebar-item" onClick={() => navigate('/homestay')}>
                        <Icons.Home /> Penginapan
                    </div>
                    <div className="sidebar-item active">
                        <Icons.Water /> Alat Snorkeling
                    </div>
                </div>

                <div style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', marginTop: '20px', paddingLeft: '10px', fontWeight: 600 }}>Transactions</div>
                    <div className="sidebar-item" onClick={() => navigate('/booking')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
                        Pesanan (Booking)
                    </div>

                <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
                    <div className="sidebar-item" onClick={handleLogout} style={{ color: '#ef4444' }}>
                        <Icons.Logout /> Keluar Sesi
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Alat Snorkeling</h1>
                        <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Kelola inventaris perlengkapan selam dan snorkeling.</p>
                    </div>
                    <button 
                        onClick={() => { setShowForm(!showForm); setEditId(null); setFormData({ name: '', quantity: '', price_per_day: '', status: 'available' }); }} 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: showForm ? '#e2e8f0' : '#0ea5e9', color: showForm ? '#475569' : 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, fontSize: '14px', transition: 'all 0.2s' }}
                    >
                        {showForm ? 'Batal' : <><Icons.Plus /> Tambah Alat</>}
                    </button>
                </div>

                {showForm && (
                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#1e293b', fontWeight: 600 }}>{editId ? 'Perbarui Data Alat' : 'Registrasi Alat Baru'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'end' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>Nama Paket/Alat</label>
                                <input className="input-modern" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Cth: Paket Snorkel Lengkap" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>Jumlah Stok (Set)</label>
                                <input className="input-modern" type="number" name="quantity" value={formData.quantity} onChange={handleChange} required placeholder="0" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>Tarif Sewa (Rp / Hari)</label>
                                <input className="input-modern" type="number" name="price_per_day" value={formData.price_per_day} onChange={handleChange} required placeholder="0" />
                            </div>
                            
                            {editId && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>Status Alat</label>
                                    <select className="input-modern" name="status" value={formData.status} onChange={handleChange} style={{ backgroundColor: 'white' }}>
                                        <option value="available">Tersedia (Ready)</option>
                                        <option value="maintenance">Perawatan (Maintenance)</option>
                                    </select>
                                </div>
                            )}

                            <button type="submit" style={{ padding: '12px 20px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, fontSize: '14px', height: '45px', transition: 'background 0.2s' }}>
                                {editId ? 'Simpan Perubahan' : 'Simpan ke Database'}
                            </button>
                        </form>
                    </div>
                )}

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Info Alat</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tarif Sewa</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Manajemen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {snorkelings.map((item) => (
                                <tr key={item.id} className="table-row">
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ color: '#0f172a', fontWeight: 600, fontSize: '14px' }}>{item.name}</div>
                                        <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>ID: #{item.id} • Stok: {item.quantity} Set</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 500, fontSize: '14px' }}>
                                        Rp {parseInt(item.price_per_day).toLocaleString('id-ID')}
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ 
                                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                                            background: item.status === 'available' ? '#f0fdf4' : '#fef2f2', 
                                            color: item.status === 'available' ? '#166534' : '#991b1b',
                                            border: `1px solid ${item.status === 'available' ? '#bbf7d0' : '#fecaca'}`,
                                            padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500
                                        }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.status === 'available' ? '#22c55e' : '#ef4444' }}></span>
                                            {item.status === 'available' ? 'Available' : 'Maintenance'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <button className="action-btn btn-edit" onClick={() => handleEdit(item)} style={{ marginRight: '8px' }}>
                                            <Icons.Edit /> Edit
                                        </button>
                                        <button className="action-btn btn-delete" onClick={() => handleDelete(item.id)}>
                                            <Icons.Trash /> Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {snorkelings.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                                        <div style={{ marginBottom: '16px', opacity: 0.5 }}><Icons.Water /></div>
                                        <div style={{ fontSize: '15px', fontWeight: 500, color: '#475569' }}>Tidak ada alat ditemukan</div>
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