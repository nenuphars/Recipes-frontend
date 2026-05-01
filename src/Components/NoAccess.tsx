import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './NoAccess.css';

function NoAccess() {
  const navigate = useNavigate();

  return (
    <Container className="base-wrapper" sx={{ p: '40px', maxWidth: '100vw' }}>
      <Card
        id="no-access-wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '60vw',
          maxHeight: '50vh',
          marginTop: '10%',
          padding: '1rem',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #f19dc0',
          borderRadius: '5px',
        }}
      >
        <Stack gap={2}>
          <Typography variant="h5">
            You need to be logged in to view this page
          </Typography>
          <Typography variant="body1">Go to the login page</Typography>
          <Button variant="text" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Typography variant="body1">
            Don&apos;t have an account yet?
          </Typography>
          <Button variant="contained" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}

export default NoAccess;
