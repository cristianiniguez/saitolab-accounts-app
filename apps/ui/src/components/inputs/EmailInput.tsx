import { FC } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';

type EmailInputProps = {
  id?: string;
  label: string;
  name?: string;
};

const EmailInput: FC<EmailInputProps> = ({ id = 'email', label, name = 'email' }) => {
  const [field, meta] = useField(name);

  return (
    <FormControl id={id} isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} type='email' />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default EmailInput;
