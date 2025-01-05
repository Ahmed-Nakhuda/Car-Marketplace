import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import '../stylesheets/signup.css'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import { Input, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import '../stylesheets/login.css'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleMouseUpPassword = (e) => {
        e.preventDefault();
    };

    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/login", {
                email, password
            })
                .then(res => {
                    if (res.data == 'exist') {
                        localStorage.setItem('email', email);
                        // redirect
                        navigate("/home")
                    }
                    else if (res.data == "notexist") {
                        setErrorMessage('User has not signed up')
                    }
                    else if (res.data === 'incorrect password') {
                        setErrorMessage('incorrect username or password')
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id='login-parent-container'>
            <div id='login'>
                <h1>Login</h1>
                <form action="POST">
                    <p>{errorMessage}</p>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField onChange={(e) => { setEmail(e.target.value) }} name="email" id="email" type='email' label="email" variant="standard" />
                    </Box>
                    <br />
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <p />
                    <Button id='submit-button' variant="contained" onClick={submit}>Login</Button>
                </form>
                <p>
                    <span>Not a member?</span>
                    <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login; 