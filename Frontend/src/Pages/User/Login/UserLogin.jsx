import React, { useEffect } from "react";
//<--Styling-->
import "./userLogin.scss";
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
import { loginUser, reset } from "../../../redux-toolkit/features/authSlice";
import { useNavigate } from "react-router-dom";
//<--Other Resources-->
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const UserLogin = () => {
    const formSchema = Yup.object().shape({
        email: Yup.string().required("*Email Required").email("Enter a valid email"),
        password: Yup.string()
            .required("*Password  Required")
            .min(4, "Password length should be at least 4 characters")
            .max(12, "Password cannot exceed more than 12 characters"),
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
            toast.error(isMessage, toastifyInfo.error);
        } else if (isSuccess) {
            toast.success(isMessage, toastifyInfo.success);
            navigate("/");
        } else if (user) {
            navigate("/");
        }
        dispatch(reset());
    }, [isError, isSuccess, isMessage]);

    const onSubmit = (data) => {
        dispatch(loginUser(data));
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
                                "Hey, Please Login... ",
                                "We where care there...",
                                "We have some of the best specialty doctors from around the world to ensure the best care for you.....",
                            ]}
                            multiTextDelay={1000}
                            typeSpeed={70}
                        />
                    </div>
                </Container>
            </div>

            <Container className="login-main-container">
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="login-heading">Login Here</h3>
                        <span className="error">{errors.email?.message}</span>
                        <div className="login-email-field">
                            <input type="text" {...register("email")} placeholder="Enter Your Email Address..." />
                        </div>
                        <span className="error">{errors.password?.message}</span>
                        <div className="login-password-field">
                            <input type="password" {...register("password")} placeholder="Enter Your Password..." />
                        </div>
                        <div className="login-button">
                            <button type="submit" className="btn loginBtn">
                                Login
                            </button>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "5px" }}>
                            <NavLink className="signupLink" to="/signup">
                                Don't Have An Account ? <span style={{ color: "#37839a" }}>Signup Now</span>
                            </NavLink>
                        </div>
                        {/* <div className="googleLogin">
                            <div style={{ color: "grey", marginTop: "10px" }}>OR</div>
                            <GoogleLogin buttonText="Login with Google" />
                        </div> */}
                    </form>
                </div>
                <div className="login-img">
                    <img src={LoginImage} alt="not found" />
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default UserLogin;
