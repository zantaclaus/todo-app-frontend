import { Flex, Image, Spinner } from '@chakra-ui/react';

export default function LoadingScreen() {
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Spinner color="teal.400" size="xl" />
    </Flex>
  );
}
