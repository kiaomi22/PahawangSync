import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Homestay() {
    const navigate = useNavigate();
    const [homestays, setHomestays] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null); 
    
    const [formData, setFormData] = useState({
        name: '',
        total_rooms: '',
        price_per_night: '',
        status: 'available'
    });

    useEffect(() => {
        fetchHomestays();
    }, []);

    const fetchHomestays = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/homestays');
            setHomestays(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data homestay", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (homestay) => {
        setEditId(homestay.id);
        setFormData({
            name: homestay.name,
            total_rooms: homestay.total_rooms,
            price_per_night: parseInt(homestay.price_per_night),
            status: homestay.status
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`http://127.0.0.1:8000/api/homestays/${editId}`, formData);
                alert('Data Homestay berhasil diperbarui!');
            } else {
                await axios.post('http://127.0.0.1:8000/api/homestays', formData);
                alert('Homestay berhasil ditambahkan!');
            }
            setShowForm(false); 
            setEditId(null);
            setFormData({ name: '', total_rooms: '', price_per_night: '', status: 'available' }); 
            fetchHomestays(); 
        } catch (error) {
            console.error("Gagal menyimpan homestay", error);
            alert('Gagal menyimpan data!');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus homestay ini?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/homestays/${id}`);
                alert('Homestay berhasil dihapus!');
                fetchHomestays(); 
            } catch (error) {
                console.error("Gagal menghapus homestay", error);
                alert('Gagal menghapus data!');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login');
    };

    return (
        <div style={{ padding: '30px', maxWidth: '1000px', margin: 'auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>🏠 CMS Homestay PahawangSync</h2>
                <div>
                    {/* INI TOMBOL KEMBALI KE HALAMAN KAPAL */}
                    <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 15px', marginRight: '10px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Kembali ke Kapal
                    </button>
                    <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </div>
            <hr style={{ margin: '20px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3>Daftar Penginapan (Homestay)</h3>
                <button 
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setFormData({ name: '', total_rooms: '', price_per_night: '', status: 'available' });
                    }} 
                    style={{ padding: '8px 15px', background: showForm ? '#6c757d' : '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    {showForm ? 'Batal' : '+ Tambah Homestay'}
                </button>
            </div>

            {showForm && (
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
                    <h4>{editId ? 'Edit Data Homestay' : 'Formulir Homestay Baru'}</h4>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Nama Homestay</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ padding: '8px', width: '180px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Jml. Kamar</label>
                            <input type="number" name="total_rooms" value={formData.total_rooms} onChange={handleChange} required style={{ padding: '8px', width: '80px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Harga/Malam (Rp)</label>
                            <input type="number" name="price_per_night" value={formData.price_per_night} onChange={handleChange} required style={{ padding: '8px', width: '120px' }} />
                        </div>
                        
                        {editId && (
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} style={{ padding: '8px' }}>
                                    <option value="available">Available</option>
                                    <option value="full">Full (Penuh)</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                            </div>
                        )}

                        <button type="submit" style={{ padding: '9px 15px', background: editId ? '#ffc107' : '#28a745', color: editId ? 'black' : 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            {editId ? 'Simpan Perubahan' : 'Simpan Homestay'}
                        </button>
                    </form>
                </div>
            )}

            <table border="1" cellPadding="12" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'white' }}>
                <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                        <th>ID</th>
                        <th>Nama Homestay</th>
                        <th>Jml. Kamar</th>
                        <th>Harga / Malam</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {homestays.map((homestay) => (
                        <tr key={homestay.id}>
                            <td>{homestay.id}</td>
                            <td><strong>{homestay.name}</strong></td>
                            <td>{homestay.total_rooms} Kamar</td>
                            <td>Rp {parseInt(homestay.price_per_night).toLocaleString('id-ID')}</td>
                            <td>
                                <span style={{ 
                                    background: homestay.status === 'available' ? '#d4edda' : (homestay.status === 'maintenance' ? '#fff3cd' : '#f8d7da'), 
                                    color: homestay.status === 'available' ? '#155724' : (homestay.status === 'maintenance' ? '#856404' : '#721c24'),
                                    padding: '5px 10px', borderRadius: '15px', fontSize: '14px', fontWeight: 'bold'
                                }}>
                                    {homestay.status.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => handleEdit(homestay)} style={{ padding: '5px 10px', marginRight: '5px', background: '#ffc107', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDelete(homestay.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                    {homestays.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Belum ada data homestay.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}