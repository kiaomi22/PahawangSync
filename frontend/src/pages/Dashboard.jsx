import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login'); 
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>🏝️ Selamat Datang di Dashboard PahawangSync!</h1>
            <p>Ini adalah area rahasia B2B. Anda berhasil masuk menggunakan Token dari Laravel.</p>
            
            <button 
                onClick={handleLogout} 
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                Keluar (Logout)
            </button>
        </div>
    );
}