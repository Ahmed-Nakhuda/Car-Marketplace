import mongoose from 'mongoose';

const mongoUri = "mongodb+srv://ahmed:1Nm7lH0YPqWY1Zgj@carmarketplacecluster.gq0rr.mongodb.net/";

// Connect to MongoDB
try {
    await mongoose.connect(mongoUri); 
    console.log("MongoDB connected");
} catch (err) {
    console.error("Failed to connect to MongoDB:", err);
}

// Define Schemas
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    savedCars: {
        type: [String],
        required: true
    }
});

const carSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    trim: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    kilometers: {
        type: Number,
        required: true
    },
    images: [{
        type: String, // Store the file path or URL of the images
        required: true
    }],
    cityFuelConsumption: {
        type: Number,
        required: false
    },
    highwayFuelConsumption: {
        type: Number,
        required: false
    },
    combinedFuelConsumption: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }, 
    transmission: {
        type: String,
        required: true
    },
    drivetrain: {
        type: String,
        required: true
    },
    bodyType: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    }, 
    VIN: {
        type: String,
        required: true
    },
    stockNumber: {
        type: String,
        required: true
    },
    interiorColor: {
        type: String,
        required: true
    },
    exteriorColor: {
        type: String,
        required: true
    }, 
    condition: {
        type: String,
        required: true
    },
    batteryRange: {
        type: Number,
        required: false
    },
    chargingTime: {
        type: Number,
        required: false
    },
    engine: {
        type: String,
        required: false
    },
    fuelType: {
        type: String,
        required: true
    }
});

// Create Models
const userCollection = mongoose.model("userCollection", userSchema);
const carCollection = mongoose.model("carCollection", carSchema);

// Export Models
export { userCollection, carCollection };
