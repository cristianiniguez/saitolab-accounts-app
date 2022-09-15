import { FC, ReactNode } from 'react';
import { useColorModeValue, VStack } from '@chakra-ui/react';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
  isPublic?: boolean;
};

const Layout: FC<LayoutProps> = ({ children, isPublic }) => (
  <VStack alignItems='stretch' bg={useColorModeValue('green.50', 'gray.800')} minH='100vh'>
    {!isPublic && <Header />}
    <VStack as='main' flexGrow={1}>
      {children}
    </VStack>
  </VStack>
);

export default Layout;
