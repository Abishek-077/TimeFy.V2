import { Navigate, Outlet, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useSelector } from 'react-redux';

const GuestOnlyRoute = ({ isSignedIn, redirect = '/' }) => {
  if (isSignedIn) {
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
};

const AppRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<GuestOnlyRoute isSignedIn={!!user} redirect={'/'} />}>
        <Route element={<AuthLayout />}>
          <Route element={<SignIn />} path={'/signin'} />
          <Route element={<SignUp />} path={'/signup'} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoute;