import { FC, useEffect, useState } from 'react';
// components
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Page from '@/components/layout/Page';
import AccountForm from '@/components/forms/AccountForm';
import AccountCard from '@/components/cards/AccountCard';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';
import useAccounts from '@/hooks/useAccounts';
// HOCs
import withUser, { WithUserProps } from '@/hocs/withUser';

const DashboardPage: FC<WithUserProps> = ({ user }) => {
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const t = useFormatMessage();
  const { data: accounts, status } = useAccounts(user);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (account) onOpen();
  }, [account, onOpen]);

  useEffect(() => {
    if (!isOpen) setAccount(undefined);
  }, [isOpen]);

  const isLoading = status === 'loading';

  const renderNullState = () => (
    <Button onClick={onOpen}>{t('dashboard.button.create.account.label')}</Button>
  );

  const renderAccounts = () => (
    <Grid
      alignSelf='stretch'
      gap={4}
      gridTemplateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', sm: '1fr' }}
    >
      {accounts.map((account, i) => (
        <AccountCard account={account as Account} key={`account-${i}`} onEdit={setAccount} />
      ))}
    </Grid>
  );

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

    if (accounts.length === 0) return renderNullState();

    return (
      <>
        <Box as='section'>
          <Container maxW='container.xl' py={4}>
            <Heading mb={4}>{t('dashboard.title', { displayName: user.displayName })}</Heading>
          </Container>
        </Box>
        <Box as='section'>
          <Container maxW='container.xl' py={4}>
            <VStack alignItems='stretch' divider={<Divider />} spacing={4}>
              <Flex alignItems='flex-end' justifyContent='space-between'>
                <Heading fontSize='lg'>{t('dashboard.subtitle.accounts')}</Heading>
                <Button colorScheme='green' onClick={onOpen}>
                  {t('dashboard.button.create.account.label')}
                </Button>
              </Flex>
              {renderAccounts()}
            </VStack>
          </Container>
        </Box>
      </>
    );
  };

  return (
    <Page title='Dashboard'>
      {renderContent()}

      <AccountForm account={account} isOpen={isOpen} onClose={onClose} />
    </Page>
  );
};

export default withUser(DashboardPage);
