import './topbar.css';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

export default function TopBar() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  // Map routes to page titles
  const getPageTitle = () => {
    const routeTitles = {
      '/dashboard': isAdmin ? 'Dashboard Admin' : 'Dashboard',
      '/dashboard/perfil': 'Perfil',
      '/dashboard/planos': 'Planos',
      '/dashboard/inscricoes': 'Inscrições',
      '/dashboard/utilizadores': 'Utilizadores',
    };

    return routeTitles[location.pathname] || 'Dashboard Admin';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getDefaultAvatar = () => {
    // Default avatar as a simple SVG in base64
    const svg = `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#195DF4"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">
          ${getInitials(user?.name)}
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return (
    <div className="topbarContainer">
      <h1 className="pageTitle">{getPageTitle()}</h1>
      <div className="userInfo">
        <p className="userName">{user?.name ?? 'Sem nome'}</p>
        <div className="userAvatar">
          <img 
            src={user?.avatar || getDefaultAvatar()} 
            alt={`${user?.name || 'User'} Avatar`}
            className="avatarImage"
            onError={(e) => {
              e.target.src = getDefaultAvatar();
            }}
          />
        </div>
      </div>
    </div>
  );
}
