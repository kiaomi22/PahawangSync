import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import Homestay from './pages/Homestay';
import Snorkeling from './pages/Snorkeling';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/homestay" element={<Homestay />} />
        <Route path="/snorkeling" element={<Snorkeling />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;