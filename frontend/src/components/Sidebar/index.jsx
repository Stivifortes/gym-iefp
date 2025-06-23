import React from 'react';
import HeaderLogo from '../../assets/HeaderLogo.png';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import '../Sidebar/index.css';
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaThLarge,
  FaSignOutAlt,
} from 'react-icons/fa';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const SideBarItem = ({ Icon, title, url }) => {
  return (
    <div className="sidebar-item">
      <Link to={url}>
        {Icon} {title}
      </Link>
    </div>
  );
};
export default function Sidebar() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <aside className="container">
      <div className="wrapper">
        <img src={HeaderLogo} width={100} />
        <nav className="content">
          <ul className="sidebar-menu">
            <li>
              <SideBarItem Icon={<FaHome />} title="Home" url="/" />
            </li>
            <li>
              <SideBarItem
                Icon={<FaUser />}
                title="Perfil"
                url="/dashboard/perfil"
              />
            </li>
            {isAdmin ? (
              <li>
                <li>
                  <SideBarItem
                    Icon={<FaThLarge />}
                    title="Plano"
                    url="/dashboard/plano"
                  />
                </li>
              </li>
            ) : null}

            {isAdmin ? (
              <li>
                <SideBarItem
                  Icon={<MdOutlineLibraryBooks />}
                  title="Inscrições"
                  url="/dashboard/inscricoes"
                />
              </li>
            ) : null}

            {isAdmin ? (
              <li>
                <SideBarItem
                  Icon={<FaUsers />}
                  title="Utilizadores"
                  url="/dashboard/utilizadores"
                />
              </li>
            ) : null}

            <li>
              <SideBarItem
                Icon={<FaThLarge />}
                title="Dashboard"
                url="/dashboard"
              />
            </li>
          </ul>
        </nav>
      </div>

      <span className="btn">
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => {
            logout();
            navigate('/login');
          }}>
          <div className="sidebar-item">
            <FaSignOutAlt /> Logout
          </div>
        </button>
      </span>
    </aside>
  );
}
