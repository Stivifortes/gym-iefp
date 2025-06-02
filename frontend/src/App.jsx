import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Layout from './components/Layout';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Planos from './pages/Planos';
import Inscricoes from './pages/Inscricoes';
import Utilizadores from './pages/Utilizadores';
import Dashboard from './pages/Dashboard';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/inscricoes" element={<Inscricoes />} />
        <Route path="/utilizadores" element={<Utilizadores />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
