// components
import { Center, Heading, Stack, Text } from '@chakra-ui/react';
import Favicon from '../components/icons/Favicon';
import Layout from '../components/layout/Layout';
import SignUpForm from '../components/forms/SignUpForm';
// hooks
import useFormatMessage from '../hooks/useFormatMessage';

const SignUpPage = () => {
  const t = useFormatMessage();

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
