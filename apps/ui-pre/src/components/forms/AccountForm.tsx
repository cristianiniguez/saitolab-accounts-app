import { FC } from 'react';
// components
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { Form, Formik, FormikConfig } from 'formik';
import { TextInput } from '../inputs';
// utils
import { addDoc, collection } from 'firebase/firestore';
import * as Yup from 'yup';
// hooks
import { useFirestore } from 'reactfire';
import useFormatMessage from '@/hooks/useFormatMessage';
import useAppToast from '@/hooks/useAppToast';
// HOCs
import withUser, { WithUserProps } from '@/hocs/withUser';

type AccountFormConfig = FormikConfig<{ name: string }>;

const AccountFormComponent: AccountFormConfig['component'] = ({ isSubmitting }) => {
  const t = useFormatMessage();

  return (
    <ModalContent as={Form}>
      <ModalHeader>{t('account.form.title')}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Stack spacing={4}>
          <TextInput id='name' label={t('account.form.name.label')} name='name' />
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button color='white' colorScheme='green' isLoading={isSubmitting} type='submit'>
          {t('account.form.submitButton.label')}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

type AccountFormProps = WithUserProps & {
  isOpen: boolean;
  onClose: () => void;
};

const AccountForm: FC<AccountFormProps> = ({ isOpen, onClose, user }) => {
  const t = useFormatMessage();
  const toast = useAppToast();
  const firestore = useFirestore();
  const accountsRef = collection(firestore, 'accounts');

  const getInitialValues = (): AccountFormConfig['initialValues'] => ({ name: '' });

  const getValidationSchema = (): AccountFormConfig['validationSchema'] =>
    Yup.object().shape({ name: Yup.string().required(t('account.form.name.error.required')) });

  const handleSubmit: AccountFormConfig['onSubmit'] = async (values, { setSubmitting }) => {
    try {
      const payload = { name: values.name, userId: user.uid };
      await addDoc(accountsRef, payload);
      setSubmitting(false);
      toast({
        description: t('account.form.toast.success.description', { name: values.name }),
        status: 'success',
      });
      onClose();
      // TODO: redirect to account page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        component={AccountFormComponent}
        initialValues={getInitialValues()}
        onSubmit={handleSubmit}
        validationSchema={getValidationSchema()}
      />
    </Modal>
  );
};

export default withUser(AccountForm);
