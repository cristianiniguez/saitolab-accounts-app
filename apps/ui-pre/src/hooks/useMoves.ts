import { collection, CollectionReference } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useMoves = (account: Account) => {
  const firestore = useFirestore();
  const movesRef = collection(
    firestore,
    'accounts',
    account.id,
    'moves',
  ) as CollectionReference<Move>;
  return useFirestoreCollectionData(movesRef, { idField: 'id' });
};

export default useMoves;
