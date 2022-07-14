import React from "react";
import "./userLogin.css";
import { Container } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import TypeWriterEffect from "react-typewriter-effect";
import { NavLink } from "react-router-dom";
import Footer from "../../../Components/User-Components/Footer/Footer";
import Navigationbar from "../../../Components/User-Components/Navigationbar/Navigationbar";

const UserLogin = () => {
    return (
        <>
            <Navigationbar />
            <div className="login">
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
                                "we where care there...",
                                "We have some of the best specialty doctors from around the world to ensure the best care for you.....",
                            ]}
                            multiTextDelay={1000}
                            typeSpeed={70}
                        />
                    </div>
                </Container>

                <Container className="main-container">
                    <div className="login-container">
                        <form className="login-form">
                            <h3 className="login-heading">Login Here</h3>
                            <div className="email-field">
                                <input type="text" placeholder="Enter Your Email Address..." />
                            </div>
                            <div className="password-field">
                                <input type="password" placeholder="Enter Your Password..." />
                            </div>
                            <div className="login-button">
                                <button className="btn loginBtn">Login</button>
                            </div>
                            <div style={{ textAlign: "center", paddingTop: "40px" }}>
                                <NavLink className="signupLink" to="/signup">
                                    Don't Have An Account ? Login Now
                                </NavLink>

                                <div style={{ color: "grey", marginTop: "10px" }}>OR</div>
                            </div>
                            <div className="googleLogin">
                                <GoogleLogin buttonText="Login with Google" />
                            </div>
                        </form>
                    </div>
                    <div className="login-img">
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

export default UserLogin;
