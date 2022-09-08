import { Button } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { useAuth } from 'reactfire';
import Page from '../components/layout/Page';
import useFormatMessage from '../hooks/useFormatMessage';

const DashboardPage = () => {
  const auth = useAuth();
  const t = useFormatMessage();

  return (
    <Page title='Dashboard'>
      <Button onClick={() => signOut(auth)}>{t('common.sign.out')}</Button>
    </Page>
  );
};

export default DashboardPage;
