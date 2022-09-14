import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import Page from '../components/layout/Page';
import withUser, { WithUserProps } from '../hocs/withUser';

const DashboardPage: FC<WithUserProps> = ({ user }) => {
  return (
    <Page title='Dashboard'>
      <Text>Welcome {user.displayName}</Text>
    </Page>
  );
};

export default withUser(DashboardPage);
