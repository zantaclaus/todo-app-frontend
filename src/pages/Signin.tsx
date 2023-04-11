import { useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';

import { FormProvider, RHFTextfield } from '@/components/hook-form';

export default function Signin() {
  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = (data: typeof defaultValues) => {};

  return (
    <HStack height={{ base: '100vh' }} spacing={0}>
      <Image
        src="https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="sigin-image"
        width={{ base: '100%', md: '50%' }}
        height={{ base: '100%' }}
        objectFit={{ base: 'cover' }}
        objectPosition={{ base: 'center' }}
      />

      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
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
                <RHFTextfield
                  name="password"
                  label="Password"
                  type="password"
                />
              </Stack>
              <Button
                type="submit"
                isLoading={isSubmitting}
                mt={4}
                colorScheme="teal"
              >
                Submit
              </Button>
            </FormProvider>
          </CardBody>
        </Card>
      </Flex>
    </HStack>
  );
}
