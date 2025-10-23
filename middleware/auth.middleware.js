import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  try {
    console.log(req.cookies);
    let token = req.cookies?.token

    console.log('Token Found',  token ? "YES":"NO");
    
    if(!token){
        console.log("no token found");
        return res.status(401).json({
          message: "Authentication failed, no token found",
          success: false,   
        })
        
    }   

const decoded = jwt.verify(token,process.env.JWT_SECRET)
console.log("decoded data :",decoded);

req.user = decoded 



next()



} catch (error) {
   
}



next();

}