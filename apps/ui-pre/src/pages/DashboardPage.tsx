import { FC } from 'react';
// components
import { Text } from '@chakra-ui/react';
import Page from '@/components/layout/Page';
// HOCs
import withUser, { WithUserProps } from '@/hocs/withUser';

const DashboardPage: FC<WithUserProps> = ({ user }) => (
  <Page title='Dashboard'>
    <Text>Welcome {user.displayName}</Text>
  </Page>
);

export default withUser(DashboardPage);
