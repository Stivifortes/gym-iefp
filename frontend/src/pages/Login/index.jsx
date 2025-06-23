import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginUser } from '../../utils/api';
import logo from '../../assets/LoginLogo.png';
import './style.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="generalContainer">
        <div className="signUpContainer">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}>
            Verificando autenticação...
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await loginUser(formData.email, formData.password);

      login(data.user, data.token);

      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="generalContainer">
      <div className="signUpContainer">
        <div className="top">
          <img src={logo} className="logo" alt="Logo" />
          <h2 className="title">Login</h2>
          <p className="topText">Inicie sessão na sua conta</p>
        </div>{' '}
        <form className="formContainer" onSubmit={handleSubmit}>
          {error && (
            <div
              className="error-message"
              style={{
                color: '#dc3545',
                backgroundColor: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '4px',
                padding: '10px',
                marginBottom: '15px',
                fontSize: '14px',
              }}>
              {error}
            </div>
          )}
          <div className="inputGroup">
            <div className="inputField">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="inputField">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <label className="remember">
              <p>Lembrar-me</p>
              <input
                placeholder="Lembre-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </label>
          </div>
          <button type="submit" className="signUpButton" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Iniciar sessão'}
          </button>{' '}
          <p className="signInText">
            Você não tem conta?{' '}
            <Link to="/registro" className="signInLink">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
