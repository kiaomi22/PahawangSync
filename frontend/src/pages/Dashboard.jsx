import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();
    const [boats, setBoats] = useState([]);
    
    // State untuk memunculkan formulir
    const [showForm, setShowForm] = useState(false);
    
    // State untuk menyimpan isian formulir
    const [formData, setFormData] = useState({
        name: '',
        capacity: '',
        price_per_day: ''
    });

    useEffect(() => {
        fetchBoats();
    }, []);

    const fetchBoats = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/boats');
            setBoats(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data kapal", error);
        }
    };

    // Fungsi untuk mendeteksi ketikan di formulir
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fungsi saat tombol "Simpan Kapal" diklik
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/boats', formData);
            alert('Kapal berhasil ditambahkan!');
            setShowForm(false); 
            setFormData({ name: '', capacity: '', price_per_day: '' }); 
            fetchBoats(); 
        } catch (error) {
            console.error("Gagal menyimpan kapal", error);
            alert('Gagal menyimpan data!');
        }
    };

    // Fungsi saat tombol "Hapus" diklik
    const handleDelete = async (id) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus kapal ini?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/boats/${id}`);
                alert('Kapal berhasil dihapus!');
                fetchBoats(); 
            } catch (error) {
                console.error("Gagal menghapus kapal", error);
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
                <h2>🏝️ CMS Logistik PahawangSync</h2>
                <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
            <hr style={{ margin: '20px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3>Daftar Kapal (Boats)</h3>
                <button 
                    onClick={() => setShowForm(!showForm)} 
                    style={{ padding: '8px 15px', background: showForm ? '#6c757d' : '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    {showForm ? 'Batal' : '+ Tambah Kapal'}
                </button>
            </div>

            {/* Area Formulir Tambah Kapal */}
            {showForm && (
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
                    <h4>Formulir Kapal Baru</h4>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Nama Kapal</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ padding: '8px', width: '200px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Kapasitas (Orang)</label>
                            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required style={{ padding: '8px', width: '100px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Harga/Hari (Rp)</label>
                            <input type="number" name="price_per_day" value={formData.price_per_day} onChange={handleChange} required style={{ padding: '8px', width: '150px' }} />
                        </div>
                        <button type="submit" style={{ padding: '9px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Simpan Kapal
                        </button>
                    </form>
                </div>
            )}

            <table border="1" cellPadding="12" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'white' }}>
                <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                        <th>ID</th>
                        <th>Nama Kapal</th>
                        <th>Kapasitas</th>
                        <th>Harga / Hari</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {boats.map((boat) => (
                        <tr key={boat.id}>
                            <td>{boat.id}</td>
                            <td><strong>{boat.name}</strong></td>
                            <td>{boat.capacity} Orang</td>
                            <td>Rp {parseInt(boat.price_per_day).toLocaleString('id-ID')}</td>
                            <td>
                                <span style={{ 
                                    background: boat.status === 'available' ? '#d4edda' : (boat.status === 'maintenance' ? '#fff3cd' : '#f8d7da'), 
                                    color: boat.status === 'available' ? '#155724' : (boat.status === 'maintenance' ? '#856404' : '#721c24'),
                                    padding: '5px 10px', borderRadius: '15px', fontSize: '14px', fontWeight: 'bold'
                                }}>
                                    {boat.status.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                <button style={{ padding: '5px 10px', marginRight: '5px', background: '#ffc107', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Edit</button>
                                
                                {/* INI TOMBOL HAPUS YANG SUDAH DIPERBAIKI */}
                                <button 
                                    onClick={() => handleDelete(boat.id)} 
                                    style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                >
                                    Hapus
                                </button>
                                
                            </td>
                        </tr>
                    ))}
                    {boats.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Belum ada data kapal.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}