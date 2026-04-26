import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            const user = response.data.user;
            
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_name', user.name);

            if (email === 'admin@pahawang.com') {
    navigate('/dashboard'); 
} else {
    navigate('/agen'); 
}
        } catch (error) {
            console.error("Login gagal", error);
            alert('Email atau Password salah!');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f4f7f6', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                * { box-sizing: border-box; }
                .login-input { width: 100%; padding: 14px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; outline: none; transition: all 0.2s; background: #f8fafc; }
                .login-input:focus { border-color: #0ea5e9; background: #fff; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15); }
                .login-btn { width: 100%; padding: 14px; background: #0f172a; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 15px; cursor: pointer; transition: background 0.2s; margin-top: 10px; }
                .login-btn:hover { background: #1e293b; }
            `}</style>

            <div style={{ flex: 1, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
                    <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-1px' }}>
                        <span style={{ color: '#0ea5e9' }}>Pahawang</span>Sync.
                    </div>
                    <h1 style={{ fontSize: '36px', lineHeight: '1.2', marginBottom: '20px', fontWeight: 600 }}>Digital Supply Chain untuk Ecotourism.</h1>
                    <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: '1.6' }}>Platform B2B eksklusif untuk agen perjalanan dan manajemen inventaris logistik pariwisata Pulau Pahawang.</p>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                <div style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02), 0 10px 15px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
                    <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a', fontWeight: 700 }}>Selamat Datang</h2>
                    <p style={{ margin: '0 0 30px 0', color: '#64748b', fontSize: '14px' }}>Masuk ke ruang kerja (workspace) Anda.</p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>Email Akses</label>
                            <input type="email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@pahawang.com" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>Kata Sandi</label>
                            <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
                        </div>
                        <button type="submit" className="login-btn">Masuk ke Sistem</button>
                        <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '15px' }}>
                        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>Belum punya akun Agen Mitra?</p>
                        <button type="button" onClick={() => navigate('/register')} style={{ width: '100%', padding: '10px', background: 'transparent', color: '#0ea5e9', border: '1px solid #0ea5e9', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Daftar Akun Baru</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}