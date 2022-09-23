import { Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';

type AccountCardProps = {
  account: Account;
};

const AccountCard: FC<AccountCardProps> = ({ account }) => {
  return (
    <Box bgColor='white' borderRadius='md' boxShadow='md' p={4}>
      <Heading as='h3' fontSize='md'>
        {account.name}
      </Heading>
    </Box>
  );
};

export default AccountCard;
