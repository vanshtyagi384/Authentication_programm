import mongoose from "mongoose";
// Importing mongoose to connect to MongoDB
// and perform database operations.             
// Importing dotenv to manage environment variables
// and load the MongoDB connection string from .env file.
import { dot } from "node:test/reporters"

import dotenv from "dotenv";    

dotenv.config();


// export a function thats connects to the database



const db = () => {
mongoose.connect(process.env.MONGO_URL)
     .then(() =>{
        console.log("Connected to MongoDB successfully" );
        
     })
     .catch((err) => {
         console.error("Error connecting to MongoDB:", err);
    });
};

export default db;