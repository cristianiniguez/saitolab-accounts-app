import { useMemo } from 'react';
import useMoves from './useMoves';

const useAccountSummary = (account: Account) => {
  const { data: moves = [], error, status } = useMoves(account);

  const income = useMemo(
    () => moves.filter((move) => move.type === 'income').reduce((a, b) => a + b.amount, 0),
    [moves],
  );

  const outcome = useMemo(
    () => moves.filter((move) => move.type === 'outcome').reduce((a, b) => a + b.amount, 0),
    [moves],
  );

  const balance = income - outcome;
  const data = { balance, income, outcome };
  return { data, error, status };
};

export default useAccountSummary;
