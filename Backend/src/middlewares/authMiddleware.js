import JWT from "jsonwebtoken";
import { createError } from "../utils/error.js";
import userSignupDetails from "../models/userModel/userSignup.js";

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await userSignupDetails.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.log(error);
            next(createError(403, "Not Authorized"));
        }
    }
    if (!token) {
        next(createError(403, "Not Authorized, No Token"));
    }
};
