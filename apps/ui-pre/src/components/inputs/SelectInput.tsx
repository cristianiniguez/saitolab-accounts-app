import { FC } from 'react';
import { useField } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';

type SelectInputOption = {
  label: string;
  value: string | number;
};

type SelectInputProps = {
  id: string;
  label: string;
  name: string;
  options: SelectInputOption[];
  placeholder?: string;
};

const SelectInput: FC<SelectInputProps> = ({ id, label, name, options, placeholder }) => {
  const [field, meta] = useField(name);

  return (
    <FormControl id={id} isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>

      <Select {...field} placeholder={placeholder}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default SelectInput;
