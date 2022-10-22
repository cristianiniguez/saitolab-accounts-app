// components
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Icon,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { BiSearchAlt, BiWallet } from 'react-icons/bi';
import { AddIcon } from '@chakra-ui/icons';
import Page from '@/components/layout/Page';
import MoveForm from '@/components/forms/MoveForm';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';
import useAccount from '@/hooks/useAccount';
// constants
import { ROUTES } from '@/constants';

const AccountPage = () => {
  const { id: accountId = '' } = useParams();
  const { data: account, status } = useAccount(accountId);
  const t = useFormatMessage();
  const { isOpen, onClose, onOpen } = useDisclosure();

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

        <Box as='section'>
          <Container maxW='container.xl' py={4} textAlign='center'>
            <Icon as={BiWallet} boxSize={64} />
            <Heading mb={4}>{t('account.null.state.title')}</Heading>
            <Text fontSize='xl' mb={4}>
              {t('account.null.state.subtitle')}
            </Text>
            <Button colorScheme='green' leftIcon={<AddIcon />} onClick={onOpen}>
              {t('account.button.create.move.label')}
            </Button>
          </Container>
        </Box>
      </>
    );
  };

  return (
    <Page title={pageTitle}>
      {renderContent()}

      {account && <MoveForm account={account} isOpen={isOpen} onClose={onClose} />}
    </Page>
  );
};

export default AccountPage;
