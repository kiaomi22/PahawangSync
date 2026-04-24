import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password
            });
            
            const token = response.data.access_token;
            localStorage.setItem('auth_token', token);
            setMessage('Login Berhasil! Mengalihkan ke Dashboard...');
            
        
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
            
        } catch (error) {
            setMessage('Gagal: Email atau Password salah');
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Login B2B PahawangSync</h2>
            {message && <p style={{ color: message.includes('Berhasil') ? 'green' : 'red' }}>{message}</p>}
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="email" 
                    placeholder="Email Agen Travel" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    style={{ padding: '10px' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
                    Masuk
                </button>
            </form>
        </div>
    );
}