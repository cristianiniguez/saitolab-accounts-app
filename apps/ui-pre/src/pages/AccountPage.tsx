// components
import { Box, Button, Center, Container, Heading, Icon, Spinner, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import Page from '@/components/layout/Page';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';
import useAccount from '@/hooks/useAccount';
// constants
import { ROUTES } from '@/constants';
import MovesTable from '@/components/tables/MovesTable';

const AccountPage = () => {
  const { id: accountId = '' } = useParams();
  const { data: account, status } = useAccount(accountId);
  const t = useFormatMessage();

  const isLoading = status === 'loading';
  const pageTitle = account && account.name;

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
            <Icon as={BiSearchAlt} boxSize={64} />
            <Heading mb={4}>{t('account.not.found.title')}</Heading>
            <Text fontSize='xl' mb={4}>
              {t('account.not.found.subtitle')}
            </Text>
            <Button as={Link} colorScheme='green' to={ROUTES.DASHBOARD}>
              {t('account.not.found.cta')}
            </Button>
          </Container>
        </Box>
      );
    }

    return (
      <>
        <Box as='section'>
          <Container maxW='container.xl' py={4}>
            <Heading mb={4}>{account.name}</Heading>
          </Container>
        </Box>

        <MovesTable account={account} />
      </>
    );
  };

  return <Page title={pageTitle}>{renderContent()}</Page>;
};

export default AccountPage;
