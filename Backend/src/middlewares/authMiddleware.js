import JWT from "jsonwebtoken";
import { createError } from "../utils/error.js";
import userSignupDetails from "../models/userModel/userSignup.js";
import adminSignupDetails from "../models/adminModel/adminModel.js";

export const adminProtect = (req, res, next) => {
    let token = req.headers["x-access-token"];
    try {
        if (!token) return next(createError(403, "Not Authorized, No Token"));

        JWT.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if (err) return next(createError(403, "Not Authorized"));
            req.admin = await adminSignupDetails.findById(decoded.id).select("-password");
            if (!req.admin) return next(createError(403, "Not Authorized, No Token"));
            next();
        });
    } catch (error) {
        console.log(error);
        next(createError(403, "Not Authorized"));
    }
};
