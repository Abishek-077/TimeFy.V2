import { Outlet } from 'react-router';
import style from './AuthLayout.module.css';

const AuthLayout = () => {
  return (
    <div className={style.layout}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
