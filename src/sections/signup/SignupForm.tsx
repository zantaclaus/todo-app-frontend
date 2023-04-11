import { useForm } from 'react-hook-form';

import { FormProvider, RHFTextfield } from '@/components/hook-form';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
} from '@chakra-ui/react';

export default function SignupForm() {
  const defaultValues = {
    name: '',
    username: '',
    password: '',
  };

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: typeof defaultValues) => {};

  return (
    <>
      <Card padding={6} width={'28rem'} rounded={'2xl'}>
        <CardHeader>
          <Heading as="h2" color="teal.500">
            Sign Up
          </Heading>
        </CardHeader>

        <CardBody>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <RHFTextfield name="name" label="Name" />
              <RHFTextfield name="username" label="Username" />
              <RHFTextfield name="password" label="Password" type="password" />
            </Stack>
            <Button
              type="submit"
              isLoading={isSubmitting}
              mt={4}
              colorScheme="teal"
            >
              Sign Up
            </Button>
          </FormProvider>
        </CardBody>
      </Card>
    </>
  );
}
