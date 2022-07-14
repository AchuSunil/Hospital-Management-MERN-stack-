import express from "express";
import { loginDoctor} from "../controllers/doctorController.js";


const router = express.Router();

//** @apiName:-doctorLogin.
//**Request containing email, password of doctor which is created by admin.
//* Checks if the doctor exists in the database, else creates Invalid Email address Error Message.
router.route("/doctor/signin").post(loginDoctor);


router.get("/doctor/checkToken", (req, res) => {
    res.status(200).send("you are authenticated");
});

router.get("/doctor/checkToken/:id", (req, res) => {
    res.status(200).send("you are authenticated");
});
export default router;
