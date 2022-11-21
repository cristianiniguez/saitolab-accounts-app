// components
import { Center, Heading, Stack, Text } from '@chakra-ui/react';
import Favicon from '@/components/icons/Favicon';
import Page from '@/components/layout/Page';
import SignUpForm from '@/components/forms/SignUpForm';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';

const SignUpPage = () => {
  const t = useFormatMessage();

  return (
    <Page title={t('signUp.pageTitle')}>
      <Center flex={1} p={4}>
        <Stack maxW='lg' mx='auto' spacing={8}>
          <Favicon mx='auto' />
          <Stack align='center' textAlign='center'>
            <Heading color='green.900' fontSize={{ base: '2xl', md: '4xl' }}>
              {t('signUp.title')}
            </Heading>
            <Text color={'gray.600'} fontSize='lg'>
              {t('signUp.subtitle')}
            </Text>
          </Stack>
          <SignUpForm />
        </Stack>
      </Center>
    </Page>
  );
};

export default SignUpPage;
