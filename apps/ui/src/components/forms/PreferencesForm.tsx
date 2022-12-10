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
import { SelectInput, TextInput } from '../inputs';
// hooks
import useFormatMessage from '@/hooks/useFormatMessage';
// utils
import * as Yup from 'yup';
import { useIntl } from 'react-intl';

type PreferencesFormConfig = FormikConfig<{
  name: string;
  currency: string;
}>;

type PreferencesFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CURRENCIES = ['USD', 'BOB', 'EUR'];

const PreferencesForm: FC<PreferencesFormProps> = ({ isOpen, onClose }) => {
  const t = useFormatMessage();
  const { formatNumber } = useIntl();

  const getInitialValues = (): PreferencesFormConfig['initialValues'] => ({
    currency: '',
    name: '',
  });

  const getValidationSchema = (): PreferencesFormConfig['validationSchema'] =>
    Yup.object().shape({
      currency: Yup.string().required(t('preferences.form.currency.error.required')),
      name: Yup.string().required(t('preferences.form.name.error.required')),
    });

  const handleSubmit: PreferencesFormConfig['onSubmit'] = async (values) => {
    console.log(values);
  };

  const getCurrencyOptions = () => {
    const exampleValue = 123456;
    const getCurrencyOption = (currency: string) => {
      const example = formatNumber(exampleValue, {
        currency,
        currencyDisplay: 'narrowSymbol',
        style: 'currency',
      });
      const label = t('preferences.form.currency.option.label', { currency, example });
      return { label, value: currency };
    };
    return CURRENCIES.map(getCurrencyOption);
  };

  const renderForm: PreferencesFormConfig['component'] = ({ isSubmitting }) => {
    return (
      <Modal closeOnOverlayClick={!isSubmitting} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={Form}>
          <ModalHeader>{t('preferences.form.title')}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={4}>
              <TextInput id='name' label={t('preferences.form.name.label')} name='name' />
              <SelectInput
                id='currency'
                label={t('preferences.form.currency.label')}
                name='currency'
                options={getCurrencyOptions()}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button color='white' colorScheme='green' isLoading={isSubmitting} type='submit'>
              {t('preferences.form.submitButton.label')}
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

export default PreferencesForm;
