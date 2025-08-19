import { getTasks, createTask, updateTaskCompletion } from "../api/task.api";
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

export function updateTaskCompletionMutationOptions() {
  return {
    mutationFn: updateTaskCompletion,
    onMutate: async ({
      taskId,
      completed,
    }: {
      taskId: number;
      completed: boolean;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const prevTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old: any) => {
        const tasks = old as Task[];
        return tasks.map((task) =>
          task.id === taskId ? { ...task, completed } : task
        );
      });

      return prevTasks;
    },
    onError: (error: any, variables: any, context: any) => {
      // Rollback on error
      queryClient.setQueryData(["tasks"], context);
    },
    // Refetch to ensure server state is synchronized
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["tasks"] });
    // },
  };
}

export type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
