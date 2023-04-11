import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
} from '@chakra-ui/react';

import { useAuth } from '@/auth/useAuth';
import { FormProvider, RHFTextfield } from '@/components/hook-form';

const defaultValues = {
  name: '',
  username: '',
  password: '',
};

const signupSchema = yup.object().shape({
  name: yup.string().min(3).required('Name is required'),
  username: yup.string().min(3).required('Username is required'),
  password: yup.string().min(6).required('Password is required'),
});

export default function SignupForm() {
  const { signUp } = useAuth();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(signupSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    const { name, username, password } = data;

    signUp(name, username, password);
  };

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
