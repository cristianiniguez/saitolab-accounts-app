import { User } from 'firebase/auth';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useAccounts = (user: User) => {
  const firestore = useFirestore();
  const accountsRef = collection(firestore, 'accounts');
  return useFirestoreCollectionData(query(accountsRef, where('userId', '==', user.uid)));
};

export default useAccounts;
