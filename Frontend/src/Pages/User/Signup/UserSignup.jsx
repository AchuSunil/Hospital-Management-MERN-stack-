import React, { useEffect } from "react";
import "./Signup.css";
import { Container } from "react-bootstrap";
import TypeWriterEffect from "react-typewriter-effect";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Spinner from "../../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../../../redux-toolkit/features/authSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/User-Components/Footer/Footer";
import Navigationbar from "../../../Components/User-Components/Navigationbar/Navigationbar";

const UserSignup = () => {
    const formSchema = Yup.object().shape({
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

    const { user, isLoading, isError, isSuccess, isMessage } = useSelector((state) => state.userAuth);

    useEffect(() => {
        if (isError) {             
            toast.error(isMessage);
            console.log(isMessage, "////error from useEffect");
        }
        if (isSuccess || user) {
            toast.success(isMessage);
            console.log(isMessage, "////message(success expecting) from useEffect");

            navigate("/Login");
        }
        dispatch(reset());
    }, [user, isError, isSuccess, isMessage, navigate, dispatch]);

    const onSubmit = (data) => {
        console.log(data, "///data");
        dispatch(registerUser(data));
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <Navigationbar />
            <div className="signup">
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
                                "we where care there...",
                                "We have some of the best specialty doctors from around the world to ensure the best care for you.....",
                            ]}
                            multiTextDelay={1000}
                            typeSpeed={70}
                        />
                    </div>
                </Container>

                <Container className="main-container">
                    <div className="signup-container">
                        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                            <h3 className="signup-heading">Create Account</h3>
                            <div className="email-field">
                                <input type="text" {...register("email")} placeholder="Enter Your Email Address" />
                                <span className="error">{errors.email?.message}</span>
                            </div>
                            <div className="email-field">
                                <input type="phone" {...register("phone")} placeholder="Enter Your Phone Number" />
                                <span className="error">{errors.phone?.message}</span>
                            </div>
                            <div className="password-field">
                                <input type="password" {...register("password")} placeholder="Enter Your Password" />
                                <span className="error">{errors.password?.message}</span>
                            </div>
                            <div className="password-field">
                                <input type="password" {...register("cpassword")} placeholder="Confirm Your Password" />
                                <span className="error">{errors.cpassword?.message}</span>
                            </div>
                            <div className="signup-button">
                                <button type="submit" className="btn signupBtn">
                                    Signup
                                </button>
                            </div>
                            <div style={{ textAlign: "center", marginTop: "13px" }}>
                                <NavLink className="loginLink" to="/login">
                                    Already Have An Account ? Login Now
                                </NavLink>
                            </div>
                        </form>
                    </div>
                    <div className="signup-img">
                        <img
                            src={process.env.PUBLIC_URL + "Images/login/login-page-background-right-side.jpg"}
                            alt="not found"
                        />
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default UserSignup;
