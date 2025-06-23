import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Perfil from '../perfil/perfil';
import Planos from '../pages/Planos';
import Inscricoes from '../pages/Inscricoes';
import Utilizadores from '../pages/Utilizadores';
import Dashboard from '../pages/Dashboard';
import RecuperaSenha from '../pages/RecuperaSenha';
import { useAuth } from '../hooks/useAuth';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recupera-senha" element={<RecuperaSenha />} />

        {/* Protected Routes */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planos"
          element={
            <ProtectedRoute>
              <Planos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inscricoes"
          element={
            <ProtectedRoute>
              <Inscricoes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/utilizadores"
          element={
            <ProtectedRoute>
              <Utilizadores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
