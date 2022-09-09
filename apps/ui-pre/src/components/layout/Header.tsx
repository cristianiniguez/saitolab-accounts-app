import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import Favicon from '../icons/Favicon';
import { useUser } from 'reactfire';
import useSignOut from '../../hooks/useSignOut';
import useFormatMessage from '../../hooks/useFormatMessage';
import NavLink from '../link/NavLink';

const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data } = useUser();
  const signOut = useSignOut();
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
            <NavLink to='/dashboard'>{t('dashboard.pageTitle')}</NavLink>
            <NavLink to='/profile'>{t('profile.pageTitle')}</NavLink>
          </HStack>
        </HStack>
        <Flex alignItems='center'>
          <Menu>
            <MenuButton as={Button} cursor='pointer' minW={0} rounded='full' variant='link'>
              <Avatar name={data?.displayName || ''} size='sm' src={data?.photoURL || ''} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={signOut}>{t('common.sign.out')}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen && (
        <Box borderTop='2px' borderTopColor='green.200' display={{ md: 'none' }} pb={4}>
          <Stack as='nav' spacing={4}>
            <NavLink to='/dashboard'>{t('dashboard.pageTitle')}</NavLink>
            <NavLink to='/profile'>{t('profile.pageTitle')}</NavLink>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Header;
