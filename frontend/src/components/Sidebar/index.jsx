import React, { useState } from 'react';
import HeaderLogo from '../../assets/HeaderLogo.png';
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import '../Sidebar/index.css';
import {
  FaHome,
  FaUser,
  FaUsers,
  FaThLarge,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const SideBarItem = ({ Icon, title, url, isCollapsed, isActive }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now() + Math.random(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className={`sidebar-item ${isActive ? 'active' : ''}`}>
      <Link
        to={url}
        onClick={createRipple}
        className="sidebar-link"
        data-tooltip={isCollapsed ? title : ''}
        title={isCollapsed ? title : ''}>
        <div className="sidebar-content">
          <span className="sidebar-icon">{Icon}</span>
          {!isCollapsed && <span className="sidebar-title">{title}</span>}
        </div>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </Link>
    </div>
  );
};
export default function Sidebar({
  isCollapsed: externalIsCollapsed,
  setIsCollapsed: externalSetIsCollapsed,
}) {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isCollapsed =
    externalIsCollapsed !== undefined
      ? externalIsCollapsed
      : internalIsCollapsed;
  const setIsCollapsed = externalSetIsCollapsed || setInternalIsCollapsed;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActiveRoute = (url) => {
    if (url === '/' && location.pathname === '/') return true;
    if (url === '/dashboard' && location.pathname === '/dashboard') return true;
    if (
      url !== '/' &&
      url !== '/dashboard' &&
      location.pathname.startsWith(url)
    )
      return true;
    return false;
  };

  const handleLogout = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';

    button.appendChild(ripple);

    setTimeout(() => {
      if (button.contains(ripple)) {
        button.removeChild(ripple);
      }
      logout();
      navigate('/login');
    }, 300);
  };

  return (
    <aside className={`container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="wrapper">
        <div className="header-section">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
          {!isCollapsed && <img src={HeaderLogo} width={100} alt="Logo" />}
        </div>
        <nav className="content">
          <ul className="sidebar-menu">
            <li>
              <SideBarItem
                Icon={<FaHome />}
                title="Home"
                url="/"
                isCollapsed={isCollapsed}
                isActive={isActiveRoute('/')}
              />
            </li>
            <li>
              <SideBarItem
                Icon={<FaUser />}
                title="Perfil"
                url="/dashboard/perfil"
                isCollapsed={isCollapsed}
                isActive={isActiveRoute('/dashboard/perfil')}
              />
            </li>
            <li>
              <SideBarItem
                Icon={<FaThLarge />}
                title="Plano"
                url="/dashboard/planos"
                isCollapsed={isCollapsed}
                isActive={isActiveRoute('/dashboard/planos')}
              />
            </li>
            {isAdmin && (
              <li>
                <SideBarItem
                  Icon={<MdOutlineLibraryBooks />}
                  title="Inscrições"
                  url="/dashboard/inscricoes"
                  isCollapsed={isCollapsed}
                  isActive={isActiveRoute('/dashboard/inscricoes')}
                />
              </li>
            )}

            {isAdmin && (
              <li>
                <SideBarItem
                  Icon={<FaUsers />}
                  title="Utilizadores"
                  url="/dashboard/utilizadores"
                  isCollapsed={isCollapsed}
                  isActive={isActiveRoute('/dashboard/utilizadores')}
                />
              </li>
            )}

            <li>
              <SideBarItem
                Icon={<FaThLarge />}
                title="Dashboard"
                url="/dashboard"
                isCollapsed={isCollapsed}
                isActive={isActiveRoute('/dashboard')}
              />
            </li>
          </ul>
        </nav>
      </div>

      <span className="btn">
        <button
          style={{ cursor: 'pointer' }}
          onClick={handleLogout}
          className="logout-btn"
          data-tooltip={isCollapsed ? 'Logout' : ''}
          title={isCollapsed ? 'Logout' : ''}>
          <div className="sidebar-item">
            <span className="sidebar-icon">
              <FaSignOutAlt />
            </span>
            {!isCollapsed && <span className="sidebar-title">Logout</span>}
          </div>
        </button>
      </span>
    </aside>
  );
}
