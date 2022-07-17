import React, { useEffect } from "react";
//<--Styling-->
import "./Signup.scss";
import { toast } from "react-toastify";
import { toastifyInfo } from "../../../Assets/toastify/toastifyInfo";
import Spinner from "../../../Components/Spinner/Spinner";
import TypeWriterEffect from "react-typewriter-effect";
//<--Images-->
import LoginImage from "../../../Assets/images/login/login-page-background-right-side.jpg";
//<--Form Resources-->
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
//<--Components-->
import Footer from "../../../Components/User-Components/Footer/Footer";
import Navigationbar from "../../../Components/User-Components/Navigationbar/Navigationbar";
//<--ReduxToolkit-->
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../../../redux-toolkit/features/authSlice";
import { useNavigate } from "react-router-dom";
//<--Other Resources-->
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const UserSignup = () => {
    const formSchema = Yup.object().shape({
        name: Yup.string().required("*Name Required"),
        email: Yup.string().required("*Email Required").email("Enter a valid email"),
        phone: Yup.string().required("*Number Required").min(10, "Minimum 10 numbers").max(10, "Maximum 10 numbers"),
        password: Yup.string()
            .required("*Password  Required")
            .min(4, "Password length should be at least 4 characters")
            .max(12, "Password cannot exceed more than 12 characters"),
        cpassword: Yup.string()
            .required("*Confirm Password Required")
            .min(4, "Password length should be at least 4 characters")
            .max(12, "Password cannot exceed more than 12 characters")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onTouched", resolver: yupResolver(formSchema) });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, isMessage } = useSelector((state) => state.user);
 

    useEffect(() => {
        if (isError) {
            toast.error(isMessage,toastifyInfo.error);
        }
        if (isSuccess || user) {
            toast.success(isMessage,toastifyInfo.success);

            navigate("/Login");
        }
        dispatch(reset());
    }, [ isError, isSuccess, isMessage,]);

    const onSubmit = (data) => {
        dispatch(registerUser(data)); 
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <Navigationbar />
            <div className="typewritter-container">
                <Container>
                    <div className="typewritter">
                        <TypeWriterEffect
                            textStyle={{
                                fontFamily: "Red Hat Display",
                                color: "#37839a",
                                fontWeight: 400,
                                fontSize: "1.3em",
                            }}
                            startDelay={1000}
                            cursorColor="#37839a"
                            multiText={[
                                "Hey, Please Signup... ",
                                "We where care there...",
                                "We have some of the best specialty doctors from around the world to ensure the best care for you.....",
                            ]}
                            multiTextDelay={1000}
                            typeSpeed={70}
                        />
                    </div>
                </Container>
            </div>

            <Container className="signup-main-container">
                <div className="signup-container">
                    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="signup-heading">Create Account</h3>
                        <span className="error">{errors.name?.message}</span>
                        <div className="signup-name-field">
                            <input type="text" {...register("name")} placeholder="Enter Your Name" />
                        </div>
                        <span className="error">{errors.email?.message}</span>
                        <div className="signup-email-field">
                            <input type="text" {...register("email")} placeholder="Enter Your Email Address" />
                        </div>
                        <span className="error">{errors.phone?.message}</span>
                        <div className="signup-email-field">
                            <input type="phone" {...register("phone")} placeholder="Enter Your Phone Number" />
                        </div>
                        <div className="gender">
                            <div className="male">
                                <input type="radio" value="male" {...register("gender")} id="male" className="inputMale" />
                                <label className="genderLabel" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="female">
                                <input
                                    type="radio"
                                    value="female"
                                    {...register("gender")}
                                    id="female"
                                    className="inputFemale"
                                />
                                <label className="genderLabel" htmlFor="female">
                                    Female
                                </label>
                            </div>
                        </div>
                        <span className="error">{errors.password?.message}</span>
                        <div className="signup-password-field">
                            <input type="password" {...register("password")} placeholder="Enter Your Password" />
                        </div>
                        <span className="error">{errors.cpassword?.message}</span>
                        <div className="signup-password-field">
                            <input type="password" {...register("cpassword")} placeholder="Confirm Your Password" />
                        </div>
                        <div className="signup-button">
                            <button type="submit" className="btn signupBtn">
                                Signup
                            </button>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "5px" }}>
                            <NavLink className="loginLink" to="/login">
                                Already Have An Account ? <span className="loginNow">Login Now</span>
                            </NavLink>
                        </div>
                    </form>
                </div>
                <div className="signup-img">
                    <img src={LoginImage} alt="not found" />
                </div>
            </Container>

            <Footer />
        </>
    );
};

export default UserSignup;
