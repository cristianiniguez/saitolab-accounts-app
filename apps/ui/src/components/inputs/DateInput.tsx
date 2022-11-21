import { FC } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';

type DateInputProps = {
  id: string;
  label: string;
  name: string;
};

const DateInput: FC<DateInputProps> = ({ id, label, name }) => {
  const [field, meta] = useField(name);

  return (
    <FormControl id={id} isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} type='date' />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default DateInput;
