import { FC } from 'react';
// components
import { Form, Formik, FormikConfig } from 'formik';
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
import { TextInput } from '../inputs';
// utils
import * as Yup from 'yup';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';

type MoveFormConfig = FormikConfig<{
  detail: string;
  amount: number;
  date: string;
  type: MoveType;
}>;

type MoveFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MoveForm: FC<MoveFormProps> = ({ isOpen, onClose }) => {
  const t = useFormatMessage();

  const getInitialValues = (): MoveFormConfig['initialValues'] => ({
    amount: 0,
    date: '01-01-2022',
    detail: '',
    type: 'income',
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      amount: Yup.number().moreThan(0, 'The amount should be greater than 0'),
      date: Yup.string().required(),
      detail: Yup.string().required(t('move.form.detail.error.required')),
      type: Yup.string().required(),
    });

  const handleSubmit: MoveFormConfig['onSubmit'] = (values) => {
    console.log(values);
  };

  const renderForm: MoveFormConfig['component'] = ({ isSubmitting }) => {
    return (
      <Modal closeOnOverlayClick={!isSubmitting} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={Form}>
          <ModalHeader>{t('move.form.title')}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={4}>
              <TextInput id='detail' label={t('move.form.detail.label')} name='detail' />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button color='white' colorScheme='green' isLoading={isSubmitting} type='submit'>
              {t('move.form.submitButton.label')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Formik
      component={renderForm}
      initialValues={getInitialValues()}
      onSubmit={handleSubmit}
      validationSchema={getValidationSchema()}
    />
  );
};

export default MoveForm;
