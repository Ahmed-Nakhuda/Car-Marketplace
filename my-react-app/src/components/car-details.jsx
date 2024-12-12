import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import '../stylesheets/car-details.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Navbar from "./navbar";

const CarDetails = () => {
    const { id } = useParams(); // Get the car ID from the URL
    const [car, setCar] = useState(null);
    const [error, setError] = useState(null);

    const [mainSwiper, setMainSwiper] = useState(null);  // State for main Swiper 
    const [secondSwiper, setSecondSwiper] = useState(null); // State for thumbnail Swiper

    const [open, setOpen] = useState(false);


    // Open and close the dialog
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Fetch car details when the component mounts
    useEffect(() => {
        async function fetchCar() {
            try {
                const response = await axios.get(`http://localhost:5000/car/${id}`);
                if (response.data) {
                    setCar(response.data);
                    console.log(response.data);
                } else {
                    setError("Car not found");
                }
            } catch (error) {
                console.error("Error fetching car details:", error);
                setError("An error occurred while fetching car details.");
            }
        }
        fetchCar();
    }, [id]); // Add id as a dependency to refetch if the ID changes


    return (
        <div id='car-details'>
            <Navbar />
            <div id='car-container'>
                <div id="swiper-container">
                    {/* First Swiper - Main View */}
                    <Swiper
                        id="swiper"
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation
                        modules={[Pagination, Navigation]}
                        onSwiper={setMainSwiper} 
                    >
                        {car.images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={`http://localhost:5000/${image}`}
                                    alt={`${car.make} ${car.model} Image ${index + 1}`}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Swiper
                        id="swiper2"
                        spaceBetween={10}
                        slidesPerView={5}
                        pagination={{ clickable: true }}
                        navigation
                        modules={[Pagination, Navigation]}
                        onSwiper={setSecondSwiper}
                    >
                        {car.images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={`http://localhost:5000/${image}`}
                                    alt={`${car.make} ${car.model} Image ${index + 1}`}
                                    style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                                    onClick={() => mainSwiper?.slideTo(index)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


                <div id='car-description'>
                    <Typography variant="h4" fontWeight="bold" gutterBottom> {car.year} {car.make} {car.model} {car.trim}</Typography>

                    <div className="descriptions">
                        <Typography className="description" variant="h6">Price</Typography>
                        <Typography className="description" variant="h6">Kilometers</Typography>
                        <Typography className="description" variant="h6">Drivetrain</Typography>
                    </div>

                    <div className="descriptions info">
                        <Typography className="description" variant="h6" fontWeight="bold" gutterBottom>${car.price}</Typography>
                        <Typography className="description" variant="h6" fontWeight="bold">{car.kilometers}</Typography>
                        <Typography className="description" variant="h6" fontWeight="bold">{car.drivetrain}</Typography>
                    </div>

                    <div className="descriptions">
                        <Typography className="description" variant="h6">Transmission</Typography>
                        <Typography className="description" variant="h6">Body Type</Typography>
                        <Typography className="description" variant="h6">Engine</Typography>
                    </div>

                    <div className="descriptions info">
                        <Typography className="description" variant="h6" fontWeight="bold">{car.transmission}</Typography>
                        <Typography className="description" variant="h6" fontWeight="bold">{car.bodyType}</Typography>
                        {car.engine ? (
                            <Typography className="description" variant="h6" fontWeight="bold">{car.engine}</Typography>
                        ) : (
                            <Typography className="description" variant="h6" fontWeight="bold">Not Provided</Typography>
                        )}
                    </div>


                    <div className={car.cityFuelConsumption && car.highwayFuelConsumption && car.combinedFuelConsumption ? "descriptions" : "minus-margin-top"}>
                        {car.cityFuelConsumption && (
                            <Typography className="description" variant="h6">City</Typography>
                        )}
                        {car.highwayFuelConsumption && (
                            <Typography className="description" variant="h6">Highway</Typography>
                        )}
                        {car.combinedFuelConsumption && (
                            <Typography className="description" variant="h6">Combined</Typography>
                        )}
                    </div>

                    <div className="descriptions info">
                        {car.cityFuelConsumption && (
                            <Typography className="description" variant="h6" fontWeight="bold" gutterBottom>
                                {car.cityFuelConsumption}L/100km
                            </Typography>
                        )}
                        {car.highwayFuelConsumption && (
                            <Typography className="description" variant="h6" fontWeight="bold">
                                {car.highwayFuelConsumption}L/100km
                            </Typography>
                        )}
                        {car.combinedFuelConsumption && (
                            <Typography className="description" variant="h6" fontWeight="bold">
                                {car.combinedFuelConsumption}L/100km
                            </Typography>
                        )}
                    </div>

                    <div className="descriptions">
                        {car.batteryRange && (
                            <Typography className="description" variant="h6">Battery Range</Typography>
                        )}
                        {car.chargingTime && (
                            <Typography className="description" variant="h6">Charging Time</Typography>
                        )}
                    </div>


                    
                    <div className="descriptions info">
                       {car.batteryRange && (
                            <Typography className="description" variant="h6" fontWeight="bold" gutterBottom>
                                {car.batteryRange}km
                            </Typography>
                        )}
                        {car.chargingTime && (
                            <Typography className="description" variant="h6" fontWeight="bold">
                                {car.chargingTime} hours
                            </Typography>
                        )}
                    </div>


                    <div className="descriptions">
                        <Typography className="description" variant="h6">VIN</Typography>
                        <Typography className="description" variant="h6">Stock Number</Typography>
                    </div>

                    <div className="descriptions info">
                        <Typography className="description" variant="h6" fontWeight="bold" gutterBottom>{car.VIN}</Typography>
                        <Typography className="description" variant="h6" fontWeight="bold">{car.stockNumber}</Typography>
                    </div>



                    <Typography variant="h6" fontWeight="bold" gutterBottom>Description</Typography>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        View Full Description
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="car-description-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="car-description-title">Owner's Description</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" id="car-description-text">
                                {car.description}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Typography variant="h6" fontWeight="bold" style={{ marginTop: '20px' }}>Contact Owner</Typography>
                    <Typography variant="h6">{car.firstName} {car.lastName}</Typography>
                    <Typography variant="h6">Email: {car.email}</Typography>
                    <Typography variant="h6">Phone: {car.phoneNumber}</Typography>
                    <Typography variant="h6">Location: {car.city}, {car.province}</Typography>

                </div>
            </div>
        </div>
    );
};

export default CarDetails;
