import { FC } from 'react';
// components
import { Box, Container, Heading } from '@chakra-ui/react';
import Page from '@/components/layout/Page';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';
// HOCs
import withUser, { WithUserProps } from '@/hocs/withUser';
import AccountsSection from '@/components/sections/AccountsSection';

const DashboardPage: FC<WithUserProps> = ({ user }) => {
  const t = useFormatMessage();

  return (
    <Page title='Dashboard'>
      <Box as='section'>
        <Container maxW='container.xl' py={4}>
          <Heading mb={4}>{t('dashboard.title', { displayName: user.displayName })}</Heading>
        </Container>
      </Box>

      <AccountsSection />
    </Page>
  );
};

export default withUser(DashboardPage);
