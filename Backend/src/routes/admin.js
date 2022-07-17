import express from "express";
import {
    loginAdmin,
    getAllUsers,
    addDoctor,
    blockUser,
    UnblockUser,
    getDoctorList,
    removeDoctor,
    addDepartment,
    getDepartmentList,
    removeDepartment, 
    addBanner,
    getBannerList,
    removeBanner,
    getDashboardInfo,
    getDepartments
} from "../controllers/adminController.js";

import { adminProtect } from "../middlewares/authMiddleware.js";
     
//Routes for Admin

const router = express.Router(); 

router.route("/signin").post(loginAdmin);

router.route("/getDashboardInfo").get(adminProtect, getDashboardInfo);

router.route("/userlist").get(adminProtect,getAllUsers);

router.route("/userBlock/:id").post(adminProtect,blockUser);

router.route("/userUnBlock/:id").post(adminProtect,UnblockUser);

router.route("/addDoctor").post(adminProtect,addDoctor);

router.route("/getDoctorList").get(adminProtect,getDoctorList);

router.route("/removeDoctor/:id").post(adminProtect,removeDoctor);

router.route("/addDepartment").post(adminProtect,addDepartment);

router.route("/getDepartmentList").get(adminProtect,getDepartmentList);

router.route("/removeDepartment/:id").post(adminProtect,removeDepartment);

router.route("/addBanner").post(adminProtect,addBanner);

router.route("/getBannerList").get(adminProtect,getBannerList);

router.route("/removeBanner/:id").post(adminProtect,removeBanner);

router.route("/getDepartments").get(adminProtect,getDepartments);


export default router;
