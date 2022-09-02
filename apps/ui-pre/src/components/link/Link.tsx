import { FC } from 'react';
import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

type LinkProps = ChakraLinkProps & {
  href: RRDLinkProps['to'];
};

const Link: FC<LinkProps> = ({ children, href, ...chakraLinkProps }) => {
  return (
    <ChakraLink as={RRDLink} to={href} {...chakraLinkProps}>
      {children}
    </ChakraLink>
  );
};

export default Link;
