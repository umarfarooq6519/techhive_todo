import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "./api/tasks";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  notFoundComponent: () => (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  ),
});

function Home() {
  const queryClient = useQueryClient();
  const [task, setTask] = useState("");

  const query = useQuery({ queryKey: ["todos"], queryFn: getTasks });

  // const mutation = useMutation({
  //   mutationFn: (data: { title: string; description: string }) =>
  //     postTask(data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  // });

  return (
    <Box
      component="section"
      bgcolor={"#eeee"}
      borderRadius={4}
      boxShadow={"lg"}
      sx={{ p: { xs: 2, md: 4 } }}
    >
      <Typography variant="h3">TanStack Todo</Typography>

      <Stack direction={"row"} spacing={2} mt={2}>
        <TextField
          value={task}
          onChange={(e) => setTask(e.target.value)}
          id="outlined-basic"
          label="Enter your task"
          variant="outlined"
          size="small"
        />

        {/* <Button
          variant="contained"
          onClick={() => {
            if (task.trim()) {
              mutation.mutate({
                title: task,
                description: "Not provided", // You can make this dynamic if needed
              });
              setTask(""); // Clear the input field after adding the task
            }
          }}
        >
          Add
        </Button> */}
      </Stack>

      <Stack
        direction={"column"}
        spacing={1}
        mt={3}
        divider={<Divider orientation="horizontal" />}
      >
        <ul>
          {query.data?.map((todo) => (
            <li key={todo._id}>{todo.title}</li>
          ))}
        </ul>
      </Stack>
    </Box>
  );
}
