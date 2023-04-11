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
  username: '',
  password: '',
};

const signinSchema = yup.object().shape({
  username: yup.string().min(3).required('Username is required'),
  password: yup.string().min(6).required('Password is required'),
});

export default function SigninForm() {
  const { signIn } = useAuth();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(signinSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: typeof defaultValues) => {
    const { username, password } = data;

    signIn(username, password);
  };

  return (
    <>
      <Card padding={6} width={'28rem'} rounded={'2xl'}>
        <CardHeader>
          <Heading as="h2" color="teal.500">
            Sign In
          </Heading>
        </CardHeader>
        <CardBody>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <RHFTextfield name="username" label="Username" />
              <RHFTextfield name="password" label="Password" type="password" />
            </Stack>
            <Button
              type="submit"
              isLoading={isSubmitting}
              mt={4}
              colorScheme="teal"
            >
              Sign In
            </Button>
          </FormProvider>
        </CardBody>
      </Card>
    </>
  );
}
