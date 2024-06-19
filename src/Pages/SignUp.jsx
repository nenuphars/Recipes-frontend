import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"
import {
    Button,
    TextField,
  } from "@mui/material";
import authService from "../services/auth.services";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function Signup() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)

    function handleSubmit(e){
        e.preventDefault()

        if(password===repeatPassword){

            const newUser = {
                user_name:username,
                password:password
            }
    
            authService.signup(newUser)
            .then((response)=>{
                const token = response.data.authToken
                console.log(token)
                localStorage.setItem("authToken", token)
    
                authenticateUser()
    
                navigate("/")
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else{
            setErrorMessage("passwords don't match")
            console.log(errorMessage)
        }


        
    }

  return (
    <div id="SignupPage" className="base-wrapper">
    <div id="signup-wrapper">
        <h4>Sign Up</h4>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
        
        <TextField label="username" required value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <TextField label="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <TextField label="repeat password" required value={repeatPassword} onChange={(e)=>{setRepeatPassword(e.target.value)}} />
        <Button type="submit">Submit</Button>

        </form>
        <Link to="/login">Already have an account?</Link>

    </div>
    </div>
  )
}

export default Signup;