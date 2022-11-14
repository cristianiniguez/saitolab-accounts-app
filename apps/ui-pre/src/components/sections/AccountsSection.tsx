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
  Icon,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BiWallet } from 'react-icons/bi';
import AccountCard from '../cards/AccountCard';
import AccountForm from '../forms/AccountForm';
// hooks
import useAccounts from '@/hooks/useAccounts';
import useFormatMessage from '@/hooks/useFormatMessage';
// HOCs
import withUser, { WithUserProps } from '@/hocs/withUser';

const AccountsSection: FC<WithUserProps> = ({ user }) => {
  const t = useFormatMessage();
  const { data: accounts, status } = useAccounts(user);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [formAccount, setFormAccount] = useState<Account | undefined>(undefined);

  useEffect(() => {
    if (formAccount) onOpen();
  }, [formAccount, onOpen]);

  useEffect(() => {
    if (!isOpen) setFormAccount(undefined);
  }, [isOpen]);

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

  if (accounts.length === 0)
    return (
      <Box as='section'>
        <Container maxW='container.xl' py={16} textAlign='center'>
          <Icon as={BiWallet} boxSize={64} />
          <Heading mb={4}>{t('dashboard.null.state.title')}</Heading>
          <Text fontSize='xl' mb={4}>
            {t('dashboard.null.state.subtitle')}
          </Text>
          <Button colorScheme='green' leftIcon={<AddIcon />} onClick={onOpen}>
            {t('dashboard.button.create.account.label')}
          </Button>
        </Container>
      </Box>
    );

  return (
    <>
      <Box as='section'>
        <Container maxW='container.xl' py={4}>
          <VStack alignItems='stretch' divider={<Divider />} spacing={4}>
            <Flex alignItems='flex-end' justifyContent='space-between'>
              <Heading fontSize='lg'>{t('dashboard.subtitle.accounts')}</Heading>
              <Button colorScheme='green' leftIcon={<AddIcon />} onClick={onOpen}>
                {t('dashboard.button.new.label')}
              </Button>
            </Flex>
            <Grid
              alignSelf='stretch'
              gap={4}
              gridTemplateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', sm: '1fr' }}
            >
              {accounts.map((account) => (
                <AccountCard
                  account={account}
                  key={`account-${account.NO_ID_FIELD}`}
                  onEdit={setFormAccount}
                />
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>

      <AccountForm account={formAccount} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default withUser(AccountsSection);
