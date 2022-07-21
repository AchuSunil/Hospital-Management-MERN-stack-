import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import './Footer.css'

 const Footer = () => {
    return (
        <div className="text-center text-light footer" style={{ backgroundColor: "#328090" }}>
            <Container className="p-4 pb-auto">
                <section className="d-flex justify-content-around align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <span className="calendar">
                            <CalendarMonthRoundedIcon />
                        </span>
                        <span className="me-3 fw-bold font-monospace">Check Doctor's Availabilty & Book Online</span>
                        <button type="button" className="btn btn-outline-light btn-rounded">
                            Book An Appointment
                        </button>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <span className="me-2"><AppRegistrationRoundedIcon/></span>
                        <span className="me-3 fw-bold">Register Here</span>
                        <button type="button" className="btn btn-outline-light btn-rounded">
                            Sign up!
                        </button>
                    </div>
                </section>
            </Container>

            <div className="text-center p-3" style={{ backgroundColor: "#2B7786" }}>
                <span> © 2022 Copyright :</span>
                <NavLink className="text-light text-decoration-none p-2" to="/">
                    <span>Health Care Hospital</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Footer;
