import { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useColorModeValue, VStack } from '@chakra-ui/react';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout: FC<LayoutProps> = ({ children, title: pageTitle }) => {
  const { formatMessage } = useIntl();
  const appName = formatMessage({ id: 'common.app.name' });
  const titleToShow = pageTitle
    ? formatMessage({ id: 'common.app.title' }, { name: appName, pageTitle })
    : appName;

  return (
    <>
      <Helmet>
        <title>{titleToShow}</title>
      </Helmet>
      <VStack as='main' bg={useColorModeValue('green.50', 'gray.800')} minH='100vh'>
        {children}
      </VStack>
    </>
  );
};

export default Layout;
