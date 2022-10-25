import { FC, useMemo } from 'react';
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BiWallet } from 'react-icons/bi';
import MoveForm from '../forms/MoveForm';
// hooks
import useMoves from '@/hooks/useMoves';
import useFormatMessage from '@/hooks/useFormatMessage';

type MovesTableProps = {
  account: Account;
};

const MovesTable: FC<MovesTableProps> = ({ account }) => {
  const { data: moves, status } = useMoves(account);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const t = useFormatMessage();

  const isLoading = status === 'loading';

  const totalIncome = useMemo(
    () => moves?.filter((move) => move.type === 'income')?.reduce((a, b) => a + b.amount, 0),
    [moves],
  );
  const totalOutcome = useMemo(
    () => moves?.filter((move) => move.type === 'outcome')?.reduce((a, b) => a + b.amount, 0),
    [moves],
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

            <TableContainer bgColor='white' borderRadius='md' boxShadow='md' p={4}>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>{t('moves.table.column.detail')}</Th>
                    <Th>{t('moves.table.column.date')}</Th>
                    <Th isNumeric>{t('moves.table.column.income')}</Th>
                    <Th isNumeric>{t('moves.table.column.outcome')}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {moves.map((move) => (
                    <Tr key={move.NO_ID_FIELD}>
                      <Td>{move.detail}</Td>
                      <Td>{move.date}</Td>
                      {move.type === 'income' ? (
                        <>
                          <Td isNumeric>{move.amount}</Td>
                          <Td isNumeric></Td>
                        </>
                      ) : (
                        <>
                          <Td isNumeric></Td>
                          <Td isNumeric>{move.amount}</Td>
                        </>
                      )}
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot fontWeight='bold'>
                  <Tr>
                    <Td></Td>
                    <Td></Td>
                    <Td isNumeric>{totalIncome}</Td>
                    <Td isNumeric>{totalOutcome}</Td>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
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

export default MovesTable;
