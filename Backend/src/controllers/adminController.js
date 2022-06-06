import adminSignupDetails from "../models/adminModel/adminModel.js";
import { createError } from "../utils/error.js";
import { generateToken } from "../utils/generateToken.js";
import doctorDetails from "../models/doctorModel/doctorSignup.js";
import bcrypt from "bcrypt";

export const loginAdmin = async (req, res, next) => {
    try {
        const { email, isAdmin } = req.body;
        const admin = await adminSignupDetails.findOne({
            $and: [{ email }, { password: req.body.password }],
        });

        if (!admin) return next(createError(401, "Invalid Email Address or Password"));

        const token = generateToken(admin._id, admin.isAdmin);
        const { password, ...otherDetails } = admin._doc;
        return res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ otherDetails });
    } catch (error) {
        next(error);
    }
};

export const addDoctor = async (req, res) => {
    try {
        const doctor = await doctorDetails.findOne({
            email: req.body.email,
        });
        if (doctor) return next(createError(409, "This Email is already registered"));
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const newDoctorDetails = new doctorDetails(req.body);
        const savedDoctorDetails = await newDoctorDetails.save();
        res.status(200).json(savedDoctorDetails);
    } catch (error) {
        next(err);
    }
};
