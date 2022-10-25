import { collection } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useMoves = (account: Account) => {
  const firestore = useFirestore();
  const movesRef = collection(firestore, 'accounts', account.NO_ID_FIELD, 'moves');
  const { data, ...rest } = useFirestoreCollectionData(movesRef);
  return { data: data as Move[], ...rest };
};

export default useMoves;
