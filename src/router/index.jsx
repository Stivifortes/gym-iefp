import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Planos from '../pages/Planos';
import Inscricoes from '../pages/Inscricoes';
import Utilizadores from '../pages/Utilizadores';
import Dashboard from '../pages/Dashboard';
import RecuperaSenha from '../pages/RecuperaSenha';
import MenuLateral from '../components/MenuLateral';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/inscricoes" element={<Inscricoes />} />
          <Route path="/utilizadores" element={<Utilizadores />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recupera-senha" element={<RecuperaSenha />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
