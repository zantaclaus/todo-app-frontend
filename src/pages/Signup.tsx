import SignupForm from '@/sections/signup/SignupForm';
import { Flex, HStack, Image } from '@chakra-ui/react';

export default function Signup() {
  return (
    <HStack height={{ base: '100vh' }} spacing={0}>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <SignupForm />
      </Flex>

      <Image
        src="https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="sigin-image"
        width={{ base: '100%', md: '50%' }}
        height={{ base: '100%' }}
        objectFit={{ base: 'cover' }}
        objectPosition={{ base: 'center' }}
      />
    </HStack>
  );
}
