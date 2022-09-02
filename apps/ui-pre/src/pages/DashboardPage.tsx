import { Button } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { useAuth } from 'reactfire';
import Layout from '../components/layout/Layout';
import useFormatMessage from '../hooks/useFormatMessage';

const DashboardPage = () => {
  const auth = useAuth();
  const t = useFormatMessage();

  return (
    <Layout title='Dashboard'>
      <Button onClick={() => signOut(auth)}>{t('common.sign.out')}</Button>
    </Layout>
  );
};

export default DashboardPage;
