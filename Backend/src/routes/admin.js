import express from "express";
import { loginAdmin,addDoctor} from "../controllers/adminController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//** @apiName:-adminLogin.
//**Request containing email, password of admin which is created by developer.
//* Checks if the admin exists in the database, else creates Invalid Email address Error Message.
router.route("/signin").post(loginAdmin);


router.get("/checkDoctor", verifyToken, (req, res) => {
    res.status(200).send("you are authenticated");
});

router.get("/checkDoctor/:id", verifyUser, (req, res) => {
    res.status(200).send("you are authenticated");
});


router.route('/addDoctor').post(addDoctor);
export default router;
