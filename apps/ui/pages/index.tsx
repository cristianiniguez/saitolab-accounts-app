import { GetServerSideProps } from 'next';
import { Box, Button, Center, Heading, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

import Layout from 'components/others/Layout';
import { ROUTES } from 'constants/';
import { getTranslationsProps } from 'utils/others/intl';

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      ...(await getTranslationsProps(ctx)),
    },
  };
};

export default function Home() {
  const router = useRouter();
  const t = useTranslations();

  const goToSignInPage = () => router.push(ROUTES.SIGN_IN);
  const goToSignUpPage = () => router.push(ROUTES.SIGN_UP);

  return (
    <Layout>
      <Center h='100vh'>
        <Box>
          <Heading mb={8}>{t('home.title')}</Heading>
          <HStack justifyContent='center' spacing={8}>
            <Button onClick={goToSignInPage}>{t('common.signIn')}</Button>
            <Button onClick={goToSignUpPage}>{t('common.signUp')}</Button>
          </HStack>
        </Box>
      </Center>
    </Layout>
  );
}
