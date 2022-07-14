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

const router = express.Router();

router.route("/signin").post(loginAdmin);

router.route("/userlist").get(getAllUsers);

router.route("/userBlock/:id").post(blockUser);

router.route("/userUnBlock/:id").post(UnblockUser);

router.route("/addDoctor").post(addDoctor);

router.route("/getDoctorList").get(getDoctorList);

router.route("/removeDoctor/:id").post(removeDoctor);

router.route("/addDepartment").post(addDepartment);

router.route("/getDepartmentList").get(getDepartmentList);

router.route("/removeDepartment/:id").post(removeDepartment);

router.route("/addBanner").post(addBanner);

router.route("/getBannerList").get(getBannerList);

router.route("/removeBanner/:id").post(removeBanner);

router.route("/getDashboardInfo").get(getDashboardInfo);

router.route("/getDepartments").get(getDepartments);









router.get("/checkDoctor", (req, res) => {
    res.status(200).send("you are authenticated");
});

router.get("/checkDoctor/:id", (req, res) => {
    res.status(200).send("you are authenticated");
});

export default router;
