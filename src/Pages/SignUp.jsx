import {  useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import authService from '../services/auth.services';
// import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { appTheme } from '../themes/theme';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const errorMessageElement = () => {
    return (
      <h3 className="" style={{ color: 'red' }}>
        {errorMessage}
      </h3>
    );
  };

  // const { authenticateUser } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("inside handle submit")
    if (password === repeatPassword) {
      console.log("passwords match")
      const newUser = {
        user_name: username,
        password: password,
      };
      console.log("new user: ", newUser)

      authService
        .signup(newUser)
        .then(() => {

          navigate('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrorMessage("passwords don't match");
      console.log(errorMessage);
    }
  }

  return (
    <div id="SignupPage" className="base-wrapper">
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
          <form
            style={{ width: '100%' }}
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
              <Button variant="contained" type='submit'>Submit</Button>
              {errorMessage && errorMessageElement()}

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
    </div>
  );
}

export default Signup;
