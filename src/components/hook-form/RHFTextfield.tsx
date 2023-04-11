import { useFormContext, Controller } from 'react-hook-form';

import {
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
        <>
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
            autoComplete="off"
          />
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </>
      )}
    />
  );
}
