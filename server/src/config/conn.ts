import mongoose from "mongoose";
import dotenv from 'dotenv';

/**
 * Load enviroment variables from .env file into process.env.
 * This allows for configuration of enviroment-specific settings.
 */
dotenv.config();

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * @returns {Promise<void>} A Promise that resolves when the database connection is successfully established.
 * @throws {Error} If there is an error connecting to the database.
 */
const connectDB = async () => {
    try {
        // Connect to the MongoDB database using the provided DATABASE_URI environment variable.
        // If DATABASE_URI is not defined, an empty string is used as the default value.
        await mongoose.connect(process.env.DATABASE_URI || '', {
            // Configuration options for the MongoDB connection.
            useUnifiedTopology: true, // Enable the new unified topology engine.
            useNewUrlParser: true // Enable the new URL parser.
        } as mongoose.ConnectOptions);

    } catch (error) {
        // Throw any errors that occur during the database connection process.
        throw error
    }
};

export default connectDB