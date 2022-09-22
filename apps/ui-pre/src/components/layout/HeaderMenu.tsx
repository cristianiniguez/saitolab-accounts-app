import { FC } from 'react';
// components
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';
import useSignOut from '@/hooks/useSignOut';
// HOCs
import withUser, { WithUserProps } from '@/hocs/withUser';

const HeaderMenu: FC<WithUserProps> = ({ user }) => {
  const signOut = useSignOut();
  const t = useFormatMessage();

  return (
    <Menu>
      <MenuButton as={Button} cursor='pointer' minW={0} rounded='full' variant='link'>
        <Avatar
          name={user.displayName || ''}
          referrerPolicy='no-referrer'
          size='sm'
          src={user.photoURL || ''}
        />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={signOut}>{t('common.sign.out')}</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default withUser(HeaderMenu);
