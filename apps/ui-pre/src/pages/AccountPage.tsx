import Page from '@/components/layout/Page';
import useAccount from '@/hooks/useAccount';
import { Box, Button, Center, Container, Heading, Icon, Spinner, Text } from '@chakra-ui/react';
import { BiWallet } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';

const AccountPage = () => {
  const { id: accountId = '' } = useParams();
  const { data: account, status } = useAccount(accountId);

  const isLoading = status === 'loading';

  const renderContent = () => {
    if (isLoading)
      return (
        <Box as='section'>
          <Container maxW='container.xl' py={4}>
            <Center>
              <Spinner color='green' />
            </Center>
          </Container>
        </Box>
      );

    if (!account) {
      return (
        <Box as='section'>
          <Container maxW='container.xl' py={16} textAlign='center'>
            <Icon as={BiWallet} boxSize={64} />
            <Heading mb={4}>Account not found</Heading>
            <Text fontSize='xl' mb={4}>
              Seems that this account does't exists
            </Text>
            <Button as={Link} to='/dashboard'>
              Go to Dashboard
            </Button>
          </Container>
        </Box>
      );
    }

    return (
      <Box as='section'>
        <Container maxW='container.xl' py={4}>
          <Heading mb={4}>{account.name}</Heading>
        </Container>
      </Box>
    );
  };

  return <Page>{renderContent()}</Page>;
};

export default AccountPage;
