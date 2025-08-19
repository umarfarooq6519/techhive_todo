import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import TodoList from "../components/TodoList";
import {
  createTodoMutationOptions,
  getTodoQueryOptions,
  Task,
} from "../options/todoOptions";
import TodoForm from "../components/TodoForm";

export const Route = createFileRoute("/")({
  component: Home,
  notFoundComponent: () => (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  ),
});

function Home() {
  const [task, setTask] = useState("");

  const { data, isPending, isError, error } = useQuery(getTodoQueryOptions());

  const { mutate } = useMutation(createTodoMutationOptions());

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (task.trim()) {
      const temp = task;
      setTask("");

      const newTask: Task = {
        userId: 2,
        id: 3,
        title: temp,
        completed: false,
      };

      mutate(newTask);
      console.log(newTask);
    }
  };

  if (isError) {
    alert("Something went wrong while fetching tasks - " + error);
    return;
  }

  return (
    <Box
      component="section"
      bgcolor={"#eeee"}
      borderRadius={4}
      boxShadow={"lg"}
      sx={{ p: { xs: 2, md: 4 } }}
    >
      <Typography variant="h6">Your Tasks</Typography>

      <TodoForm handleSubmit={handleSubmit} task={task} setTask={setTask} />

      <Stack
        direction={"column"}
        alignItems={"center"}
        spacing={0}
        mt={3}
        divider={<Divider orientation="horizontal" />}
      >
        {isPending ? (
          <CircularProgress color="secondary" size={26} />
        ) : (
          <TodoList tasks={data} />
        )}
      </Stack>
    </Box>
  );
}
