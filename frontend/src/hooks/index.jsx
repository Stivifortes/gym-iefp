import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`${API_URL}/usuario`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setIsAuthenticated(true);

          if (data.role === 'admin') {
            setIsAdmin(true);
          }
        });
    }
  }, [API_URL]);

  return {
    user,
    isAuthenticated,
    isAdmin,
  };
}
