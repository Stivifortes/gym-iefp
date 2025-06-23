import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LogoutButton = ({ className = '', children = 'Logout' }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className={className} type="button">
      {children}
    </button>
  );
};

export default LogoutButton;
