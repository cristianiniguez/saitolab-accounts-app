import { FC } from 'react';
// components
import { Button, useDisclosure } from '@chakra-ui/react';
import Page from '@/components/layout/Page';
import AccountModal from '@/components/modals/AccountModal';
// HOCs
import withUser, { WithUserProps } from '@/hocs/withUser';

const DashboardPage: FC<WithUserProps> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Page title='Dashboard'>
      <Button onClick={onOpen}>Create Account</Button>

      <AccountModal isOpen={isOpen} onClose={onClose} />
    </Page>
  );
};

export default withUser(DashboardPage);
