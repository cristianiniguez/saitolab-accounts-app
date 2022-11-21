import { FC } from 'react';
import { Badge, BadgeProps } from '@chakra-ui/react';
import useAccountSummary from '@/hooks/useAccountSummary';

type AccountBalanceBadgeProps = BadgeProps & { account: Account };

const AccountBalanceBadge: FC<AccountBalanceBadgeProps> = ({ account, ...badgeProps }) => {
  const {
    data: { balance },
    status,
  } = useAccountSummary(account);

  if (status === 'loading') return null;

  return (
    <Badge colorScheme={balance > 0 ? 'green' : 'red'} fontSize='1em' {...badgeProps}>
      {balance}
    </Badge>
  );
};

export default AccountBalanceBadge;
