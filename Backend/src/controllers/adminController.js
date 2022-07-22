import adminSignupDetails from "../models/adminModel/adminModel.js";
import userSignupDetails from "../models/userModel/userSignup.js";

import { createError } from "../utils/error.js";
import { generateToken } from "../utils/generateToken.js";
import doctorSignupDetails from "../models/doctorModel/doctorSignup.js";
import bcrypt from "bcrypt";
import departmentDetails from "../models/departmentModel/departmentModel.js";
import bannerDetails from "../models/bannerModel/bannerModel.js";

export const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await adminSignupDetails.findOne({
            $and: [{ email }, { password }],
        });
        if (!admin) return next(createError(401, "Invalid Email Address or Password"));

        const token = generateToken(admin._id);
        if (!token) return next(createError(409, "Server Token Error"));

        return res.status(200).json({ _id: admin._id, email: admin.email, token: generateToken(admin._id) });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userSignupDetails.find({}, { _id: 1, name: 1, email: 1, phone: 1, gender: 1, isBlocked: 1 });
        res.json(users);
    } catch (error) {
        res.json(error);
    }
};

export const blockUser = async (req, res) => {
    const userId = req.params.id;
    const confirm = req.body;
    try {
        if (confirm.isUser) {
            const response = await userSignupDetails.findByIdAndUpdate(userId, { isBlocked: true });
            if (response) {
                res.json({ success: true });
            }
        } else if (confirm.isDoctor) {
            const response = await doctorSignupDetails.findByIdAndUpdate(userId, { isBlocked: true });
            if (response) {
                res.json({ success: true });
            }
        }
    } catch (error) {
        res.json(error);
    }
};

export const UnblockUser = async (req, res) => {
    const userId = req.params.id;
    const confirm = req.body;
    try {
        if (confirm.isUser) {
            const response = await userSignupDetails.findByIdAndUpdate(userId, { isBlocked: false });
            if (response) {
                res.json({ success: true });
            }
        } else if (confirm.isDoctor) {
            const response = await doctorSignupDetails.findByIdAndUpdate(userId, { isBlocked: false });
            if (response) {
                res.json({ success: true });
            }
        }
    } catch (error) {
        res.json(error);
    }
};

export const removeDoctor = async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await doctorSignupDetails.findByIdAndRemove(userId);
        if (response) {
            res.json({ removed: true });
        }
    } catch (error) {
        res.json(error);
    }
};

export const addDoctor = async (req, res, next) => {
    const { name, email, password, gender, phone, department } = req.body;
    try {
        const doctor = await doctorSignupDetails.findOne({
            $or: [{ email }, { phone }],
        });
        if (doctor) {
            if (doctor.email === email) return next(createError(409, "An Account with this Email is already registered"));
            else if (doctor.phone == phone)
                return next(createError(409, "An Account with this Phone Number is already registered"));
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const phoneNumber = parseInt(phone);
            const newDoctorDetails = new doctorSignupDetails({
                name,
                email,
                password: hashedPassword,
                gender,
                phone: phoneNumber,
                department,
            });
            const savedDoctorDetails = await newDoctorDetails.save();

            console.log(savedDoctorDetails, "//////saved doctor details");

            res.status(200).json({ success: true });
        }
    } catch (error) {
        next(error);
    }
};

export const getDoctorList = async (req, res, next) => {
    try {
        const doctorList = await doctorSignupDetails.find(
            {},
            { name: 1, email: 1, phone: 1, gender: 1, department: 1, isBlocked: 1 }
        );

        res.json(doctorList);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const addDepartment = async (req, res, next) => {
    const { deptName } = req.body;
    try {
        const department = await departmentDetails.findOne({ name: deptName });
        if (department) {
            return next(createError(401, "Department Already Exist"));
        }
        const newDepartment = new departmentDetails({ name: deptName });
        const response = await newDepartment.save();
        if (response) {
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getDepartmentList = async (req, res, next) => {
    try {
        const departmentList = await departmentDetails.find();

        if (departmentList) {
            res.json(departmentList);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const removeDepartment = async (req, res, next) => {
    const deptId = req.params.id;
    try {
        const response = await departmentDetails.findByIdAndRemove(deptId);
        if (response) {
            res.json({ removed: true });
        }
    } catch (error) {
        next(error);
        res.json(error);
    }
};

export const addBanner = async (req, res, next) => {
    const { bannerImg } = req.body;
    try {
        const newBanner = new bannerDetails({ name: bannerImg });
        const response = await newBanner.save();
        if (response) {
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getBannerList = async (req, res, next) => {
    try {
        const bannerList = await bannerDetails.find();
        if (bannerList) {
            res.json(bannerList);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const removeBanner = async (req, res, next) => {
    const bannerId = req.params.id;
    try {
        const response = await bannerDetails.findByIdAndRemove(bannerId);
        if (response) {
            res.json({ removed: true });
        }
    } catch (error) {
        next(error);
        res.json(error);
    }
};

export const getDashboardInfo = async (req, res, next) => {
    let dashboardInfo = {};
    try {
        dashboardInfo.user = await userSignupDetails.find().count();
        dashboardInfo.doctor = await doctorSignupDetails.find().count();
        dashboardInfo.department = await departmentDetails.find().count();
        res.json(dashboardInfo);
    } catch (error) {
        next(error);
        res.json(error);
    }
};

export const getDepartments = async (req, res, next) => {
    try {
        const departments = await departmentDetails.find();
        res.json(departments);
    } catch (error) {
        next(error);
    }
};
