// components
import { Center, Heading, Stack, Text } from '@chakra-ui/react';
import Favicon from '../components/icons/Favicon';
import Layout from '../components/layout/Layout';
import SignInForm from '../components/forms/SignInForm';
// hooks
import useFormatMessage from '../hooks/useFormatMessage';

const SignInPage = () => {
  const t = useFormatMessage();
  return (
    <Layout title={t('signIn.pageTitle')}>
      <Center flex={1}>
        <Stack maxW='lg' mx='auto' px={6} py={12} spacing={8}>
          <Favicon mx='auto' />
          <Stack align='center'>
            <Heading color='green.900' fontSize='4xl'>
              {t('signIn.title')}
            </Heading>
            <Text color='gray.600' fontSize='lg'>
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
