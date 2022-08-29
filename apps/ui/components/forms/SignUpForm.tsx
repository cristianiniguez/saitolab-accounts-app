import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import {
  Box,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Form, Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';

import { EmailInput, TextInput, PasswordInput } from 'components/inputs';
import Link from 'components/others/Link';
import { SignUpPayload } from 'types/api';
import { signInRequest, signUpRequest } from 'utils/request/auth';
import { getErrorMessage } from 'utils/others/errors';
import * as C from 'constants/';

type SignUpFormConfig = FormikConfig<SignUpPayload>;

const SignUpFormComponent: SignUpFormConfig['component'] = ({ isSubmitting, status }) => {
  const t = useTranslations();

  const getFormErrorMessage = (error: string) => {
    switch (error) {
      case C.INVALID_CREDENTIALS_ERROR:
        return t('common.error.invalidCredentials');
      case C.UNKNOWN_ERROR:
      default:
        return t('common.error.unknown');
    }
  };

  return (
    <Form id='sign-up-form'>
      <Box bg={useColorModeValue('white', 'gray.700')} boxShadow='lg' p={8} rounded='lg' w='md'>
        <Stack spacing={4}>
          <HStack alignItems='start'>
            <Box>
              <TextInput id='firstName' label={t('signUp.form.firstName.label')} name='firstName' />
            </Box>
            <Box>
              <TextInput id='lastName' label={t('signUp.form.lastName.label')} name='lastName' />
            </Box>
          </HStack>
          <EmailInput label={t('signUp.form.email.label')} />
          <PasswordInput label={t('signUp.form.password.label')} />
          {status.error && (
            <Alert status='error'>
              <AlertIcon />
              {getFormErrorMessage(status.error)}
            </Alert>
          )}
          <Button
            color='white'
            colorScheme='green'
            isLoading={isSubmitting}
            loadingText={t('signUp.form.submitButton.loading')}
            type='submit'
          >
            {t('signUp.form.submitButton.label')}
          </Button>
          <Text align='center' id='sign-up-form-footer'>
            {t.rich('signUp.form.footer', {
              link: children => (
                <Link color='green' href={C.ROUTES.SIGN_IN}>
                  {children}
                </Link>
              ),
            })}
          </Text>
        </Stack>
      </Box>
    </Form>
  );
};

const SignUpForm = () => {
  const router = useRouter();
  const t = useTranslations();

  const handleSubmit: SignUpFormConfig['onSubmit'] = async (
    values,
    { setStatus, setSubmitting },
  ) => {
    setStatus({ error: null });

    try {
      const { email } = await signUpRequest(values);
      await signInRequest({ email, password: values.password });
      router.push(C.ROUTES.DASHBOARD);
    } catch (e) {
      console.error(e);
      setStatus({ error: getErrorMessage(e) });
    } finally {
      setSubmitting(false);
    }
  };

  const getInitialValues = (): SignUpFormConfig['initialValues'] => {
    return { email: '', firstName: '', lastName: '', password: '' };
  };

  const getValidationSchema = (): SignUpFormConfig['validationSchema'] => {
    return Yup.object().shape({
      email: Yup.string()
        .email(t('signUp.form.email.error.invalid'))
        .required(t('signUp.form.email.error.required')),
      firstName: Yup.string().required(t('signUp.form.firstName.error.required')),
      lastName: Yup.string().required(t('signUp.form.lastName.error.required')),
      password: Yup.string().required(t('signUp.form.password.error.required')),
    });
  };

  return (
    <Formik
      component={SignUpFormComponent}
      initialStatus={{ error: null }}
      initialValues={getInitialValues()}
      onSubmit={handleSubmit}
      validationSchema={getValidationSchema()}
    />
  );
};

export default SignUpForm;
