import { useEffect, useState } from 'react';

export function useAuth() {
  const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${API_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setError('Não foi possível carregar o perfil');
        }
      })
      .catch(() => {
        setError('Erro ao conectar com o servidor');
      });
  }, [API_URL]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    error,
    logout,
  };
}

export default useAuth;
