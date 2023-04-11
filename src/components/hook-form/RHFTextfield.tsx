import { useFormContext, Controller } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';

type Props = InputProps & { label: string; name: string };

export default function RHFTextfield({ label, name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
            {...field}
            {...other}
            id={name}
            value={
              typeof field.value === 'number' && field.value === 0
                ? ''
                : field.value
            }
            _focus={{ borderColor: 'teal.400' }}
            autoComplete="off"
          />
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
