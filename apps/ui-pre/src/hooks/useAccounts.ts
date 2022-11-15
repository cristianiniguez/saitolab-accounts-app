import { User } from 'firebase/auth';
import { collection, CollectionReference, query, where } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useAccounts = (user: User) => {
  const firestore = useFirestore();
  const accountsRef = collection(firestore, 'accounts') as CollectionReference<Account>;
  return useFirestoreCollectionData(query(accountsRef, where('userId', '==', user.uid)), {
    idField: 'id',
  });
};

export default useAccounts;
