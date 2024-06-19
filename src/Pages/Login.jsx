import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { Button, TextField } from "@mui/material";
import authService from "../services/auth.services";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);

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

        navigate("/");
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
        <Link to="/signup">Don&apos;t have an account yet?</Link>
      </div>
    </div>
  );
}

export default Login;
