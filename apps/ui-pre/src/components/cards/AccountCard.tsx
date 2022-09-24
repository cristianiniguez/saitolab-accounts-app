import { FC, useRef, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
// components
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// hooks
import { useFirestore } from 'reactfire';
import useAppToast from '@/hooks/useAppToast';
import useFormatMessage from '@/hooks/useFormatMessage';

type AccountCardProps = {
  account: Account;
  onEdit: (account: Account) => void;
};

const AccountCard: FC<AccountCardProps> = ({ account, onEdit }) => {
  const [deleting, setDeleting] = useState(false);
  const toast = useAppToast();
  const t = useFormatMessage();
  const firestore = useFirestore();
  const accountRef = doc(firestore, 'accounts', account.NO_ID_FIELD);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

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
      <Flex alignItems='center' justifyContent='space-between'>
        <Heading as='h3' fontSize='md'>
          {account.name}
        </Heading>
        <ButtonGroup isAttached>
          <IconButton
            aria-label='Update account'
            colorScheme='blue'
            icon={<FaPencilAlt />}
            onClick={() => onEdit(account)}
            size='sm'
          />
          <IconButton
            aria-label='Delete account'
            colorScheme='red'
            icon={<FaTrash />}
            onClick={onOpen}
            size='sm'
          />
        </ButtonGroup>
      </Flex>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {t('account.card.dialog.title')}
            </AlertDialogHeader>

            <AlertDialogBody>{t('account.card.dialog.body')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                {t('account.card.dialog.cancel.button.label')}
              </Button>
              <Button colorScheme='red' isLoading={deleting} ml={3} onClick={handleDelete}>
                {t('account.card.dialog.confirm.button.label')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AccountCard;
