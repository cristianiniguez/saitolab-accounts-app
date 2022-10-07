import { FC, ReactNode, useRef } from 'react';
// components
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

type DialogProps = {
  body: ReactNode;
  cancelButton?: {
    label: string;
  };
  confirmButton: {
    isLoading: boolean;
    label: string;
    onClick: () => void;
  };
  header: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Dialog: FC<DialogProps> = ({
  body,
  cancelButton = { label: 'Cancel' },
  confirmButton,
  header,
  isOpen,
  onClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {header}
          </AlertDialogHeader>
          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose} ref={cancelRef}>
              {cancelButton.label}
            </Button>

            <Button
              colorScheme='red'
              isLoading={confirmButton.isLoading}
              ml={3}
              onClick={confirmButton.onClick}
            >
              {confirmButton.label}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Dialog;
