import express from 'express';
import { userCollection, carCollection } from './mongo.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));


// Configure multer to save uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // folder to store images
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Generate a unique filename
        const firstName = req.body.firstName;
        const lastName = req.body.lastName; 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = `${firstName}-${lastName}-${uniqueSuffix}`;
        cb(null, fileName + path.extname(file.originalname)); // append original file extension
    }
});

// Initialize multer for handling multiple file uploads
const upload = multer({ storage: storage });


// Signup route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // password validation
    if (!password || password.length < 8) {
        return res.status(400).json('Password must be at least 8 characters long');
    }

    try {
        // check if the user already exists
        const user = await userCollection.findOne({ email });

        if (user) {
            return res.status(409).json('exist');
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create the user
        const newUser = { email, password: hashedPassword };

        // insert the new user into MongoDB
        await userCollection.insertMany([newUser]);
        return res.status(201).json('signup successful'); 
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json("An error occurred during signup");
    }
});


// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if the user exists
        const user = await userCollection.findOne({ email: email });

        if (user) {
            // compare provided password with stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                res.json('exist');
            } else {
                res.json('incorrect password');
            }
        } else {
            res.json('notexist');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("An error occurred during login");
    }
});


// Route to add a car
app.post('/addcar', upload.array('images', 15), async (req, res) => {
    const { firstName, lastName, email, phoneNumber, province, city, make, model,
        trim, year, price, kilometers, description, cityFuelConsumption,
        highwayFuelConsumption, combinedFuelConsumption, transmission, drivetrain, engine,
        bodyType, seats, VIN, stockNumber, interiorColor, exteriorColor, condition, fuelType, 
        batteryRange, chargingTime} = req.body;

    try {
        // extract file paths of the uploaded images
        const imagePaths = req.files.map(file => file.path);

        // create the new car object 
        const newCar = new carCollection({
            images: imagePaths, // store the file paths in the 'images' field
            firstName, lastName, email, phoneNumber, province, city, make, model, trim, year, price, kilometers, description,
            cityFuelConsumption, highwayFuelConsumption, combinedFuelConsumption, transmission, drivetrain, engine,
            bodyType, seats, VIN, stockNumber, interiorColor, exteriorColor, 
            condition, fuelType, batteryRange, chargingTime
        });

        // save the car in the collection
        await newCar.save();

        return res.status(201).json('Car added successfully');
    } catch (error) {
        console.error('Error adding car:', error);
        return res.status(500).json("An error occurred while adding the car");
    }
});


// Route to fetch all cars
app.get('/allCars', async (req, res) => {
    try {
        // fetch all cars from the collection
        const cars = await carCollection.find({});
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json("An error occurred while fetching cars");
    }
});


// Route to fetch a car by its ID
app.get('/car/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // find the car by its ID
        const car = await carCollection.findById(id);
        if (!car) {
            return res.status(404).json("Car not found");
        }
        res.json(car);
    } catch (error) {
        console.error('Error fetching car:', error);
        res.status(500).json("An error occurred while fetching the car");
    }
});


// Save a car for a user 
app.post('/saveCar', async (req, res) => {
    const { email, carId } = req.body;
    try {
        // check if the user exists
        const user = await userCollection.findOne({ email })
        if (!user) {
            return res.status(404).json("User not found");
        }
       
        // check if the user has already saved a car and if not create an empty array for saved cars 
        const savedCars = user.savedCars || [];
        
        // check if the car has already been saved
        if (savedCars.includes(carId)) {
            return res.status(409).json("Car already saved");
        }

        // save the car to the user's saved cars array
        savedCars.push(carId);
        await userCollection.updateOne({ email }, { savedCars });
        res.json("Car saved successfully");
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json("An error occurred while fetching the user");
    }
})


// Route to fetch saved cars for a user
app.get('/savedCars', async (req, res) => {
    const email = req.query.email; // Pass the user's email as a query parameter
    try {
        // find the user by their email
        const user = await userCollection.findOne({ email });
        
        // if the user does not exist or has no saved cars, return an empty array
        if (!user || !user.savedCars || user.savedCars.length === 0) {
            return res.json([]); 
        }
        
        // find cars whose IDs are in the user's savedCars array
        const savedCars = await carCollection.find({ _id: { $in: user.savedCars } }); 
        res.json(savedCars);
    } catch (error) {
        console.error('Error fetching saved cars:', error);
        res.status(500).json('An error occurred while fetching saved cars');
    }
});


// Route to unsave a car for a user
app.post('/unsaveCar', async (req, res) => {
    const { email, carId } = req.body;
    try {
        // check if the user exists
        const user = await userCollection.findOne({ email });
        if (!user) {
            return res.status(404).json("User not found");
        }
        
        // check if the user has already saved a car and if not create an empty array for saved cars 
        const savedCars = user.savedCars || [];
        
        // check if the car has already been saved
        const index = savedCars.indexOf(carId);
        if (index === -1) {
            return res.status(404).json("Car not found");
        }

        // unsave the car from the user's saved cars array
        savedCars.splice(index, 1);
        await userCollection.updateOne({ email }, { savedCars });
        res.json("Car unsaved successfully");
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json("An error occurred while fetching the user");
    }
});


// Route to search for cars
app.get('/search', async (req, res) => {
    const { make, bodyType, transmission, interiorColor, exteriorColor, minimumPrice, maximumPrice,
        price, minimumYear, maximumYear, maximumMileage, numberOfSeats, condition, fuelType } = req.query;

    // build the filters object
    const filters = {};
    
    // check if the query parameters are provided and add them to the filters object
    if (make) filters.make = { $in: Array.isArray(make) ? make : [make] };
    if (bodyType) filters.bodyType = { $in: Array.isArray(bodyType) ? bodyType : [bodyType] };
    if (transmission) filters.transmission = { $in: Array.isArray(transmission) ? transmission : [transmission] };
    if (interiorColor) filters.interiorColor = { $in: Array.isArray(interiorColor) ? interiorColor : [interiorColor] };
    if (exteriorColor) filters.exteriorColor = { $in: Array.isArray(exteriorColor) ? exteriorColor : [exteriorColor] };
    if (minimumPrice) filters.price = { $gte: parseInt(minimumPrice) }; 
    if (maximumPrice) filters.price = { ...filters.price, $lte: parseInt(maximumPrice) };
    if (minimumYear) filters.year = { $gte: parseInt(minimumYear) };
    if (maximumYear) filters.year = { ...filters.year, $lte: parseInt(maximumYear) };
    if (maximumMileage) filters.kilometers = { $lte: parseInt(maximumMileage) };
    if (numberOfSeats) {
        filters.seats = { $in: Array.isArray(numberOfSeats) ? numberOfSeats.map(Number) : [parseInt(numberOfSeats)] };
    }
    if (condition) filters.condition = { $in: Array.isArray(condition) ? condition : [condition] };
    if (fuelType) filters.fuelType = { $in: Array.isArray(fuelType) ? fuelType : [fuelType] };

    // fetch cars that match the filters
    try {
        const cars = await carCollection.find(filters);
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json("An error occurred while fetching cars");
    }
});


// Route to fetch cars posted by a user
app.get('/cars', async (req, res) => {
    const email = req.query.email;
    try {
        // fetch cars posted by the user
        const cars = await carCollection.find({ email });
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json("An error occurred while fetching cars");
    }
});


// Route to fetch a car by its ID
app.get('/editCarPage/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // find the car by its ID
        const car = await carCollection.findById(id);
        if (!car) {
            return res.status(404).json("Car not found");
        }
        res.json(car);
    } catch (error) {
        console.error('Error fetching car:', error);
        res.status(500).json("An error occurred while fetching the car");
    }
});


// Route to update a car
app.put('/editCar/:id', async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, email, phoneNumber, city, province, make, model, price, kilometers, year, VIN,
            stockNumber, drivetrain, engine, bodyType, seats, condition, fuelType, batteryRange, chargingTime, 
            interiorColor, exteriorColor, cityFuelConsumption, highwayFuelConsumption, combinedFuelConsumption, description
            
     } = req.body;

    try {
        const updateFields = {
            firstName,
            lastName,
            email,
            phoneNumber,
            province,
            city,
            make,
            model,
            price, 
            kilometers,
            year,
            VIN, 
            stockNumber, 
            drivetrain,
            engine,
            bodyType,
            seats,
            condition,
            fuelType,
            batteryRange,
            chargingTime,
            interiorColor,
            exteriorColor, 
            cityFuelConsumption,
            highwayFuelConsumption,
            combinedFuelConsumption,
            description
        };

        await carCollection.findByIdAndUpdate(id, updateFields, { new: true });
        res.json('Car updated successfully');
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json("An error occurred while updating the car");
    }
});


// Route to delete a car 
app.delete('/deleteCar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // delete the car by its ID
        await carCollection.findByIdAndDelete(id);
        res.json('Car deleted successfully');
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json("An error occurred while deleting the car");
    }
});


// Start the backend server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
