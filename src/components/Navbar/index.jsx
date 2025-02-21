import { Layout, Menu } from 'antd';
import {
  BarChartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import style from './Navbar.module.css';
import { Link } from 'react-router';
import Setting from '../Setting';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../features/authSlice';

const { Header } = Layout;

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const items = useMemo(() => {
    const res = [
      {
        icon: <BarChartOutlined />,
        title: t('Report'),
        label: t('Report'),
      },
      {
        icon: <SettingOutlined />,
        title: t('Setting'),
        label: t('Setting'),
        onClick: () => setIsOpenSetting(true),
      },
    ];

    if (user) {
      res.push({
        icon: <LogoutOutlined onClick={() => dispatch(signOut())} />,
        title: user.email.split('@')[0],
        label: (
          <span onClick={() => dispatch(signOut())}>
            {user.email.split('@')[0]}
          </span>
        ),
      });
    } else {
      res.push({
        icon: (
          <Link to={'/signIn'}>
            <UserOutlined />
          </Link>
        ),
        title: t('Sign In'),
        label: <Link to={'/signIn'}>{t('Sign In')}</Link>,
      });
    }

    return res;
  }, [user, t, dispatch]);

  console.log('Navbar');

  return (
    <>
      <Header className={style.header}>
        <div className={style.logo}>
          <Link to='/'>
            <img
              src='public/clocklogo.png'
              alt='logo'
              style={{ width: 20, height: 20 }}
            />
            <h1>Timefy</h1>
          </Link>
        </div>

        <Menu mode='horizontal' className={style.menu} items={items} />
      </Header>

      <Setting onClose={() => setIsOpenSetting(false)} isOpen={isOpenSetting} />
    </>
  );
};

export default Navbar;
