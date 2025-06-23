import './topbar.css';
import { useAuth } from '../../hooks/useAuth';
export default function TopBar() {
  const { user } = useAuth();

  return (
    <div className="topbarContainer">
      <h1 className="pageTitle">Dashbord Admin</h1>
      <p className="userName">{user?.name ?? 'Sem nome'}</p>
    </div>
  );
}
