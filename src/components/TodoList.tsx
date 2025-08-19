import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircleOutlined from "@mui/icons-material/CircleOutlined";
import CheckCircle from "@mui/icons-material/CheckCircle";

const TodoList = ({ tasks }: { tasks: any[] }) => {
  return (
    <List sx={{ width: "100%" }}>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemAvatar>
            {task.completed ? <CheckCircle /> : <CircleOutlined />}
          </ListItemAvatar>
          <ListItemText primary={task.title} secondary={task.id} />
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
