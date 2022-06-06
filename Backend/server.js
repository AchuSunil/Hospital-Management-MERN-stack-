import express from "express";
import dotenv from "dotenv";
import connectDataBase from "./src/config/db.config.js";
import user from "./src/routes/user.js";
import doctor from "./src/routes/doctor.js";
import admin from "./src/routes/admin.js";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();

//Middlewares

app.use(cookieParser())
app.use(express.json());

app.use("/", user);
app.use("/doctor", doctor);
app.use("/admin", admin);

//error-middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went Wrong!";
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

const PORT = 5000;

app.listen(process.env.PORT || PORT, () => {
    connectDataBase();
    console.log("Connected to backend");
});
