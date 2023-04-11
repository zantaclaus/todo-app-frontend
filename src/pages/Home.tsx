import { useEffect, useState } from 'react';

import { useAuth } from '@/auth/useAuth';
import { TodoType } from '@/types/todo';
import axios from '@/utils/axios';

import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

export default function Home() {
  const { signOut } = useAuth();

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const fetchTodo = async () => {
      const { data } = await axios.get('/api/todo');

      setTodos(data);
    };

    fetchTodo();
  }, []);

  const handleAdd = async () => {
    if (!title) return;

    try {
      const { data: todo } = await axios.post('/api/todo', { title });

      setTodos((prev) => [...prev, todo]);
      setTitle('');
    } catch (error) {
      console.log(error);
    }

    // setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Card paddingX="16" paddingY="8" rounded="12">
        <Stack spacing="6" alignItems="center">
          <Heading as="h4" size="lg" textAlign="center">
            What's the Plan for Today?
          </Heading>

          <InputGroup size="lg" width="24rem">
            <Input
              placeholder="Add a todo"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleAdd}>
                Add
              </Button>
            </InputRightElement>
          </InputGroup>

          <Stack spacing={2} height="96" overflow="auto">
            {todos.map((todo) => (
              <Card
                key={todo.createdAt}
                width="28rem"
                padding="1rem"
                border="2px"
                borderColor="teal.400"
                rounded="lg"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text _groupHover={{ color: 'white' }}>{todo.title}</Text>

                  <HStack>
                    <IconButton
                      aria-label="delete-icons"
                      size="sm"
                      transition="all 0.2s ease-in-out"
                      _hover={{ bgColor: 'teal', color: 'white' }}
                      icon={<DeleteIcon />}
                    />
                  </HStack>
                </Flex>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Card>

      <Button onClick={signOut} colorScheme="teal" mt="4">
        logout
      </Button>
    </Flex>
  );
}
