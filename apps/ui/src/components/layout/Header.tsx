// components
import { Box, Flex, HStack, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import Favicon from '@/components/icons/Favicon';
import NavLink from '@/components/link/NavLink';
import HeaderMenu from './HeaderMenu';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';
// constants
import { ROUTES } from '@/constants';

const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const t = useFormatMessage();

  return (
    <Box as='header' borderBottom='2px' borderColor='green.200' boxShadow='sm' px={4}>
      <Flex alignItems='center' h={16} justifyContent='space-between'>
        <IconButton
          aria-label={t('open.menu')}
          bgColor='transparent'
          color='green.800'
          display={{ md: 'none' }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
          size='md'
        />

        <HStack alignItems='center' spacing={8}>
          <Favicon boxSize={8} />
          <HStack as='nav' display={{ base: 'none', md: 'flex' }} spacing={4}>
            <NavLink to={ROUTES.DASHBOARD}>{t('dashboard.pageTitle')}</NavLink>
            <NavLink to={ROUTES.PROFILE}>{t('profile.pageTitle')}</NavLink>
          </HStack>
        </HStack>

        <HeaderMenu />
      </Flex>

      {isOpen && (
        <Box borderTop='2px' borderTopColor='green.200' display={{ md: 'none' }} pb={4}>
          <Stack as='nav' spacing={4}>
            <NavLink to={ROUTES.DASHBOARD}>{t('dashboard.pageTitle')}</NavLink>
            <NavLink to={ROUTES.PROFILE}>{t('profile.pageTitle')}</NavLink>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Header;