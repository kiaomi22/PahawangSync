import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Komponen SVG Icons Profesional (Tanpa Emoji)
const Icons = {
    Anchor: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>,
    Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    Water: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>,
    Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
    Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
    Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [boats, setBoats] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null); 
    
    const [formData, setFormData] = useState({
        name: '', capacity: '', price_per_day: '', status: 'available'
    });

    useEffect(() => { fetchBoats(); }, []);

    const fetchBoats = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/boats');
            setBoats(response.data.data);
        } catch (error) { console.error("Gagal", error); }
    };

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

    const handleEdit = (boat) => {
        setEditId(boat.id);
        setFormData({ name: boat.name, capacity: boat.capacity, price_per_day: parseInt(boat.price_per_day), status: boat.status });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) await axios.put(`http://127.0.0.1:8000/api/boats/${editId}`, formData);
            else await axios.post('http://127.0.0.1:8000/api/boats', formData);
            setShowForm(false); setEditId(null); setFormData({ name: '', capacity: '', price_per_day: '', status: 'available' }); 
            fetchBoats(); 
        } catch (error) { alert('Gagal menyimpan data!'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Hapus armada ini dari sistem?")) {
            await axios.delete(`http://127.0.0.1:8000/api/boats/${id}`);
            fetchBoats(); 
        }
    };

    const handleLogout = () => { localStorage.removeItem('auth_token'); navigate('/login'); };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
            
            {/* INJEKSI CSS MODERN */}
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

            {/* SIDEBAR B2B PREMIUM (Dark Mode) */}
            <div style={{ width: '260px', backgroundColor: '#0f172a', color: 'white', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '0 10px', marginBottom: '40px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
                        <span style={{ color: '#0ea5e9' }}>Pahawang</span>Sync.
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>B2B Workspace</div>
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingLeft: '10px', fontWeight: 600 }}>Logistics</div>
                    <div className="sidebar-item active">
                        <Icons.Anchor /> Armada Kapal
                    </div>
                    <div className="sidebar-item" onClick={() => navigate('/homestay')}>
                        <Icons.Home /> Penginapan
                    </div>
                    <div className="sidebar-item" onClick={() => navigate('/snorkeling')}>
                        <Icons.Water /> Alat Snorkeling
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
                    <div className="sidebar-item" onClick={handleLogout} style={{ color: '#ef4444' }}>
                        <Icons.Logout /> Keluar Sesi
                    </div>
                </div>
            </div>

            {/* AREA KONTEN UTAMA */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                
                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Armada Kapal</h1>
                        <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Kelola inventaris dan status operasional armada laut Anda.</p>
                    </div>
                    <button 
                        onClick={() => { setShowForm(!showForm); setEditId(null); setFormData({ name: '', capacity: '', price_per_day: '', status: 'available' }); }} 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: showForm ? '#e2e8f0' : '#0ea5e9', color: showForm ? '#475569' : 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, fontSize: '14px', transition: 'all 0.2s' }}
                    >
                        {showForm ? 'Batal' : <><Icons.Plus /> Tambah Armada</>}
                    </button>
                </div>

                {/* Card Form Modern */}
                {showForm && (
                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#1e293b', fontWeight: 600 }}>{editId ? 'Perbarui Data Armada' : 'Registrasi Armada Baru'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'end' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>Nama Kapal</label>
                                <input className="input-modern" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Cth: KM Bahari" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>Kapasitas (Penumpang)</label>
                                <input className="input-modern" type="number" name="capacity" value={formData.capacity} onChange={handleChange} required placeholder="0" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>Tarif Sewa (Rp / Hari)</label>
                                <input className="input-modern" type="number" name="price_per_day" value={formData.price_per_day} onChange={handleChange} required placeholder="0" />
                            </div>
                            
                            {editId && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>Status Operasional</label>
                                    <select className="input-modern" name="status" value={formData.status} onChange={handleChange} style={{ backgroundColor: 'white' }}>
                                        <option value="available">Tersedia (Ready)</option>
                                        <option value="booked">Disewa (Booked)</option>
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

                {/* Card Tabel B2B */}
                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Info Armada</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tarif Sewa</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Manajemen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boats.map((boat) => (
                                <tr key={boat.id} className="table-row">
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ color: '#0f172a', fontWeight: 600, fontSize: '14px' }}>{boat.name}</div>
                                        <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>ID: #{boat.id} • Kapasitas: {boat.capacity} Pax</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 500, fontSize: '14px' }}>
                                        Rp {parseInt(boat.price_per_day).toLocaleString('id-ID')}
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ 
                                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                                            background: boat.status === 'available' ? '#f0fdf4' : (boat.status === 'maintenance' ? '#fef2f2' : '#f8fafc'), 
                                            color: boat.status === 'available' ? '#166534' : (boat.status === 'maintenance' ? '#991b1b' : '#334155'),
                                            border: `1px solid ${boat.status === 'available' ? '#bbf7d0' : (boat.status === 'maintenance' ? '#fecaca' : '#cbd5e1')}`,
                                            padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500
                                        }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: boat.status === 'available' ? '#22c55e' : (boat.status === 'maintenance' ? '#ef4444' : '#64748b') }}></span>
                                            {boat.status === 'available' ? 'Available' : (boat.status === 'maintenance' ? 'Maintenance' : 'Booked')}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <button className="action-btn btn-edit" onClick={() => handleEdit(boat)} style={{ marginRight: '8px' }}>
                                            <Icons.Edit /> Edit
                                        </button>
                                        <button className="action-btn btn-delete" onClick={() => handleDelete(boat.id)}>
                                            <Icons.Trash /> Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {boats.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                                        <div style={{ marginBottom: '16px', opacity: 0.5 }}><Icons.Anchor /></div>
                                        <div style={{ fontSize: '15px', fontWeight: 500, color: '#475569' }}>Tidak ada armada yang ditemukan</div>
                                        <div style={{ fontSize: '13px', marginTop: '4px' }}>Mulai tambahkan data kapal ke dalam sistem.</div>
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