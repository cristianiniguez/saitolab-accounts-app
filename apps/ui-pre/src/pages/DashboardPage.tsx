import { FC } from 'react';
// components
import { Button, Spinner, useDisclosure } from '@chakra-ui/react';
import Page from '@/components/layout/Page';
import AccountForm from '@/components/forms/AccountForm';
// hooks
import useAccounts from '@/hooks/useAccounts';
// HOCs
import withUser, { WithUserProps } from '@/hocs/withUser';

const DashboardPage: FC<WithUserProps> = ({ user }) => {
  const { data: accounts, status } = useAccounts(user);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const isLoading = status === 'loading';

  const renderNullState = () => <Button onClick={onOpen}>Create Account</Button>;

  const renderAccounts = () =>
    accounts.map((account, i) => <p key={`account-${i}`}>{account.name}</p>);

  const renderContent = () => {
    if (isLoading) return <Spinner color='green' />;
    if (accounts.length === 0) return renderNullState();
    return renderAccounts();
  };

  return (
    <Page title='Dashboard'>
      {renderContent()}
      <AccountForm isOpen={isOpen} onClose={onClose} />
    </Page>
  );
};

export default withUser(DashboardPage);
