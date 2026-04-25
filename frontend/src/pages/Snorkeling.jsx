import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Snorkeling() {
    const navigate = useNavigate();
    const [snorkelings, setSnorkelings] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null); 
    
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price_per_day: '',
        status: 'available'
    });

    useEffect(() => {
        fetchSnorkelings();
    }, []);

    const fetchSnorkelings = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/snorkelings');
            setSnorkelings(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data alat snorkeling", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setFormData({
            name: item.name,
            quantity: item.quantity,
            price_per_day: parseInt(item.price_per_day),
            status: item.status
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`http://127.0.0.1:8000/api/snorkelings/${editId}`, formData);
                alert('Data Alat Snorkeling berhasil diperbarui!');
            } else {
                await axios.post('http://127.0.0.1:8000/api/snorkelings', formData);
                alert('Alat Snorkeling berhasil ditambahkan!');
            }
            setShowForm(false); 
            setEditId(null);
            setFormData({ name: '', quantity: '', price_per_day: '', status: 'available' }); 
            fetchSnorkelings(); 
        } catch (error) {
            console.error("Gagal menyimpan alat snorkeling", error);
            alert('Gagal menyimpan data!');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus alat ini?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/snorkelings/${id}`);
                alert('Alat Snorkeling berhasil dihapus!');
                fetchSnorkelings(); 
            } catch (error) {
                console.error("Gagal menghapus alat", error);
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
                <h2>🤿 CMS Snorkeling PahawangSync</h2>
                <div>
                    <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 15px', marginRight: '10px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Kembali ke Dashboard (Kapal)
                    </button>
                    <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </div>
            <hr style={{ margin: '20px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3>Daftar Alat Snorkeling</h3>
                <button 
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditId(null);
                        setFormData({ name: '', quantity: '', price_per_day: '', status: 'available' });
                    }} 
                    style={{ padding: '8px 15px', background: showForm ? '#6c757d' : '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    {showForm ? 'Batal' : '+ Tambah Alat'}
                </button>
            </div>

            {showForm && (
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
                    <h4>{editId ? 'Edit Data Snorkeling' : 'Formulir Alat Baru'}</h4>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Nama Paket/Alat</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ padding: '8px', width: '180px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Jumlah Stok</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required style={{ padding: '8px', width: '80px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Harga/Hari (Rp)</label>
                            <input type="number" name="price_per_day" value={formData.price_per_day} onChange={handleChange} required style={{ padding: '8px', width: '120px' }} />
                        </div>
                        
                        {editId && (
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} style={{ padding: '8px' }}>
                                    <option value="available">Available</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                            </div>
                        )}

                        <button type="submit" style={{ padding: '9px 15px', background: editId ? '#ffc107' : '#28a745', color: editId ? 'black' : 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            {editId ? 'Simpan Perubahan' : 'Simpan Alat'}
                        </button>
                    </form>
                </div>
            )}

            <table border="1" cellPadding="12" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'white' }}>
                <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                        <th>ID</th>
                        <th>Nama Paket/Alat</th>
                        <th>Jumlah Stok</th>
                        <th>Harga / Hari</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {snorkelings.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td><strong>{item.name}</strong></td>
                            <td>{item.quantity} Set</td>
                            <td>Rp {parseInt(item.price_per_day).toLocaleString('id-ID')}</td>
                            <td>
                                <span style={{ 
                                    background: item.status === 'available' ? '#d4edda' : '#fff3cd', 
                                    color: item.status === 'available' ? '#155724' : '#856404',
                                    padding: '5px 10px', borderRadius: '15px', fontSize: '14px', fontWeight: 'bold'
                                }}>
                                    {item.status.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => handleEdit(item)} style={{ padding: '5px 10px', marginRight: '5px', background: '#ffc107', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDelete(item.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                    {snorkelings.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Belum ada data alat snorkeling.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}