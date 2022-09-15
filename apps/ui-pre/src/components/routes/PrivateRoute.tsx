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
  const isCheckLoading = status === 'loading';

  const renderRoute = () => {
    if (isCheckLoading) return <SpinnerPage />;
    if (!data.signedIn) return <Navigate to={ROUTES.SIGN_IN} />;
    return <Outlet />;
  };

  return <Layout isPublic={isCheckLoading || !data}>{renderRoute()}</Layout>;
};

export default PublicRoute;
