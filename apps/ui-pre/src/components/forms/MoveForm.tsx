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
import { DateInput, NumberInput, SelectInput, TextInput } from '../inputs';
// utils
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import * as Yup from 'yup';
// hooks
import { useFirestore } from 'reactfire';
import useFormatMessage from '@/hooks/useFormatMessage';
import useAppToast from '@/hooks/useAppToast';

type MoveFormConfig = FormikConfig<{
  detail: string;
  amount: number;
  date: string;
  type: MoveType;
}>;

type MoveFormProps = {
  account: Account;
  isOpen: boolean;
  move?: Move;
  onClose: () => void;
};

const MoveForm: FC<MoveFormProps> = ({ account, isOpen, move, onClose }) => {
  const t = useFormatMessage();
  const toast = useAppToast();
  const firestore = useFirestore();
  const movesRef = collection(firestore, 'accounts', account.id, 'moves');
  const moveRef = move && doc(firestore, 'accounts', account.id, 'moves', move.id);

  const getInitialValues = (): MoveFormConfig['initialValues'] => ({
    amount: move?.amount || 0,
    date: move?.date || '2022-01-01',
    detail: move?.detail || '',
    type: move?.type || 'income',
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      amount: Yup.number()
        .moreThan(0, t('move.form.amount.error.greater.than.zero'))
        .required(t('move.form.amount.error.greater.than.zero')),
      date: Yup.string().required(t('move.form.date.error.required')),
      detail: Yup.string().required(t('move.form.detail.error.required')),
      type: Yup.string().required(t('move.form.type.error.required')),
    });

  const handleSubmit: MoveFormConfig['onSubmit'] = async (values, { resetForm, setSubmitting }) => {
    try {
      moveRef ? await setDoc(moveRef, values, { merge: true }) : await addDoc(movesRef, values);
      toast({
        description: t('move.form.toast.success.description'),
        status: 'success',
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        description: t('move.form.toast.error.description'),
        status: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderForm: MoveFormConfig['component'] = ({ isSubmitting }) => {
    const typeOptions = [
      { label: t('move.form.type.option.income.label'), value: 'income' },
      { label: t('move.form.type.option.outcome.label'), value: 'outcome' },
    ];

    return (
      <Modal closeOnOverlayClick={!isSubmitting} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={Form}>
          <ModalHeader>{t('move.form.title')}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={4}>
              <TextInput id='detail' label={t('move.form.detail.label')} name='detail' />
              <NumberInput id='amount' label={t('move.form.amount.label')} name='amount' />
              <DateInput id='date' label={t('move.form.date.label')} name='date' />
              <SelectInput
                id='type'
                label={t('move.form.type.label')}
                name='type'
                options={typeOptions}
              />
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
      key={move?.id}
      onSubmit={handleSubmit}
      validationSchema={getValidationSchema()}
    />
  );
};

export default MoveForm;
