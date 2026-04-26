import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/register', { name, email, password });
            alert('Registrasi Berhasil! Silakan Login.');
            navigate('/login');
        } catch (error) {
            alert("Gagal: " + (error.response?.data?.message || error.message));
            console.error("Detail Error:", error.response?.data);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f7f6', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <h2 style={{ textAlign: 'center', color: '#0f172a' }}>Daftar Agen Travel</h2>
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>Bergabung dengan ekosistem PahawangSync</p>
                
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} type="text" placeholder="Nama Travel / Agen" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} type="email" placeholder="Email Business" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" style={{ padding: '12px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Daftar Sekarang</button>
                </form>
                <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '20px' }}>Sudah punya akun? <span onClick={() => navigate('/login')} style={{ color: '#0ea5e9', cursor: 'pointer' }}>Login di sini</span></p>
            </div>
        </div>
    );
}