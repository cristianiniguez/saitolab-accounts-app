import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Stack, Heading, Text, Center } from '@chakra-ui/react';

import Layout from 'components/others/Layout';
import Favicon from 'components/others/Favicon';
import SignInForm from 'components/forms/SignInForm';
import { ROUTES } from 'constants/';
import { getTranslationsProps } from 'utils/others/intl';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);

  if (session?.user) {
    return {
      redirect: {
        destination: ROUTES.DASHBOARD,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await getTranslationsProps(ctx)),
    },
  };
};

const SignInPage = () => {
  const t = useTranslations();

  return (
    <Layout title={t('signIn.pageTitle')}>
      <Center flex={1}>
        <Stack maxW='lg' mx='auto' px={6} py={12} spacing={8}>
          <Favicon mx='auto' />
          <Stack align='center'>
            <Heading color='green.900' fontSize='4xl'>
              {t('signIn.title')}
            </Heading>
            <Text color={'gray.600'} fontSize='lg'>
              {t('signIn.subtitle')}
            </Text>
          </Stack>
          <SignInForm />
        </Stack>
      </Center>
    </Layout>
  );
};

export default SignInPage;
