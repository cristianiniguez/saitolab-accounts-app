import { FC, useMemo } from 'react';
// components
import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';

type MovesTableProps = {
  moves: Move[];
};

const MovesTable: FC<MovesTableProps> = ({ moves }) => {
  const t = useFormatMessage();

  const totalIncome = useMemo(
    () => moves.filter((move) => move.type === 'income').reduce((a, b) => a + b.amount, 0),
    [moves],
  );
  const totalOutcome = useMemo(
    () => moves.filter((move) => move.type === 'outcome').reduce((a, b) => a + b.amount, 0),
    [moves],
  );

  return (
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
              <Td isNumeric>{move.type === 'income' && move.amount}</Td>
              <Td isNumeric>{move.type === 'outcome' && move.amount}</Td>
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
  );
};

export default MovesTable;
