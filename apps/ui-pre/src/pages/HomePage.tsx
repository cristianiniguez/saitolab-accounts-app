import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
// components
import { Box, Button, Center, Heading, HStack } from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
// constants
import { ROUTES } from '../constants';

const HomePage = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const goToSignInPage = () => navigate(ROUTES.SIGN_IN);
  const goToSignUpPage = () => navigate(ROUTES.SIGN_UP);

  return (
    <Layout>
      <Center h='100vh'>
        <Box>
          <Heading mb={8}>{formatMessage({ id: 'home.title' })}</Heading>
          <HStack justifyContent='center' spacing={8}>
            <Button onClick={goToSignInPage}>{formatMessage({ id: 'common.sign.in' })}</Button>
            <Button onClick={goToSignUpPage}>{formatMessage({ id: 'common.sign.up' })}</Button>
          </HStack>
        </Box>
      </Center>
    </Layout>
  );
};

export default HomePage;
