import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Container,
  Alert,
} from '@mui/material';

// import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { appTheme } from '../themes/theme.jsx';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css';
import { signup } from '../services/auth.services.ts';
import UserSchema from '../validation/user-validation.ts';
import z from 'zod';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== repeatPassword) {
      console.log('Passwords dont match');
      setErrorMessage('Passwords dont match');
      return;
    }

    if (password === repeatPassword) {
      console.log('Passwords match');
      const newUser = {
        user_name: username,
        password: password,
      };
      console.log('new user: ', newUser);
      const validateSignup = UserSchema.safeParse(newUser);
      if (!validateSignup.success) {
        setErrorMessage(z.prettifyError(validateSignup.error));
        return;
      }
      try {
        const data = await signup(username, password);
        navigate('/login');
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
        console.log('Error occured when trying to sign up: ', error);
      }
    }
  };

  return (
    <Container
      id="SignupPage"
      className="base-wrapper"
      sx={{
        width: '100vw',
        height: '100%',
        backgroundColor: '#faf8eb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '60px',
        alignItems: 'center',
        // position: 'absolute',
        // top: 0,
      }}
    >
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
          title="Sign Up"
          titleTypographyProps={{ fontFamily: 'Edu AU VIC WA NT' }}
        />
        <CardContent>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
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
                value={password}
                type={showPassword ? 'text' : 'password'}
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
              <TextField
                label="repeat password"
                required
                value={repeatPassword}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
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
              {errorMessage && (
                <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>
                  {errorMessage}
                </Alert>
              )}

              <Link
                to="/login"
                style={{ color: appTheme.palette.primary.main }}
              >
                <Typography variant="body2">
                  Already have an account?
                </Typography>
              </Link>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Signup;
