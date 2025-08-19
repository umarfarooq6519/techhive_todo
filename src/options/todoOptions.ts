import { queryClient } from "../routes/__root";

export function getTodoQueryOptions() {
  return {
    queryKey: ["tasks"],
    queryFn: getTasks,
  };
}

export function createTodoMutationOptions() {
  return {
    mutationFn: createTask,
    onMutate: async (newTask: Task) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const prevPosts = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old: any) => [
        ...(old as Task[]),
        newTask,
      ]);

      return prevPosts;
    },
  };
}

const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  return await res.json();
};

const createTask = async (newPost: Task) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  return res.json();
};

export type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
