import React from "react";

//components
import HomeComponents from "../../../Components/User-Components/Body/Home/HomeComponents";
import Footer from "../../../Components/User-Components/Footer/Footer";
import Navigationbar from "../../../Components/User-Components/Navigationbar/Navigationbar";

const Home = () => {
    return (
        <>
            <Navigationbar />
            <HomeComponents />
            <Footer />
        </>
    );
};

export default Home;
