import { collection } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData } from 'reactfire';

const DashboardPage = () => {
  const accountsRef = collection(useFirestore(), 'accounts');
  const { status, data } = useFirestoreCollectionData(accountsRef);

  if (status === 'loading') return <p>Loading ...</p>;

  return (
    <div>
      {data.map((doc, i) => (
        <p key={i}>{JSON.stringify(doc)}</p>
      ))}
    </div>
  );
};

export default DashboardPage;
