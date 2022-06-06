import doctorDetails from "../models/doctorModel/doctorSignup.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const loginDoctor = async (req, res, next) => {
    try {
        const { email } = req.body;
        const doctor = await doctorDetails.findOne({ email });

        if (!doctor) return next(createError(401, "Invalid Email Address"));
        const verifiedPassword = await bcrypt.compare(req.body.password, doctor.password);
        if (!verifiedPassword) return next(createError(401, "Invalid password"));

        const token = generateToken(doctor._id, doctor.phoneNumber);
        const { password, ...otherDetails } = doctor._doc;
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

