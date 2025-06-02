import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:3000/usuario', {
        method: 'GET',
        headers: {
          Authorization: 'Token ' + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setIsAuthenticated(true);


          if (data.role === 'admin') {
            setIsAdmin(true);
            console.log('Admin');
          } else {
            setIsAdmin(false);
            console.log('Usuário');
          }
          
        })
        .catch((error) => {
          console.log('Erro ao buscar usuário:', error);
          setIsAuthenticated(false);
        });
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isAdmin,

  };
    
}   
