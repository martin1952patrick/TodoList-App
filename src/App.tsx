import {
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import TodoForm from "./components/todo-form";
import ThemeToggler from "./theme/theme-toggler";
import ListTodos from "./components/list-todo";
import { useState } from "react";
import CategoryMenu from "./components/category-menu";

export interface Todo {
  id: number;
  title: string;
  category: string;
  done: boolean;
}

function App() {
  const [current, setCurrrent] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
  };
  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo: { id: number; }) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const changeStatus = (id: number) => {
    const updatedTodos = todos.map((todo: { id: number;  title: string; category: string; done: any; }) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const getAllTodos = () => {
    if (current === "") {
      return todos;
    } else {
      const filteredTodos = todos.filter((todo: { category: any; }) => todo.category === current);
      if (search.length > 0) {
        return filteredTodos.filter((todo: { title: string; }) =>
          todo.title.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return filteredTodos;
      }
    }
  };
  return (
    <>
      <Flex w="100vw" h="100vh" justify="center">
        <Stack minW="400px" marginTop="2rem" p="2rem" h="fit-content" gap={8}>
          <Heading fontSize="5xl" textAlign="center">
            Todo App
            Update Your Chores and Track
          </Heading>
          <Flex gap={3}>
            <Input
              onChange={(e: { target: { value: any; }; }) => setSearch(e.target.value)}
              placeholder="Search"
              bg={useColorModeValue("gray.200", "gray.700")}
            />
            <CategoryMenu current={current} setCurrent={setCurrrent} />
          </Flex>

          <TodoForm length={todos.length} addTodo={addTodo} />
          <ListTodos
            todos={getAllTodos()}
            deleteTodo={deleteTodo}
            changeStatus={changeStatus}
          />
        </Stack>
      </Flex>
      <ThemeToggler />
    </>
  );
}

export default App;
