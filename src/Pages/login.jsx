import { Stack, Card, Typography, Button, TextField, Alert } from "@mui/material";
import {useMutation} from "@tanstack/react-query"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useState } from "react";

function Login() {
  const [identifier, setIdentifier ] = useState("")
  const[password, setPassword] = useState("")
  const[serverError, setServerError] = useState("")
  const[success, setSuccess] = useState("")
  const navigate = useNavigate()
  const { isPending, mutate} = useMutation({
    mutationFn: ["user_login"],
    mutationFn: async ()=>{
      const response = await axios.post("http://localhost:3000/login", {identifier, password})
      return response.data
    },
    onSuccess:(data)=>{
      setSuccess("Logged in successfuly")
      navigate('/')
    },
    onError:(error)=>{
      if(axios.isAxiosError(error)){
        const ServerError = error.response.data.message
        setServerError(ServerError)
      }
    }
  })
  function handleLogin(){
    setServerError("")
 mutate()

  }
  return (
    <Stack sx={{
      margin:20,
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
       <Card sx={{
       width:"600px",
       display:"flex",
       flexDirection:"column",
       gap:3
       }}>
        <Typography variant="h3" component="h1" textAlign="center">Log In Below</Typography>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField placeholder="enter email or username" label="username or email" value={identifier} onChange={(e)=>{setIdentifier(e.target.value)}}>Username or Email</TextField>
        <TextField placeholder="enter your password" label="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}>Password</TextField>
        <Button variant="contained" onClick={handleLogin} disabled={isPending}>Log in</Button>
       </Card>
    </Stack>
  );
}

export default Login;
