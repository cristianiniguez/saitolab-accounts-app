import { doc, DocumentReference } from 'firebase/firestore';
import { useFirestore, useFirestoreDocData } from 'reactfire';

const useAccount = (accountId: string) => {
  const firestore = useFirestore();
  const ref = doc(firestore, 'accounts', accountId) as DocumentReference<Account>;
  return useFirestoreDocData(ref, { idField: 'id' });
};

export default useAccount;
