import { FC } from 'react';
// components
import { Box, ButtonGroup, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

type AccountCardProps = {
  account: Account;
};

const AccountCard: FC<AccountCardProps> = ({ account }) => {
  return (
    <Box bgColor='white' borderRadius='md' boxShadow='md' p={4}>
      <Flex alignItems='center' justifyContent='space-between'>
        <Heading as='h3' fontSize='md'>
          {account.name}
        </Heading>
        <ButtonGroup isAttached>
          <IconButton
            aria-label='Update account'
            colorScheme='blue'
            icon={<FaPencilAlt />}
            size='sm'
          />
          <IconButton aria-label='Delete account' colorScheme='red' icon={<FaTrash />} size='sm' />
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default AccountCard;
