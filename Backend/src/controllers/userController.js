import userSignupDetails from "../models/userModel/userSignup.js";
import userProfileInfo from "../models/userModel/userProfileInfo.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import { generateToken } from "../utils/generateToken.js";

/**
 * @desc Register a new user
 * @route POST /signup
 */
export const registerUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const { email, phone, password } = req.body;
        const user = await userSignupDetails.findOne({
            $or: [{ email }, { phone }],
        });
        if (user) {
            if (user.email === email) {
                return next(createError(409, "This Email is already registered"));
            } else if (user.phone === phone) {
                return next(createError(409, "This phoneNumber is already registered"));
            }
        } else {
            console.log("new user created");
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUserSignupDetails = new userSignupDetails({
                email,
                phone,
                password: hash,
            });

             await newUserSignupDetails.save().then(()=>{

                 res.status(200).json({message:"registered successfull"});
             });

        }
    } catch (error) {
        console.log(error.message);
        next(error);

    }
};

/**
 * @desc User Login
 * @route POST /signin
 */
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userSignupDetails.findOne({ email });

        if (!user) return next(createError(401, "Invalid Email Address"));
        else if (user && user.isBlocked) return next(createError(401, "Sorry, Your are Blocked"));
        else if (user && !user.isBlocked) {
            const verifiedPassword = await bcrypt.compare(password, user.password);
            if (!verifiedPassword) return next(createError(401, "Invalid password"));

            return res.status(200).json({ _id: user._id, email: user.email, token: generateToken(user._id) });
        }
    } catch (error) {
        next(error);
    }
};

export const updateUserProfile = async (req, res, next) => {
    try {
        // req.body.DOB = Date(req.body.DOB);
        // const newUserProfileInfo = new userProfileInfo(req.body);
        // newUserProfileInfo.userId = req.params.id; //Added userSignupDetails collection ID to userProfileInfo collection for creating relation
        // const savedUserInfo = await newUserProfileInfo.save();
        // res.status(200).json(savedUserInfo);
        res.send("protected");
    } catch (error) {
        next(error);
    }
};
