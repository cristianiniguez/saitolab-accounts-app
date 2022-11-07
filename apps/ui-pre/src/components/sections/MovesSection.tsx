import { FC } from 'react';
// components
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BiWallet } from 'react-icons/bi';
import MoveForm from '../forms/MoveForm';
// hooks
import useMoves from '@/hooks/useMoves';
import useFormatMessage from '@/hooks/useFormatMessage';
import MovesTable from '../tables/MovesTable';

type MovesSectionProps = {
  account: Account;
};

const MovesSection: FC<MovesSectionProps> = ({ account }) => {
  const { data: moves, status } = useMoves(account);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const t = useFormatMessage();

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

    if (moves.length === 0)
      return (
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
      );

    return (
      <Box as='section'>
        <Container maxW='container.xl' py={4} textAlign='center'>
          <VStack alignItems='stretch' divider={<Divider />} spacing={4}>
            <Flex alignItems='flex-end' justifyContent='space-between'>
              <Heading fontSize='lg'>{t('account.subtitle.moves')}</Heading>
              <Button colorScheme='green' leftIcon={<AddIcon />} onClick={onOpen}>
                {t('common.new')}
              </Button>
            </Flex>

            <MovesTable moves={moves} />
          </VStack>
        </Container>
      </Box>
    );
  };

  return (
    <>
      {renderContent()}

      <MoveForm account={account} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default MovesSection;
