import Typography from "@mui/material/Typography";
import { MIN_WINDOW_INNER_WIDTH } from "../../constants/HomePageConstants.js";
export default function NotSupported() {
  return (
    <Typography variant="body2" gutterBottom align="center">
      {`This app is not designed for screens less than` +
        ` ${MIN_WINDOW_INNER_WIDTH}px wide.`}
    </Typography>
  );
}
