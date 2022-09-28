import { doc } from 'firebase/firestore';
import { useFirestore, useFirestoreDocData } from 'reactfire';

const useAccount = (accountId: string) => {
  const firestore = useFirestore();
  const ref = doc(firestore, 'accounts', accountId);
  return useFirestoreDocData(ref);
};

export default useAccount;
