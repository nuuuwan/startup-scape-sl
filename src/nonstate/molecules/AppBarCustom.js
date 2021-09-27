import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Title from "../../nonstate/atoms/Title.js";
import Paper from "@mui/material/Paper";

export default function AppBarCustom() {
  return (
    <Paper
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        textAlign: "center",
      }}
      elevation={3}
    >
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Title />
          </Typography>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}
