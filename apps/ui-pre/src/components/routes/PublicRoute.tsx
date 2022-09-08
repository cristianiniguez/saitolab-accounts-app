import { Navigate, Outlet } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

const PublicRoute = () => {
  const { data, status } = useSigninCheck();

  if (status === 'loading') return <p>Loading ...</p>; // TODO: create loader

  if (data && data.signedIn) return <Navigate to='/dashboard' />;

  return <Outlet />;
};

export default PublicRoute;
