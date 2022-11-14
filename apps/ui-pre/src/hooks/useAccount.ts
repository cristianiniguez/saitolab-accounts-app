import { doc } from 'firebase/firestore';
import { useFirestore, useFirestoreDocData } from 'reactfire';

const useAccount = (accountId: string) => {
  const firestore = useFirestore();
  const ref = doc(firestore, 'accounts', accountId);
  const { data, ...rest } = useFirestoreDocData(ref, { idField: 'id' });
  return { data: data as Account, ...rest };
};

export default useAccount;
