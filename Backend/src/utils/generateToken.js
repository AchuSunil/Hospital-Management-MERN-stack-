import jwt from "jsonwebtoken";

export const generateToken = (userId,phoneNumber) =>{
    return jwt.sign({id:userId,phoneNumber:phoneNumber }, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });
}