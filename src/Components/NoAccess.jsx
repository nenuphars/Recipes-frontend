
import "./NoAccess.css";
import { Button, Card, Stack, Typography } from "@mui/material";

function NoAccess() {
  return (
    <div className="base-wrapper">
      <Card id="no-access-wrapper">
      <Stack gap={2}>
        <Typography variant="h5">You need to be logged in to view this page</Typography>
        <Typography variant="body1">
          Go to the login page
        </Typography>
        <Button variant="contained" to="/login">Login</Button>
        <Typography variant="body1">
          Don&apos;t have an account yet?
        </Typography>
        <Button variant="contained" to="/signup">Sign Up</Button>

      </Stack>
      </Card>
    </div>
  );
}

export default NoAccess;
