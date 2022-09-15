// components
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SpinnerPage from './SpinnerPage';
// hooks
import { useSigninCheck } from 'reactfire';
// constants
import { ROUTES } from '@/constants';

const PublicRoute = () => {
  const { data, status } = useSigninCheck();

  const renderRoute = () => {
    if (status === 'loading') return <SpinnerPage />;
    if (data && data.signedIn) return <Navigate to={ROUTES.DASHBOARD} />;
    return <Outlet />;
  };

  return <Layout isPublic>{renderRoute()}</Layout>;
};

export default PublicRoute;
