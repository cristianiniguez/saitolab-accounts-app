import { signOut } from 'firebase/auth';
import { useAuth } from 'reactfire';

const useSignOut = () => {
  const auth = useAuth();
  return () => signOut(auth);
};

export default useSignOut;
