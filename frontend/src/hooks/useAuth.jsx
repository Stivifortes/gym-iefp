import { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    console.log('Checking auth status:', {
      hasToken: !!token,
      hasStoredUser: !!storedUser,
    });

    if (token) {
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('Setting user from localStorage:', parsedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          if (parsedUser.role === 'admin') {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error parsing stored user:', error);
        }
      }

      try {
        console.log('Verifying token with server...');
        const data = await getUserProfile();
        console.log('Profile data received:', data);

        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(data.user));

          if (data.user.role === 'admin') {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } else {
      console.log('No token found');
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }

    setLoading(false);
  };
  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    window.__authDebug = {
      user,
      isAuthenticated,
      loading,
      token: localStorage.getItem('token'),
      storedUser: localStorage.getItem('user'),
    };
  }, [user, isAuthenticated, loading]);

  const login = (userData, token) => {
    console.log('Login function called with:', { userData, token });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    if (userData.role === 'admin') {
      setIsAdmin(true);
    }
  };
  const logout = () => {
    console.log('Logout function called');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setLoading(false);
  };
  return {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    logout,
  };
}
