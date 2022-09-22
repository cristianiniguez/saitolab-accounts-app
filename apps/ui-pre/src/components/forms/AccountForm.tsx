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
import * as Yup from 'yup';

type AccountFormConfig = FormikConfig<{ name: string }>;

const AccountFormComponent: AccountFormConfig['component'] = ({ isSubmitting }) => {
  return (
    <ModalContent as={Form}>
      <ModalHeader>New Account</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Stack spacing={4}>
          <TextInput id='name' label='Account name' name='name' />
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button color='white' colorScheme='green' isLoading={isSubmitting} type='submit'>
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

type AccountFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AccountForm: FC<AccountFormProps> = ({ isOpen, onClose }) => {
  const getInitialValues = (): AccountFormConfig['initialValues'] => ({ name: '' });

  const getValidationSchema = (): AccountFormConfig['validationSchema'] =>
    Yup.object().shape({ name: Yup.string().required() });

  const handleSubmit: AccountFormConfig['onSubmit'] = (values) => {
    console.log(values);
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

export default AccountForm;
