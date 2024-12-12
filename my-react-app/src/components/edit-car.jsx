import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Navbar from './navbar';
import { Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import cities from 'cities.json';
import '../stylesheets/edit-car.css';


const EditCar = () => {

    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [error, setError] = useState(null);
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [VIN, setVIN] = useState('');
    const [stockNumber, setStockNumber] = useState('');
    const [trim, setTrim] = useState('');
    const [year, setYear] = useState('');
    const [transmission, setTransmission] = useState('');
    const [drivetrain, setDrivetrain] = useState('');
    const [engine, setEngine] = useState('');
    const [condition, setCondition] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [seats, setSeats] = useState('');
    const [interiorColor, setInteriorColor] = useState('');
    const [exteriorColor, setExteriorColor] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [cityFuelConsumption, setCityFuelConsumption] = useState('');
    const [highwayFuelConsumption, setHighwayFuelConsumption] = useState('');
    const [combinedFuelConsumption, setCombinedFuelConsumption] = useState('');
    const [batteryRange, setBatteryRange] = useState('');
    const [chargingTime, setChargingTime] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState(null);

    const [canadianCities, setCanadianCities] = useState([]);


    // Set the form fields to the car's details
    useEffect(() => {
        if (car) {
            setFirstName(car.firstName || '');
            setLastName(car.lastName || '');
            setPhoneNumber(car.phoneNumber || '');
            setEmail(car.email || '');
            setCity(car.city || '');
            setProvince(car.province || '');
            setVIN(car.VIN || '');
            setStockNumber(car.stockNumber || '');
            setMake(car.make || '');
            setModel(car.model || '');
            setTrim(car.trim || '');
            setYear(car.year || '');
            setPrice(car.price || '');
            setKilometers(car.kilometers || '');
            setTransmission(car.transmission || '');
            setDrivetrain(car.drivetrain || '');
            setEngine(car.engine || '');
            setCondition(car.condition || '');
            setBodyType(car.bodyType || '');
            setSeats(car.seats || '');
            setInteriorColor(car.interiorColor || '');
            setExteriorColor(car.exteriorColor || '');
            setFuelType(car.fuelType || '');
            setCityFuelConsumption(car.cityFuelConsumption || '');
            setHighwayFuelConsumption(car.highwayFuelConsumption || '');
            setCombinedFuelConsumption(car.combinedFuelConsumption || '');
            setBatteryRange(car.batteryRange || '');
            setChargingTime(car.chargingTime || '');
            setDescription(car.description || '');
        }
    }, [car]);



    // filter Canadian cities from the cities.json file
    useEffect(() => {
        const filteredCities = cities.filter((city) => city.country === "CA");
        const cityOptions = filteredCities.map((city) => ({
            value: city.name,
            label: city.name,
        }));
        setCanadianCities(cityOptions);
    }, []);



    // Function to handle the edit car form submission
    async function handleEdit() {
        try {
            const response = await axios.put(`http://localhost:5000/editCar/${id}`, {
                firstName,
                lastName,
                phoneNumber,
                email,
                city,
                province,
                make,
                model,
                price,
                kilometers,
                year,
                VIN,
                stockNumber,
                trim,
                transmission,
                drivetrain,
                engine,
                condition,
                bodyType,
                seats,
                interiorColor,
                exteriorColor,
                fuelType,
                cityFuelConsumption,
                highwayFuelConsumption,
                combinedFuelConsumption,
                batteryRange,
                chargingTime,
                description
            });
            alert('Car updated successfully');
        } catch (err) {
            console.error('Error updating car:', err);
            setError('Failed to update car.');
        }
    }



    // Fetch the car details when the component mounts
    useEffect(() => {
        async function fetchCar() {
            try {
                const response = await axios.get(`http://localhost:5000/editCarPage/${id}`);
                if (response.data) {
                    setCar(response.data);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setPhoneNumber(response.data.phoneNumber);
                    setEmail(response.data.email);
                    setCity(response.data.city);
                    setProvince(response.data.province);
                    setMake(response.data.make);
                    setModel(response.data.model);
                    setPrice(response.data.price);
                    setKilometers(response.data.kilometers);
                    setVIN(response.data.VIN);
                    setStockNumber(response.data.stockNumber);
                    setTrim(response.data.trim);
                    setYear(response.data.year);
                    setTransmission(response.data.transmission);
                    setDrivetrain(response.data.drivetrain);
                    setEngine(response.data.engine);
                    setCondition(response.data.condition);
                    setBodyType(response.data.bodyType);
                    setSeats(response.data.seats);
                    setInteriorColor(response.data.interiorColor);
                    setExteriorColor(response.data.exteriorColor);
                    setFuelType(response.data.fuelType);
                    setCityFuelConsumption(response.data.cityFuelConsumption);
                    setHighwayFuelConsumption(response.data.highwayFuelConsumption);
                    setCombinedFuelConsumption(response.data.combinedFuelConsumption);
                    setBatteryRange(response.data.batteryRange);
                    setChargingTime(response.data.chargingTime);
                    setDescription(response.data.description);
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
    }, [id]); // Add id as a dependency to refetch if the car changes


    return (
        <div id='edit-car'>
            <Navbar />
            <h2>
                Currently Editing {car?.year || "Year"} {car?.make || "Make"} {car?.model || "Model"} {car?.trim || "Trim"}
            </h2>
            <form>
                <Typography variant='h6' gutterBottom>Personal Info</Typography>

                <div className='group'>
                    <TextField value={firstName} required onChange={(e) => setFirstName(e.target.value)} name="first-name" id="first-name" label="First Name" variant="standard" />
                    <TextField value={lastName} required onChange={(e) => setLastName(e.target.value)} name="last-name" id="last-name" label="Last Name" variant="standard" />
                    <TextField value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} type="number" name="phone-number" id="phone-number" label="Phone Number" variant="standard" />
                </div>

                <div className='group'>
                    <TextField value={email} required onChange={(e) => setEmail(e.target.value)} name="email" id="email" type='email' label="Email" variant="standard" />

                    <Select
                        required
                        labelId="city"
                        id="city"
                        value={city}
                        label="City"
                        onChange={(e) => setCity(e.target.value)}
                        displayEmpty
                        renderValue={city !== "" ? undefined : () => "Select City"}
                    >
                        {canadianCities.map((cityOption, index) => (
                            <MenuItem key={index} value={cityOption.value}>
                                {cityOption.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        required
                        labelId="province"
                        id="province"
                        value={province}
                        label="Province"
                        onChange={(e) => setProvince(e.target.value)}
                        displayEmpty
                        renderValue={province !== "" ? undefined : () => "Select Province"}
                        className="select"
                    >
                        <MenuItem value="Alberta">Alberta</MenuItem>
                        <MenuItem value="British Columbia">British Columbia</MenuItem>
                        <MenuItem value="Manitoba">Manitoba</MenuItem>
                        <MenuItem value="New Brunswick">New Brunswick</MenuItem>
                        <MenuItem value="Newfoundland and Labrador">Newfoundland and Labrador</MenuItem>
                        <MenuItem value="Northwest Territories">Northwest Territories</MenuItem>
                        <MenuItem value="Nova Scotia">Nova Scotia</MenuItem>
                        <MenuItem value="Nunavut">Nunavut</MenuItem>
                        <MenuItem value="Ontario">Ontario</MenuItem>
                        <MenuItem value="Prince Edward Island">Prince Edward Island</MenuItem>
                        <MenuItem value="Quebec">Quebec</MenuItem>
                        <MenuItem value="Saskatchewan">Saskatchewan</MenuItem>
                        <MenuItem value="Yukon">Yukon</MenuItem>
                    </Select>
                </div>
                <br />

                <Typography variant='h6' gutterBottom>Car Info</Typography>

                <div className="group">
                    <TextField
                        value={VIN}
                        required
                        onChange={(e) => setVIN(e.target.value)}
                        slotProps={{
                            minLength: 17,
                            maxLength: 17,
                            required: true
                        }}
                        name="VIN" id="VIN" label="VIN" variant="standard" />
                    <TextField value={stockNumber} onChange={(e) => setStockNumber(e.target.value)} required name="stockNumber" id="stockNumber" label="Stock Number" variant="standard" />
                </div>

                <div className='group'>
                    <Select
                        required
                        labelId="make"
                        id="make"
                        value={make}
                        label="Make"
                        onChange={(e) => setMake(e.target.value)}
                        displayEmpty
                        renderValue={make !== "" ? undefined : () => "Select Make"}
                    >
                        <MenuItem value="Acura">Acura</MenuItem>
                        <MenuItem value="Alfa Romeo">Alfa Romeo</MenuItem>
                        <MenuItem value="Aston Martin">Aston Martin</MenuItem>
                        <MenuItem value="Audi">Audi</MenuItem>
                        <MenuItem value="Bentley">Bentley</MenuItem>
                        <MenuItem value="BMW">BMW</MenuItem>
                        <MenuItem value="Bugatti">Bugatti</MenuItem>
                        <MenuItem value="Buick">Buick</MenuItem>
                        <MenuItem value="Cadillac">Cadillac</MenuItem>
                        <MenuItem value="Chevrolet">Chevrolet</MenuItem>
                        <MenuItem value="Chrysler">Chrysler</MenuItem>
                        <MenuItem value="Dodge">Dodge</MenuItem>
                        <MenuItem value="Ferrari">Ferrari</MenuItem>
                        <MenuItem value="Fiat">Fiat</MenuItem>
                        <MenuItem value="Ford">Ford</MenuItem>
                        <MenuItem value="Genesis">Genesis</MenuItem>
                        <MenuItem value="GMC">GMC</MenuItem>
                        <MenuItem value="Honda">Honda</MenuItem>
                        <MenuItem value="Hyundai">Hyundai</MenuItem>
                        <MenuItem value="Infiniti">Infiniti</MenuItem>
                        <MenuItem value="Jaguar">Jaguar</MenuItem>
                        <MenuItem value="Jeep">Jeep</MenuItem>
                        <MenuItem value="Kia">Kia</MenuItem>
                        <MenuItem value="Lamborghini">Lamborghini</MenuItem>
                        <MenuItem value="Land Rover">Land Rover</MenuItem>
                        <MenuItem value="Lexus">Lexus</MenuItem>
                        <MenuItem value="Lincoln">Lincoln</MenuItem>
                        <MenuItem value="Lotus">Lotus</MenuItem>
                        <MenuItem value="Maserati">Maserati</MenuItem>
                        <MenuItem value="Mazda">Mazda</MenuItem>
                        <MenuItem value="McLaren">McLaren</MenuItem>
                        <MenuItem value="Mercedes-Benz">Mercedes-Benz</MenuItem>
                        <MenuItem value="MINI">MINI</MenuItem>
                        <MenuItem value="Mitsubishi">Mitsubishi</MenuItem>
                        <MenuItem value="Nissan">Nissan</MenuItem>
                        <MenuItem value="Polestar">Polestar</MenuItem>
                        <MenuItem value="Porsche">Porsche</MenuItem>
                        <MenuItem value="Ram">Ram</MenuItem>
                        <MenuItem value="Rolls-Royce">Rolls-Royce</MenuItem>
                        <MenuItem value="Subaru">Subaru</MenuItem>
                        <MenuItem value="Tesla">Tesla</MenuItem>
                        <MenuItem value="Toyota">Toyota</MenuItem>
                        <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                        <MenuItem value="Volvo">Volvo</MenuItem>
                    </Select>
                    <TextField value={model} required onChange={(e) => setModel(e.target.value)} name="model" id="model" label="Model" variant="standard" />
                    <TextField value={trim} required onChange={(e) => setTrim(e.target.value)} name="trim" id="trim" label="Trim" variant="standard" />
                </div>
                <br />

                <div className='group'>
                    <TextField value={year} required onChange={(e) => setYear(e.target.value)} type="number" name="year" id="year" label="Year" variant="standard" />
                    <TextField value={price} required onChange={(e) => setPrice(e.target.value)} type='number' name="price" id="price" label="Price" variant="standard" />
                    <TextField value={kilometers} required onChange={(e) => setKilometers(e.target.value)} type="number" name="kilometers" id="kilometers" label="Kilometers" variant="standard" />
                </div>
                <br />

                <div className='group'>
                    <Select
                        required
                        labelId="transmission"
                        id="transmission"
                        value={transmission}
                        label="Transmission"
                        onChange={(e) => setTransmission(e.target.value)}
                        displayEmpty
                        renderValue={transmission !== "" ? undefined : () => "Select Transmission"}
                    >
                        <MenuItem value="Automatic">Automatic</MenuItem>
                        <MenuItem value="Manual">Manual</MenuItem>
                    </Select>
                    <Select
                        required
                        labelId="drivetrain"
                        id="drivetrain"
                        value={drivetrain}
                        label="Drivetrain"
                        onChange={(e) => setDrivetrain(e.target.value)}
                        displayEmpty
                        renderValue={drivetrain !== "" ? undefined : () => "Select Drivetrain"}
                    >
                        <MenuItem value="4x2">4x2</MenuItem>
                        <MenuItem value="All-Wheel-Drive">All-Wheel-Drive</MenuItem>
                        <MenuItem value="Four-Wheel-Drive">Four-Wheel-Drive</MenuItem>
                        <MenuItem value="Front-Wheel-Drive">Front-Wheel-Drive</MenuItem>
                        <MenuItem value="Rear-Wheel-Drive">Rear-Wheel-Drive</MenuItem>
                    </Select>
                    <TextField value={engine} onChange={(e) => setEngine(e.target.value)} name="engine" id="engine" label="Engine" variant="standard" />
                </div>


                <div className='group'>
                    <Select
                        required
                        labelId="condition"
                        id="condition"
                        value={condition}
                        label="condition"
                        onChange={(e) => setCondition(e.target.value)}
                        displayEmpty
                        renderValue={condition !== "" ? undefined : () => "Select Condition"}
                    >
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Used">Used</MenuItem>
                    </Select>

                    <Select
                        labelId="bodyType"
                        id="bodyType"
                        value={bodyType}
                        label="body Type"
                        onChange={(e) => setBodyType(e.target.value)}
                        displayEmpty
                        renderValue={bodyType !== "" ? undefined : () => "Select Body Type"}
                    >
                        <MenuItem value="Convertible">Convertible</MenuItem>
                        <MenuItem value="Coupe">Coupe</MenuItem>
                        <MenuItem value="CrossOver">CrossOver</MenuItem>
                        <MenuItem value="Hatchback">Hatchback</MenuItem>
                        <MenuItem value="Minivan">Minivan</MenuItem>
                        <MenuItem value="Pickup Truck">Pickup Truck</MenuItem>
                        <MenuItem value="Sedan">Sedan</MenuItem>
                        <MenuItem value="SUV">SUV</MenuItem>
                        <MenuItem value="Van">Van</MenuItem>
                        <MenuItem value="Wagon">Wagon</MenuItem>
                    </Select>

                    <Select
                        labelId="seats"
                        id="seats"
                        value={seats}
                        label="Seats"
                        onChange={(e) => setSeats(e.target.value)}
                        displayEmpty
                        renderValue={seats !== "" ? undefined : () => "Select Number of Seats"}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                    </Select>
                </div>

                <div className="group">
                    <Select
                        labelId="exteriorColor"
                        id="exteriorColor"
                        value={exteriorColor}
                        label="Exterior Color"
                        onChange={(e) => setExteriorColor(e.target.value)}
                        displayEmpty
                        renderValue={exteriorColor !== "" ? undefined : () => "Select Exterior Color"}
                    >
                        <MenuItem value="Beige">Beige</MenuItem>
                        <MenuItem value="Black">Black</MenuItem>
                        <MenuItem value="Blue">Blue</MenuItem>
                        <MenuItem value="Brown">Brown</MenuItem>
                        <MenuItem value="Green">Green</MenuItem>
                        <MenuItem value="Grey">Grey</MenuItem>
                        <MenuItem value="Orange">Orange</MenuItem>
                        <MenuItem value="Purple">Purple</MenuItem>
                        <MenuItem value="Red">Red</MenuItem>
                        <MenuItem value="silver">Silver</MenuItem>
                        <MenuItem value="White">White</MenuItem>
                        <MenuItem value="Yellow">Yellow</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>


                    <Select
                        labelId="interiorColor"
                        id="interiorColor"
                        value={interiorColor}
                        label="Interior Color"
                        onChange={(e) => setInteriorColor(e.target.value)}
                        displayEmpty
                        renderValue={interiorColor !== "" ? undefined : () => "Select Interior Color"}
                    >
                        <MenuItem value="Beige">Beige</MenuItem>
                        <MenuItem value="Black">Black</MenuItem>
                        <MenuItem value="Blue">Blue</MenuItem>
                        <MenuItem value="Brown">Brown</MenuItem>
                        <MenuItem value="Green">Green</MenuItem>
                        <MenuItem value="Grey">Grey</MenuItem>
                        <MenuItem value="Orange">Orange</MenuItem>
                        <MenuItem value="Purple">Purple</MenuItem>
                        <MenuItem value="Red">Red</MenuItem>
                        <MenuItem value="Silver">Silver</MenuItem>
                        <MenuItem value="White">White</MenuItem>
                        <MenuItem value="Yellow">Yellow</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </div>
                <br />

                <div className="group">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Fuel Type</FormLabel>
                        <RadioGroup row onChange={(e) => setFuelType(e.target.value)} value={fuelType}>
                            <FormControlLabel value="fuel" control={<Radio />} label="Fuel" />
                            <FormControlLabel value="electric" control={<Radio />} label="Electric" />
                            <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
                        </RadioGroup>
                    </FormControl>
                </div>


                <div className="group">
                    {fuelType === "fuel" && (
                        <>
                            <TextField value={cityFuelConsumption} onChange={(e) => setCityFuelConsumption(e.target.value)} type="number" name="cityFuelConsumption" id="cityFuelConsumption" label="City Fuel Consumption L/100km" variant="standard" />
                            <TextField value={highwayFuelConsumption} d onChange={(e) => setHighwayFuelConsumption(e.target.value)} type="number" name="highwayFuelConsumption" id="highwayFuelConsumption" label="Highway Fuel Consumption L/100km" variant="standard" />
                            <TextField value={combinedFuelConsumption} onChange={(e) => setCombinedFuelConsumption(e.target.value)} type="number" name="combinedFuelConsumption" id="combinedFuelConsumption" label="Combined Fuel Consumption L/100km" variant="standard" />
                        </>
                    )}
                </div>

                <div className="group">
                    {fuelType === "electric" && (
                        <>
                            <TextField value={batteryRange} onChange={(e) => setBatteryRange(e.target.value)} type="number" name="batteryRange" id="batteryRange" label="Battery Range (km)" variant="standard" />
                            <TextField value={chargingTime} onChange={(e) => setChargingTime(e.target.value)} type="number" name="chargingTime" id="chargingTime" label="Charging Time (hours)" variant="standard" />
                        </>
                    )}
                </div>

                <div className="group">
                    {fuelType === "hybrid" && (
                        <>
                            <TextField value={cityFuelConsumption} onChange={(e) => setCityFuelConsumption(e.target.value)} type="number" name="cityFuelConsumption" id="cityFuelConsumption" label="City Fuel Consumption L/100km" variant="standard" />
                            <TextField value={highwayFuelConsumption} onChange={(e) => setHighwayFuelConsumption(e.target.value)} type="number" name="highwayFuelConsumption" id="highwayFuelConsumption" label="Highway Fuel Consumption L/100km" variant="standard" />
                            <TextField value={combinedFuelConsumption} onChange={(e) => setCombinedFuelConsumption(e.target.value)} type="number" name="combinedFuelConsumption" id="combinedFuelConsumption" label="Combined Fuel Consumption L/100km" variant="standard" />
                            <TextField value={batteryRange} onChange={(e) => setBatteryRange(e.target.value)} type="number" name="batteryRange" id="batteryRange" label="Battery Range (km)" variant="standard" />
                            <TextField value={chargingTime} onChange={(e) => setChargingTime(e.target.value)} type="number" name="chargingTime" id="chargingTime" label="Charging Time (hours)" variant="standard" />
                        </>
                    )}
                </div>

                <TextField
                    value={description}
                    multiline
                    rows={6}
                    onChange={(e) => setDescription(e.target.value)}
                    name='description'
                    id='description'
                    label='Description'
                    variant='standard'
                    fullWidth
                    InputProps={{
                        style: {
                            fontSize: '16px',
                            padding: '10px',
                        },
                    }}
                    style={{
                        marginBottom: '20px',
                        width: '100%',
                    }}
                />
                <div id="update-container">
                    <Button variant='contained' onClick={handleEdit}>Update Car</Button>
                </div>

            </form >

        </div>
    )
}

export default EditCar;