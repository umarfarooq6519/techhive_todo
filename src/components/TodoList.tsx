import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircleOutlined from "@mui/icons-material/CircleOutlined";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { useMutation } from "@tanstack/react-query";
import { updateTaskCompletionMutationOptions } from "../options/todoOptions";

const TodoList = ({ tasks }: { tasks: any[] }) => {
  const { mutate: updateTaskCompletion } = useMutation(
    updateTaskCompletionMutationOptions()
  );

  const handleToggleCompletion = (
    taskId: number,
    currentCompleted: boolean
  ) => {
    updateTaskCompletion({
      taskId,
      completed: !currentCompleted,
    });
  };

  return (
    <List sx={{ width: "100%" }}>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemAvatar
            onClick={() => handleToggleCompletion(task.id, task.completed)}
            style={{ cursor: "pointer" }}
          >
            {task.completed ? (
              <CheckCircle color="primary" />
            ) : (
              <CircleOutlined />
            )}
          </ListItemAvatar>
          <ListItemText
            sx={{ textDecoration: task.completed ? "line-through" : "none" }}
            primary={task.title}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
