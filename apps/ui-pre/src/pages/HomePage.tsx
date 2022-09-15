import { useNavigate } from 'react-router-dom';
// components
import { Box, Button, Center, Heading, HStack } from '@chakra-ui/react';
import Page from '@/components/layout/Page';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';
// constants
import { ROUTES } from '@/constants';

const HomePage = () => {
  const t = useFormatMessage();
  const navigate = useNavigate();

  const goToSignInPage = () => navigate(ROUTES.SIGN_IN);
  const goToSignUpPage = () => navigate(ROUTES.SIGN_UP);

  return (
    <Page>
      <Center h='100vh'>
        <Box>
          <Heading mb={8}>{t('home.title')}</Heading>
          <HStack justifyContent='center' spacing={8}>
            <Button onClick={goToSignInPage}>{t('common.sign.in')}</Button>
            <Button onClick={goToSignUpPage}>{t('common.sign.up')}</Button>
          </HStack>
        </Box>
      </Center>
    </Page>
  );
};

export default HomePage;
