import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import db from './utils/db.js'
import cookieParser from "cookie-parser";

// import all the routes
import userRoutes from "./routes/user.routes.js";
import { error } from 'console';




// Load environment variables from .env file
dotenv.config()


const app = express();


app.use(cors({      
  origin: process.env.BASE_URL || 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json()) // this is to parse JSON data from the request body
// This is to parse JSON data from the request body, allowing us to handle incoming JSON requests
app.use(express.urlencoded({ extended: true })) // this is to parse URL-encoded data means - db ko nahi pata ha ki kis form ma data aayegi to isliye yeh use hota hai
app.use(cookieParser())


const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/vansh', (req, res) => {
  res.send('Hello World!')
})


app.get("/confess-your-feelings",(req,res) => {
    const {from,to,message} = req.body;
    res.status(200).json({ 
      error : "End point dosen't exist. she never saw you that way",
    })


    
    
})



// Connect to the database
db();

//user routes
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
