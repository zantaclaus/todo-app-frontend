import { Flex, HStack, Image } from '@chakra-ui/react';

import { SigninForm } from '@/sections/signin';

export default function Signin() {
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
        <SigninForm />
      </Flex>
    </HStack>
  );
}
