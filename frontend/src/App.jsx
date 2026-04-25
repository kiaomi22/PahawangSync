import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import Homestay from './pages/Homestay';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/homestay" element={<Homestay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;