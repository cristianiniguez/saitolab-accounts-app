import { FC, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
// components
import { Box, ButtonGroup, Flex, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';
import Dialog from '../dialog/Dialog';
import AccountBalanceBadge from '../badges/AccountBalanceBadge';
// hooks
import { useFirestore } from 'reactfire';
import { useNavigate } from 'react-router-dom';
import useAppToast from '@/hooks/useAppToast';
import useFormatMessage from '@/hooks/useFormatMessage';
// constants
import { ROUTES } from '@/constants';

type AccountCardProps = {
  account: Account;
  onEdit: (account: Account) => void;
};

const AccountCard: FC<AccountCardProps> = ({ account, onEdit }) => {
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const toast = useAppToast();
  const t = useFormatMessage();
  const firestore = useFirestore();
  const accountRef = doc(firestore, 'accounts', account.id);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteDoc(accountRef);
      toast({
        description: t('account.card.toast.delete.success.description', { name: account.name }),
        status: 'success',
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box bgColor='white' borderRadius='md' boxShadow='md' p={4}>
      <Flex alignItems='center' gap={4} justifyContent='space-between'>
        <Heading as='h3' fontSize='md'>
          {account.name}
        </Heading>
        <Box flexGrow={1} textAlign='end'>
          <AccountBalanceBadge account={account} />
        </Box>
        <ButtonGroup isAttached>
          <IconButton
            aria-label={t('account.button.open.aria.label')}
            colorScheme='green'
            icon={<FaEye />}
            onClick={() => navigate(`${ROUTES.ACCOUNT}/${account.id}`)}
            size='sm'
          />
          <IconButton
            aria-label={t('account.button.edit.aria.label')}
            colorScheme='blue'
            icon={<FaPencilAlt />}
            onClick={() => onEdit(account)}
            size='sm'
          />
          <IconButton
            aria-label={t('account.button.delete.aria.label')}
            colorScheme='red'
            icon={<FaTrash />}
            onClick={onOpen}
            size='sm'
          />
        </ButtonGroup>
      </Flex>

      <Dialog
        body={t('account.card.dialog.body')}
        closeOnOverlayClick={!deleting}
        confirmButton={{
          isLoading: deleting,
          label: t('account.card.dialog.confirm.button.label'),
          onClick: handleDelete,
        }}
        header={t('account.card.dialog.title')}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default AccountCard;
