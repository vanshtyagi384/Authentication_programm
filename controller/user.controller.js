import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    
    
    // get data
    //validate
    // check if user already exists
    // create user
    //create token
    //save token in database
    // send token as email to user
    // send sucess user response


    const { name, email, password } = req.body;
    if( !name || !email || !password ){
        return res.status(400).json({
        message: "all state"
    });
  };


// Check if user already exists

  try{
     const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        console.log(user);
        

        if(!user){
            return res.status(400).json({
                message: "User registration failed",
            });
        }      


//create token
      const token = crypto.randomBytes(32).toString("hex");
      console.log(token);
// Save token in user db
      user.verificationToken = token;
        await user.save();  
// Send token as email to user (this part is not implemented here, but you would typically use a service like Nodemailer or SendGrid)
// For now, we will just return the token in the response
 

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

    

const mailOptions = {
  from: process.env.MAILTRAP_SENDER_EMAIL,
  to: user.email,
  subject: "Verify your email", // Subject line
  text: `Please click on the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token} `,
};
await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered ",
      error,
      success: false,
    });
  }
};

const verifyUser = async (req, res) => {
  //get token from url
  //validate
  // find user based on token
  //if not
  // set isVerified field to true
  // remove verification token
  // save
  //return response

  const { token } = req.params;
  console.log(token);
  if (!token) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  try{
    console.log("verification started");
    
  
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.status(200).json({
    message: "User verified successfully",
    success: true,
  });
} catch (error) {
  res.status(400).json({
    message: "User verification failed",
    error,
    success: false,
  }) 
  };
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //

    const token = jwt.sign(
      { id: user._id, role: user.role },

      "shhhhh",
      {
        expiresIn: "24h",
      }
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {}
};









export { registerUser, verifyUser, login };