interface Account {
  NO_ID_FIELD: string;
  name: string;
  userId: string;
}

type MoveType = 'income' | 'outcome';

interface Move {
  NO_ID_FIELD: string;
  detail: string;
  amount: number;
  date: string;
  type: MoveType;
}
