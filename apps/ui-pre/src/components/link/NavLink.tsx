import { Link as ChakraLink } from '@chakra-ui/react';
import { NavLink as RRDNavLink } from 'react-router-dom';
import { FC, ReactNode } from 'react';

type NavLinkProps = {
  children: ReactNode;
  to: string;
};

const NavLink: FC<NavLinkProps> = ({ children, to }) => {
  return (
    <ChakraLink
      _activeLink={{ fontWeight: 'bold' }}
      _hover={{ bg: 'green.200', textDecoration: 'none' }}
      as={RRDNavLink}
      px={2}
      py={1}
      rounded='md'
      to={to}
    >
      {children}
    </ChakraLink>
  );
};

export default NavLink;
