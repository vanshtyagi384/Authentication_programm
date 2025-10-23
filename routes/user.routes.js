import express from "express";
import { registerUser,verifyUser,login } from "../controller/user.controller.js";
// Importing express to create a router for user-related routes




// Importing the registerUser function from the user controller
const router = express.Router();



router.post("/register", registerUser)
router.get("/verify/:token", verifyUser);
router.post("/login", login);



export default router;
// Importing express to create a router for user-related routes
// This router will handle user registration