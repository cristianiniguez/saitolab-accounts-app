import { collection } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const DashboardPage = () => {
  const accountsRef = collection(useFirestore(), 'accounts');
  const { data, status } = useFirestoreCollectionData(accountsRef);

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
