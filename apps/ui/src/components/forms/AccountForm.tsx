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
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import * as Yup from 'yup';
// hooks
import { useFirestore } from 'reactfire';
import useFormatMessage from '@/hooks/useFormatMessage';
import useAppToast from '@/hooks/useAppToast';
// HOCs
import withUser, { WithUserProps } from '@/hocs/withUser';

type AccountFormConfig = FormikConfig<{ name: string }>;

type AccountFormProps = WithUserProps & {
  account?: Account;
  isOpen: boolean;
  onClose: () => void;
};

const AccountForm: FC<AccountFormProps> = ({ account, isOpen, onClose, user }) => {
  const t = useFormatMessage();
  const toast = useAppToast();
  const firestore = useFirestore();
  const accountsRef = collection(firestore, 'accounts');
  const accountRef = account && doc(firestore, 'accounts', account.id);

  const getInitialValues = (): AccountFormConfig['initialValues'] => ({
    name: account?.name || '',
  });

  const getValidationSchema = (): AccountFormConfig['validationSchema'] =>
    Yup.object().shape({ name: Yup.string().required(t('account.form.name.error.required')) });

  const handleSubmit: AccountFormConfig['onSubmit'] = async (
    values,
    { resetForm, setSubmitting },
  ) => {
    try {
      const payload = { name: values.name, userId: user.uid };
      accountRef // if no accountRef, the user is creating the account
        ? await setDoc(accountRef, { name: values.name }, { merge: true })
        : await addDoc(accountsRef, payload);
      toast({
        description: t('account.form.toast.success.description', { name: values.name }),
        status: 'success',
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        description: t('account.form.toast.error.description'),
        status: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderForm: AccountFormConfig['component'] = ({ isSubmitting }) => (
    <Modal closeOnOverlayClick={!isSubmitting} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
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
    </Modal>
  );

  return (
    <Formik
      component={renderForm}
      initialValues={getInitialValues()}
      key={account?.id}
      onSubmit={handleSubmit}
      validationSchema={getValidationSchema()}
    />
  );
};

export default withUser(AccountForm);
