import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Box, Stack, Button, useColorModeValue, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { Form, Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';

import { EmailInput, PasswordInput } from 'components/inputs';
import Link from 'components/others/Link';
import * as C from 'constants/';
import { signInRequest } from 'utils/request/auth';
import { getErrorMessage } from 'utils/others/errors';

type SignInFormConfig = FormikConfig<{ email: string; password: string }>;

const SignInFormComponent: SignInFormConfig['component'] = ({ isSubmitting, status }) => {
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
    <Form id='sign-in-form'>
      <Box bg={useColorModeValue('white', 'gray.700')} boxShadow='lg' p={8} rounded='lg' w='md'>
        <Stack spacing={4}>
          <EmailInput label={t('signIn.form.email.label')} />
          <PasswordInput label='Password' />
          {status.error && (
            <Alert status='error'>
              <AlertIcon />
              {getFormErrorMessage(status.error)}
            </Alert>
          )}
          <Button color='white' colorScheme='green' isLoading={isSubmitting} type='submit'>
            {t('signIn.form.submitButton.label')}
          </Button>
          <Text align='center' id='sign-in-form-footer'>
            {t.rich('signIn.footer', {
              link: children => (
                <Link color='green' href={C.ROUTES.SIGN_UP}>
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

const SignInForm = () => {
  const router = useRouter();
  const t = useTranslations();

  const getInitialValues = (): SignInFormConfig['initialValues'] => {
    return {
      email: '',
      password: '',
    };
  };

  const getValidationSchema = (): SignInFormConfig['validationSchema'] => {
    return Yup.object().shape({
      email: Yup.string()
        .email(t('signIn.form.email.error.invalid'))
        .required(t('signIn.form.email.error.required')),
      password: Yup.string().required(t('signIn.form.password.error.required')),
    });
  };

  const handleSubmit: SignInFormConfig['onSubmit'] = async (
    values,
    { setStatus, setSubmitting },
  ) => {
    setStatus({ error: null });

    try {
      await signInRequest(values);
      router.push(C.ROUTES.DASHBOARD);
    } catch (e) {
      console.error(e);
      setStatus({ error: getErrorMessage(e) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      component={SignInFormComponent}
      initialStatus={{ error: null }}
      initialValues={getInitialValues()}
      onSubmit={handleSubmit}
      validationSchema={getValidationSchema()}
    />
  );
};

export default SignInForm;
