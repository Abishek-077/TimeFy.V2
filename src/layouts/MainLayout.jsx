import style from './MainLayout.module.css';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className={style.layout}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
