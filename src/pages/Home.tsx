import { useEffect, useState } from 'react';

import { useAuth } from '@/auth/useAuth';
import { TodoType } from '@/types/todo';
import axios from '@/utils/axios';

import {
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
import { DeleteIcon } from '@chakra-ui/icons';

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

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) return;

    try {
      const { data: todo } = await axios.post('/api/todo', { title });

      setTodos((prev) => [...prev, todo]);
      setTitle('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = (id: string) => async () => {
    try {
      await axios.delete(`/api/todo/${id}`);

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
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

          <form onSubmit={handleAddTodo}>
            <InputGroup size="lg" width="24rem">
              <Input
                _focus={{ borderColor: 'teal.400' }}
                placeholder="Add a todo"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" type="submit">
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>

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
                      onClick={handleDeleteTodo(todo._id)}
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
