import { User } from 'firebase/auth';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useAccounts = (user: User) => {
  const firestore = useFirestore();
  const accountsRef = collection(firestore, 'accounts');
  const { data, ...rest } = useFirestoreCollectionData(
    query(accountsRef, where('userId', '==', user.uid)),
    { idField: 'id' },
  );
  return { data: data as Account[], ...rest };
};

export default useAccounts;
