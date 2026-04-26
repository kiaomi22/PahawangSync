import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; 
import Homestay from './pages/Homestay';
import Snorkeling from './pages/Snorkeling';
import Booking from './pages/Booking';
import AgentPortal from './pages/AgentPortal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/homestay" element={<Homestay />} />
        <Route path="/snorkeling" element={<Snorkeling />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/agen" element={<AgentPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;