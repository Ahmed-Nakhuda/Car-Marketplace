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

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleMouseUpPassword = (e) => {
        e.preventDefault();
    };


    async function submit(e) {
        e.preventDefault();

        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/signup", {
                email, password
            });

            if (res.data === "exist") {
                setErrorMessage("User already exists");
            } else if (res.data === "signup successful") {
                navigate("/home");
            } else if (res.data === "Password must be at least 8 characters long") {
                setErrorMessage("Password must be at least 8 characters long");
            }
        } catch (error) {
            alert("An error occurred during signup");
            console.log(error);
        }
    }

    return (
        <div id='signup'>
            <h1>Sign Up</h1>
            <p>{errorMessage}</p>
            <form onSubmit={submit}>
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
                <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="confirm password"
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
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
                <Button id='submit-button' variant="contained" onClick={submit}>Sign Up</Button>
            </form>
            <p>
                <span>Already have an account?</span>
                <Link to="/">Login</Link>
            </p>
        </div>
    );
};

export default SignUp;
