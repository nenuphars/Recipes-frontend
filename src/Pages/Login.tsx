import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Container,
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

    const user = {
      user_name: username,
      password: password,
    };
    try {
      const data = await login(user);
      setToken(data.authToken, data.user);
      navigate('/dashboard');
    } catch (error) {
      console.log('Error occured when trying to log in: ', error);
    }
  };

  const errorMessageElement = () => {
    return (
      <Typography variant="caption" sx={{ color: 'red' }}>
        {errorMessage}
      </Typography>
    );
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
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Stack spacing={2}>
              <TextField
                label="username"
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
              <Button variant="contained" type="submit">
                Submit
              </Button>
              {errorMessage && errorMessageElement()}
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
