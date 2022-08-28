import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Button } from '@chakra-ui/react';

import { ROUTES } from 'constants/';
import Layout from 'components/others/Layout';
import { getTranslationsProps } from 'utils/others/intl';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: ROUTES.SIGN_IN,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await getTranslationsProps(ctx)),
      session,
    },
  };
};

const DashboardPage = () => {
  const t = useTranslations();

  return (
    <Layout title='Dashboard'>
      <Button onClick={() => signOut()}>{t('common.signOut')}</Button>
    </Layout>
  );
};

export default DashboardPage;
