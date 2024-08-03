import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import authService from "../services/auth.services";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Button, TextField, InputAdornment, IconButton} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      user_name: username,
      password: password,
    };

    authService
      .login(body)
      .then((response) => {
        const token = response.data.authToken;
        console.log(token);
        localStorage.setItem("authToken", token);

        authenticateUser();

        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="LoginPage" className="base-wrapper">
      <div id="login-wrapper">
        <h4>Login</h4>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{endAdornment:<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>}}
          />
          <Button type="submit">Submit</Button>
        </form>
        <Link to="/signup">Don&apos;t have an account yet?</Link>
      </div>
    </div>
  );
}

export default Login;
