import { Navigate, Outlet } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';
import Layout from '../layout/Layout';

const PublicRoute = () => {
  const { data, status } = useSigninCheck();

  const renderRoute = () => {
    if (status === 'loading') return <p>Loading ...</p>; // TODO: create loader
    if (data && data.signedIn) return <Navigate to='/dashboard' />;
    return <Outlet />;
  };

  return <Layout isPublic>{renderRoute()}</Layout>;
};

export default PublicRoute;
