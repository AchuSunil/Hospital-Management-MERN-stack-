import userSignupDetails from "../models/userModel/userSignup.js";
import userProfileInfo from "../models/userModel/userProfileInfo.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
    try {
        const { email, phoneNumber, password } = req.body;
        const user = await userSignupDetails.findOne({
            $or: [{ email }, { phoneNumber }],
        });
        if (user) {
            if (user.email === email) {
                return next(createError(409, "This Email is already registered"));
            } else if (user.phoneNumber === phoneNumber) {
                return next(createError(409, "This phoneNumber is already registered"));
            }
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUserSignupDetails = new userSignupDetails({
                email,
                phoneNumber,
                password: hash,
            });
            const savedUserDetails = await newUserSignupDetails.save();
            res.status(200).json(savedUserDetails);
        }
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userSignupDetails.findOne({ email });

        if (!user) return next(createError(401, "Invalid Email Address"));
        else if (user && user.isBlocked) return next(createError(401, "Sorry, Your are Blocked"));
        else if (user && !user.isBlocked) {
            const verifiedPassword = await bcrypt.compare(req.body.password, user.password);
            if (!verifiedPassword) return next(createError(401, "Invalid password"));

            const token = generateToken(user._id, user.phoneNumber);
            const { password, ...otherDetails } = user._doc;
            return res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json({ otherDetails });
        }
    } catch (error) {
        next(error);
    }
};

export const updateUserProfile = async (req, res, next) => {
    try {
        req.body.DOB = Date(req.body.DOB);
        const newUserProfileInfo = new userProfileInfo(req.body);
        newUserProfileInfo.userId = req.params.id; //Added userSignupDetails collection ID to userProfileInfo collection for creating relation
        const savedUserInfo = await newUserProfileInfo.save();
        res.status(200).json(savedUserInfo);
    } catch (error) {
        next(error);
    }
};
