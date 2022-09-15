import { FC, ReactNode } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';

const AppServicesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const firebaseApp = useFirebaseApp();
  const authInstance = getAuth(firebaseApp);
  const firestoreInstance = getFirestore(firebaseApp);

  return (
    <AuthProvider sdk={authInstance}>
      <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
    </AuthProvider>
  );
};

export default AppServicesProvider;
