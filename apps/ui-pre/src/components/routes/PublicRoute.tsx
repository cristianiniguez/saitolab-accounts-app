import { Navigate, Outlet } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';
import Layout from '../layout/Layout';
import SpinnerPage from './SpinnerPage';

const PublicRoute = () => {
  const { data, status } = useSigninCheck();

  const renderRoute = () => {
    if (status === 'loading') return <SpinnerPage />;
    if (data && data.signedIn) return <Navigate to='/dashboard' />;
    return <Outlet />;
  };

  return <Layout isPublic>{renderRoute()}</Layout>;
};

export default PublicRoute;
