import MenuLateral from '../MenuLateral';
import AppRoutes from '../../router';
import "../Layout/styles.css"
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div className='content'>
      <MenuLateral isLoggedIn={true} />
      <Outlet />
    </div>
  );
};

export default Layout;
