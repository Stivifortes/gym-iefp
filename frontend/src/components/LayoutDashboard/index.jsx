import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './index.css';

function LayoutDashboard() {
  return (
    <div className="layout-container">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default LayoutDashboard;
