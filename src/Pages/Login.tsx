import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Alert,
} from '@mui/material';

import {
  Card,
  Stack,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import { useAuth } from '../context/auth.context.jsx';
import { appTheme } from '../themes/theme.jsx';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css';
import { login } from '../services/auth.services.ts';
import LoginSchema from '../validation/login-validation.ts';
import z from 'zod';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage('');

    const user = {
      user_name: username,
      password: password,
    };

    const userValidation = LoginSchema.safeParse(user);
    if (!userValidation.success) {
      setErrorMessage(z.prettifyError(userValidation.error));
      return; // bail early, never calls the API
    }

    try {
      const data = await login(user);
      setToken(data.authToken, data.user);
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          `Something went wrong (${error.response?.status ?? 'no response'})`;

        setErrorMessage(serverMessage);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      console.log('Error occured when trying to log in: ', error);
    }
  };

  return (
    <Container id="LoginPage" className="base-wrapper">
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderColor: appTheme.palette.secondary.main,
          width: { xs: '300px', sm: '400px' },
        }}
      >
        <CardHeader
          title="Login"
          titleTypographyProps={{ fontFamily: 'Edu AU VIC WA NT' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="username"
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextField
                label="password"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
              {errorMessage && (
                <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>
                  {errorMessage}
                </Alert>
              )}
              <Link
                to="/signup"
                style={{ color: appTheme.palette.primary.main }}
              >
                <Typography variant="body2">
                  Don&apos;t have an account yet?
                </Typography>
              </Link>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
