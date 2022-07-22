import React from "react";
import Department from "../../../Components/User-Components/Department/Department";
import Navigationbar from "../../../Components/User-Components/Navigationbar/Navigationbar";
import Footer from "../../../Components/User-Components/Footer/Footer"
const Departments = () => {
    return (
        <>
            <Navigationbar />
            <Department />
            <Footer/>
        </>
    );
};

export default Departments;
