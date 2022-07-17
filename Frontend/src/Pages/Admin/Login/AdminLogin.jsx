import React, { useState, useEffect } from "react";
import "./adminlogin.scss";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AXIOS from "../../../axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //validations
    const formSchema = Yup.object().shape({
        email: Yup.string().required("*Email Required").email("*Enter a valid email"),
        password: Yup.string()
            .required("*Password  Required")
            .min(4, "*Password length should be at least 4 characters")
            .max(12, "*Password cannot exceed more than 12 characters"),
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onTouched", resolver: yupResolver(formSchema) });

    //For Navigation Purpose
    const navigate = useNavigate();
    useEffect(() => {
        const adminInfo = localStorage.getItem("adminInfo");
        if (!adminInfo) return navigate("/admin");

        const info = JSON.parse(adminInfo);

        if (info.token) {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    //Axios call to Back-End
    const onSubmit = async (data) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const adminInfo = await AXIOS.post("admin/signin", data, config);

            //Storing adminInfo from Back-End to the Local storage
            if (adminInfo.data.token) {
                localStorage.setItem("adminInfo", JSON.stringify(adminInfo.data));
                navigate("/admin/dashboard");
            }
        } catch (error) {
            setError(error.response.data.message);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };
    return (
        <>
            <div className="admin-body">
                <form className="admin-login" onSubmit={handleSubmit(onSubmit)}>
                    <div className="admin-login-heading-container">
                        <LoginRoundedIcon style={{ color: "white", fontSize: "30px" }} />
                        <h3 className="admin-login-heading">Welcome admin</h3>
                    </div>
                    <div style={{ textAlign: "center" }}>{error && <p style={{ color: "#ff726f" }}>{error}</p>}</div>
                    <div className="email-field">
                        <input type="text" {...register("email")} placeholder="Enter Your Email Address" />
                        <p className="error">{errors.email?.message}</p>
                    </div>
                    <div className="password-field">
                        <input type="password" {...register("password")} placeholder="Enter Your Password" />
                        <p className="error">{errors.password?.message}</p>
                    </div>
                    <div className="login-button">
                        <button type="submit" className="btn loginBtn">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminLogin;
