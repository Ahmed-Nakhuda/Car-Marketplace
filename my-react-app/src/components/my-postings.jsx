import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


const MyPostings = () => {
    const [cars, setCars] = useState([]); 
    const email = localStorage.getItem('email'); // Retrieve logged-in user's email from localStorage
    const navigate = useNavigate(); 
    const [selectedCar, setSelectedCar] = useState(null); // State to store the selected car for deletion
    const [open, setOpen] = useState(false); // State to control the dialog visibility


    // Function to navigate to the car details page
    function handleMoreInfo(id) {
        navigate(`/car/${id}`);
    }

    // Function to navigate to the edit car page
    function handleEdit(id) {
        navigate(`/editCarPage/${id}`);
    }

      // Open and close the dialog
      const handleOpen = (car) => {
        setSelectedCar(car); // Set the car being deleted
        setOpen(true);      
    };

    const handleClose = () => {
        setOpen(false);
    };


    // Function to delete a car
    const handleDelete = () => {
        if (!selectedCar) return;

        fetch(`http://localhost:5000/deleteCar/${selectedCar._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const updatedCars = cars.filter(car => car._id !== selectedCar._id);
                setCars(updatedCars);
                setOpen(false); // Close the dialog 
                setSelectedCar(null); // Clear the selected car
            })
            .catch(err => console.log(err));
    };


    // useEffect hook to fetch cars which the logged-in user has posted
    useEffect(() => {
        fetch(`http://localhost:5000/userCars?email=${email}`)
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(err => console.log(err));
        console.log(email);
    }, [email]); 


    return (
        <>
            <Navbar />
            {cars && cars.length === 0 ? (
                <Typography variant="h6" style={{ textAlign: 'center' }}>
                    No postings found.
                </Typography>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                    {cars.map((car) => (
                        <Card
                            key={car._id}
                            variant="outlined"
                            style={{ height: '360px', width: '30%', marginTop: '10px' }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={car.images[0] || 'https://via.placeholder.com/150'}
                                alt={`${car.make} ${car.model}`}
                                style={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography gutterBottom style={{ size: "30px" }} component="div">
                                    {car.year} {car.make} {car.model} {car.trim}
                                </Typography>
                                <Typography style={{ size: "15px", fontWeight: "bold" }}>
                                    ${car.price}
                                </Typography>
                                <Typography style={{ size: "15px" }}>
                                    {car.kilometers} km
                                </Typography>
                                <div id="home-card-buttons">
                                    <Button
                                        size="small"
                                        style={{ marginRight: '5px' }}
                                        onClick={() => handleMoreInfo(car._id)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        More Info
                                    </Button>
                                    <Button
                                        size="small"
                                        style={{ marginRight: '5px' }}
                                        onClick={() => handleEdit(car._id)}
                                        variant="contained"
                                        color="warning"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        style={{ marginRight: '5px' }}
                                        onClick={() => handleOpen(car)} // Pass the specific car
                                        variant="contained"
                                        color="error"
                                    >
                                        Delete
                                    </Button>

                                    <Dialog open={open} onClose={handleClose} aria-labelledby="car-description-title" maxWidth="sm" fullWidth BackdropProps={{
                                        style: { backgroundColor: "transparent" }, // Fully transparent
                                    }}>
                                        <DialogTitle id="car-description-title">Delete Car</DialogTitle>
                                        <DialogContent>
                                            <Typography variant="body1">
                                                Are you sure you want to delete the car <Typography style={{ fontWeight: "bold" }}>{selectedCar?.year} {selectedCar?.make} {selectedCar?.model} {selectedCar?.trim}?</Typography>
                                            </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleDelete} variant="contained" color="error">
                                                Delete
                                            </Button>
                                            <Button variant='contained' onClick={handleClose} color="primary">
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}

export default MyPostings;
