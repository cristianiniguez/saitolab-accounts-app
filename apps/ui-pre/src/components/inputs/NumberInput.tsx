import { FC } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as NumberInputChakra,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useField } from 'formik';

type NumberInputProps = {
  id: string;
  label: string;
  max?: number;
  min?: number;
  name: string;
  step?: number;
};

const NumberInput: FC<NumberInputProps> = ({ id, label, max, min, name, step }) => {
  const [field, meta] = useField(name);

  return (
    <FormControl id={id} isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>

      <NumberInputChakra>
        <NumberInputField {...field} max={max} min={min} step={step} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInputChakra>

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default NumberInput;
