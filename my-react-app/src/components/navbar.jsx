import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../stylesheets/navbar.css';
import { Button } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate(); // Initialize navigate

    const handleLogout = () => {
        // retrieve the email from localStorage
        localStorage.removeItem('email');
        navigate('/'); // Redirect to the login page or home page
    };

    return (
        <div id="navbar">
            <nav>
                <ul>
                    <div id="nav-links">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/addCar">Sell Your Car</Link></li>
                        <li><Link to="/saves">Saves</Link></li>
                        <li><Link to="/myPostings">Your Postings</Link></li>
                    </div>
                    <div id="nav-logout">
                        <li>
                            <Button onClick={handleLogout} variant="contained" color="white">
                                Logout
                            </Button>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
