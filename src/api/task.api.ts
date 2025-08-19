import { Task } from "../options/todoOptions";

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  return await res.json();
};

export const createTask = async (newPost: Task) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  return res.json();
};

export const updateTaskCompletion = async ({
  taskId,
  completed,
}: {
  taskId: number;
  completed: boolean;
}) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${taskId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update task completion");
  }

  return res.json();
};
