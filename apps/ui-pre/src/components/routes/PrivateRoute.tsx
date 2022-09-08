import { Navigate, Outlet } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';
import Layout from '../layout/Layout';

const PublicRoute = () => {
  const { data, status } = useSigninCheck();
  const isCheckLoading = status === 'loading';

  const renderRoute = () => {
    if (isCheckLoading) return <p>Loading ...</p>; // TODO: create loader
    if (!data?.signedIn) return <Navigate to='/sign-in' />;
    return <Outlet />;
  };

  return <Layout isPublic={isCheckLoading}>{renderRoute()}</Layout>;
};

export default PublicRoute;
