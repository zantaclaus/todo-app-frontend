import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  HStack,
  Flex,
} from '@chakra-ui/react';

import { useAuth } from '@/auth/useAuth';
import { FormProvider, RHFTextfield } from '@/components/hook-form';
import { Link } from 'react-router-dom';

const defaultValues = {
  username: '',
  password: '',
};

const signinSchema = yup.object().shape({
  username: yup.string().min(3).max(30).required('Username is required'),
  password: yup.string().min(6).max(64).required('Password is required'),
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
    <Stack spacing={8}>
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

      <Flex justifyContent="center" gap="2">
        <Text>No account?</Text>
        <Text
          textDecor="underline"
          textColor="teal"
          _hover={{ textColor: 'teal.400' }}
        >
          <Link to="/signup">Sign up</Link>
        </Text>
      </Flex>
    </Stack>
  );
}
