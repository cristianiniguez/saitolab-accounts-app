import { FC } from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import Page from '@/components/layout/Page';
import useFormatMessage from '@/hooks/useFormatMessage';
import withUser, { WithUserProps } from '@/hocs/withUser';

const ProfilePage: FC<WithUserProps> = ({ user }) => {
  const t = useFormatMessage();

  return (
    <Page title={t('profile.pageTitle')}>
      <Box as='section'>
        <Container maxW='container.xl' py={4}>
          <Heading mb={4}>{t('dashboard.title', { displayName: user.displayName })}</Heading>
        </Container>
      </Box>
    </Page>
  );
};

export default withUser(ProfilePage);
