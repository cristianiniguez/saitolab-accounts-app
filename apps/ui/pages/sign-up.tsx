import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Stack, Heading, Text, Center } from '@chakra-ui/react';

import Layout from 'components/others/Layout';
import Favicon from 'components/others/Favicon';
import SignUpForm from 'components/forms/SignUpForm';
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

const SignUpPage = () => {
  const t = useTranslations();

  return (
    <Layout title={t('signUp.pageTitle')}>
      <Center flex={1}>
        <Stack maxW='lg' mx='auto' px={6} py={12} spacing={8}>
          <Favicon mx='auto' />
          <Stack align='center'>
            <Heading color='green.900' fontSize='4xl' textAlign='center'>
              {t('signUp.title')}
            </Heading>
            <Text color={'gray.600'} fontSize='lg'>
              {t('signUp.subtitle')}
            </Text>
          </Stack>
          <SignUpForm />
        </Stack>
      </Center>
    </Layout>
  );
};

export default SignUpPage;
