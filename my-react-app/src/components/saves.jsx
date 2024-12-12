import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';
import Navbar from './navbar';
import { useNavigate } from "react-router-dom";

const Saves = () => {
    const [cars, setCars] = useState([]); 
    const email = localStorage.getItem('email'); // Retrieve the logged-in user's email from localStorage
    const navigate = useNavigate(); 

    // Fetch saved cars when the component mounts
    useEffect(() => {
        async function fetchSavedCars() {
            try {
                // Fetch saved cars for the logged-in user by email
                const response = await axios.get('http://localhost:5000/savedCars', { params: { email } });
                setCars(response.data); // Set the cars state
            } catch (error) {
                console.error("Error fetching saved cars:", error);
            }
        }
        fetchSavedCars();
    }, [email]); // Add email as a dependency to refetch if the user changes

    async function handleUnsaveCar(carId) {
        try {
            await axios.post('http://localhost:5000/unsaveCar', {
                email: email, // Make sure email is defined correctly
                carId: carId
            });
            setCars(cars.filter((car) => car._id !== carId));
        } catch (error) {
            console.error('Error unsaving car:', error);
        }
    }

    // Function to navigate to the car details page
    function handleMoreInfo(id) {
        navigate(`/car/${id}`);
    }


    return (
        <>
            <Navbar />
            <Grid2 container spacing={2} style={{ marginTop: '20px', justifyContent: 'center' }}>
                {cars.length === 0 ? (
                    <Typography variant="h6">No saved cars found.</Typography>
                ) : (
                    cars.map((car) => (
                        <Grid2 item xs={12} sm={6} md={4} key={car._id}>
                            <Card variant="outlined" style={{ height: '100%', width: '300px', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={car.images[0] || 'https://via.placeholder.com/150'}
                                    alt={`${car.make} ${car.model}`}
                                    style={{ objectFit: 'cover' }} 
                                />
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="body2" component="div">
                                        {car.make} {car.model} {car.trim}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Year: {car.year}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: ${car.price}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Kilometers: {car.kilometers}
                                    </Typography>
                                    <Button onClick={() => handleMoreInfo(car._id)} size="small" style={{ marginRight: "5px" }} variant="contained" color="primary">More Info</Button>
                                    <Button
                                        onClick={() => handleUnsaveCar(car._id)}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Unsave
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))
                )}
            </Grid2>
        </>
    );
}

export default Saves;
