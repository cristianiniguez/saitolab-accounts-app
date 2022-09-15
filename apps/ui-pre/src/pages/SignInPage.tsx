// components
import { Center, Heading, Stack, Text } from '@chakra-ui/react';
import Page from '@/components/layout/Page';
import Favicon from '@/components/icons/Favicon';
import SignInForm from '@/components/forms/SignInForm';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';

const SignInPage = () => {
  const t = useFormatMessage();
  return (
    <Page title={t('signIn.pageTitle')}>
      <Center flex={1} p={4}>
        <Stack maxW='lg' mx='auto' spacing={8}>
          <Favicon mx='auto' />
          <Stack align='center' textAlign='center'>
            <Heading color='green.900' fontSize={{ base: '2xl', md: '4xl' }}>
              {t('signIn.title')}
            </Heading>
            <Text color='gray.600' fontSize='lg'>
              {t('signIn.subtitle')}
            </Text>
          </Stack>
          <SignInForm />
        </Stack>
      </Center>
    </Page>
  );
};

export default SignInPage;
