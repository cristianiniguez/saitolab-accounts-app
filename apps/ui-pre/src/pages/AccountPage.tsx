// components
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import Page from '@/components/layout/Page';
import AccountBalanceBadge from '@/components/badges/AccountBalanceBadge';
import MovesSection from '@/components/sections/MovesSection';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';
import useAccount from '@/hooks/useAccount';
// constants
import { ROUTES } from '@/constants';

const AccountPage = () => {
  const { id: accountId = '' } = useParams();
  const { data: account, status } = useAccount(accountId);
  const t = useFormatMessage();

  const renderContent = () => {
    if (status === 'loading')
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
            <Flex alignItems='flex-end' justify='space-between' mb={4}>
              <Heading>{account.name}</Heading>
              <AccountBalanceBadge account={account} fontSize='2xl' />
            </Flex>
          </Container>
        </Box>

        <MovesSection account={account} />
      </>
    );
  };

  return <Page title={account?.name}>{renderContent()}</Page>;
};

export default AccountPage;
