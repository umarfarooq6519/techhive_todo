import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const TodoForm = ({ handleSubmit, task, setTask }) => {
  return (
    <Box component={"form"} method="POST" onSubmit={handleSubmit}>
      <Stack direction={"row"} spacing={2} mt={2}>
        <TextField
          value={task}
          onChange={(e) => setTask(e.target.value)}
          id="outlined-basic"
          label="Enter your task"
          variant="outlined"
          size="small"
        />

        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{ borderRadius: 4, boxShadow: "none" }}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default TodoForm;
