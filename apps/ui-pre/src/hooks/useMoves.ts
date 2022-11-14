import { collection } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useMoves = (account: Account) => {
  const firestore = useFirestore();
  const movesRef = collection(firestore, 'accounts', account.id, 'moves');
  const { data, ...rest } = useFirestoreCollectionData(movesRef, { idField: 'id' });
  return { data: data as Move[], ...rest };
};

export default useMoves;
