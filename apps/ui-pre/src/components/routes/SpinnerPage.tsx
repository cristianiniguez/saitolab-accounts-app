import { Center, Spinner } from '@chakra-ui/react';
import Page from '../layout/Page';

const SpinnerPage = () => {
  return (
    <Page>
      <Center flexGrow={1}>
        <Spinner color='green' size='xl' thickness='4px' />
      </Center>
    </Page>
  );
};

export default SpinnerPage;
