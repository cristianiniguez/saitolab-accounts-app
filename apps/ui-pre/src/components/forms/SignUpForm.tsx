import { useAuth } from 'reactfire';
import { FormattedMessage } from 'react-intl';
// components
import { Box, HStack, Stack, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { Form, Formik, FormikConfig } from 'formik';
import { EmailInput, PasswordInput, TextInput } from '@/components/inputs';
import Link from '@/components/link/Link';
// utils
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import * as Yup from 'yup';
// hooks
import { useNavigate } from 'react-router-dom';
import useFormatMessage from '@/hooks/useFormatMessage';
import useAppToast from '@/hooks/useAppToast';
// constants
import * as C from '@/constants';

type SignUpFormConfig = FormikConfig<{
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}>;

const SignUpFormComponent: SignUpFormConfig['component'] = ({ isSubmitting }) => {
  const t = useFormatMessage();

  return (
    <Form id='sign-up-form'>
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow='lg'
        p={8}
        rounded='lg'
        w={{ md: 'md' }}
      >
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
            <FormattedMessage
              id='signUp.form.footer'
              values={{
                login: (
                  <Link color='green' href={C.ROUTES.SIGN_IN}>
                    {t('signUp.form.footer.login')}
                  </Link>
                ),
              }}
            />
          </Text>
        </Stack>
      </Box>
    </Form>
  );
};

const SignUpForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const t = useFormatMessage();
  const toast = useAppToast();

  const handleSubmit: SignUpFormConfig['onSubmit'] = async (values, { setSubmitting }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(user, { displayName: `${values.firstName} ${values.lastName}` });
      toast({
        description: t('signUp.form.toast.success.description'),
        status: 'success',
        title: t('signUp.form.toast.success.title'),
      });
      navigate(C.ROUTES.DASHBOARD);
    } catch (e) {
      console.error(e);
      toast({
        description: t('signUp.form.toast.error.description'),
        status: 'error',
        title: t('signUp.form.toast.error.title'),
      }); // TODO: catch all error codes
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
