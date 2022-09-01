import { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { useColorModeValue, VStack } from '@chakra-ui/react';
import useFormatMessage from '../../hooks/useFormatMessage';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout: FC<LayoutProps> = ({ children, title: pageTitle }) => {
  const t = useFormatMessage();
  const appName = t('common.app.name');
  const titleToShow = pageTitle ? t('common.app.title', { name: appName, pageTitle }) : appName;

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
