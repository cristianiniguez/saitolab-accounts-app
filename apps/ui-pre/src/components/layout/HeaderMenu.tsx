import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useUser } from 'reactfire';
import useFormatMessage from '../../hooks/useFormatMessage';
import useSignOut from '../../hooks/useSignOut';

const HeaderMenu = () => {
  const { data } = useUser();
  const signOut = useSignOut();
  const t = useFormatMessage();

  return (
    <Menu>
      <MenuButton as={Button} cursor='pointer' minW={0} rounded='full' variant='link'>
        <Avatar name={data?.displayName || ''} size='sm' src={data?.photoURL || ''} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={signOut}>{t('common.sign.out')}</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HeaderMenu;
