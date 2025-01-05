import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import '../stylesheets/home.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Navbar from "./navbar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';


const Home = () => {
    const [cars, setCars] = useState([]); // State to store fetched cars
    const navigate = useNavigate();
    const email = localStorage.getItem('email'); // Retrieve logged-in user's email from localStorage
    const [isSaved, setIsSaved] = useState({}); // State to store whether the car is saved
    const [numberOfResults, setNumberOfResults] = useState(0); // State to store the number of results found


    // State to store selected filter
    const [selectedMakes, setSelectedMakes] = useState([]);
    const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);
    const [selectedTransmissions, setSelectedTransmissions] = useState([]);
    const [selectedInteriorColors, setSelectedInteriorColors] = useState([]);
    const [selectedExteriorColors, setSelectedExteriorColors] = useState([]);
    const [minimumPrice, setMinimumPrice] = useState(0);
    const [maximumPrice, setMaximumPrice] = useState(250000);
    const [minimumYear, setMinimumYear] = useState(0);
    const [maximumYear, setMaximumYear] = useState(2024);
    const [maximumMileage, setMaximumMileage] = useState(250000);
    const [numberOfSeats, setNumberOfSeats] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
    const [price, setPrice] = useState([0, 250000]);


    // 
    const handlePriceChange = (event, newValue) => {
        setPrice(newValue);
    };

    const handleMileageChange = (event, newValue) => {
        setMaximumMileage(newValue);
    }



    // Functions to handle filter changes
    const handleTransmissionChange = (type) => {
        if (selectedTransmissions.includes(type)) {
            setSelectedTransmissions(selectedTransmissions.filter((transmission) => transmission !== type));
        } else {
            setSelectedTransmissions([...selectedTransmissions, type]);
        }
    };


    const handleInteriorColorChange = (type) => {
        if (selectedInteriorColors.includes(type)) {
            setSelectedInteriorColors(selectedInteriorColors.filter((color) => color !== type));
        } else {
            setSelectedInteriorColors([...selectedInteriorColors, type]);
        }
    };


    const handleExteriorColorChange = (type) => {
        if (selectedExteriorColors.includes(type)) {
            setSelectedExteriorColors(selectedExteriorColors.filter((color) => color !== type));
        } else {
            setSelectedExteriorColors([...selectedExteriorColors, type]);
        }
    };

    const handleConditionChange = (type) => {
        if (selectedConditions.includes(type)) {
            setSelectedConditions(selectedConditions.filter((condition) => condition !== type));
        } else {
            setSelectedConditions([...selectedConditions, type]);
        }
    }

    const handleNumberOfSeatsChange = (type) => {
        if (numberOfSeats.includes(type)) {
            setNumberOfSeats(numberOfSeats.filter((seat) => seat !== type));
        } else {
            setNumberOfSeats([...numberOfSeats, type]);
        }
    };

    const handleFuelTypeChange = (type) => {
        if (selectedFuelTypes.includes(type)) {
            setSelectedFuelTypes(selectedFuelTypes.filter((fuel) => fuel !== type));
        } else {
            setSelectedFuelTypes([...selectedFuelTypes, type]);
        }
    }


    // Fetch cars when the component mounts
    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await axios.get('http://localhost:5000/allCars');
                setCars(response.data);
                setNumberOfResults(response.data.length);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        }
        fetchCars();
    }, []);


    // useEffect to filter cars based on selected filters
    useEffect(() => {
        async function fetchFilteredCars() {
            try {
                const response = await axios.get('http://localhost:5000/search', {

                    params: {
                        make: selectedMakes,
                        bodyType: selectedBodyTypes,
                        transmission: selectedTransmissions,
                        interiorColor: selectedInteriorColors,
                        exteriorColor: selectedExteriorColors,
                        price: price,
                        minimumPrice: minimumPrice,
                        maximumPrice: maximumPrice,
                        minimumYear: minimumYear,
                        maximumYear: maximumYear,
                        maximumMileage: maximumMileage,
                        numberOfSeats: numberOfSeats,
                        condition: selectedConditions,
                        fuelType: selectedFuelTypes
                    }
                });
                setCars(response.data);
                setNumberOfResults(response.data.length);
            } catch (error) {
                console.error("Error fetching filtered cars:", error);
            }
        }
        fetchFilteredCars();
    }, [selectedMakes, selectedBodyTypes, selectedTransmissions, selectedInteriorColors, selectedExteriorColors,
        minimumPrice, maximumPrice, price, minimumYear, maximumYear, maximumMileage, numberOfSeats, selectedConditions, selectedFuelTypes
    ]);


    // Function to handle saving a car
    async function handleSaveCar(carId) {
        try {
            // Make a POST request to save the car for the logged-in user
            await axios.post('http://localhost:5000/saveCar', { email, carId });
        } catch (error) {
            console.error("Error saving car:", error);
        }

        setIsSaved((prevState) => ({
            ...prevState,
            [carId]: !prevState[carId], // Toggle the saved state for the clicked car
        }));
    }


    // Function to navigate to the car details page
    function handleMoreInfo(id) {
        navigate(`/car/${id}`);
    }


    // Function to clear all filter 
    function clearFilters() {
        setSelectedMakes([]);
        setSelectedBodyTypes([]);
        setSelectedTransmissions([]);
        setSelectedInteriorColors([]);
        setSelectedExteriorColors([]);
        setMinimumPrice(0);
        setMaximumPrice(250000);
        setMinimumYear(0);
        setMaximumYear(2024);
        setMaximumMileage(250000);
        setNumberOfSeats([]);
        setSelectedConditions([]);
        setSelectedFuelTypes([]);
        setPrice([0, 250000]);
    }

    // Function to clear individual filters
    function clearNewConditionFilter() {
        setSelectedConditions(selectedConditions.filter((condition) => condition !== "New"));
    }

    function clearUsedConditionFilter() {
        setSelectedConditions(selectedConditions.filter((condition) => condition !== "Used"));
    }

    function clearMakeFilter() {
        setSelectedMakes([]);
    }

    function clearYearFilter() {
        setMinimumYear(0);
        setMaximumYear(2024);
    }

    function clearPriceFilter() {
        setMinimumPrice(0);
        setMaximumPrice(250000);
        setPrice([0, 250000]);
    }

    function clearSeatsFilter(seats) {
        setNumberOfSeats(numberOfSeats.filter((seat) => seat !== seats));
    }


    function clearTransmissionFilter(transmissions) {
        setSelectedTransmissions(selectedTransmissions.filter((transmission) => transmission !== transmissions));
    }

    function clearInteriorColorFilter(color) {
        setSelectedInteriorColors(selectedInteriorColors.filter((interiorColor) => interiorColor !== color));
    }

    function clearExteriorColorFilter(color) {
        setSelectedExteriorColors(selectedExteriorColors.filter((exteriorColor) => exteriorColor !== color));
    }

    function clearFuelTypeFilter(fuel) {
        setSelectedFuelTypes(selectedFuelTypes.filter((fuelType) => fuelType !== fuel));
    }


    // Function to generate the title based on selected filters
    const generateTitle = (conditions, make) => {
        let title = "";

        if (conditions.length > 0) {
            title += conditions.join(" and ");
        } else {
            title += "New and Used";
        }

        if (make) {
            title += ` ${make}`;
        }

        title += " Cars for Sale";

        return title;
    };


    return (
        <div id='home'>
            <Navbar id="navbar" />
            <div id="accordion">
                <Accordion style={{ width: '100%', marginTop: "10px", marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Condition</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedConditions.includes("New")}
                                        onChange={() => handleConditionChange("New")}
                                    />
                                }
                                label="New"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedConditions.includes("Used")}
                                        onChange={() => handleConditionChange("Used")}
                                    />
                                }
                                label="Used"
                            />
                        </FormGroup>
                    </AccordionDetails>

                </Accordion>

                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Make</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <Select
                                labelId="make"
                                id="make"
                                value={selectedMakes}
                                label="Make"
                                onChange={(e) => setSelectedMakes(e.target.value)}
                                displayEmpty
                                renderValue={selectedMakes !== "" ? undefined : () => "Select Make"}
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
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Price</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <Typography>${price[0]} - ${price[1]}</Typography>
                            <Slider
                                value={price}
                                onChange={(event, newValue) => {
                                    handlePriceChange(event, newValue);
                                    setMinimumPrice(newValue[0]);
                                    setMaximumPrice(newValue[1]);
                                }}
                                valueLabelDisplay="off"
                                step={null}
                                marks={[
                                    { value: 0 },
                                    { value: 500 },
                                    { value: 1000 },
                                    { value: 1500 },
                                    { value: 2000 },
                                    { value: 3000 },
                                    { value: 4000 },
                                    { value: 5000 },
                                    { value: 6000 },
                                    { value: 7000 },
                                    { value: 8000 },
                                    { value: 9000 },
                                    { value: 10000 },
                                    { value: 11000 },
                                    { value: 12000 },
                                    { value: 13000 },
                                    { value: 14000 },
                                    { value: 15000 },
                                    { value: 16000 },
                                    { value: 17000 },
                                    { value: 18000 },
                                    { value: 19000 },
                                    { value: 20000 },
                                    { value: 25000 },
                                    { value: 30000 },
                                    { value: 35000 },
                                    { value: 40000 },
                                    { value: 45000 },
                                    { value: 50000 },
                                    { value: 60000 },
                                    { value: 70000 },
                                    { value: 80000 },
                                    { value: 90000 },
                                    { value: 100000 },
                                    { value: 150000 },
                                    { value: 200000 },
                                    { value: 250000 },
                                ]}
                                min={0}
                                max={250000}
                            />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Year</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <TextField onChange={(e) => setMinimumYear(e.target.value)} label='minimum' type="number"></TextField>
                            <TextField onChange={(e) => setMaximumYear(e.target.value)} label='maximum' type="number"></TextField>
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Mileage</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <Typography>Under {maximumMileage}km</Typography>
                            <Slider
                                value={maximumMileage}
                                onChange={(event, newValue) => {
                                    handleMileageChange(event, newValue);
                                    setMaximumMileage(newValue);
                                    console.log(newValue);
                                }}
                                valueLabelDisplay="off"
                                step={null}
                                defaultValue={250000}
                                marks={[
                                    { value: 1000 },
                                    { value: 2000 },
                                    { value: 3000 },
                                    { value: 4000 },
                                    { value: 5000 },
                                    { value: 6000 },
                                    { value: 7000 },
                                    { value: 8000 },
                                    { value: 9000 },
                                    { value: 10000 },
                                    { value: 15000 },
                                    { value: 20000 },
                                    { value: 30000 },
                                    { value: 40000 },
                                    { value: 50000 },
                                    { value: 60000 },
                                    { value: 70000 },
                                    { value: 80000 },
                                    { value: 90000 },
                                    { value: 100000 },
                                    { value: 120000 },
                                    { value: 140000 },
                                    { value: 160000 },
                                    { value: 200000 },
                                    { value: 250000 },
                                ]}
                                min={1000}
                                max={250000}
                            />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Body Type</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <Select
                                labelId="bodyType"
                                id="bodyType"
                                value={selectedBodyTypes}
                                label="Body Type"
                                onChange={(e) => setSelectedBodyTypes(e.target.value)}
                                displayEmpty
                                renderValue={selectedBodyTypes !== "" ? undefined : () => "Select Body Type"}>
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
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Number of Seats</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={numberOfSeats.includes(1)} onChange={() => handleNumberOfSeatsChange(1)} />} label="1" />
                            <FormControlLabel control={<Checkbox checked={numberOfSeats.includes(2)} onChange={() => handleNumberOfSeatsChange(2)} />} label="2" />
                            <FormControlLabel control={<Checkbox checked={numberOfSeats.includes(3)} onChange={() => handleNumberOfSeatsChange(3)} />} label="3" />
                            <FormControlLabel control={<Checkbox checked={numberOfSeats.includes(4)} onChange={() => handleNumberOfSeatsChange(4)} />} label="4" />
                            <FormControlLabel control={<Checkbox checked={numberOfSeats.includes(5)} onChange={() => handleNumberOfSeatsChange(5)} />} label="5" />
                            <FormControlLabel control={<Checkbox checked={numberOfSeats.includes(6)} onChange={() => handleNumberOfSeatsChange(6)} />} label="6" />
                            <FormControlLabel control={<Checkbox checked={numberOfSeats.includes(7)} onChange={() => handleNumberOfSeatsChange(7)} />} label="7" />
                            <FormControlLabel control={<Checkbox checked={numberOfSeats.includes(8)} onChange={() => handleNumberOfSeatsChange(8)} />} label="8" />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Transmission</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={selectedTransmissions.includes("Automatic")} onChange={() => handleTransmissionChange("Automatic")} />} label="Automatic" />
                            <FormControlLabel control={<Checkbox checked={selectedTransmissions.includes("Manual")} onChange={() => handleTransmissionChange("Manual")} />} label="Manual" />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Exterior Color</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Beige")} onChange={() => handleExteriorColorChange("Beige")} />} label="Beige" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Black")} onChange={() => handleExteriorColorChange("Black")} />} label="Black" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Blue")} onChange={() => handleExteriorColorChange("Blue")} />} label="Blue" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Brown")} onChange={() => handleExteriorColorChange("Brown")} />} label="Brown" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Green")} onChange={() => handleExteriorColorChange("Green")} />} label="Green" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Grey")} onChange={() => handleExteriorColorChange("Grey")} />} label="Grey" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Orange")} onChange={() => handleExteriorColorChange("Orange")} />} label="Orange" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Purple")} onChange={() => handleExteriorColorChange("Purple")} />} label="Purple" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Red")} onChange={() => handleExteriorColorChange("Red")} />} label="Red" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Silver")} onChange={() => handleExteriorColorChange("Silver")} />} label="Silver" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("White")} onChange={() => handleExteriorColorChange("White")} />} label="White" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Yellow")} onChange={() => handleExteriorColorChange("Yellow")} />} label="Yellow" />
                            <FormControlLabel control={<Checkbox checked={selectedExteriorColors.includes("Other")} onChange={() => handleExteriorColorChange("Other")} />} label="Other" />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Interior Color</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Beige")} onChange={() => handleInteriorColorChange("Beige")} />} label="Beige" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Black")} onChange={() => handleInteriorColorChange("Black")} />} label="Black" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Blue")} onChange={() => handleInteriorColorChange("Blue")} />} label="Blue" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Brown")} onChange={() => handleInteriorColorChange("Brown")} />} label="Brown" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Green")} onChange={() => handleInteriorColorChange("Green")} />} label="Green" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Grey")} onChange={() => handleInteriorColorChange("Grey")} />} label="Grey" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Orange")} onChange={() => handleInteriorColorChange("Orange")} />} label="Orange" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Purple")} onChange={() => handleInteriorColorChange("Purple")} />} label="Purple" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Red")} onChange={() => handleInteriorColorChange("Red")} />} label="Red" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Silver")} onChange={() => handleInteriorColorChange("Silver")} />} label="Silver" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("White")} onChange={() => handleInteriorColorChange("White")} />} label="White" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Yellow")} onChange={() => handleInteriorColorChange("Yellow")} />} label="Yellow" />
                            <FormControlLabel control={<Checkbox checked={selectedInteriorColors.includes("Other")} onChange={() => handleInteriorColorChange("Other")} />} label="Other" />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ width: '100%', marginLeft: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Fuel Type</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={selectedFuelTypes.includes("Gasoline")} onChange={() => handleFuelTypeChange("gasoline")} />} label="Gasoline" />
                            <FormControlLabel control={<Checkbox checked={selectedFuelTypes.includes("Diesel")} onChange={() => handleFuelTypeChange("diesel")} />} label="Diesel" />
                            <FormControlLabel control={<Checkbox checked={selectedFuelTypes.includes("Eletric")} onChange={() => handleFuelTypeChange("electric")} />} label="Electric" />
                            <FormControlLabel control={<Checkbox checked={selectedFuelTypes.includes("Hybrid")} onChange={() => handleFuelTypeChange("hybrid")} />} label="Hybrid" />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>

                <div id="clear-filter-container">
                    <Button onClick={clearFilters} style={{ marginLeft: "10px", marginTop: "10px", width: "100%" }} variant="contained" color="primary">Clear Filters</Button>
                </div>
            </div>

            <div id="results-found">
                <Typography variant="h6">
                    {generateTitle(selectedConditions, selectedMakes)}
                </Typography>
                <Typography variant="h6">Number of results found: {numberOfResults}</Typography>


                <Typography>

                    {/* Show filter buttons if filters are selected */}

                    {/* Conditions  */}
                    {selectedConditions.includes("New") && (
                        <Button
                            variant="contained"
                            onClick={() => clearNewConditionFilter("New")}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">New</span>
                        </Button>
                    )}
                    {selectedConditions.includes("Used") && (
                        <Button
                            variant="contained"
                            onClick={() => clearUsedConditionFilter("Used")}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Used</span>
                        </Button>
                    )}


                    {/* Makes  */}  
                    {selectedMakes.length > 0 && (<Button variant="contained" onClick={clearMakeFilter} endIcon={<CloseIcon />} className="clear-filter-buttons">
                        <span className="filter-value">{selectedMakes}</span>
                    </Button>
                    )}

                    {(minimumPrice !== 0 || maximumPrice !== 250000) && (
                        <Button
                            variant="contained"
                            onClick={clearPriceFilter}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">
                                Price: ${minimumPrice} - ${maximumPrice}
                            </span>
                        </Button>
                    )}


                    {/* Years  */}
                    {minimumYear !== 0 && maximumYear !== 2024 && (<Button variant="contained" className="clear-filter-buttons" onClick={clearYearFilter} endIcon={<CloseIcon />}>
                        <span className="filter-value">Year: {minimumYear} - {maximumYear}</span>
                    </Button>
                    )}


                    {/* Mileage  */}
                    {maximumMileage !== 250000 && (<Button variant="contained" className="clear-filter-buttons" onClick={() => setMaximumMileage(250000)} endIcon={<CloseIcon />}>
                        <span className="filter-value">Under {maximumMileage}km</span>
                    </Button>
                    )}

                    {/* Body Types  */}
                    {selectedBodyTypes.length > 0 && (<Button variant="contained" className="clear-filter-buttons" onClick={() => setSelectedBodyTypes([])} endIcon={<CloseIcon />}>
                        <span className="filter-value">{selectedBodyTypes}</span>
                    </Button>
                    )}


                    {/* Number of Seats  */}
                    {numberOfSeats.includes(1) && (
                        <Button
                            variant="contained"
                            onClick={() => clearSeatsFilter(1)}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Seats: 1</span>
                        </Button>
                    )}

                    {numberOfSeats.includes(2) && (
                        <Button
                            variant="contained"
                            onClick={() => clearSeatsFilter(2)}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Seats: 2</span>
                        </Button>
                    )}

                    {numberOfSeats.includes(3) && (
                        <Button
                            variant="contained"
                            onClick={() => clearSeatsFilter(3)}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Seats: 3</span>
                        </Button>
                    )}

                    {numberOfSeats.includes(4) && (
                        <Button
                            variant="contained"
                            onClick={() => clearSeatsFilter(4)}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Seats: 4</span>
                        </Button>
                    )}

                    {numberOfSeats.includes(5) && (
                        <Button
                            variant="contained"
                            onClick={() => clearSeatsFilter(5)}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Seats: 5</span>
                        </Button>
                    )}

                    {numberOfSeats.includes(6) && (
                        <Button
                            variant="contained"
                            onClick={() => clearSeatsFilter(6)}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Seats: 6</span>
                        </Button>
                    )}

                    {numberOfSeats.includes(7) && (
                        <Button
                            variant="contained"
                            onClick={() => clearSeatsFilter(7)}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Seats: 7</span>
                        </Button>
                    )}

                    {numberOfSeats.includes(8) && (
                        <Button
                            variant="contained"
                            onClick={() => clearSeatsFilter(8)}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Seats: 8</span>
                        </Button>
                    )}


                    {/* Transmissions  */}
                    {selectedTransmissions.includes("Automatic") && (
                        <Button
                            variant="contained"
                            onClick={() => clearTransmissionFilter("Automatic")}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Automatic</span>
                        </Button>
                    )}

                    {selectedTransmissions.includes("Manual") && (
                        <Button
                            variant="contained"
                            onClick={() => clearTransmissionFilter("Manual")}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Manual</span>
                        </Button>
                    )}


                    {/* Interior Colors  */}
                    {selectedInteriorColors.includes("Beige") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Beige"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Beige Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Black") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Black"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Black Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Blue") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Blue"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Blue Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Brown") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Brown"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Brown Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Green") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Green"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Green Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Grey") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Grey"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Grey Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Orange") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Orange"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Orange Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Purple") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Purple"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Purple Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Red") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Red"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Red Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Silver") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Silver"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Silver Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("White") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("White"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">White Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Yellow") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Yellow"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Yellow Interior</span>
                        </Button>
                    )}

                    {selectedInteriorColors.includes("Other") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearInteriorColorFilter("Other"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Other Interior</span>
                        </Button>
                    )}


                    {/* Exterior Colors  */}
                    {selectedExteriorColors.includes("Beige") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearExteriorColorFilter("Beige"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Beige Exterior</span>
                        </Button>
                    )}

                    {selectedExteriorColors.includes("Black") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearExteriorColorFilter("Black"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Black Exterior</span>
                        </Button>
                    )}

                    {selectedExteriorColors.includes("Blue") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearExteriorColorFilter("Blue"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Blue Exterior</span>
                        </Button>
                    )}

                    {selectedExteriorColors.includes("Brown") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearExteriorColorFilter("Brown"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Brown Exterior</span>
                        </Button>
                    )}

                    {selectedExteriorColors.includes("Green") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearExteriorColorFilter("Green"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Green Exterior</span>
                        </Button>
                    )}

                    {selectedExteriorColors.includes("Grey") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearExteriorColorFilter("Grey"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Grey Exterior</span>
                        </Button>
                    )}

                    {selectedExteriorColors.includes("Orange") && (
                        <Button
                            variant="contained"
                            onClick={() => (clearExteriorColorFilter("Orange"))}
                            endIcon={<CloseIcon />}
                            className="clear-filter-buttons"
                        >
                            <span className="filter-value">Orange Exterior</span>
                        </Button>
                    )}

                    {selectedExteriorColors.includes("Purple") && (
                        <Button variant="contained" onClick={() => (clearExteriorColorFilter("Purple"))} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">Purple Exterior</span></Button>)}

                    {selectedExteriorColors.includes("Red") && (
                        <Button variant="contained" onClick={() => (clearExteriorColorFilter("Red"))} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">Red Exterior</span></Button>)}

                    {selectedExteriorColors.includes("Silver") && (
                        <Button variant="contained" onClick={() => (clearExteriorColorFilter("Silver"))} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">Silver Exterior</span></Button>)}

                    {selectedExteriorColors.includes("White") && (
                        <Button variant="contained" onClick={() => (clearExteriorColorFilter("White"))} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">White Exterior</span></Button>)}

                    {selectedExteriorColors.includes("Yellow") && (
                        <Button variant="contained" onClick={() => (clearExteriorColorFilter("Yellow"))} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">Yellow Exterior</span></Button>)}

                    {selectedExteriorColors.includes("Other") &&
                        (<Button variant="contained" onClick={() => (clearExteriorColorFilter("Other"))} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">Other Exterior</span></Button>)}


                    {/* Fuel Types  */}
                    {selectedFuelTypes.includes("gasoline") && (
                        <Button variant="contained" onClick={() => clearFuelTypeFilter("gasoline")} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">Gasoline</span></Button>)}

                    {selectedFuelTypes.includes("diesel") && (
                        <Button variant="contained" onClick={() => clearFuelTypeFilter("diesel")} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">Diesel</span></Button>)}


                    {selectedFuelTypes.includes("electric") && (
                        <Button variant="contained" onClick={() => clearFuelTypeFilter("electric")} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">Electric</span></Button>)}


                    {selectedFuelTypes.includes("hybrid") && (
                        <Button variant="contained" onClick={() => clearFuelTypeFilter("hybrid")} endIcon={<CloseIcon />}
                            className="clear-filter-buttons"><span className="filter-value">Hybrid</span></Button>)}
                </Typography>
            </div>


            <div id="home-cards">
                {cars.map((car) => (
                    <Card variant="outlined" style={{ height: '360px', width: '30%', marginRight: "10px", marginBottom: "10px" }}>
                        <CardMedia
                            component="img"
                            height="200px"
                            image={car.images[0] || 'https://via.placeholder.com/150'}
                            alt={`${car.make} ${car.model}`}
                            style={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography gutterBottom style={{ size: "30px" }} component="div">
                                {car.year} {car.make} {car.model} {car.trim}
                            </Typography>
                            <div id="home-card-info">
                                <Typography style={{ size: "15px", fontWeight: "bold" }}>
                                    ${car.price}
                                </Typography>
                                <Typography style={{ size: "15px" }}>
                                    {car.kilometers} km
                                </Typography>
                            </div>
                            <div id="home-card-buttons">
                                <Button size="small" style={{ marginRight: "5px" }} onClick={() => handleMoreInfo(car._id)} variant="contained" color="primary">More Info</Button>
                                <FavoriteIcon
                                    className={isSaved[car._id] ? 'favouriteIcon saved' : 'favouriteIcon'}
                                    fontSize="medium"
                                    onClick={() => handleSaveCar(car._id)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Home;
