import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../stylesheets/add-car.css';
import { useEffect } from "react";
import cities from 'cities.json';
import Navbar from "./navbar";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const AddCar = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [trim, setTrim] = useState('');
    const [cityFuelConsumption, setCityFuelConsumption] = useState('');
    const [highwayFuelConsumption, setHighwayFuelConsumption] = useState('');
    const [combinedFuelConsumption, setCombinedFuelConsumption] = useState('');
    const [transmission, setTransmission] = useState('');
    const [drivetrain, setDrivetrain] = useState('');
    const [engine, setEngine] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [seats, setSeats] = useState('');
    const [VIN, setVIN] = useState('');
    const [stockNumber, setStockNumber] = useState('');
    const [interiorColor, setInteriorColor] = useState('');
    const [exteriorColor, setExteriorColor] = useState('');
    const [condition, setCondition] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [batteryRange, setBatteryRange] = useState('');
    const [chargingTime, setChargingTime] = useState('');
    const [canadianCities, setCanadianCities] = useState([]);


    // filter Canadian cities from the cities.json file
    useEffect(() => {
        const filteredCities = cities.filter((city) => city.country === "CA");
        const cityOptions = filteredCities.map((city) => ({
            value: city.name,
            label: city.name,
        }));
        setCanadianCities(cityOptions);
    }, []);



    // Function to submit the form
    async function submit(e) {
        e.preventDefault();
        // Create a new FormData object and append the form data
        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("phoneNumber", phoneNumber);
            formData.append("province", province);
            formData.append("city", city);
            formData.append("make", make);
            formData.append("model", model);
            formData.append("year", year);
            formData.append("price", price);
            formData.append("kilometers", kilometers);
            formData.append("description", description);
            formData.append("trim", trim);
            formData.append("cityFuelConsumption", cityFuelConsumption);
            formData.append("highwayFuelConsumption", highwayFuelConsumption);
            formData.append("combinedFuelConsumption", combinedFuelConsumption);
            formData.append("transmission", transmission);
            formData.append("drivetrain", drivetrain);
            formData.append("engine", engine);
            formData.append("bodyType", bodyType);
            formData.append("seats", seats);
            formData.append("VIN", VIN);
            formData.append("stockNumber", stockNumber);
            formData.append("interiorColor", interiorColor);
            formData.append("exteriorColor", exteriorColor);
            formData.append("condition", condition);
            formData.append("fuelType", fuelType);
            formData.append("batteryRange", batteryRange);
            formData.append("chargingTime", chargingTime);

            // Append each image file to formData
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }

            await axios.post("http://localhost:5000/addcar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                if (res.data === 'Car added successfully') {
                    alert('Car posted successfully');
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPhoneNumber('');
                    setProvince('');
                    setCity('');
                    setMake('');
                    setModel('');
                    setYear('');
                    setPrice('');
                    setKilometers('');
                    setImages([]);
                    setDescription('');
                    setTrim('');
                    setCityFuelConsumption('');
                    setHighwayFuelConsumption('');
                    setCombinedFuelConsumption('');
                    setTransmission('');
                    setDrivetrain('');
                    setEngine('');
                    setBodyType('');
                    setSeats('');
                    setVIN('');
                    setStockNumber('');
                    setInteriorColor('');
                    setExteriorColor('');
                    setCondition('');
                    setFuelType('');
                    setBatteryRange('');
                    setChargingTime('');
                }
            });
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div id='add-car'>
            <Navbar />
            <form onSubmit={submit}>
                <Typography variant='h6' gutterBottom>Personal Info</Typography>

                <div className='group'>
                    <TextField required onChange={(e) => setFirstName(e.target.value)} name="first-name" id="first-name" label="First Name" variant="standard" />
                    <TextField required onChange={(e) => setLastName(e.target.value)} name="last-name" id="last-name" label="Last Name" variant="standard" />
                    <TextField required onChange={(e) => setPhoneNumber(e.target.value)} type="number" name="phone-number" id="phone-number" label="Phone Number" variant="standard" />
                </div>

                <div className='group'>
                    <TextField required onChange={(e) => setEmail(e.target.value)} name="email" id="email" type='email' label="Email" variant="standard" />

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
                        required
                        onChange={(e) => setVIN(e.target.value)}
                        slotProps={{
                            minLength: 17,
                            maxLength: 17,
                            required: true
                        }}
                        name="VIN" id="VIN" label="VIN" variant="standard" />
                    <TextField onChange={(e) => setStockNumber(e.target.value)} required name="stockNumber" id="stockNumber" label="Stock Number" variant="standard" />
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
                    <TextField required onChange={(e) => setModel(e.target.value)} name="model" id="model" label="Model" variant="standard" />
                    <TextField required onChange={(e) => setTrim(e.target.value)} name="trim" id="trim" label="Trim" variant="standard" />
                </div>
                <br />

                <div className='group'>
                    <TextField
                        required
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (value >= 1990) {
                                setYear(e.target.value);
                            }
                        }}
                        type="number"
                        name="year"
                        id="year"
                        label="Year"
                        variant="standard"
                    />

                    <TextField required onChange={(e) => setPrice(e.target.value)} type='number' name="price" id="price" label="Price" variant="standard" />
                    <TextField required onChange={(e) => setKilometers(e.target.value)} type="number" name="kilometers" id="kilometers" label="Kilometers" variant="standard" />
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
                    <TextField onChange={(e) => setEngine(e.target.value)} name="engine" id="engine" label="Engine" variant="standard" />
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
                        <MenuItem value="3">3</MenuItem>
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
                            <FormControlLabel value="gasoline" control={<Radio />} label="Gasoline" />
                            <FormControlLabel value="diesel" control={<Radio />} label="Diesel" />
                            <FormControlLabel value="electric" control={<Radio />} label="Electric" />
                            <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
                        </RadioGroup>
                    </FormControl>
                </div>


                <div className="group">
                    {fuelType === "gasoline" && (
                        <>
                            <TextField onChange={(e) => setCityFuelConsumption(e.target.value)} type="number" name="cityFuelConsumption" id="cityFuelConsumption" label="City Fuel Consumption L/100km" variant="standard" />
                            <TextField onChange={(e) => setHighwayFuelConsumption(e.target.value)} type="number" name="highwayFuelConsumption" id="highwayFuelConsumption" label="Highway Fuel Consumption L/100km" variant="standard" />
                            <TextField onChange={(e) => setCombinedFuelConsumption(e.target.value)} type="number" name="combinedFuelConsumption" id="combinedFuelConsumption" label="Combined Fuel Consumption L/100km" variant="standard" />
                        </>
                    )}
                </div>

                <div className="group">
                    {fuelType === "diesel" && (
                        <>
                            <TextField onChange={(e) => setCityFuelConsumption(e.target.value)} type="number" name="cityFuelConsumption" id="cityFuelConsumption" label="City Fuel Consumption L/100km" variant="standard" />
                            <TextField onChange={(e) => setHighwayFuelConsumption(e.target.value)} type="number" name="highwayFuelConsumption" id="highwayFuelConsumption" label="Highway Fuel Consumption L/100km" variant="standard" />
                            <TextField onChange={(e) => setCombinedFuelConsumption(e.target.value)} type="number" name="combinedFuelConsumption" id="combinedFuelConsumption" label="Combined Fuel Consumption L/100km" variant="standard" />
                        </>
                    )}
                </div>

                <div className="group">
                    {fuelType === "electric" && (
                        <>
                            <TextField onChange={(e) => setBatteryRange(e.target.value)} type="number" name="batteryRange" id="batteryRange" label="Battery Range (km)" variant="standard" />
                            <TextField onChange={(e) => setChargingTime(e.target.value)} type="number" name="chargingTime" id="chargingTime" label="Charging Time (hours)" variant="standard" />
                        </>
                    )}
                </div>

                <div className="group">
                    {fuelType === "hybrid" && (
                        <>
                            <TextField onChange={(e) => setCityFuelConsumption(e.target.value)} type="number" name="cityFuelConsumption" id="cityFuelConsumption" label="City Fuel Consumption L/100km" variant="standard" />
                            <TextField onChange={(e) => setHighwayFuelConsumption(e.target.value)} type="number" name="highwayFuelConsumption" id="highwayFuelConsumption" label="Highway Fuel Consumption L/100km" variant="standard" />
                            <TextField onChange={(e) => setCombinedFuelConsumption(e.target.value)} type="number" name="combinedFuelConsumption" id="combinedFuelConsumption" label="Combined Fuel Consumption L/100km" variant="standard" />
                            <TextField onChange={(e) => setBatteryRange(e.target.value)} type="number" name="batteryRange" id="batteryRange" label="Battery Range (km)" variant="standard" />
                            <TextField onChange={(e) => setChargingTime(e.target.value)} type="number" name="chargingTime" id="chargingTime" label="Charging Time (hours)" variant="standard" />
                        </>
                    )}
                </div>

                <TextField
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
                <Typography variant='h6' gutterBottom>Upload Car Images (maximum 15)</Typography>
                <p>First image selected will be the homepage placeholder</p>
                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                />
                <br />
                <div id="submit-container">
                    <Button id="add-car-button" variant="contained" onClick={submit} color="primary">Add Car</Button>
                </div>
            </form >
        </div >
    );
}

export default AddCar;
