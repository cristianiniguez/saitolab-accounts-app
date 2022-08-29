import { FC } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

type LinkProps = ChakraLinkProps & {
  href: NextLinkProps['href'];
};

const Link: FC<LinkProps> = ({ children, href, ...chakraLinkProps }) => {
  return (
    <NextLink href={href}>
      <ChakraLink {...chakraLinkProps}>{children}</ChakraLink>
    </NextLink>
  );
};

export default Link;
