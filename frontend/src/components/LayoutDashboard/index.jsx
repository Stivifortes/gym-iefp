import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Topbar from '../TopBar';
import './index.css';

function LayoutDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="layout-container">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`content-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Topbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayoutDashboard;
