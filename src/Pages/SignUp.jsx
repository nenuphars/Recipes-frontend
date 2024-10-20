import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"
import {
    Button,
    TextField,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Stack
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
    
                navigate("/dashboard")
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
        <Card variant="outlined" sx={{my:"12px", display:"flex", flexDirection:"column", height:"80%"}}>

        <CardHeader title="Sign Up" />
        <CardContent>

        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <Stack spacing={2}>
        <TextField label="username" required value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <TextField label="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <TextField label="repeat password" required value={repeatPassword} onChange={(e)=>{setRepeatPassword(e.target.value)}} />
        <Button variant="contained" type="submit">Submit</Button>

        <Link to="/login">
        <Typography variant="body2">Already have an account?</Typography>
        </Link>
            </Stack>
        

        </form>
        </CardContent>
        </Card>

    </div>
    </div>
  )
}

export default Signup;