import { Navigate, Outlet } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';
// components
import Layout from '../layout/Layout';
import SpinnerPage from './SpinnerPage';
// constants
import { ROUTES } from '../../constants';

const PublicRoute = () => {
  const { data, status } = useSigninCheck();
  const isCheckLoading = status === 'loading';

  const renderRoute = () => {
    if (isCheckLoading) return <SpinnerPage />;
    if (!data?.signedIn) return <Navigate to={ROUTES.SIGN_IN} />;
    return <Outlet />;
  };

  return <Layout isPublic={isCheckLoading}>{renderRoute()}</Layout>;
};

export default PublicRoute;
