import express from "express";
import { registerUser, loginUser, updateUserProfile } from "../controllers/userController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//** @apiName:-UserSignUp.
//**Request containing email, password and phone number of a new user.
//* Checks if the user already exists in the database, else creates a new user.
router.route("/signup").post(registerUser);

//** @apiName:-UserLogin.
//**Request containing email, password of user.
//* Checks if the user exists in the database, else creates Invalid Email address Error Message.
router.route("/signin").post(loginUser);

/**
 * test data
 */
router.route("/updateUserProfile/:id").post(verifyUser, updateUserProfile);

router.get("/checkToken", verifyUser, (req, res) => {
    res.status(200).send("you are authenticated");
});
export default router;
